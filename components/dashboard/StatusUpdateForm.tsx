"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import type { ActionResult } from "@/lib/types";

// Generic status-change form. The allowed next statuses are computed server-side
// from the state machine and passed in, so the UI can never offer an illegal move
// (and the server re-validates regardless).
export function StatusUpdateForm({
  shipmentId,
  nextStatuses,
  action,
}: {
  shipmentId: string;
  nextStatuses: string[];
  action: (fd: FormData) => Promise<ActionResult>;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<ActionResult | null>(null);

  if (nextStatuses.length === 0) {
    return <p className="text-sm text-gray-500">No further status changes are available.</p>;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const res = await action(new FormData(e.currentTarget));
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
        <label className="label-field">New status</label>
        <select name="status" className="input-field" defaultValue={nextStatuses[0]}>
          {nextStatuses.map((s) => (
            <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="label-field">Note (required when marking failed)</label>
        <textarea name="note" rows={2} className="input-field" placeholder="Optional note" />
      </div>
      <button type="submit" disabled={busy} className="btn-primary">
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Update status"}
      </button>
    </form>
  );
}
