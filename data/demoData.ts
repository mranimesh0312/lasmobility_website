/**
 * Simulated data for the homepage demos. Nothing here is customer data; the
 * UI labels every demo as a simulation. Routes are synthetic OSRM road
 * geometries in Bengaluru (data/demoRoutes.json).
 */
import type { VehicleVariant } from "@/components/three/vehicleSpecs";

export interface DemoVehicle {
  id: "ka-demo-01" | "ka-demo-02" | "ka-demo-03";
  plate: string;
  name: string;
  driver: string;
  /** Map marker colour: categorical, fixed order, follows the vehicle. */
  color: string;
}

export const DEMO_VEHICLES: DemoVehicle[] = [
  { id: "ka-demo-01", plate: "DEMO-01", name: "Delivery van 01", driver: "Demo driver A", color: "#18C7CC" },
  { id: "ka-demo-02", plate: "DEMO-02", name: "Service SUV 02", driver: "Demo driver B", color: "#8B5CF6" },
  { id: "ka-demo-03", plate: "DEMO-03", name: "Pool car 03", driver: "Demo driver C", color: "#F97316" },
];

/** Simulated speed (km/h) along a route, by distance travelled (m). */
export function simulatedSpeed(distanceM: number) {
  return Math.max(14, 38 + 16 * Math.sin(distanceM / 900) + 6 * Math.sin(distanceM / 230));
}

/** Simulated stop points as a fraction of the route; the vehicle idles there. */
export const DEMO_STOPS = [0.33, 0.71];
export const STOP_SECONDS = 6;

// ---------- reports ----------
const seeded = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};

export interface DayPoint {
  label: string;
  distanceKm: number;
  trips: number;
  fuelL: number;
}

export function reportSeries(days: 7 | 30): DayPoint[] {
  const rnd = seeded(days === 7 ? 11 : 29);
  const out: DayPoint[] = [];
  const base = new Date(2026, 9, 16);
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(base);
    d.setDate(base.getDate() - i);
    const weekend = d.getDay() === 0 || d.getDay() === 6;
    const distanceKm = Math.round((weekend ? 420 : 860) + rnd() * 260);
    out.push({
      label: d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }),
      distanceKm,
      trips: Math.round(distanceKm / 18 + rnd() * 6),
      fuelL: Math.round(distanceKm / 9.5 + rnd() * 8),
    });
  }
  return out;
}

export const STATUS_BREAKDOWN = [
  { key: "moving", label: "Moving", share: 0.46, color: "#10B981" },
  { key: "idle", label: "Idle", share: 0.14, color: "#F59E0B" },
  { key: "stopped", label: "Stopped", share: 0.31, color: "#EF4444" },
  { key: "offline", label: "Offline", share: 0.09, color: "#94A3B8" },
] as const;

// ---------- fuel & temperature ----------
export interface TimePoint {
  t: string;
  v: number;
  event?: "refuel" | "drain" | "excursion";
}

/** 24 h of fuel level (%) at 30-minute steps with one refuel and one drain. */
export function fuelSeries(): TimePoint[] {
  const pts: TimePoint[] = [];
  let level = 72;
  for (let i = 0; i <= 48; i++) {
    const h = Math.floor(i / 2);
    const m = i % 2 ? "30" : "00";
    let event: TimePoint["event"];
    if (i >= 12 && i <= 36) level -= 1.15;
    if (i === 22) {
      level = Math.min(96, level + 52);
      event = "refuel";
    }
    if (i === 41) {
      level -= 9;
      event = "drain";
    }
    pts.push({ t: `${String(h).padStart(2, "0")}:${m}`, v: Math.max(4, +level.toFixed(1)), event });
  }
  return pts;
}

/** 12 h of cargo temperature (°C) with one excursion above the 2–8 °C band. */
export function temperatureSeries(): TimePoint[] {
  const pts: TimePoint[] = [];
  for (let i = 0; i <= 48; i++) {
    const mins = i * 15;
    const t = `${String(6 + Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`;
    let v = 4.2 + Math.sin(i / 4) * 0.8;
    if (i >= 26 && i <= 31) v = 8.4 + Math.sin(((i - 26) / 5) * Math.PI) * 1.6; // door left open
    pts.push({ t, v: +v.toFixed(1), event: v > 8 ? "excursion" : undefined });
  }
  return pts;
}

// ---------- driver identification ----------
export const DEMO_DRIVERS = [
  { id: "drv-a", name: "Demo driver A", ibutton: "IB-2001", licence: "LMV" },
  { id: "drv-b", name: "Demo driver B", ibutton: "IB-2002", licence: "LMV" },
  { id: "drv-c", name: "Demo driver C", ibutton: "IB-2003", licence: "HMV" },
];

// ---------- rental hub ----------
export interface RentalVehicle {
  id: string;
  name: string;
  variant: VehicleVariant;
  paintId: string;
  seats: number;
  transmission: "Automatic" | "Manual";
  fuel: string;
  status: "Available" | "Booked" | "In inspection";
  /** Booked day offsets in the next 14 days (sample calendar). */
  booked: number[];
}

export const RENTAL_FLEET: RentalVehicle[] = [
  { id: "r-suv", name: "Premium SUV", variant: "suv", paintId: "graphite", seats: 7, transmission: "Automatic", fuel: "Diesel", status: "Available", booked: [3, 4, 5, 10] },
  { id: "r-sedan", name: "Executive sedan", variant: "sedan", paintId: "obsidian", seats: 5, transmission: "Automatic", fuel: "Petrol", status: "Booked", booked: [0, 1, 2, 7, 8] },
  { id: "r-van", name: "Cargo van", variant: "van", paintId: "glacier", seats: 3, transmission: "Manual", fuel: "Diesel", status: "In inspection", booked: [0, 6, 11, 12, 13] },
];
