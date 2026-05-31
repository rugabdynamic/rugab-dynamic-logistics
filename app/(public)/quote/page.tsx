import type { Metadata } from "next";
import { QuoteForm } from "@/components/forms/QuoteForm";

export const metadata: Metadata = {
  title: "Get a Free Freight Quote",
};

export default function QuotePage() {
  return (
    <>
      <section className="bg-navy-900 py-16 text-white">
        <div className="container-page">
          <h1 className="text-3xl font-bold sm:text-4xl">Get a Free Freight Quote</h1>
          <p className="mt-4 max-w-2xl text-navy-100">
            Tell us about your shipment and we&apos;ll send you a fast, cost-effective
            estimate. You&apos;ll receive a tracking code to follow your request.
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="mx-auto max-w-3xl">
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
