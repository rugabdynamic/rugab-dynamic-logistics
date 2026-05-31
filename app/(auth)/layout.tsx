import Link from "next/link";
import { Package } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-navy-900 px-4 py-12">
      <Link href="/" className="mb-8 flex items-center gap-2 text-white">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
          <Package className="h-6 w-6" />
        </span>
        <span className="text-lg font-bold">
          Rugab Dynamic Logistics
        </span>
      </Link>
      <div className="w-full max-w-md">{children}</div>
      <Link href="/" className="mt-6 text-sm text-navy-200 hover:text-accent">
        ← Back to website
      </Link>
    </div>
  );
}
