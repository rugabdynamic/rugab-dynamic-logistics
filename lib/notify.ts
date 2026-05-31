import { prisma } from "./db";
import { sendEmail, adminEmail } from "./email";

// Unified notification layer: writes an in-app Notification row and (optionally)
// sends an email. All calls are best-effort — failures are logged, never thrown,
// so notifications can't break the operational flow.

interface NotifyOptions {
  userId?: string | null;
  email?: string | null;
  title: string;
  message: string;
  type?: string;
}

async function notify({ userId = null, email, title, message, type = "INFO" }: NotifyOptions) {
  try {
    await prisma.notification.create({ data: { userId, title, message, type } });
  } catch (err) {
    console.error("notification create failed:", err);
  }
  if (email) {
    await sendEmail({ to: email, subject: title, text: message });
  }
}

// Admin broadcast — stored with userId=null and shown to admins.
async function notifyAdmins(title: string, message: string, type = "INFO") {
  await notify({ userId: null, email: adminEmail(), title, message, type });
}

// Fetches recent notifications for a user. Admins also see broadcast
// notifications (userId = null), e.g. new quotes and contact messages.
export async function getNotifications(userId: string, isAdmin: boolean) {
  const where = isAdmin
    ? { OR: [{ userId }, { userId: null }] }
    : { userId };
  const [items, unread] = await Promise.all([
    prisma.notification.findMany({ where, orderBy: { createdAt: "desc" }, take: 15 }),
    prisma.notification.count({ where: { ...where, readAt: null } }),
  ]);
  return {
    unread,
    items: items.map((n) => ({
      id: n.id,
      title: n.title,
      message: n.message,
      type: n.type,
      read: n.readAt != null,
      createdAt: n.createdAt.toISOString(),
    })),
  };
}

// ---- Event helpers used by server actions ----

export const notifyEvents = {
  quoteCreated: (trackingCode: string, name: string) =>
    notifyAdmins(
      "New quote request",
      `${name} submitted a quote request (${trackingCode}).`,
      "QUOTE"
    ),

  contactReceived: (name: string, subject: string) =>
    notifyAdmins("New contact message", `${name}: ${subject}`, "CONTACT"),

  quoteApproved: (opts: { userId?: string | null; email?: string | null; trackingCode: string }) =>
    notify({
      userId: opts.userId,
      email: opts.email,
      title: "Your quote was approved",
      message: `Good news! Your shipment ${opts.trackingCode} has been created and is being processed.`,
      type: "SHIPMENT",
    }),

  riderAssigned: (opts: { userId: string; trackingCode: string }) =>
    notify({
      userId: opts.userId,
      title: "New shipment assigned",
      message: `You have been assigned shipment ${opts.trackingCode}. Please accept it in your dashboard.`,
      type: "ASSIGNMENT",
    }),

  shipmentDelivered: (opts: { userId?: string | null; email?: string | null; trackingCode: string }) =>
    notify({
      userId: opts.userId,
      email: opts.email,
      title: "Shipment delivered",
      message: `Your shipment ${opts.trackingCode} has been delivered. Thank you for choosing Rugab Dynamic Logistics.`,
      type: "SHIPMENT",
    }),
};
