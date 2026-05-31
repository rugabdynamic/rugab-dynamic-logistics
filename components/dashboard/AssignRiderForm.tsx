"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { assignRider } from "@/app/actions/shipment";
import type { ActionResult } from "@/lib/types";

export function AssignRiderForm({
  shipmentId,
  riders,
  currentRiderId,
}: {
  shipmentId: string;
  riders: { id: string; name: string; availability: string }[];
  currentRiderId: string | null;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<ActionResult | null>(null);

  if (riders.length === 0) {
    return <p className="text-sm text-gray-500">No riders available. Create one in the Riders section.</p>;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const res = await assignRider(new FormData(e.currentTarget));
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
      <select name="riderId" className="input-field" defaultValue={currentRiderId ?? ""}>
        <option value="" disabled>Select a rider</option>
        {riders.map((r) => (
          <option key={r.id} value={r.id}>{r.name} · {r.availability}</option>
        ))}
      </select>
      <button type="submit" disabled={busy} className="btn-accent">
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : currentRiderId ? "Reassign rider" : "Assign rider"}
      </button>
    </form>
  );
}
