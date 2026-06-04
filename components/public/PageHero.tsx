import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,174,239,0.2),transparent_35%),radial-gradient(circle_at_88%_18%,rgba(240,90,40,0.26),transparent_28%)]" />
      <div className="absolute left-0 top-16 h-px w-full bg-gradient-to-r from-transparent via-sky/30 to-transparent" />
      <div className="container-page relative">
        <div className="max-w-3xl animate-fade-up">
          <span className="section-eyebrow bg-white/10 text-sky-100">{eyebrow}</span>
          <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-navy-100 sm:text-lg">
            {description}
          </p>
          {children && <div className="mt-7">{children}</div>}
        </div>
      </div>
    </section>
  );
}
