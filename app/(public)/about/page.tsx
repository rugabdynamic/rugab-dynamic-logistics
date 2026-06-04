import type { Metadata } from "next";
import Link from "next/link";
import { Target, Eye, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About — Global Freight & Shipping Experts",
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
      <PageHeader
        eyebrow="Who we are"
        title="Rugab Dynamic Logistics: Global Freight & Shipping Experts"
        subtitle="Rugab Dynamic Logistics Company is a trusted global logistics provider specializing in international shipping and end-to-end freight solutions, committed to delivering efficient and cost-effective shipping solutions."
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <Card className="h-full p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-red to-brand-orange text-white">
                <Target className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-xl font-bold text-navy">Our Mission</h2>
              <p className="mt-3 text-muted">
                To provide reliable, cost-effective, and timely logistics services that
                simplify global trade for our clients.
              </p>
            </Card>
          </Reveal>
          <Reveal delay={0.08}>
            <Card className="h-full p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal">
                <Eye className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-xl font-bold text-navy">Our Vision</h2>
              <p className="mt-3 text-muted">
                To be a leading logistics company recognized for excellence, innovation,
                and customer satisfaction.
              </p>
            </Card>
          </Reveal>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-navy">What We Specialize In</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SPECIALIZATIONS.map((s) => (
              <div key={s} className="flex items-center gap-3 rounded-xl border border-slate-200/70 bg-surface px-4 py-3 shadow-brand">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-teal" />
                <span className="text-sm font-medium text-navy/80">{s}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/quote">
            <Button>Get a Free Quote</Button>
          </Link>
          <Link href="/services">
            <Button variant="ghost">Explore Services</Button>
          </Link>
        </div>
      </Section>
    </>
  );
}
