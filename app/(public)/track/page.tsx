import type { Metadata } from "next";
import Link from "next/link";
import { TrackingSearch } from "@/components/public/TrackingSearch";
import { PageHero } from "@/components/public/PageHero";

export const metadata: Metadata = {
  title: "Track Your Shipment",
};

export default function TrackPage() {
  return (
    <>
      <PageHero
        eyebrow="Shipment tracking"
        title="Track your shipment status and history."
        description="Enter the tracking code from your quote request or shipment to see its current status and history."
      >
        <Link href="/quote" className="btn-outline border-white/30 bg-white/10 text-white hover:border-white/60 hover:bg-white/15">
          Need a tracking code? Request a Quote
        </Link>
      </PageHero>

      <section className="container-page py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <TrackingSearch />
        </div>
      </section>
    </>
  );
}
