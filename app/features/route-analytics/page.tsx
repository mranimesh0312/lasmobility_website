import type { Metadata } from "next";
import ModulePage from "@/components/modules/ModulePage";
import { moduleBySlug } from "@/data/liveModules";

export const metadata: Metadata = {
  title: "Route Analytics | LAS Mobility",
  description:
    "Automatic trip logs with replay, stoppage analysis, planned vs actual comparison and export-ready distance and duration reports.",
};

export default function RouteAnalyticsPage() {
  return <ModulePage module={moduleBySlug("route-analytics")} />;
}
