import type { Metadata } from "next";
import ModulePage from "@/components/modules/ModulePage";
import { moduleBySlug } from "@/data/liveModules";

export const metadata: Metadata = {
  title: "Dash Cam & DVR | LAS Mobility",
  description:
    "Dash cam and DVR integration in development: event-triggered clips, live camera view and footage with GPS context.",
};

export default function DashCamPage() {
  return <ModulePage module={moduleBySlug("dash-cam-dvr")} />;
}
