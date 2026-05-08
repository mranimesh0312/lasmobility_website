import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about LAS Mobility, a modern mobility intelligence platform built to simplify fleet operations and improve visibility, safety, and performance."
};

export default function AboutPage() {
  return (
    <>
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan">About LAS Mobility</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Simplifying fleet operations with clear, intelligent visibility
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              LAS Mobility is a modern mobility intelligence platform for businesses that need better control over vehicles, drivers, routes, alerts, and performance. The platform is built around practical fleet workflows, not complexity for its own sake.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              Our focus is to help operators, managers, and leadership teams move from scattered tracking data to a trusted operating view that supports faster decisions and safer fleet performance.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-[#06152b] p-8 shadow-glow">
            <Image src="/logo.svg" width={300} height={67} alt="LAS Mobility" className="h-16 w-auto max-w-full" />
            <div className="mt-8 grid gap-4">
              {["Real-time fleet visibility", "Safety and behavior insights", "AI-powered operational intelligence", "Secure cloud platform"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-mint" aria-hidden="true" />
                  <p className="font-medium text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
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
