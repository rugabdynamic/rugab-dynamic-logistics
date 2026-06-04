"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { submitContact } from "@/app/actions/contact";
import type { ActionResult } from "@/lib/types";

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return <p className="mt-1 text-xs text-red-600">{errors[0]}</p>;
}

export function ContactForm() {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<ActionResult | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    const fd = new FormData(e.currentTarget);
    const res = await submitContact(fd);
    setResult(res);
    setPending(false);
    if (res.ok) e.currentTarget.reset();
  }

  if (result?.ok) {
    return (
      <div className="card p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-brand-teal" />
        <h2 className="mt-4 text-xl font-bold text-navy">Message sent!</h2>
        <p className="mt-2 text-gray-600">{result.message}</p>
        <button onClick={() => setResult(null)} className="btn-outline mt-6">
          Send another message
        </button>
      </div>
    );
  }

  const fe = result?.fieldErrors;

  return (
    <form onSubmit={onSubmit} className="card space-y-5 p-6 sm:p-8">
      {result && !result.ok && !fe && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{result.message}</div>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label-field">Name *</label>
          <input name="name" className="input-field" placeholder="Your name" />
          <FieldError errors={fe?.name} />
        </div>
        <div>
          <label className="label-field">Email *</label>
          <input name="email" type="email" className="input-field" placeholder="you@example.com" />
          <FieldError errors={fe?.email} />
        </div>
        <div>
          <label className="label-field">Phone</label>
          <input name="phone" className="input-field" placeholder="Optional" />
        </div>
        <div>
          <label className="label-field">Subject *</label>
          <input name="subject" className="input-field" placeholder="How can we help?" />
          <FieldError errors={fe?.subject} />
        </div>
      </div>
      <div>
        <label className="label-field">Message *</label>
        <textarea name="message" rows={5} className="input-field" placeholder="Tell us more…" />
        <FieldError errors={fe?.message} />
      </div>
      <button type="submit" disabled={pending} className="btn-accent w-full">
        {pending ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : "Send Message"}
      </button>
    </form>
  );
}
