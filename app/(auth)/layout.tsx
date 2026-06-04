import Link from "next/link";
import { Plane } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-navy to-navy-deep px-4 py-12">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-teal/15 blur-3xl" />
      <Link href="/" className="relative mb-8 flex items-center gap-2 font-display text-white">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-red to-brand-orange shadow-brand">
          <Plane className="h-6 w-6" />
        </span>
        <span className="text-lg font-bold">
          Rugab Dynamic Logistics
        </span>
      </Link>
      <div className="relative w-full max-w-md">{children}</div>
      <Link href="/" className="relative mt-6 text-sm text-navy-200 hover:text-brand-teal">
        ← Back to website
      </Link>
    </div>
  );
}
