import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/db";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ShipmentTimeline } from "@/components/public/ShipmentTimeline";
import { AssignRiderForm } from "@/components/dashboard/AssignRiderForm";
import { StatusUpdateForm } from "@/components/dashboard/StatusUpdateForm";
import { PaymentForm } from "@/components/dashboard/PaymentForm";
import { adminUpdateShipmentStatus } from "@/app/actions/shipment";
import { SHIPMENT_TRANSITIONS, type ShipmentStatus } from "@/lib/constants";
import { formatDateTime, formatCurrency } from "@/lib/utils";

function Row({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div className="flex justify-between gap-4 py-2 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="text-right font-medium text-navy-900">{value || "—"}</span>
    </div>
  );
}

export default async function AdminShipmentDetail({ params }: { params: { id: string } }) {
  const shipment = await prisma.shipment.findUnique({
    where: { id: params.id },
    include: {
      rider: { select: { name: true } },
      customer: { select: { name: true, email: true } },
      statusLogs: { orderBy: { createdAt: "asc" } },
      proofOfDelivery: true,
      payments: { orderBy: { createdAt: "desc" } },
    },
  });
  if (!shipment) notFound();

  const riders = await prisma.user.findMany({
    where: { role: "RIDER", status: "ACTIVE" },
    select: { id: true, name: true, riderProfile: { select: { availabilityStatus: true } } },
    orderBy: { name: "asc" },
  });

  const nextStatuses = SHIPMENT_TRANSITIONS[shipment.status as ShipmentStatus] ?? [];
  const loc = (c?: string | null, s?: string | null, co?: string | null, a?: string | null) =>
    [a, c, s, co].filter(Boolean).join(", ");

  return (
    <div className="space-y-6">
      <Link href="/dashboard/admin/shipments" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-accent">
        <ArrowLeft className="h-4 w-4" /> Back to shipments
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-mono text-2xl font-bold text-navy-900">{shipment.trackingCode}</h1>
          <p className="text-sm text-gray-500">{shipment.shipmentType}</p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={shipment.status} />
          <StatusBadge status={shipment.paymentStatus} kind="payment" />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="mb-3 font-semibold text-navy-900">Details</h2>
          <Row label="Customer" value={shipment.customer?.name} />
          <Row label="Rider" value={shipment.rider?.name} />
          <Row label="Pickup" value={loc(shipment.pickupCity, shipment.pickupState, shipment.pickupCountry, shipment.pickupAddress)} />
          <Row label="Destination" value={loc(shipment.destinationCity, shipment.destinationState, shipment.destinationCountry, shipment.destinationAddress)} />
          <Row label="Receiver" value={shipment.receiverName} />
          <Row label="Receiver phone" value={shipment.receiverPhone} />
          <Row label="Weight" value={shipment.packageWeight ? `${shipment.packageWeight} kg` : null} />
          <Row label="Delivery fee" value={shipment.deliveryFee != null ? formatCurrency(shipment.deliveryFee) : null} />
          <Row label="Package" value={shipment.packageDescription} />
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="mb-3 font-semibold text-navy-900">Assign Rider</h2>
            <AssignRiderForm
              shipmentId={shipment.id}
              currentRiderId={shipment.riderId}
              riders={riders.map((r) => ({ id: r.id, name: r.name, availability: r.riderProfile?.availabilityStatus ?? "—" }))}
            />
          </div>

          <div className="card p-6">
            <h2 className="mb-3 font-semibold text-navy-900">Update Status</h2>
            <StatusUpdateForm shipmentId={shipment.id} nextStatuses={nextStatuses} action={adminUpdateShipmentStatus} />
          </div>
        </div>

        <div className="card p-6">
          <h2 className="mb-3 font-semibold text-navy-900">Payment</h2>
          <PaymentForm shipmentId={shipment.id} paymentStatus={shipment.paymentStatus} deliveryFee={shipment.deliveryFee} />
          {shipment.payments.length > 0 && (
            <div className="mt-4 border-t border-gray-100 pt-3 text-sm">
              <p className="mb-2 font-medium text-navy-800">Payment history</p>
              {shipment.payments.map((p) => (
                <div key={p.id} className="flex justify-between py-1 text-gray-600">
                  <span>{formatCurrency(p.amount)} · {p.method}</span>
                  <StatusBadge status={p.status} kind="payment" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card p-6">
          <h2 className="mb-4 font-semibold text-navy-900">Timeline</h2>
          <ShipmentTimeline timeline={shipment.statusLogs.map((l) => ({ status: l.status, note: l.note, at: l.createdAt.toISOString() }))} />
          {shipment.proofOfDelivery && (
            <div className="mt-5 rounded-lg bg-emerald-50 p-4 text-sm">
              <p className="font-medium text-emerald-800">Proof of delivery</p>
              <p className="text-emerald-700">Received by: {shipment.proofOfDelivery.receiverName ?? "—"}</p>
              {shipment.proofOfDelivery.note && <p className="text-emerald-700">{shipment.proofOfDelivery.note}</p>}
              {shipment.proofOfDelivery.imageUrl && (
                <a href={shipment.proofOfDelivery.imageUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block underline">
                  View image
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <p className="text-xs text-gray-400">Created {formatDateTime(shipment.createdAt)}</p>
    </div>
  );
}
