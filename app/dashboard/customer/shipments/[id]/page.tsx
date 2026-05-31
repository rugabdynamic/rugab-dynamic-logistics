import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/db";
import { requireRole } from "@/lib/permissions";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ShipmentTimeline } from "@/components/public/ShipmentTimeline";
import { formatCurrency } from "@/lib/utils";

function Row({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div className="flex justify-between gap-4 py-2 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="text-right font-medium text-navy-900">{value || "—"}</span>
    </div>
  );
}

export default async function CustomerShipmentDetail({ params }: { params: { id: string } }) {
  const user = await requireRole("CUSTOMER");
  const shipment = await prisma.shipment.findUnique({
    where: { id: params.id },
    include: { statusLogs: { orderBy: { createdAt: "asc" } } },
  });

  // Customers may only view their own shipments.
  if (!shipment || shipment.customerId !== user.id) notFound();

  const loc = (c?: string | null, s?: string | null, co?: string | null) =>
    [c, s, co].filter(Boolean).join(", ");

  return (
    <div className="space-y-6">
      <Link href="/dashboard/customer/shipments" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-accent">
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-mono text-2xl font-bold text-navy-900">{shipment.trackingCode}</h1>
          <p className="text-sm text-gray-500">{shipment.shipmentType}</p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={shipment.paymentStatus} kind="payment" />
          <StatusBadge status={shipment.status} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="mb-3 font-semibold text-navy-900">Details</h2>
          <Row label="From" value={loc(shipment.pickupCity, shipment.pickupState, shipment.pickupCountry)} />
          <Row label="To" value={loc(shipment.destinationCity, shipment.destinationState, shipment.destinationCountry)} />
          <Row label="Delivery fee" value={shipment.deliveryFee != null ? formatCurrency(shipment.deliveryFee) : null} />
          <Row label="Package" value={shipment.packageDescription} />
        </div>

        <div className="card p-6">
          <h2 className="mb-4 font-semibold text-navy-900">Timeline</h2>
          <ShipmentTimeline timeline={shipment.statusLogs.map((l) => ({ status: l.status, note: l.note, at: l.createdAt.toISOString() }))} />
        </div>
      </div>
    </div>
  );
}
