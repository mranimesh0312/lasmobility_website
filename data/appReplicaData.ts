/**
 * Simulated fleet for the interactive app replica on the homepage. It mirrors
 * the shape of the LAS Mobility app's own screens (Dashboard, Live Tracking,
 * Vehicles, Trips, Alerts, Fuel, Temperature, Maintenance, Reports, Drivers,
 * AI Insights, Rental Hub) but every value is generated here. Plates are
 * DEMO-xxx, drivers are numbered, positions sit on the synthetic Bengaluru
 * routes in data/demoRoutes.json. Deterministic, so SSR and client agree.
 */
import routesJson from "./demoRoutes.json";
import { PALETTE } from "@/lib/palette";

export type LngLat = [number, number];
export type LiveStatus = "running" | "idle" | "stopped" | "offline";

export const ROUTES = Object.values(routesJson as unknown as Record<string, { distanceM: number; coordinates: LngLat[] }>).map(
  (r) => r.coordinates
);

const seeded = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};
const rnd = seeded(20261017);
const pick = <T,>(arr: readonly T[]) => arr[Math.floor(rnd() * arr.length)];
const round = (v: number, d = 0) => Math.round(v * 10 ** d) / 10 ** d;

export const STATUS_META: Record<LiveStatus, { label: string; color: string }> = {
  running: { label: "Running", color: PALETTE.success },
  idle: { label: "Idle", color: PALETTE.warning },
  stopped: { label: "Stopped", color: PALETTE.danger },
  offline: { label: "Offline", color: PALETTE.slate400 },
};

const MODELS = [
  { make: "Tata", model: "Ace Gold", type: "Mini truck" },
  { make: "Ashok Leyland", model: "Dost+", type: "Light truck" },
  { make: "Mahindra", model: "Bolero Pik-Up", type: "Pickup" },
  { make: "Toyota", model: "Innova Crysta", type: "MPV" },
  { make: "Maruti Suzuki", model: "Eeco Cargo", type: "Van" },
  { make: "Eicher", model: "Pro 2049", type: "Truck" },
  { make: "Force", model: "Traveller", type: "Bus" },
  { make: "Hyundai", model: "Creta", type: "SUV" },
] as const;

const AREAS = [
  "MG Road", "Indiranagar", "Koramangala", "Whitefield", "Electronic City", "Hebbal", "Yeshwanthpur",
  "Jayanagar", "Marathahalli", "HSR Layout", "Peenya", "Banashankari",
] as const;

const GROUPS = ["Last-mile", "Cold chain", "Staff transport", "Field service"] as const;

export interface ReplicaVehicle {
  id: number;
  plate: string;
  name: string;
  make: string;
  model: string;
  type: string;
  group: (typeof GROUPS)[number];
  driver: string;
  status: LiveStatus;
  speed: number;
  ignition: boolean;
  fuelPct: number;
  odometerKm: number;
  todayKm: number;
  area: string;
  satellites: number;
  gsm: number;
  voltage: number;
  /** Index into ROUTES and starting fraction; moving vehicles advance along it. */
  route: number;
  offset: number;
  lastUpdateMin: number;
  hasTemp: boolean;
  subscription: "Active" | "Renewal due" | "Grace period";
}

const STATUS_PLAN: LiveStatus[] = [
  ...Array(11).fill("running"),
  ...Array(4).fill("idle"),
  ...Array(6).fill("stopped"),
  ...Array(3).fill("offline"),
];

export const VEHICLES: ReplicaVehicle[] = STATUS_PLAN.map((status, i) => {
  const m = MODELS[i % MODELS.length];
  const running = status === "running";
  const group = GROUPS[i % GROUPS.length];
  return {
    id: i + 1,
    plate: `DEMO-${String(101 + i)}`,
    name: `${m.type} ${String(i + 1).padStart(2, "0")}`,
    make: m.make,
    model: m.model,
    type: m.type,
    group,
    driver: `Driver ${String((i % 18) + 1).padStart(2, "0")}`,
    status,
    speed: running ? Math.round(24 + rnd() * 46) : 0,
    ignition: status === "running" || status === "idle",
    fuelPct: Math.round(18 + rnd() * 78),
    odometerKm: Math.round(18000 + rnd() * 140000),
    todayKm: status === "offline" ? 0 : round(12 + rnd() * 180, 1),
    area: pick(AREAS),
    satellites: status === "offline" ? 0 : Math.round(9 + rnd() * 8),
    gsm: status === "offline" ? 0 : Math.round(2 + rnd() * 3),
    voltage: round(12.1 + rnd() * 1.9, 1),
    route: i % ROUTES.length,
    offset: (i * 0.137 + rnd() * 0.08) % 1,
    lastUpdateMin: status === "offline" ? Math.round(95 + rnd() * 600) : Math.round(rnd() * 2),
    hasTemp: group === "Cold chain",
    subscription: i === 7 ? "Renewal due" : i === 19 ? "Grace period" : "Active",
  };
});

export const statusCounts = (list = VEHICLES) =>
  list.reduce(
    (acc, v) => {
      acc[v.status] += 1;
      return acc;
    },
    { running: 0, idle: 0, stopped: 0, offline: 0 } as Record<LiveStatus, number>
  );

// ---------- geometry ----------
const R = 6371000;
const toRad = (d: number) => (d * Math.PI) / 180;
function haversine(a: LngLat, b: LngLat) {
  const dLat = toRad(b[1] - a[1]);
  const dLng = toRad(b[0] - a[0]);
  const s = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a[1])) * Math.cos(toRad(b[1])) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}
const TRACKS = ROUTES.map((coords) => {
  const cum = [0];
  for (let i = 1; i < coords.length; i++) cum.push(cum[i - 1] + haversine(coords[i - 1], coords[i]));
  return { coords, cum, total: cum[cum.length - 1] };
});

/** Position and heading at fraction `f` (0..1, wraps) of a route. */
export function routePoint(route: number, f: number): { p: LngLat; heading: number } {
  const t = TRACKS[route % TRACKS.length];
  const d = (((f % 1) + 1) % 1) * t.total;
  let i = 1;
  while (i < t.cum.length - 1 && t.cum[i] < d) i++;
  const a = t.coords[i - 1];
  const b = t.coords[i];
  const k = (d - t.cum[i - 1]) / (t.cum[i] - t.cum[i - 1] || 1);
  const heading = (Math.atan2(b[0] - a[0], b[1] - a[1]) * 180) / Math.PI;
  return { p: [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k], heading };
}

/** Where a vehicle is `seconds` into the simulation. Only running vehicles move. */
export function vehiclePosition(v: ReplicaVehicle, seconds: number) {
  const metresPerSec = (v.speed * 1000) / 3600;
  const t = TRACKS[v.route % TRACKS.length];
  if (v.status === "running") return routePoint(v.route, v.offset + (seconds * metresPerSec * 6) / t.total);
  // Parked vehicles sit a few hundred metres off the three demo roads so they
  // don't stack on top of the moving ones.
  const { p, heading } = routePoint(v.route, v.offset);
  const a = v.id * 2.399;
  return { p: [p[0] + Math.cos(a) * 0.006, p[1] + Math.sin(a) * 0.005] as LngLat, heading };
}

export function routeLength(route: number) {
  return TRACKS[route % TRACKS.length].total;
}

// ---------- dashboard ----------
export type RangeKey = "today" | "7d" | "30d";
export const RANGES: { key: RangeKey; label: string; days: number }[] = [
  { key: "today", label: "Today", days: 1 },
  { key: "7d", label: "7 days", days: 7 },
  { key: "30d", label: "30 days", days: 30 },
];

export function dailySeries(days: number) {
  const r = seeded(days * 31 + 7);
  const out: { label: string; distance: number; fuel: number; trips: number; cost: number }[] = [];
  const base = new Date(2026, 9, 17);
  const n = Math.max(days, 7);
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(base);
    d.setDate(base.getDate() - i);
    const weekend = d.getDay() === 0 || d.getDay() === 6;
    const distance = Math.round((weekend ? 1650 : 2900) + r() * 700);
    out.push({
      label: d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }),
      distance,
      fuel: Math.round(distance / 8.9 + r() * 25),
      trips: Math.round(distance / 22 + r() * 9),
      cost: Math.round(distance * 9.4 + r() * 3000),
    });
  }
  return out.slice(-Math.max(days, 7));
}

export function rangeTotals(days: number) {
  const s = dailySeries(days).slice(-days);
  const sum = (k: "distance" | "fuel" | "trips" | "cost") => s.reduce((a, d) => a + d[k], 0);
  return { distance: sum("distance"), fuel: sum("fuel"), trips: sum("trips"), cost: sum("cost") };
}

export const HOURLY_UTIL = Array.from({ length: 24 }, (_, h) => {
  const peak = Math.exp(-((h - 10) ** 2) / 10) + 0.8 * Math.exp(-((h - 17) ** 2) / 8);
  return { label: `${String(h).padStart(2, "0")}`, value: Math.round(8 + peak * 70) };
});

// ---------- alerts ----------
export type Severity = "critical" | "high" | "medium" | "low";
export interface ReplicaAlert {
  id: number;
  type: string;
  severity: Severity;
  vehicle: string;
  message: string;
  minutesAgo: number;
  sos?: boolean;
}

export const ALERTS: ReplicaAlert[] = [
  { id: 1, type: "SOS / Panic", severity: "critical", vehicle: "DEMO-109", message: "Panic button pressed near Hebbal flyover", minutesAgo: 2, sos: true },
  { id: 2, type: "Overspeed", severity: "high", vehicle: "DEMO-103", message: "92 km/h in an 80 km/h zone on ORR", minutesAgo: 6 },
  { id: 3, type: "Temperature", severity: "high", vehicle: "DEMO-106", message: "Cargo probe 1 at 9.4 °C, above 8 °C limit", minutesAgo: 11 },
  { id: 4, type: "Geofence exit", severity: "medium", vehicle: "DEMO-112", message: "Left zone 'Whitefield depot'", minutesAgo: 18 },
  { id: 5, type: "Fuel drain", severity: "high", vehicle: "DEMO-118", message: "Sudden drop of 14 L while stopped", minutesAgo: 27 },
  { id: 6, type: "Harsh braking", severity: "medium", vehicle: "DEMO-104", message: "Deceleration 0.52 g at Silk Board", minutesAgo: 34 },
  { id: 7, type: "Power cut", severity: "high", vehicle: "DEMO-122", message: "External power disconnected", minutesAgo: 49 },
  { id: 8, type: "Idling", severity: "low", vehicle: "DEMO-113", message: "Engine idling for 22 minutes", minutesAgo: 58 },
  { id: 9, type: "Geofence entry", severity: "low", vehicle: "DEMO-101", message: "Entered zone 'Peenya warehouse'", minutesAgo: 71 },
  { id: 10, type: "Maintenance due", severity: "medium", vehicle: "DEMO-108", message: "Service due in 300 km", minutesAgo: 95 },
  { id: 11, type: "SOS / Panic", severity: "critical", vehicle: "DEMO-117", message: "Panic button pressed, driver confirmed safe", minutesAgo: 240, sos: true },
  { id: 12, type: "Overspeed", severity: "high", vehicle: "DEMO-111", message: "88 km/h in a 60 km/h zone", minutesAgo: 310 },
];

export const SEVERITY_META: Record<Severity, { label: string; color: string }> = {
  critical: { label: "Critical", color: PALETTE.danger },
  high: { label: "High", color: PALETTE.orange },
  medium: { label: "Medium", color: PALETTE.warning },
  low: { label: "Low", color: PALETTE.accent },
};

export const ALERT_RULES = [
  { name: "Overspeed 80", type: "Overspeed", threshold: "80 km/h", vehicles: "All vehicles", channels: ["Email", "Push"], active: true },
  { name: "Cold chain 2-8 °C", type: "Temperature", threshold: "2–8 °C", vehicles: "Cold chain group", channels: ["SMS", "Push"], active: true },
  { name: "Idle > 15 min", type: "Idling", threshold: "15 min", vehicles: "All vehicles", channels: ["Push"], active: true },
  { name: "Fuel drain", type: "Fuel", threshold: "10 L", vehicles: "All vehicles", channels: ["Email", "SMS"], active: false },
];

// ---------- trips ----------
export interface ReplicaTrip {
  id: number;
  vehicle: string;
  driver: string;
  start: string;
  end: string;
  from: string;
  to: string;
  distanceKm: number;
  durationMin: number;
  maxSpeed: number;
  stops: number;
  route: number;
}

export const TRIPS: ReplicaTrip[] = Array.from({ length: 14 }, (_, i) => {
  const v = VEHICLES[(i * 5) % VEHICLES.length];
  const startMin = 6 * 60 + 20 + i * 47;
  const durationMin = Math.round(22 + rnd() * 70);
  const fmt = (m: number) => `${String(Math.floor(m / 60) % 24).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
  return {
    id: 4100 + i,
    vehicle: v.plate,
    driver: v.driver,
    start: fmt(startMin),
    end: fmt(startMin + durationMin),
    from: AREAS[i % AREAS.length],
    to: AREAS[(i + 4) % AREAS.length],
    distanceKm: round(durationMin * (0.32 + rnd() * 0.25), 1),
    durationMin,
    maxSpeed: Math.round(48 + rnd() * 40),
    stops: Math.round(rnd() * 5),
    route: i % ROUTES.length,
  };
});

// ---------- fuel ----------
export const FUEL_EVENTS = [
  { time: "08:12", vehicle: "DEMO-102", kind: "Refuel" as const, litres: 48, location: "Indiranagar" },
  { time: "10:41", vehicle: "DEMO-118", kind: "Drain" as const, litres: 14, location: "Peenya" },
  { time: "11:05", vehicle: "DEMO-110", kind: "Refuel" as const, litres: 62, location: "Hebbal" },
  { time: "13:30", vehicle: "DEMO-106", kind: "Refuel" as const, litres: 35, location: "Koramangala" },
  { time: "15:52", vehicle: "DEMO-121", kind: "Drain" as const, litres: 9, location: "Electronic City" },
];

// ---------- temperature ----------
export const TEMP_SENSORS = VEHICLES.filter((v) => v.hasTemp).map((v, i) => ({
  vehicle: v.plate,
  probe: `Probe ${(i % 2) + 1}`,
  current: round(i === 1 ? 9.4 : 3.2 + rnd() * 3.8, 1),
  min: 2,
  max: 8,
}));

// ---------- maintenance ----------
export const SERVICES = [
  { vehicle: "DEMO-108", task: "Engine oil & filter", due: "300 km", progress: 0.96, cost: 4200, status: "Due soon" },
  { vehicle: "DEMO-114", task: "Brake pads (front)", due: "Overdue 2 days", progress: 1, cost: 6800, status: "Overdue" },
  { vehicle: "DEMO-103", task: "Tyre rotation", due: "1,200 km", progress: 0.82, cost: 1500, status: "Scheduled" },
  { vehicle: "DEMO-120", task: "Annual service", due: "12 days", progress: 0.67, cost: 11500, status: "Scheduled" },
  { vehicle: "DEMO-105", task: "Battery check", due: "5 days", progress: 0.88, cost: 900, status: "Due soon" },
  { vehicle: "DEMO-111", task: "AC service", due: "3,400 km", progress: 0.41, cost: 3200, status: "Scheduled" },
];

// ---------- drivers ----------
export const DRIVERS = Array.from({ length: 10 }, (_, i) => {
  const score = Math.round(96 - i * 3.6 - rnd() * 4);
  return {
    name: `Driver ${String(i + 1).padStart(2, "0")}`,
    ibutton: `IB-${2001 + i}`,
    vehicle: VEHICLES[i * 2].plate,
    score,
    distanceKm: Math.round(900 + rnd() * 1800),
    overspeed: Math.round((100 - score) / 4 + rnd() * 2),
    harsh: Math.round((100 - score) / 6 + rnd() * 2),
    idleMin: Math.round(40 + (100 - score) * 4 + rnd() * 30),
  };
});

// ---------- reports ----------
export const REPORT_CATALOG = [
  { category: "Trips & movement", reports: ["Trip summary", "Trip details", "Stoppage report", "Night driving", "Distance summary"] },
  { category: "Driver behaviour", reports: ["Driver scorecard", "Overspeed report", "Harsh events", "Idling report"] },
  { category: "Fuel", reports: ["Fuel consumption", "Refuel & drain incidents", "Fuel efficiency"] },
  { category: "Sensors", reports: ["Temperature sensor", "Door open / close", "Ignition report"] },
  { category: "Compliance", reports: ["Alert log", "Geofence in / out", "Document expiry", "Current status"] },
];

// ---------- AI insights ----------
export const AI_INSIGHTS = [
  { kind: "Anomaly", tone: "danger" as const, title: "Unusual fuel drop on DEMO-118", body: "14 L lost in 6 minutes while the ignition was off at Peenya. Pattern matches a drain, not consumption.", action: "Open fuel events" },
  { kind: "Risk", tone: "warning" as const, title: "Driver 09 risk rising", body: "Overspeed events up 38% week on week, mostly on ORR between 18:00 and 20:00.", action: "View scorecard" },
  { kind: "Utilisation", tone: "info" as const, title: "4 vehicles under 20% utilised", body: "DEMO-113, DEMO-116, DEMO-119 and DEMO-124 averaged under 2 h of driving per day for 14 days.", action: "Review fleet size" },
  { kind: "Maintenance", tone: "warning" as const, title: "Brake wear predicted on DEMO-114", body: "Harsh braking frequency and odometer suggest pads are past service life. Service is already 2 days overdue.", action: "Schedule service" },
  { kind: "Savings", tone: "success" as const, title: "Cut idling to save ~₹18,400 / month", body: "Idling above 10 minutes accounts for 7.9% of fuel. Cold-chain vans idle the most at drop points.", action: "Create idle rule" },
];

export const AI_PROMPTS = [
  { q: "Which vehicles idled the most today?", a: "DEMO-113 (42 min), DEMO-106 (31 min) and DEMO-110 (24 min). Together they idled 1 h 37 min, about 5.8 L of fuel." },
  { q: "Any cold-chain excursions this week?", a: "One: DEMO-106 probe 1 stayed above 8 °C for 19 minutes on Thursday at 12:40, while the rear door was open at a drop point." },
  { q: "Who is my safest driver this month?", a: "Driver 01 with a score of 95: no harsh braking, 2 minor overspeed events over 2,140 km." },
];

// ---------- rental hub ----------
export const RENTAL_VEHICLES = [
  { plate: "DEMO-R01", make: "Toyota", model: "Innova Crysta", category: "MPV", rate: 3200, status: "Available" },
  { plate: "DEMO-R02", make: "Hyundai", model: "Creta", category: "SUV", rate: 2500, status: "On rent" },
  { plate: "DEMO-R03", make: "Maruti Suzuki", model: "Dzire", category: "Sedan", rate: 1800, status: "Reserved" },
  { plate: "DEMO-R04", make: "Mahindra", model: "XUV700", category: "SUV", rate: 3600, status: "Available" },
  { plate: "DEMO-R05", make: "Kia", model: "Carens", category: "MPV", rate: 2800, status: "On rent" },
  { plate: "DEMO-R06", make: "Tata", model: "Nexon EV", category: "SUV", rate: 2600, status: "On hold" },
  { plate: "DEMO-R07", make: "Honda", model: "City", category: "Sedan", rate: 2100, status: "Leased" },
];

export const RENTAL_BOOKINGS = [
  { ref: "BK-20419", customer: "Customer A", vehicle: "DEMO-R03", pickup: "10:30", kind: "Pickup" as const },
  { ref: "BK-20422", customer: "Corporate account B", vehicle: "DEMO-R01", pickup: "13:00", kind: "Pickup" as const },
  { ref: "BK-20397", customer: "Customer C", vehicle: "DEMO-R02", pickup: "17:45", kind: "Return" as const },
  { ref: "BK-20401", customer: "Customer D", vehicle: "DEMO-R05", pickup: "19:15", kind: "Return" as const },
];

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
export const ago = (min: number) => (min < 1 ? "Just now" : min < 60 ? `${min}m ago` : min < 1440 ? `${Math.floor(min / 60)}h ago` : `${Math.floor(min / 1440)}d ago`);
