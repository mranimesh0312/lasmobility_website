"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { MapPin, Briefcase, ArrowRight, X } from "lucide-react";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface MapJob {
  title: string;
  department: string;
}

interface City {
  id: string;
  name: string;
  country: string;
  coordinates: [number, number]; // [lng, lat]
  accent: string;
  jobs: MapJob[];
}

const CITIES: City[] = [
  {
    id: "london",
    name: "London",
    country: "United Kingdom",
    coordinates: [-0.12, 51.5],
    accent: "#818CF8",
    jobs: [
      { title: "Enterprise Account Manager", department: "KAM" },
      { title: "Financial Analyst", department: "Accounts & Finance" },
    ],
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "UAE",
    coordinates: [55.27, 25.2],
    accent: "#0ECECE",
    jobs: [
      { title: "Sales Executive — MENA", department: "Sales" },
      { title: "Fleet Operations Manager", department: "Operations" },
      { title: "Key Account Manager", department: "KAM" },
      { title: "Enterprise Account Manager", department: "KAM" },
    ],
  },
  {
    id: "riyadh",
    name: "Riyadh",
    country: "Saudi Arabia",
    coordinates: [46.68, 24.68],
    accent: "#F59E0B",
    jobs: [
      { title: "Enterprise Account Manager", department: "KAM" },
      { title: "Sales Executive — MENA", department: "Sales" },
    ],
  },
  {
    id: "bangalore",
    name: "Bangalore",
    country: "India",
    coordinates: [77.59, 12.97],
    accent: "#22C55E",
    jobs: [
      { title: "Software Developer — UI/UX", department: "Engineering" },
      { title: "Software Developer — Full-Stack", department: "Engineering" },
      { title: "Software Developer — GoLang", department: "Engineering" },
      { title: "Product Manager", department: "Product" },
      { title: "HR Executive", department: "Human Resources" },
      { title: "Finance Manager", department: "Accounts & Finance" },
      { title: "Accounts Executive", department: "Accounts & Finance" },
    ],
  },
  {
    id: "singapore",
    name: "Singapore",
    country: "Singapore",
    coordinates: [103.82, 1.35],
    accent: "#EC4899",
    jobs: [
      { title: "Sales Executive — APAC", department: "Sales" },
      { title: "Key Account Manager", department: "KAM" },
      { title: "Customer Success Manager", department: "Customer Success" },
    ],
  },
  {
    id: "remote",
    name: "Remote",
    country: "Global",
    coordinates: [0, 20],
    accent: "#A855F7",
    jobs: [
      { title: "DevOps / Platform Engineer", department: "Infrastructure" },
      { title: "Talent Acquisition Specialist", department: "Human Resources" },
      { title: "Financial Analyst", department: "Accounts & Finance" },
      { title: "Operations Executive", department: "Operations" },
    ],
  },
];

const DEPT_COLOR: Record<string, string> = {
  Engineering: "#0ECECE",
  Sales: "#818CF8",
  Infrastructure: "#F59E0B",
  Product: "#22C55E",
  "Customer Success": "#EC4899",
  "Human Resources": "#A855F7",
  Operations: "#F97316",
  KAM: "#14B8A6",
  "Accounts & Finance": "#EAB308",
};

export default function GlobalHiringMap() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeCity = CITIES.find((c) => c.id === activeId) ?? null;

  return (
    <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <span
            className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{
              border: "1px solid var(--border-accent)",
              color: "var(--accent-text)",
              background: "var(--accent-glow)",
            }}
          >
            Global Hiring
          </span>
          <h2
            className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: "var(--text-primary)" }}
          >
            We&apos;re hiring across the{" "}
            <span className="gradient-text">globe</span>
          </h2>
          <p className="mt-3 text-base" style={{ color: "var(--text-secondary)" }}>
            Click or hover a location pin to explore open roles.
          </p>
        </div>

        {/* Map wrapper */}
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            background: "#06101e",
            border: "1px solid var(--border)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
          }}
        >
          {/* Radial atmosphere */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 60%, rgba(14,206,206,0.045) 0%, transparent 65%)",
            }}
          />

          {/* react-simple-maps ComposableMap */}
          <ComposableMap
            projection="geoNaturalEarth1"
            projectionConfig={{ scale: 147, center: [15, 10] }}
            style={{ width: "100%", height: "auto" }}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }: { geographies: { rsmKey: string; [key: string]: unknown }[] }) =>
                geographies.map((geo: { rsmKey: string; [key: string]: unknown }) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill: "rgba(14,206,206,0.07)",
                        stroke: "rgba(14,206,206,0.18)",
                        strokeWidth: 0.5,
                        outline: "none",
                      },
                      hover: {
                        fill: "rgba(14,206,206,0.12)",
                        stroke: "rgba(14,206,206,0.28)",
                        strokeWidth: 0.5,
                        outline: "none",
                      },
                      pressed: {
                        fill: "rgba(14,206,206,0.07)",
                        outline: "none",
                      },
                    }}
                  />
                ))
              }
            </Geographies>

            {/* City markers */}
            {CITIES.map((city) => (
              <Marker
                key={city.id}
                coordinates={city.coordinates}
                onMouseEnter={() => setActiveId(city.id)}
                onMouseLeave={() => setActiveId(null)}
                onClick={() =>
                  setActiveId((prev) => (prev === city.id ? null : city.id))
                }
                style={{ cursor: "pointer" }}
              >
                {/* Outer pulse */}
                <circle r={14} fill={city.accent} opacity={0.12}>
                  <animate
                    attributeName="r"
                    values="10;20;10"
                    dur="2.6s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.14;0.03;0.14"
                    dur="2.6s"
                    repeatCount="indefinite"
                  />
                </circle>
                {/* Mid ring */}
                <circle r={7} fill={city.accent} opacity={0.3} />
                {/* Core */}
                <circle
                  r={4.5}
                  fill={city.accent}
                  opacity={activeId === city.id ? 1 : 0.92}
                  style={{
                    filter: `drop-shadow(0 0 ${activeId === city.id ? 8 : 5}px ${city.accent})`,
                    transition: "filter 0.3s ease",
                  }}
                />
                {/* Label */}
                <text
                  textAnchor="middle"
                  y={20}
                  style={{
                    fontFamily: "inherit",
                    fontSize: "7px",
                    fontWeight: 600,
                    fill:
                      activeId === city.id
                        ? city.accent
                        : "rgba(200,225,255,0.55)",
                    letterSpacing: "0.4px",
                    pointerEvents: "none",
                    transition: "fill 0.3s ease",
                  }}
                >
                  {city.name}
                </text>
              </Marker>
            ))}
          </ComposableMap>

          {/* Tooltip / info panel */}
          <AnimatePresence>
            {activeCity && (
              <motion.div
                key={activeCity.id}
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="absolute bottom-4 right-4 w-72 rounded-2xl p-4"
                style={{
                  background: "rgba(4,9,26,0.97)",
                  border: `1px solid ${activeCity.accent}48`,
                  boxShadow: `0 16px 48px rgba(0,0,0,0.65), 0 0 36px ${activeCity.accent}22`,
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  zIndex: 20,
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                      style={{
                        background: `${activeCity.accent}18`,
                        border: `1px solid ${activeCity.accent}38`,
                      }}
                    >
                      <MapPin
                        className="h-3.5 w-3.5"
                        style={{ color: activeCity.accent }}
                      />
                    </span>
                    <div>
                      <p
                        className="text-sm font-bold leading-none"
                        style={{ color: "#fff" }}
                      >
                        {activeCity.name}
                      </p>
                      <p
                        className="text-[10px] mt-0.5"
                        style={{ color: "rgba(180,210,255,0.5)" }}
                      >
                        {activeCity.country}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] font-semibold rounded-full px-2 py-0.5"
                      style={{
                        background: `${activeCity.accent}1A`,
                        color: activeCity.accent,
                      }}
                    >
                      {activeCity.jobs.length}{" "}
                      {activeCity.jobs.length === 1 ? "role" : "roles"}
                    </span>
                    <button
                      onClick={() => setActiveId(null)}
                      className="rounded-md p-0.5 opacity-50 hover:opacity-100 transition"
                      style={{ color: "rgba(200,220,255,0.6)" }}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Job list */}
                <ul className="space-y-2 mb-3 max-h-40 overflow-y-auto pr-1">
                  {activeCity.jobs.map((job, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Briefcase
                        className="h-3 w-3 shrink-0 mt-0.5"
                        style={{
                          color:
                            DEPT_COLOR[job.department] ?? activeCity.accent,
                        }}
                      />
                      <div>
                        <p
                          className="text-xs font-semibold leading-tight"
                          style={{ color: "rgba(220,240,255,0.92)" }}
                        >
                          {job.title}
                        </p>
                        <p
                          className="text-[9.5px] mt-0.5"
                          style={{
                            color:
                              DEPT_COLOR[job.department] ??
                              "rgba(180,210,255,0.5)",
                          }}
                        >
                          {job.department}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#roles"
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold transition hover:brightness-110"
                  style={{
                    background: `${activeCity.accent}18`,
                    color: activeCity.accent,
                    border: `1px solid ${activeCity.accent}38`,
                  }}
                >
                  Quick Apply <ArrowRight className="h-3 w-3" />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* City legend chips */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {CITIES.map((city) => (
            <button
              key={city.id}
              onMouseEnter={() => setActiveId(city.id)}
              onMouseLeave={() => setActiveId(null)}
              onClick={() =>
                setActiveId((prev) => (prev === city.id ? null : city.id))
              }
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all"
              style={{
                background:
                  activeId === city.id
                    ? `${city.accent}18`
                    : "var(--bg-card)",
                border: `1px solid ${
                  activeId === city.id
                    ? city.accent + "55"
                    : "var(--border)"
                }`,
                color:
                  activeId === city.id ? city.accent : "var(--text-secondary)",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full shrink-0"
                style={{ background: city.accent }}
              />
              {city.name}
              <span style={{ color: "rgba(180,210,255,0.4)" }}>
                ({city.jobs.length})
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
