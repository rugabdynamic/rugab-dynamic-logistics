import type { Metadata } from "next";
import { Mail, MessageCircle, PenLine, TrendingUp, Target } from "lucide-react";
import { PageHero } from "@/components/public/PageHero";

export const metadata: Metadata = {
  title: "Oyewale Rukayat Omotunrayo | B2B Logistics Copywriter",
};

const SERVICES = [
  "Cold email outreach for logistics companies",
  "Email sequence creation",
  "Website and social media copywriting",
  "B2B client communication writing",
  "LinkedIn content for logistics brands",
];

const SKILLS = [
  "B2B logistics copywriting",
  "Lead nurturing",
  "Sales messaging",
  "Client follow-up writing",
  "Service description writing",
  "Industry research",
  "Brand positioning",
];

const TOOLS = [
  "Mailchimp", "HubSpot", "Outlook", "Gmail", "ZoomInfo",
  "Apollo.io", "ImportGenius", "LinkedIn Sales Navigator", "Yellow Pages", "Snov.io",
];

const PROJECTS = [
  { title: "Email Sequence", desc: "Multi-touch nurture sequences that move logistics prospects from interest to booked calls." },
  { title: "Cold Email Outreach", desc: "Targeted cold campaigns that open conversations with manufacturers, exporters, and importers." },
  { title: "Follow-up Sequence", desc: "Persistent, value-led follow-ups that keep deals warm and close partnerships faster." },
];

const RESULTS = [
  "Clear, compelling messaging that builds trust with ideal clients",
  "Copy that speaks directly to manufacturers, exporters, importers, and construction companies",
  "Strong focus on lead generation and conversion",
  "Industry-aware communication that makes brands look professional and reliable",
  "Content that helps close partnership deals faster",
];

export default function RukayatPortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="B2B copywriter"
        title="Oyewale Rukayat Omotunrayo"
        description="A professional copywriter specializing in logistics brands, with over 3 years of experience helping companies communicate their value and win high-quality clients. As an entrepreneur with a BSc background, she understands firsthand the importance of client acquisition and how powerful, persuasive communication drives business growth. She crafts compelling copy that helps logistics companies attract prospects, build trust, and secure profitable partnership deals through clear, strategic messaging and results-driven storytelling."
      >
        <div className="flex flex-wrap gap-3">
          <a href="mailto:oyewalerukayat6@gmail.com" className="btn-accent">
            <Mail className="h-4 w-4" /> Email Rukayat
          </a>
          <a
            href="https://wa.me/2349059067154"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline border-white/30 bg-white/10 text-white hover:border-white/60 hover:bg-white/15"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </PageHero>

      <section className="container-page py-16">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-bold text-navy-900">
                <PenLine className="h-6 w-6 text-accent" /> Services
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {SERVICES.map((s) => (
                  <li key={s} className="flex items-start gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-navy-800">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="flex items-center gap-2 text-2xl font-bold text-navy-900">
                <Target className="h-6 w-6 text-accent" /> Featured Projects
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {PROJECTS.map((p) => (
                  <div key={p.title} className="card hover-lift p-5">
                    <h3 className="font-semibold text-navy-900">{p.title}</h3>
                    <p className="mt-2 text-sm text-gray-600">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="flex items-center gap-2 text-2xl font-bold text-navy-900">
                <TrendingUp className="h-6 w-6 text-accent" /> Results She Delivers
              </h2>
              <ul className="mt-4 space-y-2">
                {RESULTS.map((r) => (
                  <li key={r} className="flex items-start gap-3 text-sm text-navy-800">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="space-y-8">
            <div className="card p-6">
              <h3 className="font-semibold text-navy-900">Skills</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {SKILLS.map((s) => (
                  <span key={s} className="rounded-full bg-navy-50 px-3 py-1 text-xs font-medium text-navy-700">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="card p-6">
              <h3 className="font-semibold text-navy-900">Tools</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {TOOLS.map((t) => (
                  <span key={t} className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="card p-6">
              <h3 className="font-semibold text-navy-900">Contact</h3>
              <a href="mailto:oyewalerukayat6@gmail.com" className="mt-3 flex items-center gap-2 text-sm text-accent hover:underline">
                <Mail className="h-4 w-4" /> oyewalerukayat6@gmail.com
              </a>
              <a href="https://wa.me/2349059067154" target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center gap-2 text-sm text-accent hover:underline">
                <MessageCircle className="h-4 w-4" /> +234 905 906 7154
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
