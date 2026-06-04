import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { BrandMark } from "./BrandMark";

export function Footer() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "info@rugabdynamiclogistics.com";

  return (
    <footer className="mt-20 overflow-hidden bg-navy-900 text-navy-100">
      <div className="container-page py-10">
        <div className="brand-panel grid gap-6 p-6 sm:p-8 md:grid-cols-[1fr_auto] md:items-center">
          <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-sky/20 blur-3xl" />
          <div className="relative">
            <p className="section-eyebrow bg-white/10 text-sky-100">Move with confidence</p>
            <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">Need a dependable logistics partner?</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-navy-100">
              Request a quote for freight forwarding, customs clearance, warehousing, and door-to-door delivery.
            </p>
          </div>
          <Link href="/quote" className="btn-accent relative md:justify-self-end">
            Get a Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="container-page grid gap-10 pb-14 pt-4 md:grid-cols-[1.3fr_0.7fr_0.7fr_1.2fr]">
        <div>
          <BrandMark inverted />
          <p className="mt-5 max-w-sm text-sm leading-6 text-navy-200">
            Global shipping made simple, fast, and reliable. International shipping,
            freight forwarding, and customs clearance worldwide.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-sky-100">
            <span className="rounded-full bg-white/10 px-3 py-1">Air</span>
            <span className="rounded-full bg-white/10 px-3 py-1">Sea</span>
            <span className="rounded-full bg-white/10 px-3 py-1">Road</span>
            <span className="rounded-full bg-white/10 px-3 py-1">Customs</span>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Company
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="transition hover:text-sky">About</Link></li>
            <li><Link href="/services" className="transition hover:text-sky">Services</Link></li>
            <li><Link href="/customs" className="transition hover:text-sky">Customs Service</Link></li>
            <li><Link href="/portfolio/rukayat" className="transition hover:text-sky">Portfolio</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Get Started
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/quote" className="transition hover:text-sky">Get a Quote</Link></li>
            <li><Link href="/track" className="transition hover:text-sky">Track Shipment</Link></li>
            <li><Link href="/contact" className="transition hover:text-sky">Contact</Link></li>
            <li><Link href="/login" className="transition hover:text-sky">Sign in</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Contact
          </h4>
          <ul className="space-y-3 text-sm text-navy-200">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>07033403577<br />09059067154<br />08021210156</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>No 2 Asa-Afriogun Street, Ajao Estate, Oshodi, Lagos</span>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href={`mailto:${adminEmail}`} className="break-all transition hover:text-sky">{adminEmail}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-navy-800">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-navy-300 sm:flex-row">
          <p>© {new Date().getFullYear()} RUGAB Dynamic Logistics Company Ltd. All rights reserved.</p>
          <p>
            Copy &amp; messaging by{" "}
            <Link href="/portfolio/rukayat" className="text-sky hover:underline">
              Oyewale Rukayat
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
