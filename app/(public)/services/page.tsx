import type { Metadata } from "next";
import Link from "next/link";
import {
  Plane, Ship, Truck, FileCheck, Globe, Warehouse, Lightbulb, Home, ArrowRight,
} from "lucide-react";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Services — Freight, Customs & International Shipping",
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
      <PageHeader
        eyebrow="What we do"
        title="Our Services"
        subtitle="From freight forwarding to customs clearance, we deliver complete logistics solutions for businesses and individuals worldwide."
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={(i % 2) * 0.08}>
              <Card interactive className="group h-full p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy/5 text-navy transition-colors group-hover:bg-gradient-to-br group-hover:from-brand-red group-hover:to-brand-orange group-hover:text-white">
                  <s.icon className="h-6 w-6" />
                </div>
                <h2 className="mt-4 text-xl font-bold text-navy">{s.title}</h2>
                <p className="mt-2 text-sm text-muted">{s.desc}</p>
                <ul className="mt-4 space-y-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-navy/80">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/quote">
            <Button>Request a Quote <ArrowRight className="h-4 w-4" /></Button>
          </Link>
          <Link href="/customs">
            <Button variant="ghost">Customs Service</Button>
          </Link>
        </div>
      </Section>
    </>
  );
}
