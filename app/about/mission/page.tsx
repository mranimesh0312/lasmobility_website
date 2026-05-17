"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Map, Shield, Zap, CheckCircle2, ArrowRight, CalendarCheck } from "lucide-react";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";

const visionCards = [
  {
    title: "A world where no fleet runs blind",
    desc: "Every vehicle, every driver, every route — fully visible in real time.",
  },
  {
    title: "Safety as a default, not an afterthought",
    desc: "Driver coaching and risk scoring built into the daily workflow.",
  },
  {
    title: "Intelligence that acts",
    desc: "Not dashboards that need interpreting, but insights that tell you what to do next.",
  },
];

const values = [
  {
    icon: Map,
    title: "Clarity",
    desc: "We simplify complexity, not add to it.",
  },
  {
    icon: Shield,
    title: "Reliability",
    desc: "99.9% uptime is the floor, not the ceiling.",
  },
  {
    icon: Zap,
    title: "Speed",
    desc: "Alerts in under 5 seconds, insights in real time.",
  },
  {
    icon: CheckCircle2,
    title: "Integrity",
    desc: "We build things that actually work for fleet operators.",
  },
];

export default function MissionPage() {
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
              Mission &amp; Vision
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl" style={{ color: "var(--text-primary)" }}>
              We exist to give fleet operators{" "}
              <span className="gradient-text">total clarity</span>
            </h1>
            <p className="mt-6 text-lg leading-8" style={{ color: "var(--text-secondary)" }}>
              Fleet management today is reactive, fragmented, and built on outdated assumptions. LAS Mobility was built to change that — making fleet intelligence proactive, unified, and genuinely useful.
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

      {/* Our Mission — Full-width statement card */}
      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Mission"
            title="What we are here to do"
            description="A single guiding statement shapes every product decision we make."
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mt-12 overflow-hidden rounded-2xl px-8 py-14 text-center sm:px-16"
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
            <blockquote className="relative text-xl font-semibold leading-relaxed sm:text-2xl lg:text-3xl" style={{ color: "var(--text-primary)" }}>
              &ldquo;To empower every fleet operator with the real-time intelligence, safety insights, and operational clarity they need to run a more efficient, safer, and smarter fleet.&rdquo;
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* Our Vision — 3 cards */}
      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Vision"
            title="The future we are building toward"
            description="Three principles guide every roadmap decision and product investment."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visionCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="rounded-xl p-8"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
              >
                <span
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold"
                  style={{ background: "var(--accent-glow)", color: "var(--accent-text)" }}
                >
                  {i + 1}
                </span>
                <h3 className="mt-5 text-lg font-bold leading-snug" style={{ color: "var(--text-primary)" }}>
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values — 4 icon cards */}
      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Values"
            title="The principles behind every decision"
            description="These are not aspirational words on a wall. They are engineering constraints we hold ourselves to."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="rounded-xl p-6"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: "var(--accent-glow)" }}
                >
                  <Icon className="h-5 w-5" style={{ color: "var(--accent-text)" }} />
                </span>
                <h3 className="mt-4 text-base font-bold" style={{ color: "var(--text-primary)" }}>
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
