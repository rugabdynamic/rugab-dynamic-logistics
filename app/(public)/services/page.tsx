import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, FileCheck, Globe, Home, Lightbulb, Plane, Ship, Truck, Warehouse,
} from "lucide-react";
import { PageHero } from "@/components/public/PageHero";

export const metadata: Metadata = {
  title: "Services | Freight, Customs & International Shipping",
};

const SERVICES = [
  {
    icon: Plane,
    title: "Freight Forwarding",
    desc: "Professional freight forwarding services that ensure cargo is transported efficiently across international borders.",
    points: [
      "Air freight for urgent deliveries",
      "Sea freight for bulk shipments",
      "Land transportation for regional logistics",
      "Documentation, coordination, and delivery",
    ],
  },
  {
    icon: FileCheck,
    title: "Clearing and Forwarding",
    desc: "Expert customs clearing and forwarding services to avoid delays and complications.",
    points: [
      "Import and export documentation",
      "Customs clearance",
      "Duty processing",
      "Regulatory compliance",
    ],
  },
  {
    icon: Ship,
    title: "International Shipping",
    desc: "Reliable international shipping services to destinations worldwide.",
    points: [
      "Door-to-door delivery",
      "Port-to-port shipping",
      "Personal and commercial cargo",
    ],
  },
  {
    icon: Globe,
    title: "Customs Documentation",
    desc: "End-to-end documentation handling so your cargo clears borders without friction.",
    points: [
      "Custom documentation",
      "Regulatory compliance",
      "Import/export advisory",
    ],
  },
  {
    icon: Warehouse,
    title: "Warehousing",
    desc: "Secure storage and inventory handling for your goods, ready when you need them.",
    points: ["Short and long-term storage", "Packing and removal", "Inventory handling"],
  },
  {
    icon: Truck,
    title: "Transportation and Haulage",
    desc: "Dependable road transport and haulage for regional and last-mile delivery.",
    points: ["Regional haulage", "Last-mile delivery", "Fleet coordination"],
  },
  {
    icon: Lightbulb,
    title: "Freight Consulting",
    desc: "Strategic advisory to optimise routes, costs, and compliance across your supply chain.",
    points: ["Route optimisation", "Cost analysis", "Compliance guidance"],
  },
  {
    icon: Home,
    title: "Local & International Door-to-Door Delivery",
    desc: "Seamless pickup and delivery, whether across town or across the globe.",
    points: ["Local delivery", "International delivery", "Personal & commercial"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Freight solutions"
        title="Complete logistics services for local and international cargo."
        description="From freight forwarding to customs clearance, we deliver complete logistics solutions for businesses and individuals worldwide."
      >
        <Link href="/quote" className="btn-accent">Request a Quote <ArrowRight className="h-4 w-4" /></Link>
      </PageHero>

      <section className="container-page py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Service coverage</span>
          <h2 className="section-title mt-4">Built around your shipment needs</h2>
          <p className="section-copy">
            Choose the service mix that fits your route, timeline, cargo type, and compliance requirements.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {SERVICES.map((s) => (
            <div key={s.title} className="card hover-lift group p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-50 text-sky-700 transition group-hover:bg-accent group-hover:text-white">
                <s.icon className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-xl font-bold text-navy-900">{s.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{s.desc}</p>
              <ul className="mt-4 space-y-2">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-navy-800">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="brand-panel mt-12 grid gap-6 p-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="section-eyebrow bg-white/10 text-sky-100">Need a tailored plan?</p>
            <h2 className="mt-4 text-2xl font-extrabold">Let us match the right route, carrier, and clearance process.</h2>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link href="/quote" className="btn-accent">Request a Quote <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/customs" className="btn-outline border-white/30 bg-white/10 text-white hover:border-white/60 hover:bg-white/15">Customs Service</Link>
          </div>
        </div>
      </section>
    </>
  );
}
