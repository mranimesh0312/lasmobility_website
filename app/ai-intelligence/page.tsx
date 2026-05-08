import type { Metadata } from "next";
import {
  BrainCircuit, ChartNoAxesCombined, Gauge, MessageSquareText,
  ShieldCheck, Sparkles, Wrench,
} from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import SectionHeader from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import LiveDashboardPreview from "@/components/LiveDashboardPreview";

export const metadata: Metadata = {
  title: "AI Intelligence",
  description:
    "LAS Mobility AI Intelligence helps with driver risk scoring, anomaly detection, fuel efficiency insights, predictive maintenance readiness, and operational recommendations.",
};

const aiFeatures = [
  { icon: ShieldCheck,          title: "Driver Risk Scoring",           description: "Combine overspeeding, harsh braking, acceleration patterns, and event frequency into practical, actionable risk indicators." },
  { icon: BrainCircuit,         title: "Fleet Anomaly Detection",       description: "Detect unusual fuel variance, route deviation, idle spikes, connectivity gaps, or vehicle behavior that deserves immediate attention." },
  { icon: Gauge,                title: "Fuel Efficiency Insights",      description: "Highlight the vehicles, routes, and driving behaviors most likely to affect fuel efficiency and avoidable operational cost." },
  { icon: Wrench,               title: "Predictive Maintenance",        description: "Prepare fleets for maintenance intelligence by organizing usage, activity, device health, and performance signals." },
  { icon: MessageSquareText,    title: "Natural Language Insights",     description: "Ask questions about fleet trends, safety events, utilization, and exceptions in plain business language and get instant answers." },
  { icon: ChartNoAxesCombined,  title: "Operational Recommendations",  description: "Prioritize actions that can improve safety, reduce idle time, optimize utilization, and strengthen route discipline." },
];

export default function AIIntelligencePage() {
  return (
    <>
      <section
        className="section-pad relative overflow-hidden"
        style={{ background: "var(--bg-deep)" }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 60% 40% at 70% 20%, var(--accent-glow), transparent)" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="AI Intelligence"
            title="The intelligence layer for modern fleet operations"
            description="LAS Mobility positions AI where it matters most: surfacing risks, explaining patterns, detecting anomalies, and helping operations teams choose the next best action."
          />

          <div
            className="mx-auto mt-10 max-w-3xl rounded-2xl p-6"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-accent)" }}
          >
            <div className="flex items-start gap-4">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                style={{ background: "var(--accent-glow)" }}
              >
                <Sparkles className="h-6 w-6" style={{ color: "var(--accent-text)" }} />
              </div>
              <div>
                <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                  From dashboards to decisions
                </h2>
                <p className="mt-2 leading-7" style={{ color: "var(--text-secondary)" }}>
                  Fleet teams already collect thousands of signals. LAS Mobility converts those signals into focused insight, so managers can see what changed, why it matters, and what to review next.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {aiFeatures.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Responsible intelligence"
            title="AI that supports operational judgment"
            description="LAS Mobility is designed to make fleet teams faster and better informed, with human decision-makers staying in control of safety, compliance, maintenance, and business action."
          />
        </div>
      </section>

      <LiveDashboardPreview />
      <CTASection />
    </>
  );
}
