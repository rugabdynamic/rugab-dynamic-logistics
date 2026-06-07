import type { Metadata } from "next";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Mail,
  MessageCircle,
  PenLine,
  Search,
  Target,
  TrendingUp,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Oyewale Rukayat Omotunrayo | B2B Logistics Copywriter",
  description:
    "Portfolio for Oyewale Rukayat Omotunrayo, a B2B logistics copywriter helping freight, shipping, import, export, and delivery brands win better clients.",
};

const PORTRAIT_SRC = "/portfolio/rukayat/rukayat-portrait.jpg";

const CONTACT = {
  email: "oyewalerukayat6@gmail.com",
  whatsapp: "https://wa.me/2349059067154",
  phone: "+234 905 906 7154",
};

const POSITIONING = [
  "Cold outreach that sounds informed, not copied from a template.",
  "Clear service messaging for freight, import, export, and delivery brands.",
  "Follow-up systems that keep high-value prospects moving toward a call.",
];

const SERVICES = [
  {
    title: "Cold Email Outreach",
    desc: "Research-backed campaigns for manufacturers, exporters, importers, and construction buyers.",
  },
  {
    title: "Email Sequences",
    desc: "Multi-touch nurture, follow-up, and reactivation sequences written around the buying journey.",
  },
  {
    title: "Website Copy",
    desc: "Sharper service pages, homepage messaging, and conversion-focused copy for logistics brands.",
  },
  {
    title: "LinkedIn Content",
    desc: "Authority-led posts and profile copy for founders, sales teams, and logistics operators.",
  },
];

const PROJECTS = [
  {
    label: "01",
    title: "Lead Nurture Sequence",
    desc: "A structured email path that turns early interest into a practical next step: reply, call, or quote request.",
    tags: ["Email strategy", "Lead nurturing"],
  },
  {
    label: "02",
    title: "Logistics Cold Outreach",
    desc: "Prospect-specific messaging for companies that need reliable movement of goods across regions and borders.",
    tags: ["Cold email", "Research"],
  },
  {
    label: "03",
    title: "Partnership Follow-up Flow",
    desc: "Persistent, value-led follow-ups that help logistics teams stay present without sounding desperate.",
    tags: ["Follow-up", "Sales messaging"],
  },
];

const RESULTS = [
  "Messaging that gives logistics brands a more credible first impression",
  "Copy that speaks directly to manufacturers, exporters, importers, and construction companies",
  "Prospect research translated into clear, specific sales angles",
  "Better handoff from awareness to quote request, discovery call, or partnership discussion",
  "Communication that helps close partnership deals faster",
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
  "Mailchimp",
  "HubSpot",
  "Outlook",
  "Gmail",
  "ZoomInfo",
  "Apollo.io",
  "ImportGenius",
  "LinkedIn Sales Navigator",
  "Yellow Pages",
  "Snov.io",
];

export default function RukayatPortfolioPage() {
  return (
    <main className="min-h-screen bg-[#f6f7f4] text-[#17211d]">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <a href="#top" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#17211d] text-sm font-semibold text-white">
            RO
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold">Rukayat Omotunrayo</span>
            <span className="block text-xs text-[#66756d]">B2B logistics copywriter</span>
          </span>
        </a>
        <nav className="hidden items-center gap-6 text-sm font-medium text-[#53615a] sm:flex">
          <a href="#work" className="transition hover:text-[#17211d]">
            Work
          </a>
          <a href="#services" className="transition hover:text-[#17211d]">
            Services
          </a>
          <a href="#contact" className="transition hover:text-[#17211d]">
            Contact
          </a>
        </nav>
        <a
          href={`mailto:${CONTACT.email}`}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#cbd5cf] bg-white text-[#17211d] shadow-sm transition hover:-translate-y-0.5 hover:border-[#17211d]"
          aria-label="Email Rukayat"
        >
          <Mail className="h-4 w-4" />
        </a>
      </header>

      <section id="top" className="mx-auto grid w-full max-w-7xl gap-10 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:pb-24 lg:pt-14">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-[#cbd5cf] bg-white px-4 py-2 text-xs font-bold uppercase text-[#4f6f61]">
            <PenLine className="h-4 w-4" />
            Copy for logistics sales teams
          </p>
          <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[0.98] text-[#17211d] sm:text-6xl lg:text-7xl">
            Oyewale Rukayat Omotunrayo
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4f5c55] sm:text-xl">
            A B2B logistics copywriter helping freight, shipping, import,
            export, and delivery brands turn technical service value into clear
            messages that win trust and start profitable conversations.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#17211d] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_-24px_rgba(23,33,29,0.85)] transition hover:-translate-y-0.5 hover:bg-[#24362f]"
            >
              Start a project <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#cbd5cf] bg-white px-6 py-3 text-sm font-semibold text-[#17211d] transition hover:-translate-y-0.5 hover:border-[#17211d]"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-3">
            {POSITIONING.map((item) => (
              <div key={item} className="border-l border-[#bdccc4] pl-4 text-sm leading-6 text-[#526159]">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-4 top-10 hidden h-28 w-28 rounded-full border border-[#c7b8d7] lg:block" />
          <div
            className="relative min-h-[500px] overflow-hidden rounded-[2rem] bg-[#dfe4e0] bg-cover bg-center shadow-[0_30px_90px_-48px_rgba(23,33,29,0.95)] sm:min-h-[620px]"
            role="img"
            aria-label="Portrait of Oyewale Rukayat Omotunrayo"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(23,33,29,0) 50%, rgba(23,33,29,0.76) 100%), url("${PORTRAIT_SRC}")`,
            }}
          >
            <div className="absolute inset-x-5 bottom-5 rounded-3xl border border-white/20 bg-[#17211d]/80 p-5 text-white backdrop-blur">
              <p className="text-xs font-bold uppercase text-[#cfe2d8]">
                Available for
              </p>
              <p className="mt-2 text-2xl font-semibold leading-tight">
                Outreach, website copy, and sales messaging for logistics brands.
              </p>
            </div>
          </div>
          <div className="absolute -right-3 top-8 rounded-2xl border border-[#d8ded9] bg-white px-5 py-4 shadow-[0_20px_60px_-35px_rgba(23,33,29,0.85)]">
            <p className="text-3xl font-semibold text-[#17211d]">3+</p>
            <p className="text-xs font-medium uppercase text-[#6a776f]">Years writing</p>
          </div>
        </div>
      </section>

      <section className="border-y border-[#d8ded9] bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:px-8 md:grid-cols-3">
          <div>
            <p className="text-xs font-bold uppercase text-[#6d4c7d]">Focus</p>
            <p className="mt-2 text-lg font-semibold text-[#17211d]">B2B logistics growth copy</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-[#6d4c7d]">Audience</p>
            <p className="mt-2 text-lg font-semibold text-[#17211d]">Manufacturers, exporters, importers, builders</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-[#6d4c7d]">Strength</p>
            <p className="mt-2 text-lg font-semibold text-[#17211d]">Research-led messaging that sounds human</p>
          </div>
        </div>
      </section>

      <section id="work" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-sm font-bold uppercase text-[#4f6f61]">Selected work</p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight text-[#17211d]">
              Copy systems for the places logistics deals actually happen.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#56645d]">
              Her work focuses on the moments where prospects decide whether a
              logistics provider sounds reliable enough to answer, request a
              quote, or book a call.
            </p>
          </div>

          <div className="space-y-4">
            {PROJECTS.map((project) => (
              <article
                key={project.title}
                className="group grid gap-5 rounded-3xl border border-[#d8ded9] bg-white p-5 transition hover:-translate-y-1 hover:border-[#a9b9b0] hover:shadow-[0_24px_70px_-42px_rgba(23,33,29,0.78)] sm:grid-cols-[80px_1fr]"
              >
                <span className="text-3xl font-semibold text-[#8a6a9a]">{project.label}</span>
                <div>
                  <h3 className="text-2xl font-semibold text-[#17211d]">{project.title}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[#56645d]">
                    {project.desc}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#eef2ef] px-3 py-1 text-xs font-semibold text-[#53615a]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="bg-[#17211d] text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-bold uppercase text-[#a7ccb8]">
              <Target className="h-4 w-4" />
              What she writes
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight">
              Practical copy for teams that sell movement, speed, and trust.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#c8d3cd]">
              Rukayat brings together sales messaging, client psychology, and
              logistics research to make a company sound clear, reliable, and
              worth replying to.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2">
            {SERVICES.map((service) => (
              <div key={service.title} className="bg-[#1f2d28] p-6">
                <ClipboardList className="h-6 w-6 text-[#a7ccb8]" />
                <h3 className="mt-5 text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#c8d3cd]">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-bold uppercase text-[#4f6f61]">
            <TrendingUp className="h-4 w-4" />
            Results she delivers
          </p>
          <div className="mt-6 space-y-4">
            {RESULTS.map((result) => (
              <div key={result} className="flex gap-4 rounded-2xl border border-[#d8ded9] bg-white p-5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#4f6f61]" />
                <p className="text-sm leading-7 text-[#4b5a53]">{result}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-[#d8ded9] bg-white p-7">
            <p className="text-sm font-bold uppercase text-[#6d4c7d]">Core skills</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {SKILLS.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-[#d8ded9] px-3 py-1.5 text-xs font-semibold text-[#4f5c55]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#d8ded9] bg-[#eef2ef] p-7">
            <p className="inline-flex items-center gap-2 text-sm font-bold uppercase text-[#4f6f61]">
              <Search className="h-4 w-4" />
              Research and outreach tools
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {TOOLS.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#53615a]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section id="contact" className="px-5 pb-8 sm:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#6d4c7d] px-6 py-10 text-white sm:px-10 lg:flex lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase text-[#eadff0]">Contact</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">
              Need logistics copy that sounds credible before the sales call?
            </h2>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0">
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#17211d] transition hover:-translate-y-0.5"
            >
              <Mail className="h-4 w-4" />
              {CONTACT.email}
            </a>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" />
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
