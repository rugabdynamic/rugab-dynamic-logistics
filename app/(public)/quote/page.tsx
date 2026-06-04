import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CheckCircle2, Clock, ShieldCheck } from "lucide-react";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { PageHero } from "@/components/public/PageHero";

export const metadata: Metadata = {
  title: "Get a Free Freight Quote",
};

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Free freight quote"
        title="Request a fast, cost-effective shipment estimate."
        description="Tell us about your shipment and we will send you a fast, cost-effective estimate. You will receive a tracking code to follow your request."
      />

      <section className="container-page py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <aside className="space-y-4">
            <InfoCard
              icon={<Clock className="h-5 w-5" />}
              title="Quick review"
              desc="Our team reviews route, cargo type, dimensions, and timeline before pricing."
            />
            <InfoCard
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Clear handling"
              desc="We plan customs, documentation, and freight movement with careful cargo handling."
            />
            <InfoCard
              icon={<CheckCircle2 className="h-5 w-5" />}
              title="Tracking code"
              desc="After submission, keep your code handy to track updates from request to delivery."
            />
          </aside>
          <div>
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  );
}

function InfoCard({ icon, title, desc }: { icon: ReactNode; title: string; desc: string }) {
  return (
    <div className="card p-5">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
        {icon}
      </span>
      <h2 className="mt-3 font-bold text-navy-900">{title}</h2>
      <p className="mt-1 text-sm leading-6 text-slate-600">{desc}</p>
    </div>
  );
}
