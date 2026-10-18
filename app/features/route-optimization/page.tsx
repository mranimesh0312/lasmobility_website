import type { Metadata } from "next";
import ModulePage from "@/components/modules/ModulePage";
import { moduleBySlug } from "@/data/liveModules";

export const metadata: Metadata = {
  title: "Route Optimization | LAS Mobility",
  description:
    "Multi-stop route planning, live ETAs, efficiency scoring and planned vs actual comparison to cut distance per delivery.",
};

export default function RouteOptimizationPage() {
  return <ModulePage module={moduleBySlug("route-optimization")} />;
}
