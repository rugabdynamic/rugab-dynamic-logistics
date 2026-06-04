import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/public/PageHero";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default function ContactPage() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "info@rugabdynamiclogistics.com";

  return (
    <>
      <PageHero
        eyebrow="Contact RUGAB"
        title="Talk to a logistics team that responds clearly."
        description="Have a question or need a logistics partner? Reach out and our team will respond promptly."
      />

      <section className="container-page py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-1">
            <div className="card hover-lift p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Phone className="h-6 w-6" />
              </span>
              <h3 className="mt-3 font-semibold text-navy-900">Call us</h3>
              <p className="mt-1 text-sm text-gray-600">07033403577</p>
              <p className="text-sm text-gray-600">09059067154</p>
              <p className="text-sm text-gray-600">08021210156</p>
            </div>
            <div className="card hover-lift p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
                <MapPin className="h-6 w-6" />
              </span>
              <h3 className="mt-3 font-semibold text-navy-900">Visit us</h3>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                No 2 Asa-Afriogun Street, Ajao Estate, Oshodi, Lagos
              </p>
            </div>
            <div className="card hover-lift p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
                <Mail className="h-6 w-6" />
              </span>
              <h3 className="mt-3 font-semibold text-navy-900">Email us</h3>
              <a href={`mailto:${adminEmail}`} className="mt-1 block break-all text-sm font-semibold text-sky-700 hover:underline">
                {adminEmail}
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
