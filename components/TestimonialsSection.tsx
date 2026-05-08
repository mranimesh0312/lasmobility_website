"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote: "LAS Mobility completely transformed how we manage our logistics fleet. Real-time tracking and AI alerts have cut idle time by over 20% within the first 3 months.",
    name: "Rajan Mehta",
    title: "Head of Operations",
    company: "FastTrack Logistics",
    rating: 5,
    initials: "RM",
    color: "#0ECECE",
  },
  {
    quote: "The driver safety scoring alone was worth switching. We've seen a 35% reduction in harsh braking incidents and our insurance premiums have dropped significantly.",
    name: "Anita Sharma",
    title: "Fleet Manager",
    company: "City Express Deliveries",
    rating: 5,
    initials: "AS",
    color: "#22C55E",
  },
  {
    quote: "Finally a fleet platform that our ops team actually uses daily. The dashboard is intuitive and the AI recommendations are genuinely useful, not just noise.",
    name: "Vikram Nair",
    title: "VP Operations",
    company: "BuildCorp Equipment",
    rating: 5,
    initials: "VN",
    color: "#8B5CF6",
  },
  {
    quote: "Fuel savings have been remarkable — we identified 4 vehicles with abnormal consumption patterns in the first week that we'd completely missed before.",
    name: "Priya Krishnan",
    title: "Transport Director",
    company: "SunTrans Mobility",
    rating: 5,
    initials: "PK",
    color: "#F59E0B",
  },
  {
    quote: "The geofencing and alert system is incredibly flexible. We set it up in an afternoon and it has already prevented two unauthorized vehicle uses.",
    name: "Suresh Patel",
    title: "Security Manager",
    company: "Metro Guard Services",
    rating: 5,
    initials: "SP",
    color: "#0ECECE",
  },
  {
    quote: "LAS Mobility's onboarding support was outstanding. Within 2 weeks our entire 80-vehicle fleet was live and our managers were running their own reports.",
    name: "Deepa Iyer",
    title: "COO",
    company: "Alpine School Transport",
    rating: 5,
    initials: "DI",
    color: "#22C55E",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section-pad" style={{ background: "var(--bg-base)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-block rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ border: "1px solid var(--border-accent)", color: "var(--accent-text)", background: "var(--accent-glow)" }}>
            Customer Stories
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--text-primary)" }}>
            Trusted by fleet teams{" "}
            <span className="gradient-text">that move the world</span>
          </h2>
          <p className="mt-4 text-lg" style={{ color: "var(--text-secondary)" }}>
            From logistics to construction, enterprise to startups — fleet operators rely on LAS Mobility every day.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="feature-card flex flex-col rounded-2xl p-6"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-current" style={{ color: "#F59E0B" }} />
                ))}
              </div>

              {/* Quote */}
              <Quote className="mt-4 h-5 w-5 opacity-30" style={{ color: t.color }} />
              <p className="mt-2 flex-1 text-sm leading-7" style={{ color: "var(--text-secondary)" }}>
                {t.quote}
              </p>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ background: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{t.name}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{t.title} · {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
