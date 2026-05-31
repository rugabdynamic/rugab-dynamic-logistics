"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { setQuotePricing, rejectQuote, approveQuoteAndCreateShipment } from "@/app/actions/shipment";
import type { ActionResult } from "@/lib/types";

export function AdminQuoteActions({
  quoteId,
  estimatedPrice,
  adminNote,
  locked,
}: {
  quoteId: string;
  estimatedPrice: number | null;
  adminNote: string | null;
  locked: boolean; // already approved/rejected
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [result, setResult] = useState<ActionResult | null>(null);

  async function run(key: string, fn: (fd: FormData) => Promise<ActionResult>, fd: FormData) {
    setBusy(key);
    const res = await fn(fd);
    setResult(res);
    setBusy(null);
    if (res.ok) router.refresh();
  }

  if (locked) {
    return (
      <p className="rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
        This quote has been processed and is locked from further pricing.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {result && (
        <div className={`rounded-lg px-4 py-3 text-sm ${result.ok ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
          {result.message}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          run("price", setQuotePricing, new FormData(e.currentTarget));
        }}
        className="space-y-3"
      >
        <input type="hidden" name="quoteId" value={quoteId} />
        <div>
          <label className="label-field">Estimated price (₦)</label>
          <input name="estimatedPrice" type="number" step="any" min="0" defaultValue={estimatedPrice ?? ""} className="input-field" />
        </div>
        <div>
          <label className="label-field">Internal note</label>
          <textarea name="adminNote" rows={2} defaultValue={adminNote ?? ""} className="input-field" placeholder="Visible to admins only" />
        </div>
        <button type="submit" disabled={busy !== null} className="btn-primary">
          {busy === "price" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save pricing"}
        </button>
      </form>

      <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-4">
        <button
          disabled={busy !== null}
          onClick={() => {
            const fd = new FormData();
            fd.set("quoteId", quoteId);
            run("approve", approveQuoteAndCreateShipment, fd);
          }}
          className="btn-accent"
        >
          {busy === "approve" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Approve & create shipment"}
        </button>
        <button
          disabled={busy !== null}
          onClick={() => {
            if (!confirm("Reject this quote? This cannot be undone.")) return;
            const fd = new FormData();
            fd.set("quoteId", quoteId);
            run("reject", rejectQuote, fd);
          }}
          className="btn-outline border-red-200 text-red-600 hover:bg-red-50"
        >
          {busy === "reject" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Reject quote"}
        </button>
      </div>
    </div>
  );
}
