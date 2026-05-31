"use server";

import { headers } from "next/headers";
import { prisma } from "@/lib/db";
import { quoteSchema } from "@/lib/validations";
import { generateTrackingCode } from "@/lib/utils";
import { rateLimit } from "@/lib/rate-limit";
import { logAudit } from "@/lib/audit";
import { getCurrentUser } from "@/lib/permissions";
import { notifyEvents } from "@/lib/notify";
import type { ActionResult } from "@/lib/types";

function clientIp(h: Headers): string {
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown"
  );
}

// Public + customer quote submission. Validates on the server, rate-limits by
// IP, generates a unique tracking code, persists, and audit-logs.
export async function submitQuote(formData: FormData): Promise<ActionResult> {
  const h = headers();
  const ip = clientIp(h);

  const limited = rateLimit({ key: `quote:${ip}`, limit: 5, windowMs: 60_000 });
  if (!limited.ok) {
    return { ok: false, message: "Too many requests. Please try again shortly." };
  }

  const raw = Object.fromEntries(formData.entries());
  // Checkbox arrives as "on"/undefined — normalize to boolean for Zod.
  const parsed = quoteSchema.safeParse({ ...raw, consent: raw.consent === "on" || raw.consent === "true" });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please correct the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const d = parsed.data;
  const num = (v: unknown) => (v === "" || v == null ? null : Number(v));

  // Attach to the customer's account when a logged-in customer submits.
  const currentUser = await getCurrentUser();
  const customerId = currentUser?.role === "CUSTOMER" ? currentUser.id : null;

  try {
    // Ensure a unique tracking code (retry on the rare collision).
    let trackingCode = generateTrackingCode();
    for (let i = 0; i < 5; i++) {
      const existing = await prisma.quoteRequest.findUnique({ where: { trackingCode } });
      if (!existing) break;
      trackingCode = generateTrackingCode();
    }

    const quote = await prisma.quoteRequest.create({
      data: {
        trackingCode,
        customerId,
        fullName: d.fullName,
        email: d.email,
        phone: d.phone,
        companyName: d.companyName || null,
        shipmentType: d.shipmentType,
        pickupCountry: d.pickupCountry || null,
        pickupState: d.pickupState || null,
        pickupCity: d.pickupCity || null,
        pickupAddress: d.pickupAddress,
        destinationCountry: d.destinationCountry || null,
        destinationState: d.destinationState || null,
        destinationCity: d.destinationCity || null,
        destinationAddress: d.destinationAddress,
        packageDescription: d.packageDescription,
        packageWeight: num(d.packageWeight),
        packageDimensions: d.packageDimensions || null,
        quantity: num(d.quantity),
        preferredShippingDate: d.preferredShippingDate
          ? new Date(d.preferredShippingDate)
          : null,
        additionalNotes: d.additionalNotes || null,
        status: "PENDING",
      },
    });

    await logAudit({
      action: "QUOTE_CREATED",
      entity: "QuoteRequest",
      entityId: quote.id,
      metadata: { trackingCode, shipmentType: d.shipmentType },
      ipAddress: ip,
      userAgent: h.get("user-agent"),
    });

    await notifyEvents.quoteCreated(trackingCode, d.fullName);

    return {
      ok: true,
      message: "Your quote request has been received.",
      trackingCode,
    };
  } catch (err) {
    console.error("submitQuote error:", err);
    return { ok: false, message: "Something went wrong. Please try again." };
  }
}
