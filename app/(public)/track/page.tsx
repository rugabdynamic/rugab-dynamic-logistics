import type { Metadata } from "next";
import { TrackingSearch } from "@/components/public/TrackingSearch";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Track Your Shipment",
};

export default function TrackPage() {
  return (
    <>
      <PageHeader
        eyebrow="Live status"
        title="Track Your Shipment"
        subtitle="Enter the tracking code from your quote request or shipment to see its current status and history."
      />

      <Section spacing="sm">
        <div className="mx-auto max-w-3xl">
          <TrackingSearch />
        </div>
      </Section>
    </>
  );
}
