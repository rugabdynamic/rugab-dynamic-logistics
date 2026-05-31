"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus } from "lucide-react";
import { createRider } from "@/app/actions/users";
import type { ActionResult } from "@/lib/types";

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return <p className="mt-1 text-xs text-red-600">{errors[0]}</p>;
}

export function CreateRiderForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<ActionResult | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const res = await createRider(new FormData(e.currentTarget));
    setResult(res);
    setBusy(false);
    if (res.ok) {
      e.currentTarget.reset();
      router.refresh();
      setTimeout(() => setOpen(false), 800);
    }
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="btn-accent">
        <Plus className="h-4 w-4" /> New Rider
      </button>
    );
  }

  const fe = result?.fieldErrors;

  return (
    <div className="card w-full max-w-lg p-6">
      <h2 className="mb-4 font-semibold text-navy-900">Create Rider / Operator</h2>
      {result && (
        <div className={`mb-3 rounded-lg px-3 py-2 text-sm ${result.ok ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
          {result.message}
        </div>
      )}
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="label-field">Name</label>
          <input name="name" className="input-field" />
          <FieldError errors={fe?.name} />
        </div>
        <div>
          <label className="label-field">Email</label>
          <input name="email" type="email" className="input-field" />
          <FieldError errors={fe?.email} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label-field">Phone</label>
            <input name="phone" className="input-field" />
          </div>
          <div>
            <label className="label-field">Password</label>
            <input name="password" type="password" className="input-field" />
            <FieldError errors={fe?.password} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label-field">Vehicle type</label>
            <input name="vehicleType" className="input-field" placeholder="Van, Truck…" />
          </div>
          <div>
            <label className="label-field">Plate number</label>
            <input name="vehiclePlateNumber" className="input-field" />
          </div>
        </div>
        <div className="flex gap-2 pt-1">
          <button type="submit" disabled={busy} className="btn-accent">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create rider"}
          </button>
          <button type="button" onClick={() => setOpen(false)} className="btn-outline">Cancel</button>
        </div>
      </form>
    </div>
  );
}
