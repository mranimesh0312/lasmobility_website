"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  HardDrive,
  Users,
  Layers,
  ArrowRight,
  CalendarCheck,
  ShoppingBag,
  Code2,
  Webhook,
  CheckCircle2,
} from "lucide-react";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";

const partnerCategories = [
  {
    icon: HardDrive,
    title: "Hardware Partners",
    desc: "GPS device OEMs and IoT hardware vendors pre-certified with the LAS Mobility platform. Plug-and-play onboarding, no driver modifications needed.",
  },
  {
    icon: Users,
    title: "System Integrators",
    desc: "Regional and global implementation partners who deploy, configure, and support LAS Mobility for enterprise customers. Contact us to join the SI programme.",
  },
  {
    icon: Layers,
    title: "Technology Alliances",
    desc: "API-first integrations with ERP, fuel card, HR, and compliance platforms. Extend LAS Mobility's data into the tools your team already uses.",
  },
];

const partnerOptions = [
  {
    icon: ShoppingBag,
    type: "Reseller / Channel Partner",
    desc: "Sell LAS Mobility to your customers with co-marketing support, deal registration, and margin protection.",
    cta: "Apply as Reseller",
  },
  {
    icon: Code2,
    type: "Technology Integration Partner",
    desc: "Build a bi-directional integration using our open API and get listed in our integration marketplace.",
    cta: "Apply as Tech Partner",
  },
];

const apiHighlights = [
  "RESTful API with full OpenAPI 3.0 specification",
  "Webhook support for real-time event streaming",
  "Versioned endpoints — no breaking changes without notice",
  "Available on Professional and Enterprise plans",
  "Dedicated developer documentation and sandbox environment",
];

export default function PartnersPage() {
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
              Partners &amp; Ecosystem
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl" style={{ color: "var(--text-primary)" }}>
              Built with the best, integrated with what{" "}
              <span className="gradient-text">you already use</span>
            </h1>
            <p className="mt-6 text-lg leading-8" style={{ color: "var(--text-secondary)" }}>
              LAS Mobility is designed to work within your existing technology stack. Our ecosystem of hardware partners, system integrators, and technology alliances means you get a complete fleet intelligence solution, not a siloed tracking tool.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/contact" className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm">
                <CalendarCheck className="h-4 w-4" /> Become a Partner
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

      {/* Partner Categories */}
      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Partner Categories"
            title="Three ways to partner with LAS Mobility"
            description="Whether you build hardware, deliver enterprise projects, or develop software integrations — there is a programme for you."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {partnerCategories.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="rounded-xl p-7"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: "var(--accent-glow)" }}
                >
                  <Icon className="h-6 w-6" style={{ color: "var(--accent-text)" }} />
                </span>
                <h3 className="mt-5 text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-7" style={{ color: "var(--text-secondary)" }}>
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Partner */}
      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Become a Partner"
            title="Join the LAS Mobility partner network"
            description="Two partnership tracks — one for channel and reseller organisations, one for technology and integration teams."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {partnerOptions.map(({ icon: Icon, type, desc, cta }, i) => (
              <motion.div
                key={type}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative overflow-hidden rounded-xl p-8"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-accent)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ background: "radial-gradient(ellipse 60% 50% at 0% 0%, var(--accent-glow), transparent)" }}
                />
                <span
                  className="relative flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: "var(--accent-glow)" }}
                >
                  <Icon className="h-6 w-6" style={{ color: "var(--accent-text)" }} />
                </span>
                <h3 className="relative mt-5 text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                  {type}
                </h3>
                <p className="relative mt-3 text-sm leading-7" style={{ color: "var(--text-secondary)" }}>
                  {desc}
                </p>
                <div className="relative mt-6">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition hover:opacity-80"
                    style={{ background: "var(--bg-deep)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
                  >
                    {cta} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open API */}
      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Open API"
            title="Build on LAS Mobility with our open API"
            description="Full programmatic access to fleet data, events, and intelligence — ready for your custom integration."
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="relative mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl p-10"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-accent)",
              boxShadow: "var(--shadow-glow)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, var(--accent-glow), transparent)" }}
            />
            <div className="relative flex items-center gap-4">
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                style={{ background: "var(--accent-glow)" }}
              >
                <Webhook className="h-6 w-6" style={{ color: "var(--accent-text)" }} />
              </span>
              <p className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                LAS Mobility exposes a RESTful API and webhook system for custom integrations. All endpoints are documented, versioned, and available to customers on Professional and Enterprise plans.
              </p>
            </div>
            <ul className="relative mt-7 flex flex-col gap-4">
              {apiHighlights.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.07 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "var(--accent-text)" }} />
                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
            <div className="relative mt-8">
              <Link href="/contact" className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold">
                <CalendarCheck className="h-4 w-4" /> Talk to our API team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
