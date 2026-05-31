import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/db";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate, formatDateTime, formatCurrency } from "@/lib/utils";
import { AdminQuoteActions } from "@/components/dashboard/AdminQuoteActions";

function Row({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div className="flex justify-between gap-4 py-2 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="text-right font-medium text-navy-900">{value || "—"}</span>
    </div>
  );
}

export default async function AdminQuoteDetail({ params }: { params: { id: string } }) {
  const quote = await prisma.quoteRequest.findUnique({
    where: { id: params.id },
    include: { shipment: { select: { id: true, trackingCode: true } } },
  });
  if (!quote) notFound();

  const locked = ["APPROVED", "REJECTED"].includes(quote.status);

  const loc = (city?: string | null, state?: string | null, country?: string | null, addr?: string | null) =>
    [addr, city, state, country].filter(Boolean).join(", ");

  return (
    <div className="space-y-6">
      <Link href="/dashboard/admin/quotes" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-accent">
        <ArrowLeft className="h-4 w-4" /> Back to quotes
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">{quote.fullName}</h1>
          <p className="font-mono text-sm text-gray-500">{quote.trackingCode}</p>
        </div>
        <StatusBadge status={quote.status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="mb-3 font-semibold text-navy-900">Contact</h2>
          <Row label="Full name" value={quote.fullName} />
          <Row label="Email" value={quote.email} />
          <Row label="Phone" value={quote.phone} />
          <Row label="Company" value={quote.companyName} />
          <Row label="Submitted" value={formatDateTime(quote.createdAt)} />
        </div>

        <div className="card p-6">
          <h2 className="mb-3 font-semibold text-navy-900">Shipment</h2>
          <Row label="Type" value={quote.shipmentType} />
          <Row label="Pickup" value={loc(quote.pickupCity, quote.pickupState, quote.pickupCountry, quote.pickupAddress)} />
          <Row label="Destination" value={loc(quote.destinationCity, quote.destinationState, quote.destinationCountry, quote.destinationAddress)} />
          <Row label="Weight" value={quote.packageWeight ? `${quote.packageWeight} kg` : null} />
          <Row label="Dimensions" value={quote.packageDimensions} />
          <Row label="Quantity" value={quote.quantity} />
          <Row label="Preferred date" value={quote.preferredShippingDate ? formatDate(quote.preferredShippingDate) : null} />
        </div>

        <div className="card p-6 lg:col-span-2">
          <h2 className="mb-3 font-semibold text-navy-900">Package & Notes</h2>
          <p className="text-sm text-gray-700">{quote.packageDescription}</p>
          {quote.additionalNotes && (
            <p className="mt-3 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">{quote.additionalNotes}</p>
          )}
        </div>

        <div className="card p-6 lg:col-span-2">
          <h2 className="mb-3 font-semibold text-navy-900">Admin Review</h2>
          {quote.shipment ? (
            <div className="rounded-lg bg-emerald-50 p-4 text-sm">
              <p className="font-medium text-emerald-800">A shipment was created from this quote.</p>
              <Link href={`/dashboard/admin/shipments/${quote.shipment.id}`} className="mt-1 inline-block font-mono text-emerald-700 hover:underline">
                {quote.shipment.trackingCode} →
              </Link>
            </div>
          ) : (
            <AdminQuoteActions
              quoteId={quote.id}
              estimatedPrice={quote.estimatedPrice}
              adminNote={quote.adminNote}
              locked={locked}
            />
          )}
        </div>
      </div>
    </div>
  );
}
