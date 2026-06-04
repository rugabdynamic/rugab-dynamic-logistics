import Link from "next/link";
import { BrandMark } from "@/components/layout/BrandMark";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-navy-900 px-4 text-center text-white">
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-sky/20 blur-3xl" />
      <div className="absolute -bottom-28 right-0 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
      <div className="relative mb-8">
        <BrandMark inverted />
      </div>
      <p className="relative text-6xl font-extrabold text-accent">404</p>
      <h1 className="relative mt-4 text-2xl font-bold">Page not found</h1>
      <p className="relative mt-2 text-navy-200">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <Link href="/" className="btn-accent mt-6">Back to home</Link>
    </div>
  );
}
