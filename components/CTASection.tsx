"use client";

import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck, Phone } from "lucide-react";
import { useBookDemo } from "@/context/BookDemoContext";

export default function CTASection() {
  const { open: openBookDemo } = useBookDemo();
  return (
    <section className="relative overflow-hidden section-pad" style={{ background: "var(--bg-deep)" }}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%, var(--accent-glow), transparent)" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8"
      >
        <span className="inline-block rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ border: "1px solid var(--border-accent)", color: "var(--accent-text)", background: "var(--accent-glow)" }}>
          Get Started Today
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl" style={{ color: "var(--text-primary)" }}>
          Ready to transform your{" "}
          <span className="gradient-text">fleet operations?</span>
        </h2>
        <p className="mt-5 text-xl" style={{ color: "var(--text-secondary)" }}>
          Join hundreds of fleet teams already using LAS Mobility to track smarter, drive safer, and operate more efficiently.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => openBookDemo("cta-section")}
            className="btn-primary inline-flex items-center gap-2 rounded-xl px-7 py-4 text-base font-semibold"
          >
            <CalendarCheck className="h-5 w-5" />
            Book a Free Demo
          </button>
          <button
            type="button"
            onClick={() => openBookDemo("cta-talk-to-sales")}
            className="btn-ghost inline-flex items-center gap-2 rounded-xl px-7 py-4 text-base font-semibold"
          >
            <Phone className="h-5 w-5" />
            Talk to Sales
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-6 text-sm" style={{ color: "var(--text-muted)" }}>
          Free 14-day trial · No credit card required · Setup in under 48 hours
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 opacity-40">
          {["FastTrack", "CityExpress", "BuildCorp", "SunTrans", "MetroGuard", "Alpine"].map((name) => (
            <span key={name} className="text-sm font-bold tracking-wider" style={{ color: "var(--text-secondary)" }}>{name}</span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
