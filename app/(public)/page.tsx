import Link from "next/link";
import {
  Plane,
  Ship,
  Truck,
  FileCheck,
  Warehouse,
  Globe,
  ShieldCheck,
  Clock,
  BadgeDollarSign,
  ArrowRight,
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
  "Global shipping made simple, fast, and reliable",
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
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(22,163,74,0.25),transparent_55%)]" />
        <div className="container-page relative grid gap-10 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-accent">
              Global Logistics Solutions
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl">
              Reliable International Shipping &amp; Freight Forwarding Services Worldwide.
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
              <Link href="/services" className="btn-outline border-white/30 bg-white/5 text-white hover:bg-white/10">
                Explore Services
              </Link>
              <Link href="/track" className="btn-outline border-white/30 bg-white/5 text-white hover:bg-white/10">
                Track Shipment
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <ul className="w-full space-y-3">
              {TRUST.map((t) => (
                <li key={t} className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 backdrop-blur">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-accent" />
                  <span className="text-sm font-medium">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="container-page py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-navy-900">Our Logistics Services</h2>
          <p className="mt-3 text-gray-600">
            End-to-end freight solutions covering air, sea, and land — plus customs,
            warehousing, and consulting.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <div key={s.title} className="card group p-6 transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy-50 text-navy-700 group-hover:bg-accent group-hover:text-white">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-navy-900">{s.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/services" className="btn-primary">
            View All Services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-white py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-navy-900">Why Choose Us</h2>
            <p className="mt-3 text-gray-600">
              A trusted global logistics partner committed to excellence and customer satisfaction.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w) => (
              <div key={w.title} className="rounded-xl border border-gray-100 bg-gray-50 p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <w.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-semibold text-navy-900">{w.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-page py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-navy-900">How It Works</h2>
          <p className="mt-3 text-gray-600">From quote to delivery in four simple steps.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.n} className="relative rounded-xl border border-gray-200 bg-white p-6">
              <span className="text-3xl font-extrabold text-navy-100">{s.n}</span>
              <h3 className="mt-2 font-semibold text-navy-900">{s.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-20">
        <div className="grid gap-6 rounded-2xl bg-navy-800 p-10 text-white md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Ready to ship with confidence?</h2>
            <p className="mt-3 text-navy-100">
              Get a free, no-obligation freight quote today, or talk to our logistics experts.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link href="/quote" className="btn-accent">Get a Free Quote</Link>
            <Link href="/contact" className="btn-outline border-white/30 bg-white/5 text-white hover:bg-white/10">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
