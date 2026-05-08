import type { Metadata } from "next";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import FeaturesSection from "@/components/FeaturesSection";
import LiveDashboardPreview from "@/components/LiveDashboardPreview";
import AIIntelligenceSection from "@/components/AIIntelligenceSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import IndustryCarousel from "@/components/IndustryCarousel";

export const metadata: Metadata = {
  title: "AI-Powered Fleet Intelligence for Modern Mobility",
  description:
    "LAS Mobility delivers real-time vehicle tracking, fleet analytics, smart alerts, driver behavior monitoring, and AI-powered operational insights.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <FeaturesSection />
      <LiveDashboardPreview />
      <AIIntelligenceSection />
      <IndustryCarousel />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
