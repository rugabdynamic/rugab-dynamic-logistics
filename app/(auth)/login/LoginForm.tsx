"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, LogIn } from "lucide-react";
import { authenticate } from "@/app/actions/auth";

export function LoginForm() {
  const params = useSearchParams();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(
    params.get("error") === "unauthorized" ? "You don't have access to that page." : null
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const res = await authenticate(new FormData(e.currentTarget));
    // On success the action redirects; only failures return here.
    if (res && !res.ok) {
      setError(res.message);
      setPending(false);
    }
  }

  return (
    <div className="card border-sky-100 p-8 animate-fade-up">
      <p className="section-eyebrow">Dashboard access</p>
      <h1 className="mt-3 text-2xl font-extrabold text-navy-900">Welcome back</h1>
      <p className="mt-1 text-sm text-gray-600">Sign in to manage quotes, shipments, payments, and updates.</p>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="login-email" className="label-field">Email</label>
          <input id="login-email" name="email" type="email" required className="input-field" placeholder="you@example.com" autoComplete="email" />
        </div>
        <div>
          <label htmlFor="login-password" className="label-field">Password</label>
          <input id="login-password" name="password" type="password" required className="input-field" placeholder="Password" autoComplete="current-password" />
        </div>
        <button type="submit" disabled={pending} className="btn-accent w-full">
          {pending ? <><Loader2 className="h-4 w-4 animate-spin" /> Signing in...</> : <><LogIn className="h-4 w-4" /> Sign in</>}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-accent hover:underline">
          Create one
        </Link>
      </p>
    </div>
  );
}
