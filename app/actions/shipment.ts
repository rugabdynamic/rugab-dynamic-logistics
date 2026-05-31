"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { assertRole } from "@/lib/permissions";
import { logAudit } from "@/lib/audit";
import { notifyEvents } from "@/lib/notify";
import { initializeTransaction } from "@/lib/paystack";
import { generateTrackingCode } from "@/lib/utils";
import {
  quotePricingSchema,
  statusUpdateSchema,
  paymentStatusSchema,
  proofSchema,
} from "@/lib/validations";
import {
  canTransition,
  PAYMENT_STATUSES,
  PAYMENT_METHODS,
  type ShipmentStatus,
} from "@/lib/constants";
import type { ActionResult } from "@/lib/types";

const ok = (message: string, extra?: Partial<ActionResult>): ActionResult => ({ ok: true, message, ...extra });
const fail = (message: string, fieldErrors?: Record<string, string[]>): ActionResult => ({ ok: false, message, fieldErrors });

// ---------------------------------------------------------------------------
// Admin: quote pricing, approve/reject, create shipment
// ---------------------------------------------------------------------------

export async function setQuotePricing(formData: FormData): Promise<ActionResult> {
  const admin = await assertRole("ADMIN");
  const parsed = quotePricingSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return fail("Check the fields.", parsed.error.flatten().fieldErrors);

  const { quoteId, estimatedPrice, adminNote } = parsed.data;
  const quote = await prisma.quoteRequest.findUnique({ where: { id: quoteId } });
  if (!quote) return fail("Quote not found.");
  if (["APPROVED", "REJECTED"].includes(quote.status)) {
    return fail("This quote can no longer be priced.");
  }

  await prisma.quoteRequest.update({
    where: { id: quoteId },
    data: { estimatedPrice, adminNote: adminNote || null, status: quote.status === "PENDING" ? "QUOTED" : quote.status },
  });
  await logAudit({ userId: admin.id, action: "QUOTE_PRICED", entity: "QuoteRequest", entityId: quoteId, metadata: { estimatedPrice } });
  revalidatePath(`/dashboard/admin/quotes/${quoteId}`);
  return ok("Quote pricing saved.");
}

export async function rejectQuote(formData: FormData): Promise<ActionResult> {
  const admin = await assertRole("ADMIN");
  const quoteId = String(formData.get("quoteId") ?? "");
  const quote = await prisma.quoteRequest.findUnique({ where: { id: quoteId } });
  if (!quote) return fail("Quote not found.");
  if (!["PENDING", "QUOTED"].includes(quote.status)) {
    return fail("Only pending or quoted requests can be rejected.");
  }
  await prisma.quoteRequest.update({ where: { id: quoteId }, data: { status: "REJECTED" } });
  await logAudit({ userId: admin.id, action: "QUOTE_REJECTED", entity: "QuoteRequest", entityId: quoteId });
  revalidatePath(`/dashboard/admin/quotes/${quoteId}`);
  return ok("Quote rejected.");
}

// Approves a quote AND creates the shipment from it (steps 6→7 of the A–Z flow).
export async function approveQuoteAndCreateShipment(formData: FormData): Promise<ActionResult> {
  const admin = await assertRole("ADMIN");
  const quoteId = String(formData.get("quoteId") ?? "");
  const quote = await prisma.quoteRequest.findUnique({ where: { id: quoteId } });
  if (!quote) return fail("Quote not found.");
  if (!["PENDING", "QUOTED"].includes(quote.status)) {
    return fail("This quote has already been processed.");
  }

  // Unique shipment tracking code.
  let trackingCode = generateTrackingCode("RGS");
  for (let i = 0; i < 5; i++) {
    if (!(await prisma.shipment.findUnique({ where: { trackingCode } }))) break;
    trackingCode = generateTrackingCode("RGS");
  }

  const shipment = await prisma.$transaction(async (tx) => {
    await tx.quoteRequest.update({ where: { id: quoteId }, data: { status: "APPROVED" } });
    const s = await tx.shipment.create({
      data: {
        trackingCode,
        quoteRequestId: quote.id,
        customerId: quote.customerId,
        shipmentType: quote.shipmentType,
        pickupCountry: quote.pickupCountry, pickupState: quote.pickupState, pickupCity: quote.pickupCity, pickupAddress: quote.pickupAddress,
        destinationCountry: quote.destinationCountry, destinationState: quote.destinationState, destinationCity: quote.destinationCity, destinationAddress: quote.destinationAddress,
        packageDescription: quote.packageDescription,
        packageWeight: quote.packageWeight,
        deliveryFee: quote.estimatedPrice,
        status: "APPROVED",
        paymentStatus: "UNPAID",
      },
    });
    await tx.shipmentStatusLog.create({
      data: { shipmentId: s.id, status: "APPROVED", note: "Shipment created from approved quote", updatedById: admin.id },
    });
    return s;
  });

  await logAudit({ userId: admin.id, action: "QUOTE_APPROVED_SHIPMENT_CREATED", entity: "Shipment", entityId: shipment.id, metadata: { quoteId, trackingCode } });
  await notifyEvents.quoteApproved({ userId: quote.customerId, email: quote.email, trackingCode });
  revalidatePath(`/dashboard/admin/quotes/${quoteId}`);
  revalidatePath("/dashboard/admin/shipments");
  return ok("Quote approved and shipment created.", { trackingCode });
}

// ---------------------------------------------------------------------------
// Admin: assign rider, update status, payment
// ---------------------------------------------------------------------------

export async function assignRider(formData: FormData): Promise<ActionResult> {
  const admin = await assertRole("ADMIN");
  const shipmentId = String(formData.get("shipmentId") ?? "");
  const riderId = String(formData.get("riderId") ?? "");
  if (!riderId) return fail("Select a rider.");

  const [shipment, rider] = await Promise.all([
    prisma.shipment.findUnique({ where: { id: shipmentId } }),
    prisma.user.findFirst({ where: { id: riderId, role: "RIDER" } }),
  ]);
  if (!shipment) return fail("Shipment not found.");
  if (!rider) return fail("Rider not found.");
  if (!["APPROVED", "ASSIGNED"].includes(shipment.status)) {
    return fail("This shipment cannot be assigned at its current status.");
  }

  await prisma.$transaction([
    prisma.shipment.update({ where: { id: shipmentId }, data: { riderId, status: "ASSIGNED" } }),
    prisma.shipmentStatusLog.create({ data: { shipmentId, status: "ASSIGNED", note: `Assigned to ${rider.name}`, updatedById: admin.id } }),
  ]);
  await logAudit({ userId: admin.id, action: "RIDER_ASSIGNED", entity: "Shipment", entityId: shipmentId, metadata: { riderId } });
  await notifyEvents.riderAssigned({ userId: riderId, trackingCode: shipment.trackingCode });
  revalidatePath(`/dashboard/admin/shipments/${shipmentId}`);
  return ok(`Assigned to ${rider.name}.`);
}

// Shared status transition used by both admin and rider, with role-aware checks.
async function transitionStatus(opts: {
  actorId: string;
  shipmentId: string;
  to: ShipmentStatus;
  note?: string;
  restrictToRiderId?: string; // when set, only this rider may act
}): Promise<ActionResult> {
  const shipment = await prisma.shipment.findUnique({ where: { id: opts.shipmentId } });
  if (!shipment) return fail("Shipment not found.");
  if (opts.restrictToRiderId && shipment.riderId !== opts.restrictToRiderId) {
    return fail("This shipment is not assigned to you.");
  }
  if (!canTransition(shipment.status as ShipmentStatus, opts.to)) {
    return fail(`Cannot move from ${shipment.status} to ${opts.to}.`);
  }
  if (opts.to === "FAILED" && !opts.note?.trim()) {
    return fail("A reason is required when marking a shipment failed.");
  }

  await prisma.$transaction([
    prisma.shipment.update({
      where: { id: opts.shipmentId },
      data: {
        status: opts.to,
        ...(opts.to === "PICKED_UP" ? { pickupTime: new Date() } : {}),
        ...(opts.to === "DELIVERED" ? { deliveredAt: new Date() } : {}),
      },
    }),
    prisma.shipmentStatusLog.create({
      data: { shipmentId: opts.shipmentId, status: opts.to, note: opts.note || null, updatedById: opts.actorId },
    }),
  ]);
  await logAudit({ userId: opts.actorId, action: "SHIPMENT_STATUS_UPDATED", entity: "Shipment", entityId: opts.shipmentId, metadata: { to: opts.to } });

  // Notify the customer when their shipment is delivered.
  if (opts.to === "DELIVERED" && shipment.customerId) {
    const customer = await prisma.user.findUnique({ where: { id: shipment.customerId }, select: { email: true } });
    await notifyEvents.shipmentDelivered({ userId: shipment.customerId, email: customer?.email, trackingCode: shipment.trackingCode });
  }

  return ok(`Status updated to ${opts.to.replace(/_/g, " ")}.`);
}

export async function adminUpdateShipmentStatus(formData: FormData): Promise<ActionResult> {
  const admin = await assertRole("ADMIN");
  const parsed = statusUpdateSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return fail("Check the fields.");
  const res = await transitionStatus({
    actorId: admin.id,
    shipmentId: parsed.data.shipmentId,
    to: parsed.data.status as ShipmentStatus,
    note: parsed.data.note || undefined,
  });
  revalidatePath(`/dashboard/admin/shipments/${parsed.data.shipmentId}`);
  return res;
}

export async function updatePaymentStatus(formData: FormData): Promise<ActionResult> {
  const admin = await assertRole("ADMIN");
  const parsed = paymentStatusSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return fail("Check the fields.");
  const { shipmentId, paymentStatus, amount, method, transactionReference } = parsed.data;

  if (!PAYMENT_STATUSES.includes(paymentStatus as (typeof PAYMENT_STATUSES)[number])) {
    return fail("Invalid payment status.");
  }
  const shipment = await prisma.shipment.findUnique({ where: { id: shipmentId } });
  if (!shipment) return fail("Shipment not found.");

  const ops: Promise<unknown>[] = [
    prisma.shipment.update({ where: { id: shipmentId }, data: { paymentStatus } }),
  ];
  // Optionally record a Payment row when amount/method are provided.
  if (amount !== "" && method && PAYMENT_METHODS.includes(method as (typeof PAYMENT_METHODS)[number])) {
    ops.push(
      prisma.payment.create({
        data: {
          shipmentId,
          amount: Number(amount),
          method,
          status: paymentStatus,
          transactionReference: transactionReference || null,
          confirmedById: admin.id,
        },
      })
    );
  }
  await Promise.all(ops);
  await logAudit({ userId: admin.id, action: "PAYMENT_STATUS_UPDATED", entity: "Shipment", entityId: shipmentId, metadata: { paymentStatus } });
  revalidatePath(`/dashboard/admin/shipments/${shipmentId}`);
  revalidatePath("/dashboard/admin/payments");
  return ok("Payment status updated.");
}

// Initializes an online (Paystack) payment for a shipment. Sets the shipment to
// PENDING_CONFIRMATION and returns the Paystack checkout URL (or a clear message
// when Paystack is not configured).
export async function initializeOnlinePayment(formData: FormData): Promise<ActionResult> {
  const admin = await assertRole("ADMIN");
  const shipmentId = String(formData.get("shipmentId") ?? "");
  const shipment = await prisma.shipment.findUnique({
    where: { id: shipmentId },
    include: { customer: { select: { email: true } } },
  });
  if (!shipment) return fail("Shipment not found.");
  if (!shipment.deliveryFee || shipment.deliveryFee <= 0) {
    return fail("Set a delivery fee before initializing payment.");
  }

  const email = shipment.customer?.email ?? adminFallbackEmail();
  const reference = `${shipment.trackingCode}-${Date.now()}`;
  const res = await initializeTransaction({ email, amountNaira: shipment.deliveryFee, reference });

  if (!res.ok) {
    return fail(res.message);
  }

  await prisma.$transaction([
    prisma.shipment.update({ where: { id: shipmentId }, data: { paymentStatus: "PENDING_CONFIRMATION" } }),
    prisma.payment.create({
      data: {
        shipmentId, amount: shipment.deliveryFee, method: "PAYSTACK",
        status: "PENDING_CONFIRMATION", transactionReference: res.reference ?? reference, confirmedById: admin.id,
      },
    }),
  ]);
  await logAudit({ userId: admin.id, action: "PAYSTACK_INITIALIZED", entity: "Shipment", entityId: shipmentId, metadata: { reference: res.reference } });
  revalidatePath(`/dashboard/admin/shipments/${shipmentId}`);
  return ok("Payment initialized. Share the checkout link with the customer.", { trackingCode: res.authorizationUrl });
}

function adminFallbackEmail(): string {
  return process.env.ADMIN_EMAIL || "info@rugabdynamiclogistics.com";
}

// ---------------------------------------------------------------------------
// Rider: accept/reject assignment, update status, proof of delivery
// ---------------------------------------------------------------------------

export async function riderAcceptAssignment(formData: FormData): Promise<ActionResult> {
  const rider = await assertRole("RIDER");
  const res = await transitionStatus({
    actorId: rider.id,
    shipmentId: String(formData.get("shipmentId") ?? ""),
    to: "ACCEPTED",
    note: "Rider accepted the assignment",
    restrictToRiderId: rider.id,
  });
  revalidatePath("/dashboard/rider");
  revalidatePath(`/dashboard/rider/shipments/${formData.get("shipmentId")}`);
  return res;
}

export async function riderRejectAssignment(formData: FormData): Promise<ActionResult> {
  const rider = await assertRole("RIDER");
  const shipmentId = String(formData.get("shipmentId") ?? "");
  const shipment = await prisma.shipment.findUnique({ where: { id: shipmentId } });
  if (!shipment) return fail("Shipment not found.");
  if (shipment.riderId !== rider.id) return fail("This shipment is not assigned to you.");
  if (shipment.status !== "ASSIGNED") return fail("You can only reject a freshly assigned shipment.");

  // Unassign and revert to APPROVED so an admin can reassign.
  await prisma.$transaction([
    prisma.shipment.update({ where: { id: shipmentId }, data: { riderId: null, status: "APPROVED" } }),
    prisma.shipmentStatusLog.create({ data: { shipmentId, status: "APPROVED", note: "Assignment rejected by rider", updatedById: rider.id } }),
  ]);
  await logAudit({ userId: rider.id, action: "ASSIGNMENT_REJECTED", entity: "Shipment", entityId: shipmentId });
  revalidatePath("/dashboard/rider");
  return ok("Assignment rejected.");
}

export async function riderUpdateStatus(formData: FormData): Promise<ActionResult> {
  const rider = await assertRole("RIDER");
  const parsed = statusUpdateSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return fail("Check the fields.");
  const res = await transitionStatus({
    actorId: rider.id,
    shipmentId: parsed.data.shipmentId,
    to: parsed.data.status as ShipmentStatus,
    note: parsed.data.note || undefined,
    restrictToRiderId: rider.id,
  });
  revalidatePath(`/dashboard/rider/shipments/${parsed.data.shipmentId}`);
  revalidatePath("/dashboard/rider");
  return res;
}

export async function uploadProofOfDelivery(formData: FormData): Promise<ActionResult> {
  const rider = await assertRole("RIDER");
  const parsed = proofSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return fail("Check the fields.");
  const { shipmentId, receiverName, note, imageUrl } = parsed.data;

  const shipment = await prisma.shipment.findUnique({ where: { id: shipmentId } });
  if (!shipment) return fail("Shipment not found.");
  if (shipment.riderId !== rider.id) return fail("This shipment is not assigned to you.");

  await prisma.proofOfDelivery.upsert({
    where: { shipmentId },
    create: { shipmentId, riderId: rider.id, receiverName: receiverName || null, note: note || null, imageUrl: imageUrl || null },
    update: { receiverName: receiverName || null, note: note || null, imageUrl: imageUrl || null },
  });
  await logAudit({ userId: rider.id, action: "PROOF_OF_DELIVERY_UPLOADED", entity: "Shipment", entityId: shipmentId });
  revalidatePath(`/dashboard/rider/shipments/${shipmentId}`);
  return ok("Proof of delivery saved.");
}
