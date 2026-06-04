import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass, FileCheck, Globe2, PackageCheck, Receipt, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/public/PageHero";

export const metadata: Metadata = {
  title: "Customs Service | Clearance, Compliance & Documentation",
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
      <PageHero
        eyebrow="Customs clearance"
        title="Documentation, compliance, and clearance support that keeps cargo moving."
        description="Avoid costly delays and complications. Our customs specialists handle documentation, compliance, and clearance so your cargo keeps moving."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/quote" className="btn-accent">Start Clearance Request</Link>
          <Link href="/contact" className="btn-outline border-white/30 bg-white/10 text-white hover:border-white/60 hover:bg-white/15">Talk to an Expert</Link>
        </div>
      </PageHero>

      <section className="container-page py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Border-ready service</span>
          <h2 className="section-title mt-4">Customs support from paperwork to release</h2>
          <p className="section-copy">
            Clear guidance and careful document handling for importers, exporters, businesses, and individuals.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((i) => (
            <div key={i.title} className="card hover-lift group p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-50 text-sky-700 transition group-hover:bg-accent group-hover:text-white">
                <i.icon className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-navy-900">{i.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{i.desc}</p>
            </div>
          ))}
        </div>

        <div className="brand-panel mt-12 p-8 text-center">
          <div className="relative">
            <h2 className="text-2xl font-extrabold">Need help clearing your cargo?</h2>
            <p className="mx-auto mt-3 max-w-xl text-navy-100">
              Tell us about your shipment and our customs team will guide you through every step.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/quote" className="btn-accent">Get a Free Quote <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/contact" className="btn-outline border-white/30 bg-white/10 text-white hover:border-white/60 hover:bg-white/15">Talk to an Expert</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
