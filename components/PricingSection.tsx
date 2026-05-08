"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Zap } from "lucide-react";

const plans = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For small fleets getting started",
    priceMonthly: 29,
    priceAnnual: 23,
    per: "vehicle / month",
    vehicles: "Up to 10 vehicles",
    features: [
      "Real-time GPS tracking",
      "Trip history & replay",
      "Basic driver scoring",
      "Email & SMS alerts",
      "Mobile app access",
      "7-day data history",
      "Email support",
    ],
    cta: "Start Free Trial",
    href: "/contact",
    featured: false,
  },
  {
    id: "professional",
    name: "Professional",
    tagline: "For growing operations teams",
    priceMonthly: 49,
    priceAnnual: 39,
    per: "vehicle / month",
    vehicles: "Up to 100 vehicles",
    features: [
      "Everything in Starter",
      "Fuel monitoring & analytics",
      "Advanced driver safety",
      "Geofencing (unlimited zones)",
      "Route optimization",
      "Custom reports & exports",
      "90-day data history",
      "API access",
      "Priority support",
    ],
    cta: "Start Free Trial",
    href: "/contact",
    featured: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For large fleets & enterprise scale",
    priceMonthly: null,
    priceAnnual: null,
    per: "custom pricing",
    vehicles: "Unlimited vehicles",
    features: [
      "Everything in Professional",
      "AI fleet intelligence engine",
      "Predictive maintenance",
      "Multi-branch management",
      "Custom integrations & ERP",
      "Dedicated account manager",
      "Unlimited data history",
      "SLA guarantee (99.9%)",
      "On-site onboarding",
    ],
    cta: "Contact Sales",
    href: "/contact",
    featured: false,
  },
];

export default function PricingSection() {
  const [annual, setAnnual] = useState(true);

  return (
    <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-block rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ border: "1px solid var(--border-accent)", color: "var(--accent-text)", background: "var(--accent-glow)" }}>
            Pricing
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--text-primary)" }}>
            Simple, transparent{" "}
            <span className="gradient-text">pricing</span>
          </h2>
          <p className="mt-4 text-lg" style={{ color: "var(--text-secondary)" }}>
            Pay per vehicle. Scale as you grow. No hidden fees, no long-term lock-in.
          </p>

          {/* Toggle */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="text-sm font-medium" style={{ color: annual ? "var(--text-muted)" : "var(--text-primary)" }}>Monthly</span>
            <button
              onClick={() => setAnnual((v) => !v)}
              className="relative h-6 w-11 rounded-full transition-colors"
              style={{ background: annual ? "var(--accent)" : "var(--border)" }}
            >
              <motion.div
                animate={{ x: annual ? 22 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow"
              />
            </button>
            <span className="text-sm font-medium" style={{ color: annual ? "var(--text-primary)" : "var(--text-muted)" }}>
              Annual
              <span className="ml-1.5 rounded-full px-2 py-0.5 text-xs font-semibold" style={{ background: "rgba(34,197,94,0.12)", color: "#22C55E" }}>Save 20%</span>
            </span>
          </div>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex flex-col rounded-2xl p-7 ${plan.featured ? "pricing-featured" : ""}`}
              style={{
                background: plan.featured ? "var(--bg-card)" : "var(--bg-card)",
                border: plan.featured ? `2px solid var(--accent)` : `1px solid var(--border)`,
                boxShadow: plan.featured ? "var(--shadow-glow), var(--shadow-card)" : "var(--shadow-card)",
              }}
            >
              {plan.featured && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold"
                  style={{ background: "var(--accent)", color: "var(--bg-deep)" }}
                >
                  <Zap className="mr-1 inline h-3 w-3" />
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>{plan.name}</h3>
                <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>{plan.tagline}</p>

                <div className="mt-5">
                  {plan.priceMonthly !== null ? (
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-bold" style={{ color: "var(--text-primary)" }}>
                        ${annual ? plan.priceAnnual : plan.priceMonthly}
                      </span>
                      <span className="mb-1 text-sm" style={{ color: "var(--text-muted)" }}>/ {plan.per}</span>
                    </div>
                  ) : (
                    <div className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>Custom</div>
                  )}
                  <p className="mt-1 text-xs font-medium" style={{ color: "var(--accent-text)" }}>{plan.vehicles}</p>
                </div>
              </div>

              <ul className="mt-7 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--accent-text)" }} />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`mt-8 block rounded-xl px-5 py-3 text-center text-sm font-semibold transition ${
                  plan.featured ? "btn-primary" : "btn-ghost"
                }`}
              >
                {plan.cta} <ArrowRight className="ml-1 inline h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm" style={{ color: "var(--text-muted)" }}>
          All plans include a 14-day free trial. No credit card required. Cancel anytime.
        </p>
      </div>
    </section>
  );
}
