import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BrandMark } from "@/components/layout/BrandMark";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-navy-900 px-4 py-12">
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-sky/20 blur-3xl" />
      <div className="absolute -bottom-28 right-0 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
      <Link href="/" className="relative mb-8 text-white" aria-label="Back to RUGAB Dynamic Logistics home">
        <BrandMark inverted />
      </Link>
      <div className="relative w-full max-w-md">{children}</div>
      <Link href="/" className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy-100 transition hover:text-sky">
        <ArrowLeft className="h-4 w-4" /> Back to website
      </Link>
    </div>
  );
}
