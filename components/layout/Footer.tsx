import Link from "next/link";
import { Plane, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "info@rugabdynamiclogistics.com";

  return (
    <footer className="mt-20 bg-navy-deep text-navy-100">
      {/* Thin brand accent border */}
      <div className="h-1 w-full bg-gradient-to-r from-brand-red via-brand-orange to-brand-teal" />
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-display font-bold text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-red to-brand-orange">
              <Plane className="h-5 w-5" />
            </span>
            Rugab Dynamic Logistics
          </div>
          <p className="mt-4 text-sm text-navy-200">
            Global shipping made simple, fast, and reliable. International shipping,
            freight forwarding, and customs clearance worldwide.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Company
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-brand-teal">About</Link></li>
            <li><Link href="/services" className="hover:text-brand-teal">Services</Link></li>
            <li><Link href="/customs" className="hover:text-brand-teal">Customs Service</Link></li>
            <li><Link href="/portfolio/rukayat" className="hover:text-brand-teal">Portfolio</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Get Started
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/quote" className="hover:text-brand-teal">Get a Quote</Link></li>
            <li><Link href="/track" className="hover:text-brand-teal">Track Shipment</Link></li>
            <li><Link href="/contact" className="hover:text-brand-teal">Contact</Link></li>
            <li><Link href="/login" className="hover:text-brand-teal">Sign in</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Contact
          </h4>
          <ul className="space-y-3 text-sm text-navy-200">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
              <span>07033403577<br />09059067154<br />08021210156</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
              <span>No 2 Asa-Afriogun Street, Ajao Estate, Oshodi, Lagos</span>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
              <a href={`mailto:${adminEmail}`} className="hover:text-brand-teal">{adminEmail}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-navy-300 sm:flex-row">
          <p>© {new Date().getFullYear()} Rugab Dynamic Logistics Company. All rights reserved.</p>
          <p>
            Copy &amp; messaging by{" "}
            <Link href="/portfolio/rukayat" className="text-accent hover:underline">
              Oyewale Rukayat
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
