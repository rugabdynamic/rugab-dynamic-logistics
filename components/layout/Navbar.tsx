"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Package } from "lucide-react";
import { cn } from "@/lib/utils";

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

  return (
    <header className="sticky top-0 z-40 border-b border-navy-100 bg-white/95 backdrop-blur">
      <nav className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-navy-800">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-700 text-white">
            <Package className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            Rugab Dynamic
            <span className="block text-[10px] font-medium uppercase tracking-wider text-accent">
              Logistics
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-navy-700 hover:text-accent"
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
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <div className={cn("border-t border-navy-100 md:hidden", open ? "block" : "hidden")}>
        <div className="container-page flex flex-col gap-1 py-3">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-navy-700 hover:bg-navy-50"
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
