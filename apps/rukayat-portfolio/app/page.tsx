import {
  ArrowRight,
  CheckCircle2,
  GitBranch,
  Linkedin,
  Mail,
  MessageCircle,
  PanelTop,
  PenLine,
  Search,
  SendHorizontal,
  Target,
  TrendingUp,
} from "lucide-react";

const PORTRAIT_SRC = "/rukayat-portrait.jpg";

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
    icon: SendHorizontal,
    label: "Outreach",
    title: "Cold Email Outreach",
    desc: "Research-backed campaigns for manufacturers, exporters, importers, and construction buyers.",
    image: "/1.jpeg",
    imageAlt: "Outlook campaign email written for an export shipment prospect",
  },
  {
    icon: GitBranch,
    label: "Sequence",
    title: "Email Sequences",
    desc: "Multi-touch nurture, follow-up, and reactivation sequences written around the buying journey.",
    image: "/2.jpeg",
    imageAlt: "Outlook email sequence for local and international shipping prospects",
  },
  {
    icon: PanelTop,
    label: "Website",
    title: "Website Copy",
    desc: "Sharper service pages, homepage messaging, and conversion-focused copy for logistics brands.",
    image: "/3.jpeg",
    imageAlt: "Outlook follow-up message for a logistics shipment offer",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    title: "LinkedIn Content",
    desc: "Authority-led posts and profile copy for founders, sales teams, and logistics operators.",
    image: "/linkedin-content.png",
    imageAlt:
      "Business networking content dashboard with logistics posts and analytics",
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
  { name: "Mailchimp", domain: "mailchimp.com" },
  { name: "HubSpot", domain: "hubspot.com" },
  { name: "Outlook", domain: "outlook.com" },
  { name: "Gmail", domain: "gmail.com" },
  { name: "ZoomInfo", domain: "zoominfo.com" },
  { name: "Apollo.io", domain: "apollo.io" },
  { name: "ImportGenius", domain: "importgenius.com" },
  { name: "LinkedIn Sales Navigator", domain: "linkedin.com" },
  { name: "Yellow Pages", domain: "yellowpages.com" },
  { name: "Snov.io", domain: "snov.io" },
];

export default function RukayatPortfolioPage() {
  return (
    <main className="min-h-screen bg-[#f5f9ff] text-[#1f1f1f]">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <a href="#top" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0078d4] text-sm font-semibold text-white">
            RO
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold">
              Rukayat Omotunrayo
            </span>
            <span className="block text-xs text-[#616161]">
              B2B logistics copywriter
            </span>
          </span>
        </a>
        <nav className="hidden items-center gap-6 text-sm font-medium text-[#424242] sm:flex">
          <a href="#work" className="transition hover:text-[#0078d4]">
            Work
          </a>
          <a href="#services" className="transition hover:text-[#0078d4]">
            Services
          </a>
          <a href="#tools" className="transition hover:text-[#0078d4]">
            Tools
          </a>
          <a href="#contact" className="transition hover:text-[#0078d4]">
            Contact
          </a>
        </nav>
        <a
          href={`mailto:${CONTACT.email}`}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#c7e0f4] bg-white text-[#0078d4] shadow-sm transition hover:-translate-y-0.5 hover:border-[#0078d4] hover:bg-[#eff6fc]"
          aria-label="Email Rukayat"
        >
          <Mail className="h-4 w-4" />
        </a>
      </header>

      <section
        id="top"
        className="mx-auto grid w-full max-w-7xl gap-10 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:pb-24 lg:pt-14"
      >
        <div>
          {/* <p className="inline-flex items-center gap-2 rounded-full border border-[#c7e0f4] bg-white px-4 py-2 text-xs font-bold uppercase text-[#005a9e]">
            <PenLine className="h-4 w-4" />
            Copy for logistics sales teams
          </p> */}
          <h1 className="mt-0 max-w-4xl text-5xl font-semibold leading-[0.98] text-[#1f1f1f] sm:text-6xl lg:text-7xl">
            Oyewale Rukayat Omotunrayo
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#424242] sm:text-xl">
            A B2B logistics copywriter helping freight, shipping, import,
            export, and delivery brands turn technical service value into clear
            messages that win trust and start profitable conversations.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0078d4] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_-24px_rgba(0,120,212,0.8)] transition hover:-translate-y-0.5 hover:bg-[#106ebe]"
            >
              Start a project <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#c7e0f4] bg-white px-6 py-3 text-sm font-semibold text-[#005a9e] transition hover:-translate-y-0.5 hover:border-[#0078d4] hover:bg-[#eff6fc]"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-3">
            {POSITIONING.map((item) => (
              <div
                key={item}
                className="border-l border-[#c7e0f4] pl-4 text-sm leading-6 text-[#424242]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-4 top-10 hidden h-28 w-28 rounded-full border border-[#71afe5] lg:block" />
          <div
            className="relative min-h-[500px] overflow-hidden rounded-[2rem] bg-[#deecf9] bg-cover bg-center shadow-[0_30px_90px_-48px_rgba(0,69,120,0.72)] sm:min-h-[620px]"
            role="img"
            aria-label="Portrait of Oyewale Rukayat Omotunrayo"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(0,69,120,0) 50%, rgba(0,69,120,0.78) 100%), url("${PORTRAIT_SRC}")`,
            }}
          >
            <div className="absolute inset-x-5 bottom-5 rounded-3xl border border-white/20 bg-[#004578]/85 p-5 text-white backdrop-blur">
              <p className="text-xs font-bold uppercase text-[#cfe8ff]">
                Available for
              </p>
              <p className="mt-2 text-2xl font-semibold leading-tight">
                Outreach, website copy, and sales messaging for logistics
                brands.
              </p>
            </div>
          </div>
          <div className="absolute -right-3 top-8 rounded-2xl border border-[#c7e0f4] bg-white px-5 py-4 shadow-[0_20px_60px_-35px_rgba(0,69,120,0.65)]">
            <p className="text-3xl font-semibold text-[#0078d4]">3+</p>
            <p className="text-xs font-medium uppercase text-[#616161]">
              Years writing
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-[#dbeaf7] bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:px-8 md:grid-cols-3">
          <div>
            <p className="text-xs font-bold uppercase text-[#005a9e]">Focus</p>
            <p className="mt-2 text-lg font-semibold text-[#1f1f1f]">
              B2B logistics growth copy
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-[#005a9e]">
              Audience
            </p>
            <p className="mt-2 text-lg font-semibold text-[#1f1f1f]">
              Manufacturers, exporters, importers, builders
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-[#005a9e]">
              Strength
            </p>
            <p className="mt-2 text-lg font-semibold text-[#1f1f1f]">
              Research-led messaging that sounds human
            </p>
          </div>
        </div>
      </section>

      <section id="work" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-sm font-bold uppercase text-[#005a9e]">
              Selected work
            </p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight text-[#1f1f1f]">
              Copy systems for the places logistics deals actually happen.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#424242]">
              Her work focuses on the moments where prospects decide whether a
              logistics provider sounds reliable enough to answer, request a
              quote, or book a call.
            </p>
          </div>

          <div className="space-y-4">
            {PROJECTS.map((project) => (
              <article
                key={project.title}
                className="group grid gap-5 rounded-3xl border border-[#dbeaf7] bg-white p-5 transition hover:-translate-y-1 hover:border-[#71afe5] hover:shadow-[0_24px_70px_-42px_rgba(0,69,120,0.62)] sm:grid-cols-[80px_1fr]"
              >
                <span className="text-3xl font-semibold text-[#0078d4]">
                  {project.label}
                </span>
                <div>
                  <h3 className="text-2xl font-semibold text-[#1f1f1f]">
                    {project.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[#424242]">
                    {project.desc}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#eff6fc] px-3 py-1 text-xs font-semibold text-[#005a9e]"
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

      <section id="services" className="bg-[#004578] text-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-sm font-bold uppercase text-[#cfe8ff]">
              <Target className="h-4 w-4" />
              What she writes
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight">
              Practical copy for teams that sell movement, speed, and trust.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#dbeaf7]">
              Rukayat brings together sales messaging, client psychology, and
              logistics research to make a company sound clear, reliable, and
              worth replying to.
            </p>
          </div>

          <div className="mt-16 space-y-16">
            {SERVICES.map((service, index) => {
              const ServiceIcon = service.icon;

              return (
                <article
                  key={service.title}
                  className="border-t border-white/15 pt-10 first:border-t-0 first:pt-0"
                >
                  <div className="mx-auto max-w-3xl text-center">
                    <div className="flex items-center justify-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#0078d4] shadow-[0_18px_45px_-28px_rgba(0,0,0,0.65)]">
                        <ServiceIcon className="h-6 w-6" />
                      </span>
                      <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase text-[#dbeaf7]">
                        {String(index + 1).padStart(2, "0")} / {service.label}
                      </span>
                    </div>
                    <h3 className="mt-6 text-3xl font-semibold leading-tight sm:text-4xl">
                      {service.title}
                    </h3>
                    <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#dbeaf7]">
                      {service.desc}
                    </p>
                  </div>
                  <div className="relative mt-8 aspect-[2/1] overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 shadow-[0_28px_80px_-45px_rgba(0,0,0,0.95)]">
                    <img
                      src={service.image}
                      alt={service.imageAlt}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="tools" className="bg-white px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-sm font-bold uppercase text-[#005a9e]">
              <Search className="h-4 w-4" />
              Research and outreach tools
            </p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight text-[#1f1f1f]">
              Tools she uses to research prospects, write sharper messages, and
              manage outreach.
            </h2>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {TOOLS.map((tool) => (
              <div
                key={tool.name}
                className="flex min-h-16 items-center gap-3 rounded-2xl border border-[#dbeaf7] bg-[#f5f9ff] px-4 py-3 text-sm font-semibold text-[#005a9e] shadow-sm transition hover:-translate-y-0.5 hover:border-[#71afe5] hover:bg-[#eff6fc]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${tool.domain}&sz=64`}
                    alt=""
                    className="h-5 w-5"
                    loading="lazy"
                  />
                </span>
                <span>{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-bold uppercase text-[#005a9e]">
            <TrendingUp className="h-4 w-4" />
            Results she delivers
          </p>
          <div className="mt-6 space-y-4">
            {RESULTS.map((result) => (
              <div
                key={result}
                className="flex gap-4 rounded-2xl border border-[#dbeaf7] bg-white p-5"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0078d4]" />
                <p className="text-sm leading-7 text-[#424242]">{result}</p>
              </div>
            ))}
          </div>
        </div>

        <aside>
          <div className="rounded-[2rem] border border-[#dbeaf7] bg-white p-7">
            <p className="text-sm font-bold uppercase text-[#005a9e]">
              Core skills
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {SKILLS.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-[#c7e0f4] px-3 py-1.5 text-xs font-semibold text-[#424242]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section id="contact" className="px-5 pb-8 sm:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#0078d4] px-6 py-10 text-white sm:px-10 lg:flex lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase text-[#dbeaf7]">
              Contact
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">
              Need logistics copy that sounds credible before the sales call?
            </h2>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0">
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#005a9e] transition hover:-translate-y-0.5"
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
