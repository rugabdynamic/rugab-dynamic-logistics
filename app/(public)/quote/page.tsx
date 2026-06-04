import type { Metadata } from "next";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Get a Free Freight Quote",
};

export default function QuotePage() {
  return (
    <>
      <PageHeader
        eyebrow="Free estimate"
        title="Get a Free Freight Quote"
        subtitle="Tell us about your shipment and we'll send you a fast, cost-effective estimate. You'll receive a tracking code to follow your request."
      />

      <Section spacing="sm">
        <div className="mx-auto max-w-3xl">
          <QuoteForm />
        </div>
      </Section>
    </>
  );
}
