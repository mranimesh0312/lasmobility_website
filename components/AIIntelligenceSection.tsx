"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  BrainCircuit, Gauge, Wrench, Activity, TrendingUp, Shield,
  ArrowRight,
} from "lucide-react";

const cards = [
  {
    icon: BrainCircuit,
    title: "Anomaly Detection",
    description: "Surface unusual trips, fuel variance, route deviations, or device signals before they become serious issues.",
  },
  {
    icon: Gauge,
    title: "Risk Scoring",
    description: "Rank driver and vehicle risk using safety events, speed behavior, and full operational context.",
  },
  {
    icon: Wrench,
    title: "Maintenance Readiness",
    description: "Organize usage and health data so teams can prepare for predictive maintenance workflows.",
  },
  {
    icon: Activity,
    title: "Smart Recommendations",
    description: "Convert raw fleet data into practical next actions for safety, utilization, routing, and cost control.",
  },
  {
    icon: TrendingUp,
    title: "Performance Benchmarking",
    description: "Compare drivers, vehicles, routes, and branches to identify top performers and improvement areas.",
  },
  {
    icon: Shield,
    title: "Predictive Safety",
    description: "Identify high-risk behavior patterns before accidents happen with proactive driver coaching triggers.",
  },
];

export default function AIIntelligenceSection() {
  return (
    <section className="section-pad relative overflow-hidden" style={{ background: "var(--bg-card)" }}>
      {/* Accent background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 0% 50%, var(--accent-glow), transparent), radial-gradient(ellipse 60% 40% at 100% 50%, var(--accent-glow), transparent)",
          opacity: 0.5,
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ border: "1px solid var(--border-accent)", color: "var(--accent-text)", background: "var(--accent-glow)" }}>
              AI Intelligence
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--text-primary)" }}>
              Move from monitoring to{" "}
              <span className="gradient-text">operational intelligence</span>
            </h2>
            <p className="mt-4 text-lg leading-8" style={{ color: "var(--text-secondary)" }}>
              LAS Mobility&apos;s AI engine continuously analyzes your fleet data to surface anomalies, rank risks, and generate actionable recommendations — so your team can act, not just observe.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                "Automated anomaly detection across all vehicles",
                "Driver risk scoring updated in real time",
                "AI-generated recommendations with context",
                "Predictive maintenance triggers based on usage",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "var(--text-secondary)" }}>
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full" style={{ background: "var(--accent)" }} />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/ai-intelligence"
              className="btn-primary mt-8 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold"
            >
              Explore AI Features
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* Right: feature cards grid */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-4"
          >
            {cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="feature-card rounded-xl p-5"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: "var(--accent-glow)" }}>
                    <Icon className="h-4.5 w-4.5" style={{ color: "var(--accent-text)" }} />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{card.title}</h3>
                  <p className="mt-1.5 text-xs leading-5" style={{ color: "var(--text-secondary)" }}>{card.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
