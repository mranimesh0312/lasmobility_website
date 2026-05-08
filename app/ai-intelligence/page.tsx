import type { Metadata } from "next";
import { BrainCircuit, ChartNoAxesCombined, Gauge, MessageSquareText, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import SectionHeader from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import DashboardMockup from "@/components/DashboardMockup";

export const metadata: Metadata = {
  title: "AI Intelligence",
  description: "LAS Mobility AI Intelligence helps with driver risk scoring, anomaly detection, fuel efficiency insights, predictive maintenance readiness, natural language fleet insights, and operational recommendations."
};

const aiFeatures = [
  { icon: ShieldCheck, title: "Driver Risk Scoring", description: "Combine overspeeding, harsh braking, harsh acceleration, trip patterns, and event frequency into practical risk indicators." },
  { icon: BrainCircuit, title: "Fleet Anomaly Detection", description: "Detect unusual fuel variance, route deviation, idle spikes, connectivity gaps, or vehicle behavior that deserves attention." },
  { icon: Gauge, title: "Fuel Efficiency Insights", description: "Highlight the vehicles, routes, and driving behaviors most likely to affect fuel efficiency and avoidable cost." },
  { icon: Wrench, title: "Predictive Maintenance Readiness", description: "Prepare fleets for maintenance intelligence by organizing usage, activity, device health, and performance signals." },
  { icon: MessageSquareText, title: "Natural Language Fleet Insights", description: "Ask questions about fleet trends, safety events, utilization, and exceptions in plain business language." },
  { icon: ChartNoAxesCombined, title: "Operational Recommendations", description: "Prioritize actions that can improve safety, reduce idle time, optimize utilization, and strengthen route discipline." }
];

export default function AIIntelligencePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink px-4 py-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(32,201,151,0.18),transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl">
          <SectionHeader
            inverse
            eyebrow="AI Intelligence"
            title="The intelligence layer for modern fleet operations"
            description="LAS Mobility positions AI where it matters most: surfacing risks, explaining patterns, detecting anomalies, and helping operations teams choose the next best action."
          />
          <div className="mx-auto mt-12 max-w-4xl rounded-lg border border-white/10 bg-white/[0.04] p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cyan/10 text-cyan">
                <Sparkles className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">From dashboards to decisions</h2>
                <p className="mt-3 leading-7 text-slate-300">
                  Fleet teams already collect thousands of signals. LAS Mobility helps convert those signals into focused insight, so managers can see what changed, why it matters, and what to review next.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {aiFeatures.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Responsible intelligence"
            title="AI that supports operational judgment"
            description="LAS Mobility is designed to make fleet teams faster and better informed, with human decision-makers staying in control of safety, compliance, maintenance, and business action."
          />
          <div className="mt-12">
            <DashboardMockup />
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
