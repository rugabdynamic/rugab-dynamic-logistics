import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BadgeDollarSign,
  CheckCircle2,
  Clock,
  FileCheck,
  Globe,
  MapPin,
  Plane,
  Route,
  ShieldCheck,
  Ship,
  Truck,
  Warehouse,
} from "lucide-react";

const SERVICES = [
  { icon: Plane, title: "Air Freight", desc: "Fast air freight for urgent and time-sensitive deliveries worldwide." },
  { icon: Ship, title: "Sea Freight", desc: "Cost-effective sea freight for bulk and commercial shipments." },
  { icon: Truck, title: "Land Transport", desc: "Reliable regional haulage and door-to-door road logistics." },
  { icon: FileCheck, title: "Customs Clearance", desc: "Expert clearing, forwarding, and duty processing to avoid delays." },
  { icon: Warehouse, title: "Warehousing", desc: "Secure storage, packing, and removal services for your cargo." },
  { icon: Globe, title: "Freight Consulting", desc: "Strategic logistics advisory to optimise your global supply chain." },
];

const TRUST = [
  "Worldwide shipping service",
  "Affordable freight rates",
  "Expert customs clearing and forwarding",
  "Trusted global logistics partner",
];

const WHY = [
  { icon: Globe, title: "Worldwide Reach", desc: "Door-to-door delivery across international and local destinations." },
  { icon: BadgeDollarSign, title: "Affordable Rates", desc: "Competitive, transparent freight pricing with no hidden costs." },
  { icon: ShieldCheck, title: "Secure & Compliant", desc: "Full regulatory compliance and careful handling of every shipment." },
  { icon: Clock, title: "Fast & Reliable", desc: "Timely pickups and deliveries you and your customers can count on." },
];

const STEPS = [
  { n: "01", title: "Request a Quote", desc: "Tell us what you're shipping and where it needs to go." },
  { n: "02", title: "We Plan & Price", desc: "Our experts review your request and send a clear estimate." },
  { n: "03", title: "We Ship & Clear", desc: "We handle freight, documentation, and customs end-to-end." },
  { n: "04", title: "Track to Delivery", desc: "Follow your shipment with a tracking code until it arrives." },
];

export default function HomePage() {
  return (
    <>
      <section className="page-hero">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,174,239,0.2),transparent_35%),radial-gradient(circle_at_85%_15%,rgba(240,90,40,0.28),transparent_28%)]" />
        <div className="absolute left-0 top-16 h-px w-full bg-gradient-to-r from-transparent via-sky/30 to-transparent" />
        <div className="container-page relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="animate-fade-up py-8 lg:py-12">
            <span className="section-eyebrow bg-white/10 text-sky-100">
              Global logistics solutions
            </span>
            <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Fast, secure freight forwarding for shipments worldwide.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-navy-100">
              At Rugab Dynamic Logistics Company, we provide global logistics solutions,
              including international shipping, freight forwarding, and customs clearance
              services. Whether you&apos;re a business or individual, we ensure fast, secure,
              and cost-effective delivery worldwide.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/quote" className="btn-accent">
                Get a Free Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/services" className="btn-outline border-white/30 bg-white/10 text-white hover:border-white/60 hover:bg-white/15">
                Explore Services
              </Link>
              <Link href="/track" className="btn-outline border-white/30 bg-white/10 text-white hover:border-white/60 hover:bg-white/15">
                Track Shipment
              </Link>
            </div>
            <div className="mt-9 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
              {WHY.map((w) => (
                <div key={w.title} className="rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur">
                  <w.icon className="h-5 w-5 text-sky" />
                  <p className="mt-2 text-xs font-semibold text-white">{w.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-up lg:py-12 [animation-delay:120ms]">
            <div className="brand-panel p-5 sm:p-7">
              <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-sky/20 blur-3xl" />
              <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />
              <div className="relative rounded-lg border border-white/10 bg-white/10 p-5 backdrop-blur">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-100">Shipment route</p>
                    <h2 className="mt-1 text-xl font-extrabold">Lagos to global destinations</h2>
                  </div>
                  <Route className="h-8 w-8 text-accent" />
                </div>

                <div className="relative my-8 h-28">
                  <div className="absolute left-4 right-4 top-1/2 h-1 -translate-y-1/2 rounded-full bg-white/15" />
                  <div className="absolute left-4 right-24 top-1/2 h-1 -translate-y-1/2 rounded-full bg-gradient-to-r from-sky to-accent" />
                  <RoutePoint className="left-2 top-1/2 -translate-y-1/2" label="Pickup" icon={<MapPin className="h-4 w-4" />} />
                  <RoutePoint className="left-[42%] top-1/2 -translate-y-1/2" label="Clearance" icon={<FileCheck className="h-4 w-4" />} />
                  <RoutePoint className="right-2 top-1/2 -translate-y-1/2" label="Delivery" icon={<ShieldCheck className="h-4 w-4" />} />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <StatusCard title="Customs" desc="Documentation handled" />
                  <StatusCard title="Tracking" desc="Updates to delivery" />
                </div>
              </div>

              <ul className="relative mt-4 grid gap-3 sm:grid-cols-2">
                {TRUST.map((t) => (
                  <li key={t} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                    <span className="text-sm font-semibold text-navy-50">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">What we move</span>
          <h2 className="section-title mt-4">Our Logistics Services</h2>
          <p className="section-copy">
            End-to-end freight solutions covering air, sea, and land - plus customs,
            warehousing, and consulting.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <div key={s.title} className="card hover-lift group p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-50 text-sky-700 transition group-hover:bg-accent group-hover:text-white">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-navy-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/services" className="btn-primary">
            View All Services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-eyebrow">Trust indicators</span>
            <h2 className="section-title mt-4">Why Choose Us</h2>
            <p className="section-copy">
              A trusted global logistics partner committed to excellence and customer satisfaction.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w) => (
              <div key={w.title} className="rounded-lg border border-navy-100 bg-surface p-6 text-center transition hover:-translate-y-1 hover:border-sky-200 hover:bg-white hover:shadow-soft">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <w.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-semibold text-navy-900">{w.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Simple process</span>
          <h2 className="section-title mt-4">How It Works</h2>
          <p className="section-copy">From quote to delivery in four simple steps.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.n} className="card hover-lift relative p-6">
              <span className="text-4xl font-extrabold text-sky-100">{s.n}</span>
              <h3 className="mt-2 font-semibold text-navy-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-20">
        <div className="brand-panel grid gap-6 p-8 sm:p-10 md:grid-cols-2 md:items-center">
          <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-sky/20 blur-3xl" />
          <div className="relative">
            <p className="section-eyebrow bg-white/10 text-sky-100">Ready to move cargo?</p>
            <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl">Ship with confidence today.</h2>
            <p className="mt-3 text-navy-100">
              Get a free, no-obligation freight quote today, or talk to our logistics experts.
            </p>
          </div>
          <div className="relative flex flex-wrap gap-3 md:justify-end">
            <Link href="/quote" className="btn-accent">Get a Free Quote</Link>
            <Link href="/contact" className="btn-outline border-white/30 bg-white/10 text-white hover:border-white/60 hover:bg-white/15">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function RoutePoint({
  className,
  icon,
  label,
}: {
  className: string;
  icon: ReactNode;
  label: string;
}) {
  return (
    <div className={`absolute flex -translate-x-1/2 flex-col items-center gap-2 ${className}`}>
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white text-navy-800 shadow-glow">
        {icon}
      </span>
      <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
        {label}
      </span>
    </div>
  );
}

function StatusCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/10 p-3">
      <p className="text-sm font-bold text-white">{title}</p>
      <p className="mt-1 text-xs text-navy-100">{desc}</p>
    </div>
  );
}
