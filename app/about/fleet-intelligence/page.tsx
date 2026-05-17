"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Route,
  UserCheck,
  Wrench,
  AlertTriangle,
  ArrowRight,
  CalendarCheck,
  Radio,
  ScanLine,
  BellRing,
} from "lucide-react";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";

const modules = [
  {
    icon: Route,
    title: "Route Intelligence",
    desc: "Analyses historical trip data to identify optimal routes, flag deviations, predict ETA accuracy, and reduce cost per km.",
  },
  {
    icon: UserCheck,
    title: "Driver Risk Scoring",
    desc: "Continuous behaviour scoring across harsh braking, acceleration, speeding, and phone use — with automated coaching prompts.",
  },
  {
    icon: Wrench,
    title: "Predictive Maintenance",
    desc: "Engine hours, mileage patterns, and sensor data combined to flag vehicles likely to fail before they do.",
  },
  {
    icon: AlertTriangle,
    title: "Anomaly Detection",
    desc: "Automatic flagging of unusual fuel consumption, unauthorized stops, route deviations, and after-hours vehicle use.",
  },
];

const steps = [
  {
    icon: Radio,
    step: "01",
    title: "Collect",
    desc: "GPS telemetry, CAN bus data, and driver inputs stream into the platform in real time.",
  },
  {
    icon: ScanLine,
    step: "02",
    title: "Analyse",
    desc: "ML models process events, detect patterns, and score risks against fleet benchmarks.",
  },
  {
    icon: BellRing,
    step: "03",
    title: "Act",
    desc: "Alerts, recommendations, and automated reports reach the right person at the right moment.",
  },
];

const stats = [
  { value: "↓22%", label: "Cost per delivery" },
  { value: "↑18%", label: "Fleet utilisation" },
  { value: "98%", label: "Safety compliance" },
  { value: "↓35%", label: "Unplanned downtime" },
];

export default function FleetIntelligencePage() {
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
              Fleet Intelligence
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl" style={{ color: "var(--text-primary)" }}>
              AI-powered insights that keep your{" "}
              <span className="gradient-text">fleet ahead</span>
            </h1>
            <p className="mt-6 text-lg leading-8" style={{ color: "var(--text-secondary)" }}>
              LAS Mobility&apos;s intelligence layer goes beyond dashboards. It analyses patterns, scores risk, predicts failures, and surfaces recommendations that turn fleet data into competitive advantage.
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

      {/* Intelligence Modules — 2x2 grid */}
      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Intelligence Modules"
            title="Four engines powering smarter fleet decisions"
            description="Each module is independently powerful. Together, they give operators complete situational awareness."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {modules.map(({ icon: Icon, title, desc }, i) => (
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

      {/* How It Works — 3-step process */}
      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="How It Works"
            title="From raw data to decisive action"
            description="The intelligence pipeline runs continuously — so you never have to wait for a report to know what is happening."
          />
          <div className="relative mt-14">
            {/* Connector line — desktop only */}
            <div
              className="absolute left-0 right-0 top-8 hidden h-px lg:block"
              style={{ background: "var(--border-accent)", opacity: 0.4 }}
            />
            <div className="grid gap-8 lg:grid-cols-3">
              {steps.map(({ icon: Icon, step, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="relative rounded-xl p-7 text-center"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                >
                  <span
                    className="mx-auto flex h-14 w-14 items-center justify-center rounded-full text-xs font-bold"
                    style={{ background: "var(--accent-glow)", border: "2px solid var(--border-accent)", color: "var(--accent-text)" }}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <p className="mt-1 text-xs font-bold tracking-widest" style={{ color: "var(--text-muted)" }}>
                    STEP {step}
                  </p>
                  <h3 className="mt-3 text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
                    {desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Outcomes — Stats bar */}
      <section style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <div
              className="grid grid-cols-2 lg:grid-cols-4"
              style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
            >
              {stats.map(({ value, label }, i) => (
                <div
                  key={label}
                  className="px-8 py-12 text-center"
                  style={{ borderRight: i < 3 ? "1px solid var(--border)" : undefined }}
                >
                  <p className="text-3xl font-bold lg:text-4xl" style={{ color: "var(--accent-text)" }}>
                    {value}
                  </p>
                  <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
