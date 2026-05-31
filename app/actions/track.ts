"use server";

import { headers } from "next/headers";
import { prisma } from "@/lib/db";
import { trackSchema } from "@/lib/validations";
import { rateLimit } from "@/lib/rate-limit";

// Public-safe shape. Deliberately excludes customer/rider identities, addresses
// at street level, phone numbers, fees, and internal notes.
export interface PublicTrackingResult {
  trackingCode: string;
  shipmentType: string;
  status: string;
  paymentStatus?: string;
  pickup: string;
  destination: string;
  timeline: { status: string; note: string | null; at: string }[];
  createdAt: string;
}

export interface TrackResponse {
  ok: boolean;
  message?: string;
  result?: PublicTrackingResult;
}

function locality(city?: string | null, state?: string | null, country?: string | null) {
  return [city, state, country].filter(Boolean).join(", ") || "—";
}

export async function trackShipment(formData: FormData): Promise<TrackResponse> {
  const h = headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";

  const limited = rateLimit({ key: `track:${ip}`, limit: 20, windowMs: 60_000 });
  if (!limited.ok) {
    return { ok: false, message: "Too many lookups. Please try again shortly." };
  }

  const parsed = trackSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { ok: false, message: "Please enter a valid tracking code." };
  }

  const code = parsed.data.trackingCode.trim().toUpperCase();

  // Prefer a shipment (richer timeline); fall back to the originating quote.
  const shipment = await prisma.shipment.findUnique({
    where: { trackingCode: code },
    include: { statusLogs: { orderBy: { createdAt: "asc" } } },
  });

  if (shipment) {
    return {
      ok: true,
      result: {
        trackingCode: shipment.trackingCode,
        shipmentType: shipment.shipmentType,
        status: shipment.status,
        paymentStatus: shipment.paymentStatus,
        pickup: locality(shipment.pickupCity, shipment.pickupState, shipment.pickupCountry),
        destination: locality(
          shipment.destinationCity,
          shipment.destinationState,
          shipment.destinationCountry
        ),
        timeline: shipment.statusLogs.map((l) => ({
          status: l.status,
          note: l.note,
          at: l.createdAt.toISOString(),
        })),
        createdAt: shipment.createdAt.toISOString(),
      },
    };
  }

  const quote = await prisma.quoteRequest.findUnique({ where: { trackingCode: code } });
  if (quote) {
    return {
      ok: true,
      result: {
        trackingCode: quote.trackingCode,
        shipmentType: quote.shipmentType,
        status: quote.status,
        pickup: locality(quote.pickupCity, quote.pickupState, quote.pickupCountry),
        destination: locality(
          quote.destinationCity,
          quote.destinationState,
          quote.destinationCountry
        ),
        timeline: [
          { status: quote.status, note: "Quote request received", at: quote.createdAt.toISOString() },
        ],
        createdAt: quote.createdAt.toISOString(),
      },
    };
  }

  return {
    ok: false,
    message: "We couldn't find a shipment with that tracking code. Please check and try again.",
  };
}
