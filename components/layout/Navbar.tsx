"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { BrandMark } from "./BrandMark";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/customs", label: "Customs" },
  { href: "/track", label: "Track" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-navy-100/80 bg-white/90 shadow-sm backdrop-blur-xl">
      <nav className="container-page flex h-20 items-center justify-between">
        <Link href="/" className="font-bold" aria-label="RUGAB Dynamic Logistics home">
          <BrandMark compact />
        </Link>

        <div className="hidden items-center rounded-full border border-navy-100 bg-white px-2 py-1 shadow-sm md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-semibold text-navy-700 transition hover:bg-sky-50 hover:text-sky-700",
                pathname === l.href && "bg-navy-800 text-white hover:bg-navy-800 hover:text-white"
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login" className="btn-outline">
            Sign in
          </Link>
          <Link href="/quote" className="btn-accent">
            Get a Quote
          </Link>
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-navy-100 text-navy-800 transition hover:bg-sky-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <div className={cn("border-t border-navy-100 bg-white/95 md:hidden", open ? "block animate-slide-in" : "hidden")}>
        <div className="container-page flex flex-col gap-1 py-4">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-md px-3 py-2.5 text-sm font-semibold text-navy-700 transition hover:bg-sky-50 hover:text-sky-700",
                pathname === l.href && "bg-navy-800 text-white hover:bg-navy-800 hover:text-white"
              )}
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-2 flex gap-2">
            <Link href="/login" onClick={() => setOpen(false)} className="btn-outline flex-1">
              Sign in
            </Link>
            <Link href="/quote" onClick={() => setOpen(false)} className="btn-accent flex-1">
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
