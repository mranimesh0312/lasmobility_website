"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { ReplicaContext, type ReplicaApi, type ScreenId } from "./context";
import ScreenSwitch from "./ScreenSwitch";
import { cx } from "./ui";
import s from "./Replica.module.scss";

/** The design canvas every embedded screen is laid out on, then scaled to fit. */
const CANVAS_W = 1280;
const CANVAS_H = 800;

const TITLES: Partial<Record<ScreenId, string>> = {
  dashboard: "Dashboard",
  live: "Live Tracking",
  vehicles: "Vehicles",
  vehicle: "Vehicle Details",
  trips: "Trips",
  alerts: "Alerts",
  fuel: "Fuel",
  temperature: "Temperature",
  maintenance: "Maintenance",
  drivers: "Drivers",
  reports: "Reports",
  ai: "AI Insights",
  rental: "Rental Overview",
  documents: "Document Management",
  expenses: "Expenses",
  geofence: "Geofence",
};

/** Product-manifest feature id -> the replica screen that shows it. */
const FEATURE_SCREENS: Record<string, ScreenId> = {
  dashboard: "dashboard",
  "live-tracking": "live",
  vehicles: "vehicles",
  "vehicle-details": "vehicle",
  trips: "trips",
  routes: "trips",
  telemetry: "vehicle",
  geofencing: "geofence",
  immobilization: "vehicle",
  "driver-identification": "drivers",
  temperature: "temperature",
  fuel: "fuel",
  maintenance: "maintenance",
  expenses: "expenses",
  reports: "reports",
  alerts: "alerts",
  documents: "documents",
  "rental-hub": "rental",
};

export const screenForFeature = (featureId: string): ScreenId => FEATURE_SCREENS[featureId] ?? "dashboard";

interface ReplicaScreenProps {
  screen: ScreenId;
  /** Follows the site theme unless forced. */
  theme?: "dark" | "light";
  /** Clicks navigate inside the embed; off for small decorative previews. */
  interactive?: boolean;
  className?: string;
}

/**
 * One coded LAS Mobility app screen (the same components as the homepage app
 * replica), rendered on a 1280x800 canvas and scaled to its container like a
 * live thumbnail. Theme-aware, so it always matches the site palette; the
 * simulation clock only runs while it is on screen.
 */
export default function ReplicaScreen({ screen: initial, theme: forced, interactive = false, className }: ReplicaScreenProps) {
  const { theme: siteTheme } = useTheme();
  const theme = forced ?? (siteTheme === "light" ? "light" : "dark");
  const [screen, setScreen] = useState<ScreenId>(initial);
  const [vehicleId, setVehicleId] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [scale, setScale] = useState(0);
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => setScreen(initial), [initial]);

  // Scale the fixed canvas to the container width.
  useLayoutEffect(() => {
    const el = host.current;
    if (!el) return;
    const fit = () => setScale(el.clientWidth / CANVAS_W);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Live values tick only while visible and the tab is active.
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    const id = window.setInterval(() => visible && !document.hidden && setSeconds((x) => x + 1), 1000);
    return () => {
      io.disconnect();
      window.clearInterval(id);
    };
  }, []);

  const api: ReplicaApi = useMemo(
    () => ({
      screen,
      vehicleId,
      seconds,
      theme,
      go: (next, vid) => {
        if (!interactive) return;
        if (vid) setVehicleId(vid);
        setScreen(next);
      },
      toast: () => {},
      openAi: () => {},
    }),
    [screen, vehicleId, seconds, theme, interactive]
  );

  return (
    <div
      ref={host}
      className={cx(s.embedHost, className)}
      style={{ aspectRatio: `${CANVAS_W} / ${CANVAS_H}` }}
      role={interactive ? undefined : "img"}
      aria-label={interactive ? undefined : `${TITLES[screen] ?? "LAS Mobility"} screen in the LAS Mobility app`}
    >
      <ReplicaContext.Provider value={api}>
        <div
          className={cx(s.app, s.embed)}
          data-theme={theme}
          inert={interactive ? undefined : true}
          style={{ width: CANVAS_W, height: CANVAS_H, transform: `scale(${scale})`, visibility: scale ? "visible" : "hidden" }}
        >
          <div className={s.embedBar}>
            <span className={s.embedDot} aria-hidden="true" />
            <strong>{TITLES[screen] ?? "LAS Mobility"}</strong>
            <span className={s.embedPath}>app.lasmobility.com</span>
          </div>
          <div className={s.content}>
            <ScreenSwitch id={screen} />
          </div>
        </div>
      </ReplicaContext.Provider>
    </div>
  );
}
