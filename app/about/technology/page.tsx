"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ArrowRight,
  CalendarCheck,
  Cpu,
  BrainCircuit,
  Database,
  HardDrive,
  Globe,
  CreditCard,
  Map,
  MessageSquare,
  Settings,
} from "lucide-react";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";

const pillars = [
  {
    icon: Cpu,
    title: "Real-Time Telemetry Engine",
    desc: "Processes GPS pings, CAN bus data, and sensor events at sub-second latency using event-driven microservices (Go + Kafka).",
  },
  {
    icon: BrainCircuit,
    title: "AI Intelligence Layer",
    desc: "Machine learning models for route optimisation, driver risk scoring, anomaly detection, and predictive maintenance built on fleet-specific training data.",
  },
  {
    icon: Database,
    title: "Unified Data Platform",
    desc: "A single source of truth for vehicle data, driver records, route history, maintenance logs, and compliance data — accessible via API or dashboard.",
  },
];

const securityItems = [
  "SOC 2 Type II compliant architecture",
  "End-to-end encryption (TLS 1.3 + AES-256 at rest)",
  "Role-based access control (RBAC) with audit logs",
  "Multi-region data residency options",
  "99.9% uptime SLA with automated failover",
];

const integrations = [
  { icon: HardDrive, category: "GPS Hardware", detail: "4+ OEM integrations" },
  { icon: Settings, category: "ERP Systems", detail: "SAP, Oracle, Microsoft" },
  { icon: CreditCard, category: "Fuel Cards", detail: "Major providers" },
  { icon: Map, category: "Maps & Routing", detail: "Google Maps, HERE, OpenStreetMap" },
  { icon: MessageSquare, category: "Communication", detail: "WhatsApp, Slack, email alerts" },
  { icon: Globe, category: "Fleet Management", detail: "Open API for custom integrations" },
];

export default function TechnologyPage() {
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
              Our Technology
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl" style={{ color: "var(--text-primary)" }}>
              Enterprise-grade platform built for{" "}
              <span className="gradient-text">real-time fleet operations</span>
            </h1>
            <p className="mt-6 text-lg leading-8" style={{ color: "var(--text-secondary)" }}>
              LAS Mobility is a cloud-native, AI-powered fleet intelligence platform designed to process millions of GPS events per day, surface actionable insights in real time, and scale from 5 vehicles to 50,000.
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

      {/* Platform Architecture */}
      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Platform Architecture"
            title="Three layers, one coherent platform"
            description="Every component is engineered for performance, reliability, and real-time data flow at fleet scale."
          />
          <div className="mt-12 flex flex-col gap-5">
            {pillars.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col gap-5 rounded-xl p-7 sm:flex-row sm:items-start"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
              >
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: "var(--accent-glow)" }}
                >
                  <Icon className="h-6 w-6" style={{ color: "var(--accent-text)" }} />
                </span>
                <div>
                  <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-7" style={{ color: "var(--text-secondary)" }}>
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Security & Compliance"
            title="Enterprise security, built in from day one"
            description="Your fleet data is mission-critical. Our security architecture reflects that."
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
            <ul className="relative flex flex-col gap-5">
              {securityItems.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                  className="flex items-center gap-4"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0" style={{ color: "var(--accent-text)" }} />
                  <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Integration Ecosystem */}
      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Integration Ecosystem"
            title="Works with the tools your fleet already uses"
            description="Pre-built integrations across hardware, ERP, fuel management, maps, and communication platforms."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {integrations.map(({ icon: Icon, category, detail }, i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="flex items-center gap-4 rounded-xl p-5"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: "var(--accent-glow)" }}
                >
                  <Icon className="h-5 w-5" style={{ color: "var(--accent-text)" }} />
                </span>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                    {category}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
