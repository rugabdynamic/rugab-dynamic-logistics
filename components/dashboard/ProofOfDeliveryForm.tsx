"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { uploadProofOfDelivery } from "@/app/actions/shipment";
import type { ActionResult } from "@/lib/types";

// Phase 2 captures receiver/note and an optional image URL. File-storage upload
// (Cloudinary/UploadThing) plugs in here in Phase 3 by populating the imageUrl.
export function ProofOfDeliveryForm({
  shipmentId,
  existing,
}: {
  shipmentId: string;
  existing?: { receiverName: string | null; note: string | null; imageUrl: string | null };
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<ActionResult | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const res = await uploadProofOfDelivery(new FormData(e.currentTarget));
    setResult(res);
    setBusy(false);
    if (res.ok) router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input type="hidden" name="shipmentId" value={shipmentId} />
      {result && (
        <div className={`rounded-lg px-3 py-2 text-sm ${result.ok ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
          {result.message}
        </div>
      )}
      <div>
        <label className="label-field">Received by</label>
        <input name="receiverName" defaultValue={existing?.receiverName ?? ""} className="input-field" placeholder="Name of receiver" />
      </div>
      <div>
        <label className="label-field">Image URL (optional)</label>
        <input name="imageUrl" defaultValue={existing?.imageUrl ?? ""} className="input-field" placeholder="https://…" />
      </div>
      <div>
        <label className="label-field">Note</label>
        <textarea name="note" rows={2} defaultValue={existing?.note ?? ""} className="input-field" placeholder="Delivery note" />
      </div>
      <button type="submit" disabled={busy} className="btn-accent">
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : existing ? "Update proof" : "Submit proof of delivery"}
      </button>
    </form>
  );
}
