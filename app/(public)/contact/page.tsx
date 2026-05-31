import type { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default function ContactPage() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "info@rugabdynamiclogistics.com";

  return (
    <>
      <section className="bg-navy-900 py-16 text-white">
        <div className="container-page">
          <h1 className="text-3xl font-bold sm:text-4xl">Contact Us</h1>
          <p className="mt-4 max-w-2xl text-navy-100">
            Have a question or need a logistics partner? Reach out and our team will respond promptly.
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-1">
            <div className="card p-6">
              <Phone className="h-6 w-6 text-accent" />
              <h3 className="mt-3 font-semibold text-navy-900">Call us</h3>
              <p className="mt-1 text-sm text-gray-600">07033403577</p>
              <p className="text-sm text-gray-600">09059067154</p>
              <p className="text-sm text-gray-600">08021210156</p>
            </div>
            <div className="card p-6">
              <MapPin className="h-6 w-6 text-accent" />
              <h3 className="mt-3 font-semibold text-navy-900">Visit us</h3>
              <p className="mt-1 text-sm text-gray-600">
                No 2 Asa-Afriogun Street, Ajao Estate, Oshodi, Lagos
              </p>
            </div>
            <div className="card p-6">
              <Mail className="h-6 w-6 text-accent" />
              <h3 className="mt-3 font-semibold text-navy-900">Email us</h3>
              <a href={`mailto:${adminEmail}`} className="mt-1 block text-sm text-accent hover:underline">
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
