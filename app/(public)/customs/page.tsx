import type { Metadata } from "next";
import Link from "next/link";
import { FileCheck, ShieldCheck, Compass, PackageCheck, Receipt, Globe2 } from "lucide-react";

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
      <section className="bg-navy-900 py-16 text-white">
        <div className="container-page">
          <h1 className="text-3xl font-bold sm:text-4xl">Customs Service</h1>
          <p className="mt-4 max-w-3xl text-navy-100">
            Avoid costly delays and complications. Our customs specialists handle
            documentation, compliance, and clearance so your cargo keeps moving.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((i) => (
            <div key={i.title} className="card p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <i.icon className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-navy-900">{i.title}</h2>
              <p className="mt-2 text-sm text-gray-600">{i.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-navy-50 p-8 text-center">
          <h2 className="text-2xl font-bold text-navy-900">Need help clearing your cargo?</h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            Tell us about your shipment and our customs team will guide you through every step.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/quote" className="btn-accent">Get a Free Quote</Link>
            <Link href="/contact" className="btn-outline">Talk to an Expert</Link>
          </div>
        </div>
      </section>
    </>
  );
}
