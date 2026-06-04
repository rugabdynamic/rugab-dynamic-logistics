"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ShieldCheck, Plane } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const TRUST = [
  "Worldwide shipping service",
  "Affordable freight rates",
  "Expert customs clearing and forwarding",
  "Trusted global logistics partner",
  "Global shipping made simple, fast, and reliable",
];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy to-navy-deep text-white">
      {/* Decorative glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-teal/20 blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-brand-red/10 blur-3xl" />
      </div>

      {/* Animated dashed route + plane */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
        viewBox="0 0 1200 600"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <path
          d="M-50 480 C 250 300, 500 520, 760 320 S 1150 120, 1300 200"
          stroke="url(#routeGrad)"
          strokeWidth="2"
          strokeDasharray="6 10"
          className={reduce ? undefined : "animate-route-dash"}
        />
        <defs>
          <linearGradient id="routeGrad" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1C9BD8" stopOpacity="0" />
            <stop offset="0.5" stopColor="#1C9BD8" />
            <stop offset="1" stopColor="#1C9BD8" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating plane gliding across the route */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0 top-[42%] text-brand-teal"
        initial={reduce ? false : { x: "-10vw", y: 0 }}
        animate={reduce ? undefined : { x: "110vw", y: [-10, 10, -10] }}
        transition={
          reduce
            ? undefined
            : { x: { duration: 18, repeat: Infinity, ease: "linear" }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }
        }
      >
        <Plane className="h-8 w-8 -rotate-12 drop-shadow-[0_4px_12px_rgba(28,155,216,0.5)]" />
      </motion.div>

      <Container className="relative grid items-center gap-10 py-20 lg:grid-cols-2 lg:py-28">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-teal backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
            Global Logistics Solutions
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
            Reliable International Shipping &amp;{" "}
            <span className="bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent">
              Freight Forwarding
            </span>{" "}
            Worldwide.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-navy-100">
            At Rugab Dynamic Logistics Company, we provide global logistics solutions —
            international shipping, freight forwarding, and customs clearance. Whether
            you&apos;re a business or individual, we ensure fast, secure, and cost-effective
            delivery worldwide.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/quote">
              <Button size="lg">
                Get a Quote <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/track">
              <Button
                variant="ghost"
                size="lg"
                className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                Track Shipment
              </Button>
            </Link>
          </div>
        </motion.div>

        <ul className="w-full space-y-3">
          {TRUST.map((t, i) => (
            <motion.li
              key={t}
              initial={reduce ? false : { opacity: 0, x: 20 }}
              animate={reduce ? undefined : { opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08, ease: "easeOut" }}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur"
            >
              <ShieldCheck className="h-5 w-5 shrink-0 text-brand-teal" />
              <span className="text-sm font-medium">{t}</span>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
