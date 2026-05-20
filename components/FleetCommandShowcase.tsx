"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Route,
  AlertTriangle,
  Fuel,
  BatteryCharging,
  TrendingUp,
  TrendingDown,
  BrainCircuit,
} from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";

const metrics = [
  { icon: Route, label: "Trips Today", value: 1284, suffix: "", trend: "+18%", up: true },
  { icon: AlertTriangle, label: "Risk Alerts", value: 42, suffix: "", trend: "-8%", up: false },
  { icon: Fuel, label: "Fuel Saved", value: 14, suffix: "%", trend: "+3%", up: true },
  { icon: BatteryCharging, label: "Device Health", value: 98, suffix: "%", trend: "Stable", up: true },
];

type ShowcaseImage = {
  id: string;
  src: string;
  alt: string;
  label: string;
  badge?: string;
};

const showcaseImages: ShowcaseImage[] = [
  {
    id: "vehicle-info",
    src: "/images/dashboard-showcase/Vehicle_Info.png",
    alt: "LAS Mobility vehicle information workspace with live status, immobilization, location, and map view",
    label: "Vehicle Info",
  },
  {
    id: "fleet-command-center",
    src: "/images/dashboard-showcase/fleet-command-center.png",
    alt: "LAS Mobility fleet command center dashboard with live map, alerts, and fleet status",
    label: "Fleet Command Center",
    badge: "Command View",
  },
  {
    id: "document-management",
    src: "/images/dashboard-showcase/Document_management.png",
    alt: "LAS Mobility document management dashboard with fleet compliance, document health, and analytics",
    label: "Document Management",
  },
];

function getDesktopState(index: number, activeIndex: number | null) {
  const isCenter = index === 1;
  const isActive = activeIndex === index;
  const hasActive = activeIndex !== null;
  const sideOffset = index === 0 ? 38 : index === 2 ? -38 : 0;
  const activeOffset = index === 0 ? 22 : index === 2 ? -22 : 0;

  if (isActive) {
    return {
      scale: 1.1,
      opacity: 1,
      y: isCenter ? -8 : 4,
      x: activeOffset,
      filter: "blur(0px)",
      zIndex: 40,
    };
  }

  if (hasActive) {
    return {
      scale: 0.95,
      opacity: 0.7,
      y: isCenter ? 18 : 36,
      x: sideOffset,
      filter: "blur(0.4px)",
      zIndex: 8,
    };
  }

  return {
    scale: isCenter ? 1.02 : 0.9,
    opacity: isCenter ? 1 : 0.82,
    y: isCenter ? 0 : 34,
    x: sideOffset,
    filter: "blur(0px)",
    zIndex: isCenter ? 24 : 12,
  };
}

function getCardShadow(index: number, activeIndex: number | null) {
  if (activeIndex === index) {
    return "0 34px 100px rgba(0,0,0,0.58), 0 0 0 1px rgba(14,206,206,0.46), 0 0 70px rgba(14,206,206,0.20)";
  }

  if (activeIndex !== null) {
    return "0 18px 54px rgba(0,0,0,0.32)";
  }

  return index === 1
    ? "0 30px 86px rgba(0,0,0,0.50), 0 0 0 1px rgba(14,206,206,0.24), 0 0 44px rgba(14,206,206,0.10)"
    : "0 20px 58px rgba(0,0,0,0.34)";
}

function ShowcaseCard({
  image,
  index,
  activeIndex,
  setActiveIndex,
}: {
  image: ShowcaseImage;
  index: number;
  activeIndex: number | null;
  setActiveIndex: (value: number | null) => void;
}) {
  const state = getDesktopState(index, activeIndex);
  const isActive = activeIndex === index;

  return (
    <motion.article
      className="group relative shrink-0 cursor-pointer overflow-hidden rounded-2xl"
      onMouseEnter={() => setActiveIndex(index)}
      onMouseLeave={() => setActiveIndex(null)}
      onFocus={() => setActiveIndex(index)}
      onBlur={() => setActiveIndex(null)}
      tabIndex={0}
      aria-label={image.label}
      animate={{
        scale: state.scale,
        opacity: state.opacity,
        x: state.x,
        y: state.y,
        filter: state.filter,
      }}
      transition={{ type: "spring", stiffness: 230, damping: 28, mass: 0.78 }}
      style={{
        zIndex: state.zIndex,
        width: index === 1 ? "43%" : "30%",
        aspectRatio: "16/10",
        border: isActive ? "1px solid rgba(14,206,206,0.52)" : "1px solid rgba(255,255,255,0.10)",
        boxShadow: getCardShadow(index, activeIndex),
        transformOrigin: index === 0 ? "right center" : index === 2 ? "left center" : "center",
        background: "rgba(6,14,26,0.72)",
        outline: "none",
      }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={index === 1 ? "(min-width: 1024px) 43vw, 92vw" : "(min-width: 1024px) 30vw, 92vw"}
        className="object-cover object-top"
        priority={index === 1}
        style={{
          transform: isActive ? "scale(1.055)" : "scale(1)",
          transition: "transform 520ms ease-out",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(4,9,26,0.88) 0%, rgba(4,9,26,0.32) 42%, rgba(4,9,26,0.04) 100%)",
        }}
      />

      {image.badge && (
        <div
          className="absolute left-4 top-4 hidden items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md sm:flex"
          style={{ background: "rgba(14,206,206,0.18)", border: "1px solid rgba(14,206,206,0.32)" }}
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" />
          {image.badge}
        </div>
      )}

      <div
        className="absolute bottom-4 left-4 rounded-xl px-3.5 py-2 text-sm font-bold text-white backdrop-blur-xl"
        style={{
          background: isActive ? "rgba(14,206,206,0.24)" : "rgba(7,15,30,0.52)",
          border: isActive ? "1px solid rgba(14,206,206,0.48)" : "1px solid rgba(255,255,255,0.12)",
          boxShadow: isActive ? "0 10px 30px rgba(14,206,206,0.16)" : "0 10px 24px rgba(0,0,0,0.22)",
        }}
      >
        {image.label}
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{ boxShadow: "inset 0 0 0 1.5px rgba(14,206,206,0.48)" }}
      />
    </motion.article>
  );
}

function MobileShowcaseCard({ image }: { image: ShowcaseImage }) {
  return (
    <article
      className="relative min-w-[82vw] overflow-hidden rounded-2xl sm:min-w-[58vw] lg:min-w-0"
      style={{
        aspectRatio: "16/10",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow: "0 20px 56px rgba(0,0,0,0.36)",
        background: "rgba(6,14,26,0.72)",
      }}
    >
      <Image src={image.src} alt={image.alt} fill sizes="82vw" className="object-cover object-top" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(4,9,26,0.82), transparent 58%)" }} />
      <div
        className="absolute bottom-3 left-3 rounded-xl px-3 py-1.5 text-xs font-bold text-white backdrop-blur-xl"
        style={{ background: "rgba(7,15,30,0.56)", border: "1px solid rgba(255,255,255,0.12)" }}
      >
        {image.label}
      </div>
    </article>
  );
}

export default function FleetCommandShowcase() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <span
            className="inline-block rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{ border: "1px solid var(--border-accent)", color: "var(--accent-text)", background: "var(--accent-glow)" }}
          >
            Dashboard Preview
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--text-primary)" }}>
            Designed for daily <span className="gradient-text">fleet command</span>
          </h2>
          <p className="mt-4 text-lg" style={{ color: "var(--text-secondary)" }}>
            Give operations, safety, and management teams a shared live view of what&apos;s happening and what needs attention next.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="relative mt-12 hidden min-h-[360px] items-center justify-center lg:flex"
        >
          <div
            className="pointer-events-none absolute inset-x-12 top-8 h-56 rounded-full opacity-70 blur-3xl"
            style={{ background: "radial-gradient(ellipse, rgba(14,206,206,0.16), transparent 62%)" }}
          />
          {showcaseImages.map((image, index) => (
            <ShowcaseCard
              key={image.id}
              image={image}
              index={index}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="-mx-4 mt-10 flex gap-4 overflow-x-auto px-4 pb-4 lg:hidden"
        >
          {showcaseImages.map((image) => (
            <MobileShowcaseCard key={image.id} image={image} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {metrics.map(({ icon: Icon, label, value, suffix, trend, up }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * i }}
              className="flex items-center gap-3 rounded-xl p-4"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: "var(--accent-glow)" }}>
                <Icon className="h-5 w-5" style={{ color: "var(--accent-text)" }} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs" style={{ color: "var(--text-muted)" }}>
                  {label}
                </p>
                <p className="mt-0.5 text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                  <AnimatedCounter value={value} suffix={suffix} />
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1 text-xs font-semibold" style={{ color: up ? "#22C55E" : "#F59E0B" }}>
                {up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                {trend}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="mt-4 flex items-center gap-3 rounded-xl px-5 py-4"
          style={{ background: "var(--accent-glow)", border: "1px solid var(--border-accent)" }}
        >
          <BrainCircuit className="h-5 w-5 shrink-0" style={{ color: "var(--accent-text)" }} />
          <p className="text-sm font-bold" style={{ color: "var(--accent-text)" }}>
            AI Intelligence Active
          </p>
          <p className="hidden text-xs sm:block" style={{ color: "var(--text-secondary)" }}>
            Anomaly detection running across all 1,284 vehicles - 3 optimization suggestions ready
          </p>
        </motion.div>
      </div>
    </section>
  );
}
