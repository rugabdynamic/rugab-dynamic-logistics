"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
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
      <div className="card border-sky-100 p-8 text-center animate-fade-up">
        <CheckCircle2 className="mx-auto h-12 w-12 text-accent" />
        <h2 className="mt-4 text-xl font-bold text-navy-900">Message sent!</h2>
        <p className="mt-2 text-gray-600">{result.message}</p>
        <button onClick={() => setResult(null)} className="btn-outline mt-6">
          Send another message
        </button>
      </div>
    );
  }

  const fe = result?.fieldErrors;

  return (
    <form onSubmit={onSubmit} className="card space-y-5 border-sky-100 p-6 sm:p-8">
      <div>
        <p className="section-eyebrow">Contact desk</p>
        <h2 className="mt-3 text-2xl font-extrabold text-navy-900">Send us a message</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Share the route, cargo type, timeline, or question you have. Our team will follow up with clear next steps.
        </p>
      </div>

      {result && !result.ok && !fe && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{result.message}</div>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="label-field">Name *</label>
          <input id="contact-name" name="name" className="input-field" placeholder="Your name" autoComplete="name" />
          <FieldError errors={fe?.name} />
        </div>
        <div>
          <label htmlFor="contact-email" className="label-field">Email *</label>
          <input id="contact-email" name="email" type="email" className="input-field" placeholder="you@example.com" autoComplete="email" />
          <FieldError errors={fe?.email} />
        </div>
        <div>
          <label htmlFor="contact-phone" className="label-field">Phone</label>
          <input id="contact-phone" name="phone" className="input-field" placeholder="Optional" autoComplete="tel" />
        </div>
        <div>
          <label htmlFor="contact-subject" className="label-field">Subject *</label>
          <input id="contact-subject" name="subject" className="input-field" placeholder="How can we help?" />
          <FieldError errors={fe?.subject} />
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className="label-field">Message *</label>
        <textarea id="contact-message" name="message" rows={5} className="input-field" placeholder="Tell us more..." />
        <FieldError errors={fe?.message} />
      </div>
      <button type="submit" disabled={pending} className="btn-accent w-full">
        {pending ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</> : <><Send className="h-4 w-4" /> Send Message</>}
      </button>
    </form>
  );
}
