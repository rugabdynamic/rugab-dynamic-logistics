import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Eye, Target, Truck } from "lucide-react";
import { PageHero } from "@/components/public/PageHero";

export const metadata: Metadata = {
  title: "About | Global Freight & Shipping Experts",
};

const SPECIALIZATIONS = [
  "Clearing and forwarding",
  "Warehousing",
  "Transportation and haulage",
  "Freight consulting",
  "Packing and removal",
  "Customs clearance service",
  "Air and sea shipping",
  "Door-to-door delivery (international/local)",
  "Global logistics services",
  "Documentation",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About RUGAB"
        title="Global freight and shipping experts."
        description="Rugab Dynamic Logistics Company is a trusted global logistics provider specializing in international shipping and end-to-end freight solutions, committed to delivering efficient and cost-effective shipping solutions."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/quote" className="btn-accent">Request a Quote</Link>
          <Link href="/services" className="btn-outline border-white/30 bg-white/10 text-white hover:border-white/60 hover:bg-white/15">Explore Services</Link>
        </div>
      </PageHero>

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="brand-panel p-8">
            <Truck className="h-10 w-10 text-accent" />
            <h2 className="mt-5 text-2xl font-extrabold">Built for dependable cargo movement.</h2>
            <p className="mt-3 text-sm leading-7 text-navy-100">
              We combine freight coordination, customs documentation, secure handling, and responsive communication so clients can move goods with less friction.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-white/10 p-4">
                <p className="text-sm font-bold text-white">End-to-end support</p>
                <p className="mt-1 text-xs text-navy-100">From pickup planning to delivery.</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/10 p-4">
                <p className="text-sm font-bold text-white">Compliance focused</p>
                <p className="mt-1 text-xs text-navy-100">Clear documents and customs guidance.</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="card hover-lift p-8">
              <Target className="h-8 w-8 text-accent" />
              <h2 className="mt-4 text-xl font-bold text-navy-900">Our Mission</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                To provide reliable, cost-effective, and timely logistics services that
                simplify global trade for our clients.
              </p>
            </div>
            <div className="card hover-lift p-8">
              <Eye className="h-8 w-8 text-sky" />
              <h2 className="mt-4 text-xl font-bold text-navy-900">Our Vision</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                To be a leading logistics company recognized for excellence, innovation,
                and customer satisfaction.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <span className="section-eyebrow">Capabilities</span>
          <h2 className="section-title mt-4">What We Specialize In</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SPECIALIZATIONS.map((s) => (
              <div key={s} className="flex items-center gap-3 rounded-lg border border-navy-100 bg-white px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-soft">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm font-medium text-navy-800">{s}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/quote" className="btn-accent">Get a Free Quote</Link>
          <Link href="/services" className="btn-outline">Explore Services</Link>
        </div>
      </section>
    </>
  );
}
