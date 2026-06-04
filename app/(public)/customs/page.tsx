import type { Metadata } from "next";
import Link from "next/link";
import { FileCheck, ShieldCheck, Compass, PackageCheck, Receipt, Globe2 } from "lucide-react";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Customs Service — Clearance, Compliance & Documentation",
};

const ITEMS = [
  { icon: FileCheck, title: "Customs Documentation", desc: "Accurate preparation and handling of all import and export paperwork." },
  { icon: ShieldCheck, title: "Regulatory Compliance", desc: "Ensuring every shipment meets local and international regulations." },
  { icon: Compass, title: "Import/Export Advisory", desc: "Expert guidance on the right procedures, classifications, and routes." },
  { icon: PackageCheck, title: "Customs Clearance Support", desc: "Hands-on support to move your cargo through customs without delays." },
  { icon: Receipt, title: "Duty Processing", desc: "Calculation and processing of duties, taxes, and tariffs on your behalf." },
  { icon: Globe2, title: "International Trade Compliance", desc: "Keeping your cross-border trade fully compliant and audit-ready." },
];

export default function CustomsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Clearance & compliance"
        title="Customs Service"
        subtitle="Avoid costly delays and complications. Our customs specialists handle documentation, compliance, and clearance so your cargo keeps moving."
      />

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((i, idx) => (
            <Reveal key={i.title} delay={(idx % 3) * 0.08}>
              <Card interactive className="group h-full p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal transition-colors group-hover:bg-brand-teal group-hover:text-white">
                  <i.icon className="h-6 w-6" />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-navy">{i.title}</h2>
                <p className="mt-2 text-sm text-muted">{i.desc}</p>
              </Card>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl bg-gradient-to-br from-navy to-navy-deep p-8 text-center text-white shadow-brand">
          <h2 className="text-2xl font-bold text-white">Need help clearing your cargo?</h2>
          <p className="mx-auto mt-3 max-w-xl text-navy-100">
            Tell us about your shipment and our customs team will guide you through every step.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/quote">
              <Button>Get a Free Quote</Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                Talk to an Expert
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
