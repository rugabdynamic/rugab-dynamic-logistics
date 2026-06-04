import { Container } from "@/components/ui/Container";

type PageHeaderProps = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
};

/** Navy gradient header band shared by all inner public pages. */
export function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy to-navy-deep py-16 text-white sm:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-brand-teal/15 blur-3xl" />
      </div>
      {/* Dashed flight-route motif */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
        viewBox="0 0 1200 300"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <path
          d="M-50 220 C 300 120, 600 260, 900 140 S 1300 60, 1300 60"
          stroke="#1C9BD8"
          strokeWidth="1.5"
          strokeDasharray="5 9"
        />
      </svg>
      <Container className="relative">
        {eyebrow && (
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-teal backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 max-w-4xl font-display text-3xl font-bold sm:text-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-3xl text-navy-100">{subtitle}</p>
        )}
      </Container>
    </section>
  );
}
