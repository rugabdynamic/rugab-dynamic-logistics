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
import { Hero } from "@/components/public/Hero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";

const SERVICES = [
  { icon: Plane, title: "Air Freight", desc: "Fast air freight for urgent and time-sensitive deliveries worldwide." },
  { icon: Ship, title: "Sea Freight", desc: "Cost-effective sea freight for bulk and commercial shipments." },
  { icon: Truck, title: "Land Transport", desc: "Reliable regional haulage and door-to-door road logistics." },
  { icon: FileCheck, title: "Customs Clearance", desc: "Expert clearing, forwarding, and duty processing to avoid delays." },
  { icon: Warehouse, title: "Warehousing", desc: "Secure storage, packing, and removal services for your cargo." },
  { icon: Globe, title: "Freight Consulting", desc: "Strategic logistics advisory to optimise your global supply chain." },
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

const STATS = [
  { to: 50, suffix: "+", label: "Destination countries" },
  { to: 10000, suffix: "+", label: "Shipments delivered" },
  { to: 99, suffix: "%", label: "On-time clearance" },
  { to: 24, suffix: "/7", label: "Support & tracking" },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Stats strip */}
      <section className="border-y border-slate-200/70 bg-surface">
        <div className="container-page grid grid-cols-2 gap-6 py-12 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center">
              <div className="font-display text-4xl font-extrabold sm:text-5xl">
                <CountUp
                  to={s.to}
                  suffix={s.suffix}
                  className="bg-gradient-to-r from-brand-red to-brand-orange bg-clip-text text-transparent"
                />
              </div>
              <p className="mt-2 text-sm font-medium text-muted">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services preview */}
      <Section>
        <SectionHeading
          eyebrow="Our services"
          title="Our Logistics Services"
          subtitle="End-to-end freight solutions covering air, sea, and land — plus customs, warehousing, and consulting."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.08}>
              <Card interactive className="group h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy/5 text-navy transition-colors group-hover:bg-gradient-to-br group-hover:from-brand-red group-hover:to-brand-orange group-hover:text-white">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.desc}</p>
              </Card>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/services">
            <Button variant="secondary">
              View All Services <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Section>

      {/* Why choose us */}
      <Section className="bg-surface">
        <SectionHeading
          eyebrow="Why us"
          title="Why Choose Us"
          subtitle="A trusted global logistics partner committed to excellence and customer satisfaction."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={(i % 4) * 0.08}>
              <div className="h-full rounded-2xl border border-slate-200/70 bg-canvas p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-brand">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-teal/10 text-brand-teal">
                  <w.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-semibold text-navy">{w.title}</h3>
                <p className="mt-2 text-sm text-muted">{w.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* How it works */}
      <Section>
        <SectionHeading
          eyebrow="Process"
          title="How It Works"
          subtitle="From quote to delivery in four simple steps."
        />
        <div className="relative mt-12">
          {/* Teal connecting route line (desktop) */}
          <div className="pointer-events-none absolute left-0 right-0 top-9 hidden md:block" aria-hidden>
            <svg className="h-2 w-full" preserveAspectRatio="none" viewBox="0 0 1000 8" fill="none">
              <line
                x1="40" y1="4" x2="960" y2="4"
                stroke="#1C9BD8"
                strokeWidth="2"
                strokeDasharray="6 8"
                className="animate-route-dash"
              />
            </svg>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <div className="relative rounded-2xl border border-slate-200/70 bg-surface p-6 shadow-brand">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-navy to-navy-deep font-display text-lg font-bold text-white shadow-brand">
                    {s.n}
                  </span>
                  <h3 className="mt-4 font-semibold text-navy">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section spacing="sm" className="pb-20">
        <div className="relative grid gap-6 overflow-hidden rounded-3xl bg-gradient-to-br from-navy to-navy-deep p-10 text-white shadow-brand md:grid-cols-2 md:items-center">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-teal/15 blur-3xl" />
          <div className="relative">
            <h2 className="text-2xl font-bold sm:text-3xl">Ready to ship with confidence?</h2>
            <p className="mt-3 text-navy-100">
              Get a free, no-obligation freight quote today, or talk to our logistics experts.
            </p>
          </div>
          <div className="relative flex flex-wrap gap-3 md:justify-end">
            <Link href="/quote">
              <Button>Get a Free Quote</Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
