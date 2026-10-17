import type { LucideIcon } from "lucide-react";
import { Car, Cpu, Gauge, LayoutDashboard, MapPin, Route, Satellite, Sparkles } from "lucide-react";

export interface StoryChapter {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  icon: LucideIcon;
  /** Side of the stage the copy sits on (desktop). */
  align: "left" | "right";
  points?: string[];
}

/**
 * Chapters 1-7 of the scroll story (chapter 0 is the hero, 8 the CTA).
 * Every claim maps to something the platform does today.
 */
export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: "fleet",
    eyebrow: "One platform",
    title: "Every vehicle. One command centre.",
    body: "Cars, vans, trucks, buses, two-wheelers and trailers, tracked and managed side by side across companies, branches and franchises.",
    icon: Car,
    align: "left",
  },
  {
    id: "road",
    eyebrow: "On the road",
    title: "Built for the roads your fleet actually drives.",
    body: "Position, speed, ignition and movement stream in from the telematics unit in every vehicle, so the fleet view reflects what is happening on the road now.",
    icon: Route,
    align: "left",
  },
  {
    id: "gps",
    eyebrow: "Live GPS",
    title: "Know where every vehicle is, down to the street.",
    body: "Live tracking with satellite and signal quality, planned routes, trip replay and geofence entry and exit alerts.",
    icon: Satellite,
    align: "right",
    points: ["Live tracking", "Route replay", "Geofence alerts"],
  },
  {
    id: "telemetry",
    eyebrow: "Telemetry",
    title: "Vehicle telemetry, decoded.",
    body: "Speed, ignition, battery and external voltage, fuel level, GSM signal and temperature probes, plus OBD and TPMS data where the installed device reports them.",
    icon: Gauge,
    align: "left",
    points: ["Fuel management", "Temperature monitoring", "Driver identification"],
  },
  {
    id: "twin",
    eyebrow: "Digital twin",
    title: "See inside every asset.",
    body: "Each sensor is mapped to the vehicle it lives in: GPS unit, power, fuel, immobilizer relay, iButton driver ID, tyres, cargo temperature and doors.",
    icon: Cpu,
    align: "right",
  },
  {
    id: "product",
    eyebrow: "The platform",
    title: "Now meet the real product.",
    body: "Everything you have just seen lands in one web and mobile platform, built for dispatchers, fleet managers and owners.",
    icon: LayoutDashboard,
    align: "left",
  },
  {
    id: "screens",
    eyebrow: "Inside LAS Mobility",
    title: "Dashboards, live maps, trips and vehicle control.",
    body: "Pick up where the road left off: the fleet dashboard, live tracking, trip history and each vehicle's live status and engine commands.",
    icon: MapPin,
    align: "left",
  },
];

export const STORY_SCREEN_IDS = ["dashboard", "live-tracking", "trips", "vehicle-details"];

export const CTA_COPY = {
  eyebrow: "Ready when you are",
  title: "Put your whole fleet on the map.",
  body: "See LAS Mobility with your own vehicles in a guided demo.",
  icon: Sparkles,
};
