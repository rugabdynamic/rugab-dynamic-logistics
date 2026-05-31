import type { Metadata } from "next";
import { TrackingSearch } from "@/components/public/TrackingSearch";

export const metadata: Metadata = {
  title: "Track Your Shipment",
};

export default function TrackPage() {
  return (
    <>
      <section className="bg-navy-900 py-16 text-white">
        <div className="container-page">
          <h1 className="text-3xl font-bold sm:text-4xl">Track Your Shipment</h1>
          <p className="mt-4 max-w-2xl text-navy-100">
            Enter the tracking code from your quote request or shipment to see its
            current status and history.
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="mx-auto max-w-3xl">
          <TrackingSearch />
        </div>
      </section>
    </>
  );
}
