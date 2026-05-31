import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-navy-900 px-4 text-center text-white">
      <p className="text-6xl font-extrabold text-accent">404</p>
      <h1 className="mt-4 text-2xl font-bold">Page not found</h1>
      <p className="mt-2 text-navy-200">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <Link href="/" className="btn-accent mt-6">Back to home</Link>
    </div>
  );
}
