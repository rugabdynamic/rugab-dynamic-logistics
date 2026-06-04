"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Plane } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-navy/10 bg-surface/80 shadow-brand backdrop-blur-md"
          : "border-b border-transparent bg-surface/95",
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display font-bold text-navy">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-navy-deep text-white shadow-brand">
            <Plane className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            Rugab Dynamic
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-brand-teal">
              Logistics
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative text-sm font-medium transition-colors",
                  active ? "text-navy" : "text-muted hover:text-navy",
                )}
              >
                {l.label}
                <span
                  className={cn(
                    "absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-gradient-to-r from-brand-red to-brand-orange transition-all duration-300",
                    active ? "w-full" : "w-0 group-hover:w-full",
                  )}
                />
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login">
            <Button variant="ghost" size="sm">Sign in</Button>
          </Link>
          <Link href="/quote">
            <Button size="sm">Get a Quote</Button>
          </Link>
        </div>

        <button
          className="rounded-lg p-1 text-navy md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={cn(
          "overflow-hidden border-navy/10 bg-surface/95 backdrop-blur-md transition-[max-height,opacity] duration-300 md:hidden",
          open ? "max-h-96 border-t opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="container-page flex flex-col gap-1 py-3">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive(l.href)
                  ? "bg-canvas text-navy"
                  : "text-muted hover:bg-canvas hover:text-navy",
              )}
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-2 flex gap-2">
            <Link href="/login" onClick={() => setOpen(false)} className="flex-1">
              <Button variant="ghost" size="sm" className="w-full">Sign in</Button>
            </Link>
            <Link href="/quote" onClick={() => setOpen(false)} className="flex-1">
              <Button size="sm" className="w-full">Get a Quote</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
