import type { LucideIcon } from "lucide-react";
import type { ScreenId } from "@/components/replica/context";
import { DASH_CAM, PLATFORM } from "./platformModules";
import {
  BarChart3, Bell, Building2, Clock, FlaskConical, Fingerprint, Fuel, Gauge, IdCard, MapPin,
  Package, Radio, Route, School, ShieldAlert, ShieldCheck, Thermometer, TrendingDown, Truck,
  UserCheck, Wifi,
} from "lucide-react";

export type Tone = "ok" | "warn" | "alert" | "info";

export interface ModuleContent {
  slug: string;
  /** Platform software modules vs. hardware (sensor) modules. */
  family: "platform" | "hardware";
  status: "live" | "soon";
  /** Custom hero visual in place of the generic instrument panel. */
  heroVisual?: "dashcam";
  /** Coded app screen shown on the page (none while a module is in development). */
  screen?: ScreenId;
  icon: LucideIcon;
  name: string;
  title: [string, string];
  lead: string;
  proof: string[];
  /** Live instrument panel in the hero. Illustrative values, labelled as demo. */
  panel: {
    heading: string;
    vehicle: string;
    readings: { label: string; value: string; tone?: Tone }[];
    series: { label: string; points: number[]; band?: [number, number]; unit: string };
    events: { time: string; text: string; tone: Tone }[];
  };
  records: { icon: LucideIcon; label: string; text: string }[];
  capabilities: { icon: LucideIcon; title: string; description: string }[];
  steps: { title: string; body: string }[];
  inApp: string[];
  useCases: { icon: LucideIcon; industry: string; description: string; outcome: string }[];
}

/**
 * The three hardware modules that are live in the LAS Mobility app
 * (/fuel/overview, /temperature/overview, /drivers). Copy states what the
 * platform does; there are no customer statistics or guarantees here.
 */
const HARDWARE: ModuleContent[] = [
  {
    slug: "fuel-monitoring",
    family: "hardware",
    status: "live",
    screen: "fuel",
    icon: Fuel,
    name: "Fuel Monitoring",
    title: ["Every litre,", "accounted for."],
    lead: "Fuel level sensors feed live tank readings into LAS Mobility. Refuels and drains are detected automatically and placed on the map, so your biggest variable cost becomes a number you can manage.",
    proof: ["Live tank level", "Refuel & drain detection", "Consumption per km", "Fuel reports & exports"],
    panel: {
      heading: "Fuel level · last 6 h",
      vehicle: "DEMO-204 · Tanker",
      readings: [
        { label: "Tank", value: "312 L", tone: "ok" },
        { label: "Today", value: "+180 L refuel", tone: "info" },
        { label: "Status", value: "Drain flagged", tone: "warn" },
      ],
      series: { label: "Litres", unit: "L", points: [210, 196, 181, 168, 352, 344, 331, 318, 290, 287, 312] },
      events: [
        { time: "07:42", text: "Refuel +180 L · Hosur Rd depot", tone: "info" },
        { time: "11:05", text: "Drop 27 L while parked · review", tone: "warn" },
      ],
    },
    records: [
      { icon: Gauge, label: "Tank level", text: "Live litres from the installed level sensor" },
      { icon: Fuel, label: "Refuel events", text: "Quantity, place and time of every fill" },
      { icon: ShieldAlert, label: "Drain events", text: "Sudden drops while the vehicle is stationary" },
      { icon: TrendingDown, label: "Consumption", text: "Litres per km by vehicle, driver and trip" },
    ],
    capabilities: [
      { icon: Fuel, title: "Real-time fuel level", description: "Live tank levels for every vehicle on the dashboard and on the vehicle's detail page, read from the sensor connected to the GPS device." },
      { icon: ShieldAlert, title: "Theft & drain detection", description: "Sharp drops while a vehicle is parked raise an alert. Every suspected drain is timestamped and placed on the map." },
      { icon: Bell, title: "Refuel event logging", description: "Each refuel is recorded with quantity, location, time and vehicle, building an auditable trail you can reconcile against fuel bills." },
      { icon: BarChart3, title: "Consumption analytics", description: "Litres per kilometre by vehicle, route and driver, so inefficient vehicles and habits stand out." },
      { icon: TrendingDown, title: "Cost-per-km reporting", description: "Fuel data combined with trip distance gives per-vehicle and fleet-wide cost, ready to export for finance." },
      { icon: Clock, title: "Idle fuel waste", description: "See which vehicles burn fuel while stationary and how much idling costs, not just how long it lasts." },
    ],
    steps: [
      { title: "Sensor in the tank", body: "A fuel level sensor is fitted and calibrated to the tank, so readings convert to litres." },
      { title: "Read by the GPS unit", body: "The installed telematics device reports the sensor value with every position update." },
      { title: "Events detected", body: "The platform marks refuels and drains on the fuel chart and raises alerts for drops." },
      { title: "Reports & exports", body: "Fuel overview, per-vehicle history and cost reports are a click away, in PDF or Excel." },
    ],
    inApp: [
      "Fleet fuel overview with consumption and spend",
      "Per-vehicle fuel chart with refuel and drain markers",
      "Fuel events placed on the trip map",
      "Alerts for sudden drops and low levels",
      "Scheduled fuel reports by email",
    ],
    useCases: [
      { icon: Truck, industry: "Long-haul logistics", description: "Track diesel across trucks, catch drains at remote stops and reconcile pump vouchers against recorded fills.", outcome: "Fills and drains reconciled per trip" },
      { icon: Building2, industry: "Construction & mining", description: "Monitor equipment fuel where manual dipping is impractical and alert supervisors to unauthorised drainage.", outcome: "Site fuel visible without dipping" },
      { icon: Route, industry: "Multi-branch fleets", description: "Bring fuel spend for every depot and branch into one view and compare cost per km by location.", outcome: "One fuel view across branches" },
    ],
  },
  {
    slug: "temperature-monitoring",
    family: "hardware",
    status: "live",
    screen: "temperature",
    icon: Thermometer,
    name: "Temperature Monitoring",
    title: ["Cold chain,", "always in range."],
    lead: "Temperature probes in the cargo compartment report alongside position and telemetry. LAS Mobility charts every zone, alerts the moment a reading leaves its range, and keeps the history for audits.",
    proof: ["Live compartment readings", "Threshold breach alerts", "Trip temperature history", "Exportable logs"],
    panel: {
      heading: "Cargo zone 1 · last 6 h",
      vehicle: "DEMO-118 · Reefer van",
      readings: [
        { label: "Zone 1", value: "4.2 °C", tone: "ok" },
        { label: "Zone 2", value: "-17.8 °C", tone: "ok" },
        { label: "Door", value: "Closed", tone: "ok" },
      ],
      series: { label: "°C", unit: "°C", band: [2, 8], points: [4.1, 4.4, 4.0, 4.6, 5.2, 8.6, 7.1, 5.0, 4.4, 4.3, 4.2] },
      events: [
        { time: "09:31", text: "Zone 1 above 8 °C for 6 min · door open", tone: "alert" },
        { time: "09:37", text: "Back in range · 7.1 °C", tone: "ok" },
      ],
    },
    records: [
      { icon: Thermometer, label: "Compartment temperature", text: "One or more probes per vehicle" },
      { icon: Bell, label: "Breaches", text: "Start, end and duration outside the range" },
      { icon: MapPin, label: "Where it happened", text: "Every reading tied to a position" },
      { icon: BarChart3, label: "History", text: "Per trip and per time range, exportable" },
    ],
    capabilities: [
      { icon: Thermometer, title: "Live temperature readings", description: "Compartment temperature in real time on the web and mobile apps, with multiple probes for vehicles carrying mixed cargo." },
      { icon: Bell, title: "Threshold alerts", description: "Set a safe range per vehicle and get notified the moment a reading leaves it, before the cargo is compromised." },
      { icon: Clock, title: "Breach duration", description: "See exactly how long a compartment stayed out of range, which is what decides whether a load is still usable." },
      { icon: BarChart3, title: "Temperature history", description: "Charts and logs for any trip or period, ready for audits, customer queries and insurance claims." },
      { icon: ShieldCheck, title: "Compliance-ready records", description: "Timestamped, location-tagged readings give you the chain-of-custody evidence cold chain customers ask for." },
      { icon: Wifi, title: "Works with your GPS device", description: "Probes connect to the installed telematics unit, so there is no separate gateway or portal to manage." },
    ],
    steps: [
      { title: "Probe in the cargo", body: "A temperature probe is fitted inside each compartment and wired to the GPS unit." },
      { title: "Readings with position", body: "Temperature is reported together with location and vehicle telemetry." },
      { title: "Range checked", body: "Each reading is compared with the vehicle's range; breaches raise alerts at once." },
      { title: "History kept", body: "Every trip's temperature curve is stored and exportable for compliance." },
    ],
    inApp: [
      "Temperature overview across the cold chain fleet",
      "Per-vehicle chart with the safe band marked",
      "Breach alerts with duration and location",
      "Trip-level temperature history",
      "PDF and Excel exports for audits",
    ],
    useCases: [
      { icon: FlaskConical, industry: "Pharmaceuticals", description: "Keep vaccines, biologics and sensitive medicines in their 2–8 °C band from warehouse to clinic.", outcome: "A temperature record for every delivery" },
      { icon: Package, industry: "Food & dairy", description: "Track dairy, meat and frozen goods across distribution routes with alerts for every excursion.", outcome: "Excursions caught while they happen" },
      { icon: Truck, industry: "Logistics & 3PL", description: "Offer temperature-controlled transport with data your customers can check for themselves.", outcome: "Proof you can share with clients" },
    ],
  },
  {
    slug: "driver-identification",
    family: "hardware",
    status: "live",
    screen: "drivers",
    icon: Fingerprint,
    name: "Driver Identification",
    title: ["Know who is", "behind the wheel."],
    lead: "Drivers identify themselves with an iButton key or RFID card before they drive. Every trip, alert and safety event is then attributed to the right person, not just the vehicle.",
    proof: ["iButton & RFID keys", "Per-driver trips", "Unauthorised-use alerts", "Driver scorecards"],
    panel: {
      heading: "Driver score · this week",
      vehicle: "DEMO-031 · Staff bus",
      readings: [
        { label: "Driver", value: "Demo driver A", tone: "ok" },
        { label: "Key", value: "iButton · verified", tone: "ok" },
        { label: "Shift", value: "06:00–14:00", tone: "info" },
      ],
      series: { label: "Score", unit: "", points: [81, 84, 83, 86, 85, 88, 87, 90, 89, 91, 92] },
      events: [
        { time: "05:58", text: "Key accepted · trip started", tone: "ok" },
        { time: "22:14", text: "DEMO-044 moved with no key · alert", tone: "alert" },
      ],
    },
    records: [
      { icon: Fingerprint, label: "Driver key", text: "iButton or RFID identity at ignition" },
      { icon: Route, label: "Trips", text: "Every kilometre linked to a driver" },
      { icon: ShieldAlert, label: "Safety events", text: "Overspeed and harsh driving per person" },
      { icon: Radio, label: "Unknown keys", text: "Starts without a valid identification" },
    ],
    capabilities: [
      { icon: Fingerprint, title: "iButton & RFID login", description: "Drivers touch their key to the in-cab reader before a trip. No manual entry and no guessing who drove." },
      { icon: UserCheck, title: "Per-driver trip attribution", description: "Every kilometre, alert and safety event is linked to the identified driver as well as the vehicle." },
      { icon: ShieldAlert, title: "Unauthorised-use alerts", description: "Get notified when a vehicle moves without a valid key, out of hours or at weekends." },
      { icon: BarChart3, title: "Driver scorecards", description: "Safety and performance profiles per driver: overspeeding, harsh braking, idling and trends over time." },
      { icon: IdCard, title: "Licence & document tracking", description: "Keep licence details and expiry dates on the driver's record with reminders before they lapse." },
      { icon: Bell, title: "Shift checks", description: "Flag trips outside a driver's assigned shift or before they have identified themselves." },
    ],
    steps: [
      { title: "Driver presents key", body: "The driver touches an iButton or RFID card to the reader before starting." },
      { title: "Identity checked", body: "The key is matched with the driver registered in LAS Mobility; unknown keys raise an alert." },
      { title: "Trip attributed", body: "Positions, alerts and events from the trip are recorded against that driver." },
      { title: "Scorecard updated", body: "Safety events build each driver's profile for review and coaching." },
    ],
    inApp: [
      "Driver list with assigned keys and vehicles",
      "Per-driver trips, alerts and safety events",
      "Driver scorecards and trends",
      "Alerts for vehicles moving without a key",
      "Licence and document expiry reminders",
    ],
    useCases: [
      { icon: School, industry: "School transport", description: "Make sure only verified drivers operate student buses, with the driver confirmed on every route.", outcome: "Verified driver on every run" },
      { icon: Building2, industry: "Enterprise fleets", description: "Hold each driver accountable for their own safety record with per-person event history.", outcome: "Safety records per person" },
      { icon: Truck, industry: "Rental & shared vehicles", description: "Know exactly who drove each vehicle and when, so incidents and violations go to the right person.", outcome: "Every trip traceable to a driver" },
    ],
  },
];

export { PLATFORM, DASH_CAM };

/** Hardware modules that are live in the app. */
export const LIVE_MODULES = HARDWARE;

/** Every module with its own page under /features. */
export const ALL_MODULES: ModuleContent[] = [...PLATFORM, ...HARDWARE, DASH_CAM];

export const moduleBySlug = (slug: string) => {
  const m = ALL_MODULES.find((x) => x.slug === slug);
  if (!m) throw new Error(`Unknown module ${slug}`);
  return m;
};
