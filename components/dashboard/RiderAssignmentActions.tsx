"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Check, X } from "lucide-react";
import { riderAcceptAssignment, riderRejectAssignment } from "@/app/actions/shipment";
import type { ActionResult } from "@/lib/types";

export function RiderAssignmentActions({ shipmentId }: { shipmentId: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [result, setResult] = useState<ActionResult | null>(null);

  async function run(key: string, fn: (fd: FormData) => Promise<ActionResult>) {
    setBusy(key);
    const fd = new FormData();
    fd.set("shipmentId", shipmentId);
    const res = await fn(fd);
    setResult(res);
    setBusy(null);
    if (res.ok) router.refresh();
  }

  return (
    <div className="space-y-3">
      {result && !result.ok && (
        <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{result.message}</div>
      )}
      <div className="flex gap-2">
        <button onClick={() => run("accept", riderAcceptAssignment)} disabled={busy !== null} className="btn-accent">
          {busy === "accept" ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Check className="h-4 w-4" /> Accept</>}
        </button>
        <button
          onClick={() => { if (confirm("Reject this assignment?")) run("reject", riderRejectAssignment); }}
          disabled={busy !== null}
          className="btn-outline border-red-200 text-red-600 hover:bg-red-50"
        >
          {busy === "reject" ? <Loader2 className="h-4 w-4 animate-spin" /> : <><X className="h-4 w-4" /> Reject</>}
        </button>
      </div>
    </div>
  );
}
