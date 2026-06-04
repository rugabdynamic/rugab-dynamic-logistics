"use client";

import { useState } from "react";
import {
  CheckCircle2,
  ClipboardList,
  Copy,
  Loader2,
  MapPin,
  PackageOpen,
  UserRound,
} from "lucide-react";
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
      <div className="card border-sky-100 p-8 text-center animate-fade-up">
        <CheckCircle2 className="mx-auto h-12 w-12 text-accent" />
        <h2 className="mt-4 text-xl font-bold text-navy-900">Quote request received!</h2>
        <p className="mt-2 text-gray-600">{result.message}</p>
        <div className="mx-auto mt-5 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-lg border border-sky-100 bg-sky-50 px-4 py-3">
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
    <form onSubmit={onSubmit} className="card space-y-7 border-sky-100 p-6 sm:p-8">
      <div>
        <p className="section-eyebrow">Quote request</p>
        <h2 className="mt-3 text-2xl font-extrabold text-navy-900">Tell us about your shipment</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Complete the details below and the RUGAB team will prepare a clear freight estimate.
        </p>
      </div>

      {result && !result.ok && !fe && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{result.message}</div>
      )}

      <section className="rounded-lg border border-navy-100 bg-surface/70 p-4">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-navy-800">
          <UserRound className="h-4 w-4 text-sky" /> Contact
        </h3>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="quote-full-name" className="label-field">Full name *</label>
            <input id="quote-full-name" name="fullName" className="input-field" placeholder="Jane Doe" autoComplete="name" />
            <FieldError errors={fe?.fullName} />
          </div>
          <div>
            <label htmlFor="quote-email" className="label-field">Email *</label>
            <input id="quote-email" name="email" type="email" className="input-field" placeholder="jane@company.com" autoComplete="email" />
            <FieldError errors={fe?.email} />
          </div>
          <div>
            <label htmlFor="quote-phone" className="label-field">Phone number *</label>
            <input id="quote-phone" name="phone" className="input-field" placeholder="08012345678" autoComplete="tel" />
            <FieldError errors={fe?.phone} />
          </div>
          <div>
            <label htmlFor="quote-company" className="label-field">Company name</label>
            <input id="quote-company" name="companyName" className="input-field" placeholder="Optional" autoComplete="organization" />
            <FieldError errors={fe?.companyName} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="quote-shipment-type" className="label-field">Shipment type *</label>
            <select id="quote-shipment-type" name="shipmentType" className="input-field" defaultValue="">
              <option value="" disabled>Select a shipment type</option>
              {SHIPMENT_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <FieldError errors={fe?.shipmentType} />
          </div>
        </div>
      </section>

      <fieldset className="rounded-lg border border-navy-100 bg-white p-4">
        <legend className="flex items-center gap-2 px-2 text-sm font-bold uppercase tracking-[0.14em] text-navy-800">
          <MapPin className="h-4 w-4 text-sky" /> Pickup
        </legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <input name="pickupCountry" className="input-field" placeholder="Country" aria-label="Pickup country" />
          <input name="pickupState" className="input-field" placeholder="State" aria-label="Pickup state" />
          <input name="pickupCity" className="input-field" placeholder="City" aria-label="Pickup city" />
          <div>
            <input name="pickupAddress" className="input-field" placeholder="Address *" aria-label="Pickup address" />
            <FieldError errors={fe?.pickupAddress} />
          </div>
        </div>
      </fieldset>

      <fieldset className="rounded-lg border border-navy-100 bg-white p-4">
        <legend className="flex items-center gap-2 px-2 text-sm font-bold uppercase tracking-[0.14em] text-navy-800">
          <MapPin className="h-4 w-4 text-accent" /> Destination
        </legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <input name="destinationCountry" className="input-field" placeholder="Country" aria-label="Destination country" />
          <input name="destinationState" className="input-field" placeholder="State" aria-label="Destination state" />
          <input name="destinationCity" className="input-field" placeholder="City" aria-label="Destination city" />
          <div>
            <input name="destinationAddress" className="input-field" placeholder="Address *" aria-label="Destination address" />
            <FieldError errors={fe?.destinationAddress} />
          </div>
        </div>
      </fieldset>

      <section className="rounded-lg border border-navy-100 bg-surface/70 p-4">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-navy-800">
          <PackageOpen className="h-4 w-4 text-sky" /> Package
        </h3>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="quote-package-description" className="label-field">Package description *</label>
            <textarea id="quote-package-description" name="packageDescription" rows={3} className="input-field" placeholder="What are you shipping?" />
            <FieldError errors={fe?.packageDescription} />
          </div>
          <div>
            <label htmlFor="quote-package-weight" className="label-field">Weight (kg)</label>
            <input id="quote-package-weight" name="packageWeight" type="number" step="any" min="0" className="input-field" placeholder="Optional" />
            <FieldError errors={fe?.packageWeight} />
          </div>
          <div>
            <label htmlFor="quote-package-dimensions" className="label-field">Dimensions</label>
            <input id="quote-package-dimensions" name="packageDimensions" className="input-field" placeholder="e.g. 40x30x20 cm" />
          </div>
          <div>
            <label htmlFor="quote-quantity" className="label-field">Quantity</label>
            <input id="quote-quantity" name="quantity" type="number" min="1" className="input-field" placeholder="Optional" />
            <FieldError errors={fe?.quantity} />
          </div>
          <div>
            <label htmlFor="quote-shipping-date" className="label-field">Preferred shipping date</label>
            <input id="quote-shipping-date" name="preferredShippingDate" type="date" className="input-field" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="quote-additional-notes" className="label-field">Additional notes</label>
            <textarea id="quote-additional-notes" name="additionalNotes" rows={2} className="input-field" placeholder="Anything else we should know?" />
          </div>
        </div>
      </section>

      <label className="flex items-start gap-3 text-sm text-gray-600">
        <input name="consent" type="checkbox" className="mt-0.5 h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent" />
        <span>I consent to Rugab Dynamic Logistics contacting me about this quote request.</span>
      </label>
      <FieldError errors={fe?.consent} />

      <button type="submit" disabled={pending} className="btn-accent w-full">
        {pending ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</> : <><ClipboardList className="h-4 w-4" /> Request Free Quote</>}
      </button>
    </form>
  );
}
