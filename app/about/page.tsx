import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about LAS Mobility, a modern mobility intelligence platform built to simplify fleet operations and improve visibility, safety, and performance.",
};

const pillars = [
  "Real-time fleet visibility",
  "Safety and behavior insights",
  "AI-powered operational intelligence",
  "Secure cloud platform",
  "Multi-branch management",
  "Enterprise-grade reliability",
];

export default function AboutPage() {
  return (
    <>
      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <div>
            <span
              className="inline-block rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{ border: "1px solid var(--border-accent)", color: "var(--accent-text)", background: "var(--accent-glow)" }}
            >
              About LAS Mobility
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl" style={{ color: "var(--text-primary)" }}>
              Simplifying fleet operations with clear, intelligent visibility
            </h1>
            <p className="mt-5 text-lg leading-8" style={{ color: "var(--text-secondary)" }}>
              LAS Mobility is a modern mobility intelligence platform for businesses that need better control over vehicles, drivers, routes, alerts, and performance. Built around practical fleet workflows, not complexity for its own sake.
            </p>
            <p className="mt-4 leading-7" style={{ color: "var(--text-secondary)" }}>
              Our focus is to help operators, managers, and leadership teams move from scattered tracking data to a trusted operating view that supports faster decisions and safer fleet performance.
            </p>
          </div>

          <div
            className="rounded-2xl p-8"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-glow)" }}
          >
            <Image src="/logo.svg" width={280} height={63} alt="LAS Mobility" className="h-14 w-auto max-w-full" />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {pillars.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "var(--accent-text)" }} />
                  <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our approach"
            title="Fleet software should make operations calmer, not noisier"
            description="LAS Mobility emphasizes useful alerts, clear analytics, role-based access, and intelligence that helps teams decide what to do next. The goal is simple: fewer blind spots, faster response, and better fleet outcomes."
          />
        </div>
      </section>

      <CTASection />
    </>
  );
}
