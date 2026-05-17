"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  X,
  ArrowRight,
  CalendarCheck,
  Truck,
  BarChart3,
  Building2,
} from "lucide-react";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";

const comparisonRows = [
  {
    feature: "Real-time alerting",
    traditional: "Delayed or manual",
    las: "Sub-5-second alerts",
  },
  {
    feature: "Driver intelligence",
    traditional: "Basic speedometer data",
    las: "Full behaviour scoring + coaching",
  },
  {
    feature: "AI insights",
    traditional: "None",
    las: "Route, risk, and maintenance predictions",
  },
  {
    feature: "Setup time",
    traditional: "Weeks of integration",
    las: "Live in 48 hours",
  },
  {
    feature: "Multi-branch support",
    traditional: "Single view only",
    las: "Hierarchical org management",
  },
  {
    feature: "Support",
    traditional: "Ticket-based",
    las: "Dedicated customer success",
  },
];

const fleetSizes = [
  {
    icon: Truck,
    range: "5–25 vehicles",
    title: "Small Fleets",
    desc: "Affordable, quick to deploy, no IT team needed.",
    highlights: [
      "Up and running in 48 hours",
      "Fixed monthly pricing",
      "Self-serve onboarding",
    ],
  },
  {
    icon: BarChart3,
    range: "25–200 vehicles",
    title: "Mid-Size Fleets",
    desc: "Advanced analytics, multi-branch visibility, role-based access.",
    highlights: [
      "Branch-level dashboards",
      "Manager & driver roles",
      "Custom alert policies",
    ],
    featured: true,
  },
  {
    icon: Building2,
    range: "200+ vehicles",
    title: "Enterprise Fleets",
    desc: "Custom integrations, SLA guarantees, dedicated support.",
    highlights: [
      "Dedicated success manager",
      "Custom SLAs",
      "White-glove integration",
    ],
  },
];

export default function WhyLasMobilityPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span
              className="inline-block rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{ border: "1px solid var(--border-accent)", color: "var(--accent-text)", background: "var(--accent-glow)" }}
            >
              Why LAS Mobility
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl" style={{ color: "var(--text-primary)" }}>
              Purpose-built for fleet operators who{" "}
              <span className="gradient-text">demand more</span>
            </h1>
            <p className="mt-6 text-lg leading-8" style={{ color: "var(--text-secondary)" }}>
              There are dozens of fleet tracking tools. LAS Mobility is different — it&apos;s a fleet intelligence platform designed by people who understand that tracking a vehicle is only the beginning.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/contact" className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm">
                <CalendarCheck className="h-4 w-4" /> Book a Demo
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition hover:opacity-80"
                style={{ border: "1px solid var(--border)", color: "var(--text-primary)", background: "var(--bg-card)" }}
              >
                Back to About <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* vs. Alternatives — Comparison table */}
      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="vs. Alternatives"
            title="See the difference side by side"
            description="Traditional tracking tools tell you where your vehicles are. LAS Mobility tells you what to do about it."
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mt-12 overflow-hidden rounded-2xl"
            style={{ border: "1px solid var(--border)" }}
          >
            {/* Table header */}
            <div
              className="grid grid-cols-3 px-6 py-4"
              style={{ background: "var(--bg-card)", borderBottom: "1px solid var(--border)" }}
            >
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                Feature
              </p>
              <p className="text-center text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                Traditional Tracking
              </p>
              <p className="text-center text-xs font-bold uppercase tracking-wider" style={{ color: "var(--accent-text)" }}>
                LAS Mobility
              </p>
            </div>
            {comparisonRows.map((row, i) => (
              <motion.div
                key={row.feature}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="grid grid-cols-3 items-center px-6 py-5"
                style={{
                  background: i % 2 === 0 ? "var(--bg-base)" : "var(--bg-card)",
                  borderBottom: i < comparisonRows.length - 1 ? "1px solid var(--border)" : undefined,
                }}
              >
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  {row.feature}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <X className="h-4 w-4 shrink-0" style={{ color: "var(--text-muted)" }} />
                  <p className="text-center text-sm" style={{ color: "var(--text-muted)" }}>
                    {row.traditional}
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "var(--accent-text)" }} />
                  <p className="text-center text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                    {row.las}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Built for Your Fleet Size */}
      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Built for Your Fleet Size"
            title="The right fit, whatever your scale"
            description="From a single depot to a national enterprise — LAS Mobility grows with your operation."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {fleetSizes.map(({ icon: Icon, range, title, desc, highlights, featured }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="relative rounded-xl p-7"
                style={{
                  background: "var(--bg-card)",
                  border: featured ? "1px solid var(--border-accent)" : "1px solid var(--border)",
                  boxShadow: featured ? "var(--shadow-glow)" : undefined,
                }}
              >
                {featured && (
                  <span
                    className="absolute right-4 top-4 rounded-full px-2.5 py-0.5 text-xs font-bold"
                    style={{ background: "var(--accent-glow)", color: "var(--accent-text)" }}
                  >
                    Most Popular
                  </span>
                )}
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: "var(--accent-glow)" }}
                >
                  <Icon className="h-5 w-5" style={{ color: "var(--accent-text)" }} />
                </span>
                <p className="mt-4 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                  {range}
                </p>
                <h3 className="mt-1 text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
                  {desc}
                </p>
                <ul className="mt-5 flex flex-col gap-3">
                  {highlights.map((h) => (
                    <li key={h} className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "var(--accent-text)" }} />
                      <span className="text-sm" style={{ color: "var(--text-primary)" }}>
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Promise — full-width statement */}
      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl px-8 py-14 text-center sm:px-16"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-accent)",
              boxShadow: "var(--shadow-glow)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, var(--accent-glow), transparent)" }}
            />
            <p
              className="relative text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--text-muted)" }}
            >
              Our Customer Promise
            </p>
            <blockquote
              className="relative mt-4 text-2xl font-bold leading-snug sm:text-3xl lg:text-4xl"
              style={{ color: "var(--text-primary)" }}
            >
              &ldquo;We are not a GPS tracker. We are the{" "}
              <span className="gradient-text">operating system for your fleet</span>.&rdquo;
            </blockquote>
            <div className="relative mt-8">
              <Link href="/contact" className="btn-primary inline-flex items-center gap-2 rounded-xl px-7 py-4 text-sm font-semibold">
                <CalendarCheck className="h-4 w-4" /> See it in action
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
