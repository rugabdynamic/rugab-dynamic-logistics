"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Copy } from "lucide-react";
import { submitQuote } from "@/app/actions/quote";
import type { ActionResult } from "@/lib/types";
import { SHIPMENT_TYPES } from "@/lib/constants";

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return <p className="mt-1 text-xs text-red-600">{errors[0]}</p>;
}

export function QuoteForm() {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<ActionResult | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    const fd = new FormData(e.currentTarget);
    const res = await submitQuote(fd);
    setResult(res);
    setPending(false);
    if (res.ok) e.currentTarget.reset();
  }

  if (result?.ok) {
    return (
      <div className="card p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-accent" />
        <h2 className="mt-4 text-xl font-bold text-navy-900">Quote request received!</h2>
        <p className="mt-2 text-gray-600">{result.message}</p>
        <div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-lg bg-navy-50 px-4 py-3">
          <span className="text-sm text-gray-600">Your tracking code:</span>
          <span className="font-mono font-bold text-navy-900">{result.trackingCode}</span>
          <button
            type="button"
            onClick={() => navigator.clipboard?.writeText(result.trackingCode ?? "")}
            className="text-navy-500 hover:text-accent"
            aria-label="Copy tracking code"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Save this code to track your shipment. Our team will review your request and respond soon.
        </p>
        <button onClick={() => setResult(null)} className="btn-outline mt-6">
          Submit another request
        </button>
      </div>
    );
  }

  const fe = result?.fieldErrors;

  return (
    <form onSubmit={onSubmit} className="card space-y-6 p-6 sm:p-8">
      {result && !result.ok && !fe && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{result.message}</div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label-field">Full name *</label>
          <input name="fullName" className="input-field" placeholder="Jane Doe" />
          <FieldError errors={fe?.fullName} />
        </div>
        <div>
          <label className="label-field">Email *</label>
          <input name="email" type="email" className="input-field" placeholder="jane@company.com" />
          <FieldError errors={fe?.email} />
        </div>
        <div>
          <label className="label-field">Phone number *</label>
          <input name="phone" className="input-field" placeholder="08012345678" />
          <FieldError errors={fe?.phone} />
        </div>
        <div>
          <label className="label-field">Company name</label>
          <input name="companyName" className="input-field" placeholder="Optional" />
          <FieldError errors={fe?.companyName} />
        </div>
        <div className="sm:col-span-2">
          <label className="label-field">Shipment type *</label>
          <select name="shipmentType" className="input-field" defaultValue="">
            <option value="" disabled>Select a shipment type</option>
            {SHIPMENT_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <FieldError errors={fe?.shipmentType} />
        </div>
      </div>

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-2 text-sm font-semibold text-navy-900">Pickup</legend>
        <input name="pickupCountry" className="input-field" placeholder="Country" />
        <input name="pickupState" className="input-field" placeholder="State" />
        <input name="pickupCity" className="input-field" placeholder="City" />
        <div>
          <input name="pickupAddress" className="input-field" placeholder="Address *" />
          <FieldError errors={fe?.pickupAddress} />
        </div>
      </fieldset>

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-2 text-sm font-semibold text-navy-900">Destination</legend>
        <input name="destinationCountry" className="input-field" placeholder="Country" />
        <input name="destinationState" className="input-field" placeholder="State" />
        <input name="destinationCity" className="input-field" placeholder="City" />
        <div>
          <input name="destinationAddress" className="input-field" placeholder="Address *" />
          <FieldError errors={fe?.destinationAddress} />
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="label-field">Package description *</label>
          <textarea name="packageDescription" rows={3} className="input-field" placeholder="What are you shipping?" />
          <FieldError errors={fe?.packageDescription} />
        </div>
        <div>
          <label className="label-field">Weight (kg)</label>
          <input name="packageWeight" type="number" step="any" min="0" className="input-field" placeholder="Optional" />
          <FieldError errors={fe?.packageWeight} />
        </div>
        <div>
          <label className="label-field">Dimensions</label>
          <input name="packageDimensions" className="input-field" placeholder="e.g. 40x30x20 cm" />
        </div>
        <div>
          <label className="label-field">Quantity</label>
          <input name="quantity" type="number" min="1" className="input-field" placeholder="Optional" />
          <FieldError errors={fe?.quantity} />
        </div>
        <div>
          <label className="label-field">Preferred shipping date</label>
          <input name="preferredShippingDate" type="date" className="input-field" />
        </div>
        <div className="sm:col-span-2">
          <label className="label-field">Additional notes</label>
          <textarea name="additionalNotes" rows={2} className="input-field" placeholder="Anything else we should know?" />
        </div>
      </div>

      <label className="flex items-start gap-3 text-sm text-gray-600">
        <input name="consent" type="checkbox" className="mt-0.5 h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent" />
        <span>I consent to Rugab Dynamic Logistics contacting me about this quote request.</span>
      </label>
      <FieldError errors={fe?.consent} />

      <button type="submit" disabled={pending} className="btn-accent w-full">
        {pending ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</> : "Request Free Quote"}
      </button>
    </form>
  );
}
