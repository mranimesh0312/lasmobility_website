import type { Metadata } from "next";
import HomeExperience from "@/components/animations/HomeExperience";
import StatsBar from "@/components/StatsBar";
import AppReplica from "@/components/replica/AppReplica";
import FeaturesSection from "@/components/FeaturesSection";
import MobileAppPreview from "@/components/MobileAppPreview";
import AIIntelligenceSection from "@/components/AIIntelligenceSection";
import IndustryCarousel from "@/components/IndustryCarousel";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "AI-Powered Fleet Intelligence for Modern Mobility",
  description:
    "LAS Mobility delivers real-time vehicle tracking, fleet analytics, smart alerts, driver behavior monitoring, and AI-powered operational insights.",
};

export default function Home() {
  return (
    <>
      <HomeExperience />
      <StatsBar />
      <AppReplica />
      <FeaturesSection />
      <AIIntelligenceSection />
      <MobileAppPreview />
      <IndustryCarousel />
      <FAQSection />
      <CTASection />
    </>
  );
}
