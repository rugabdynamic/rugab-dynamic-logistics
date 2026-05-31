import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/db";
import { requireRole } from "@/lib/permissions";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ShipmentTimeline } from "@/components/public/ShipmentTimeline";
import { StatusUpdateForm } from "@/components/dashboard/StatusUpdateForm";
import { RiderAssignmentActions } from "@/components/dashboard/RiderAssignmentActions";
import { ProofOfDeliveryForm } from "@/components/dashboard/ProofOfDeliveryForm";
import { riderUpdateStatus } from "@/app/actions/shipment";
import { SHIPMENT_TRANSITIONS, type ShipmentStatus } from "@/lib/constants";

function Row({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div className="flex justify-between gap-4 py-2 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="text-right font-medium text-navy-900">{value || "—"}</span>
    </div>
  );
}

export default async function RiderShipmentDetail({ params }: { params: { id: string } }) {
  const user = await requireRole("RIDER");
  const shipment = await prisma.shipment.findUnique({
    where: { id: params.id },
    include: { statusLogs: { orderBy: { createdAt: "asc" } }, proofOfDelivery: true },
  });

  // Riders may only view shipments assigned to them.
  if (!shipment || shipment.riderId !== user.id) notFound();

  const status = shipment.status as ShipmentStatus;
  const loc = (c?: string | null, s?: string | null, co?: string | null, a?: string | null) =>
    [a, c, s, co].filter(Boolean).join(", ");
  // Riders don't perform the admin-only CANCELLED transition.
  const nextStatuses = (SHIPMENT_TRANSITIONS[status] ?? []).filter((s) => s !== "CANCELLED");
  const canProof = ["PICKED_UP", "IN_TRANSIT", "DELIVERED"].includes(status);

  return (
    <div className="space-y-6">
      <Link href="/dashboard/rider/shipments" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-accent">
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-mono text-2xl font-bold text-navy-900">{shipment.trackingCode}</h1>
          <p className="text-sm text-gray-500">{shipment.shipmentType}</p>
        </div>
        <StatusBadge status={shipment.status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="mb-3 font-semibold text-navy-900">Delivery Details</h2>
          <Row label="Pickup" value={loc(shipment.pickupCity, shipment.pickupState, shipment.pickupCountry, shipment.pickupAddress)} />
          <Row label="Destination" value={loc(shipment.destinationCity, shipment.destinationState, shipment.destinationCountry, shipment.destinationAddress)} />
          <Row label="Receiver" value={shipment.receiverName} />
          <Row label="Receiver phone" value={shipment.receiverPhone} />
          <Row label="Weight" value={shipment.packageWeight ? `${shipment.packageWeight} kg` : null} />
          <Row label="Package" value={shipment.packageDescription} />
        </div>

        <div className="space-y-6">
          {status === "ASSIGNED" && (
            <div className="card p-6">
              <h2 className="mb-3 font-semibold text-navy-900">Respond to Assignment</h2>
              <RiderAssignmentActions shipmentId={shipment.id} />
            </div>
          )}

          {["ACCEPTED", "PICKED_UP", "IN_TRANSIT"].includes(status) && (
            <div className="card p-6">
              <h2 className="mb-3 font-semibold text-navy-900">Update Status</h2>
              <StatusUpdateForm shipmentId={shipment.id} nextStatuses={nextStatuses} action={riderUpdateStatus} />
            </div>
          )}

          {canProof && (
            <div className="card p-6">
              <h2 className="mb-3 font-semibold text-navy-900">Proof of Delivery</h2>
              <ProofOfDeliveryForm
                shipmentId={shipment.id}
                existing={shipment.proofOfDelivery ? {
                  receiverName: shipment.proofOfDelivery.receiverName,
                  note: shipment.proofOfDelivery.note,
                  imageUrl: shipment.proofOfDelivery.imageUrl,
                } : undefined}
              />
            </div>
          )}
        </div>

        <div className="card p-6 lg:col-span-2">
          <h2 className="mb-4 font-semibold text-navy-900">Timeline</h2>
          <ShipmentTimeline timeline={shipment.statusLogs.map((l) => ({ status: l.status, note: l.note, at: l.createdAt.toISOString() }))} />
        </div>
      </div>
    </div>
  );
}
