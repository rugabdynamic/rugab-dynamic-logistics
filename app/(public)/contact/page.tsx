import type { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default function ContactPage() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "info@rugabdynamiclogistics.com";

  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Contact Us"
        subtitle="Have a question or need a logistics partner? Reach out and our team will respond promptly."
      />

      <Section spacing="sm">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-1">
            <Card className="p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal">
                <Phone className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-semibold text-navy">Call us</h3>
              <p className="mt-1 text-sm text-muted">07033403577</p>
              <p className="text-sm text-muted">09059067154</p>
              <p className="text-sm text-muted">08021210156</p>
            </Card>
            <Card className="p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-semibold text-navy">Visit us</h3>
              <p className="mt-1 text-sm text-muted">
                No 2 Asa-Afriogun Street, Ajao Estate, Oshodi, Lagos
              </p>
            </Card>
            <Card className="p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-semibold text-navy">Email us</h3>
              <a href={`mailto:${adminEmail}`} className="mt-1 block text-sm font-medium text-brand-teal hover:underline">
                {adminEmail}
              </a>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
