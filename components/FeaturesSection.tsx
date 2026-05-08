"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Map, Route, ShieldAlert, Fuel, BellRing, BrainCircuit,
  Wrench, BarChart2, Users, ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Map,
    title: "Live Map Dashboard",
    description: "Monitor all vehicle locations, movement status, routes, stops, and branch-level fleet activity from one unified command center.",
    href: "/features#tracking",
    highlight: true,
  },
  {
    icon: ShieldAlert,
    title: "Driver Safety Scoring",
    description: "Track overspeeding, harsh braking, rapid acceleration, and risk patterns. Score every driver to improve safety culture across your fleet.",
    href: "/features#safety",
    highlight: false,
  },
  {
    icon: Route,
    title: "Route History & Analytics",
    description: "Full trip timeline replay, stoppage analysis, route deviation detection, and distance tracking for accountability and planning.",
    href: "/features#routes",
    highlight: false,
  },
  {
    icon: Fuel,
    title: "Fuel & Idle Monitoring",
    description: "Understand fuel usage trends, idle time waste, fill-up anomalies, and efficiency opportunities by vehicle, driver, or region.",
    href: "/features#fuel",
    highlight: true,
  },
  {
    icon: BellRing,
    title: "Smart Alert Engine",
    description: "Geofence events, speeding thresholds, device health, route deviations — get the right alerts at the right time, your way.",
    href: "/features#alerts",
    highlight: false,
  },
  {
    icon: BrainCircuit,
    title: "AI Fleet Insights",
    description: "Anomaly detection, predictive recommendations, and intelligent scoring surfaces where your attention will make the most impact.",
    href: "/ai-intelligence",
    highlight: false,
  },
  {
    icon: Wrench,
    title: "Maintenance Intelligence",
    description: "Organize usage metrics, mileage thresholds, and service history so your team can schedule maintenance before breakdowns occur.",
    href: "/features#maintenance",
    highlight: false,
  },
  {
    icon: BarChart2,
    title: "Reports & Exports",
    description: "Scheduled PDF/CSV reports, executive dashboards, custom date ranges, and role-based reporting access for every stakeholder.",
    href: "/features#reports",
    highlight: false,
  },
  {
    icon: Users,
    title: "Driver Management",
    description: "Assign vehicles to drivers, track behavior history, view scorecards, and build a culture of accountability across your fleet.",
    href: "/features#drivers",
    highlight: false,
  },
];

export default function FeaturesSection() {
  return (
    <section className="section-pad" style={{ background: "var(--bg-base)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-block rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ border: "1px solid var(--border-accent)", color: "var(--accent-text)", background: "var(--accent-glow)" }}>
            Core Platform
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--text-primary)" }}>
            Everything your fleet team{" "}
            <span className="gradient-text">needs to win</span>
          </h2>
          <p className="mt-4 text-lg" style={{ color: "var(--text-secondary)" }}>
            Tracking, safety, analytics, driver management, fuel visibility, and AI guidance — unified in one secure platform built for modern multi-vehicle operations.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
              >
                <Link href={feature.href} className="feature-card group block h-full rounded-2xl p-6 no-underline">
                  <div
                    className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: feature.highlight ? "var(--accent)" : "var(--accent-glow)",
                      color: feature.highlight ? "var(--bg-deep)" : "var(--accent-text)",
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7" style={{ color: "var(--text-secondary)" }}>
                    {feature.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold opacity-0 transition-opacity duration-200 group-hover:opacity-100" style={{ color: "var(--accent-text)" }}>
                    Learn more <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center"
        >
          <Link href="/features" className="btn-ghost inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold">
            View all platform features
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
