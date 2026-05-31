"use server";

import { headers } from "next/headers";
import { prisma } from "@/lib/db";
import { contactSchema } from "@/lib/validations";
import { rateLimit } from "@/lib/rate-limit";
import { logAudit } from "@/lib/audit";
import { notifyEvents } from "@/lib/notify";
import type { ActionResult } from "@/lib/types";

function clientIp(h: Headers): string {
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown"
  );
}

export async function submitContact(formData: FormData): Promise<ActionResult> {
  const h = headers();
  const ip = clientIp(h);

  const limited = rateLimit({ key: `contact:${ip}`, limit: 5, windowMs: 60_000 });
  if (!limited.ok) {
    return { ok: false, message: "Too many requests. Please try again shortly." };
  }

  const raw = Object.fromEntries(formData.entries());
  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please correct the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const d = parsed.data;

  try {
    const msg = await prisma.contactMessage.create({
      data: {
        name: d.name,
        email: d.email,
        phone: d.phone || null,
        subject: d.subject,
        message: d.message,
        status: "NEW",
      },
    });

    await logAudit({
      action: "CONTACT_MESSAGE_CREATED",
      entity: "ContactMessage",
      entityId: msg.id,
      ipAddress: ip,
      userAgent: h.get("user-agent"),
    });

    await notifyEvents.contactReceived(d.name, d.subject);

    return { ok: true, message: "Thanks for reaching out. We'll respond shortly." };
  } catch (err) {
    console.error("submitContact error:", err);
    return { ok: false, message: "Something went wrong. Please try again." };
  }
}
