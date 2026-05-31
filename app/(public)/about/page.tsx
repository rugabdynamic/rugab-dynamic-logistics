import type { Metadata } from "next";
import Link from "next/link";
import { Target, Eye, CheckCircle2 } from "lucide-react";

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
      <section className="bg-navy-900 py-16 text-white">
        <div className="container-page">
          <h1 className="text-3xl font-bold sm:text-4xl">
            Rugab Dynamic Logistics: Global Freight &amp; Shipping Experts
          </h1>
          <p className="mt-4 max-w-3xl text-navy-100">
            Rugab Dynamic Logistics Company is a trusted global logistics provider
            specializing in international shipping and end-to-end freight solutions,
            committed to delivering efficient and cost-effective shipping solutions.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card p-8">
            <Target className="h-8 w-8 text-accent" />
            <h2 className="mt-4 text-xl font-bold text-navy-900">Our Mission</h2>
            <p className="mt-3 text-gray-600">
              To provide reliable, cost-effective, and timely logistics services that
              simplify global trade for our clients.
            </p>
          </div>
          <div className="card p-8">
            <Eye className="h-8 w-8 text-accent" />
            <h2 className="mt-4 text-xl font-bold text-navy-900">Our Vision</h2>
            <p className="mt-3 text-gray-600">
              To be a leading logistics company recognized for excellence, innovation,
              and customer satisfaction.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-navy-900">What We Specialize In</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SPECIALIZATIONS.map((s) => (
              <div key={s} className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3">
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
