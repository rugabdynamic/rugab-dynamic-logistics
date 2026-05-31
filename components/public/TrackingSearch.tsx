"use client";

import { useState } from "react";
import { Search, Loader2, PackageX } from "lucide-react";
import { trackShipment, type TrackResponse } from "@/app/actions/track";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ShipmentTimeline } from "./ShipmentTimeline";
import { formatDate } from "@/lib/utils";

export function TrackingSearch() {
  const [pending, setPending] = useState(false);
  const [res, setRes] = useState<TrackResponse | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    const fd = new FormData(e.currentTarget);
    setRes(await trackShipment(fd));
    setPending(false);
  }

  return (
    <div className="space-y-8">
      <form onSubmit={onSubmit} className="card flex flex-col gap-3 p-4 sm:flex-row">
        <input
          name="trackingCode"
          className="input-field flex-1 uppercase"
          placeholder="Enter tracking code (e.g. RGB-7F3K9Q2A)"
          autoComplete="off"
        />
        <button type="submit" disabled={pending} className="btn-accent sm:w-40">
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Search className="h-4 w-4" /> Track</>}
        </button>
      </form>

      {res && !res.ok && (
        <div className="card flex flex-col items-center p-10 text-center">
          <PackageX className="h-10 w-10 text-gray-300" />
          <p className="mt-3 text-sm text-gray-600">{res.message}</p>
        </div>
      )}

      {res?.ok && res.result && (
        <div className="card p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-5">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400">Tracking code</p>
              <p className="font-mono text-lg font-bold text-navy-900">{res.result.trackingCode}</p>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status={res.result.status} />
              {res.result.paymentStatus && (
                <StatusBadge status={res.result.paymentStatus} kind="payment" />
              )}
            </div>
          </div>

          <div className="grid gap-4 py-5 sm:grid-cols-3">
            <Detail label="Shipment type" value={res.result.shipmentType} />
            <Detail label="From" value={res.result.pickup} />
            <Detail label="To" value={res.result.destination} />
          </div>

          <div className="border-t border-gray-100 pt-5">
            <h3 className="mb-4 text-sm font-semibold text-navy-900">Status history</h3>
            <ShipmentTimeline timeline={res.result.timeline} />
          </div>

          <p className="mt-6 text-xs text-gray-400">
            Created {formatDate(res.result.createdAt)}
          </p>
        </div>
      )}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-gray-400">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-navy-900">{value}</p>
    </div>
  );
}
