"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { updatePaymentStatus, initializeOnlinePayment } from "@/app/actions/shipment";
import { PAYMENT_STATUSES, PAYMENT_METHODS } from "@/lib/constants";
import type { ActionResult } from "@/lib/types";

export function PaymentForm({
  shipmentId,
  paymentStatus,
  deliveryFee,
}: {
  shipmentId: string;
  paymentStatus: string;
  deliveryFee: number | null;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<ActionResult | null>(null);
  // For Paystack, the action returns the checkout URL in result.trackingCode.
  const [payLink, setPayLink] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const res = await updatePaymentStatus(new FormData(e.currentTarget));
    setResult(res);
    setBusy(false);
    if (res.ok) router.refresh();
  }

  async function onPaystack() {
    setBusy(true);
    setPayLink(null);
    const fd = new FormData();
    fd.set("shipmentId", shipmentId);
    const res = await initializeOnlinePayment(fd);
    setResult({ ok: res.ok, message: res.message });
    if (res.ok && res.trackingCode) setPayLink(res.trackingCode);
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
        <label className="label-field">Payment status</label>
        <select name="paymentStatus" className="input-field" defaultValue={paymentStatus}>
          {PAYMENT_STATUSES.map((s) => (
            <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label-field">Amount (optional)</label>
          <input name="amount" type="number" step="any" min="0" defaultValue={deliveryFee ?? ""} className="input-field" />
        </div>
        <div>
          <label className="label-field">Method (optional)</label>
          <select name="method" className="input-field" defaultValue="">
            <option value="">—</option>
            {PAYMENT_METHODS.map((m) => (
              <option key={m} value={m}>{m.replace(/_/g, " ")}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="label-field">Transaction reference (optional)</label>
        <input name="transactionReference" className="input-field" />
      </div>
      <p className="text-xs text-gray-400">Recording an amount + method also logs a payment entry.</p>
      <div className="flex flex-wrap gap-2">
        <button type="submit" disabled={busy} className="btn-primary">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Update payment"}
        </button>
        <button type="button" onClick={onPaystack} disabled={busy} className="btn-outline">
          Initialize Paystack
        </button>
      </div>
      {payLink && (
        <a href={payLink} target="_blank" rel="noopener noreferrer" className="block break-all rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700 underline">
          Open Paystack checkout →
        </a>
      )}
    </form>
  );
}
