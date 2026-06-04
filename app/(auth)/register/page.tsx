"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, Loader2, UserPlus } from "lucide-react";
import { registerCustomer } from "@/app/actions/auth";
import type { ActionResult } from "@/lib/types";

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return <p className="mt-1 text-xs text-red-600">{errors[0]}</p>;
}

export default function RegisterPage() {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<ActionResult | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setResult(await registerCustomer(new FormData(e.currentTarget)));
    setPending(false);
  }

  if (result?.ok) {
    return (
      <div className="card border-sky-100 p-8 text-center animate-fade-up">
        <CheckCircle2 className="mx-auto h-12 w-12 text-accent" />
        <h1 className="mt-4 text-xl font-bold text-navy-900">Account created</h1>
        <p className="mt-2 text-sm text-gray-600">{result.message}</p>
        <Link href="/login" className="btn-accent mt-6 w-full">Sign in</Link>
      </div>
    );
  }

  const fe = result?.fieldErrors;

  return (
    <div className="card border-sky-100 p-8 animate-fade-up">
      <p className="section-eyebrow">Customer portal</p>
      <h1 className="mt-3 text-2xl font-extrabold text-navy-900">Create your account</h1>
      <p className="mt-1 text-sm text-gray-600">Track quotes and shipments in one place.</p>

      {result && !result.ok && !fe && (
        <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{result.message}</div>
      )}

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="register-name" className="label-field">Full name</label>
          <input id="register-name" name="name" className="input-field" placeholder="Jane Doe" autoComplete="name" />
          <FieldError errors={fe?.name} />
        </div>
        <div>
          <label htmlFor="register-email" className="label-field">Email</label>
          <input id="register-email" name="email" type="email" className="input-field" placeholder="you@example.com" autoComplete="email" />
          <FieldError errors={fe?.email} />
        </div>
        <div>
          <label htmlFor="register-phone" className="label-field">Phone</label>
          <input id="register-phone" name="phone" className="input-field" placeholder="Optional" autoComplete="tel" />
          <FieldError errors={fe?.phone} />
        </div>
        <div>
          <label htmlFor="register-password" className="label-field">Password</label>
          <input id="register-password" name="password" type="password" className="input-field" placeholder="At least 8 characters" autoComplete="new-password" />
          <FieldError errors={fe?.password} />
        </div>
        <div>
          <label htmlFor="register-confirm-password" className="label-field">Confirm password</label>
          <input id="register-confirm-password" name="confirmPassword" type="password" className="input-field" placeholder="Re-enter password" autoComplete="new-password" />
          <FieldError errors={fe?.confirmPassword} />
        </div>
        <button type="submit" disabled={pending} className="btn-accent w-full">
          {pending ? <><Loader2 className="h-4 w-4 animate-spin" /> Creating...</> : <><UserPlus className="h-4 w-4" /> Create account</>}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-accent hover:underline">Sign in</Link>
      </p>
    </div>
  );
}
