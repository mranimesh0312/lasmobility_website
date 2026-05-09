"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Map, Route, BarChart3, Smartphone, Apple, ArrowRight,
} from "lucide-react";

const phones = [
  {
    id: "live",
    label: "Live Tracking",
    feature: "Real-time GPS position, vehicle status and ignition state at a glance.",
    icon: Map,
    image: "/dashboard-live.jpeg",
    objectPosition: "0% 0%",
    rotation: -5,
    yOffset: 40,
  },
  {
    id: "fleet",
    label: "Fleet Overview",
    feature: "Full fleet command — running, idle, stopped counts with instant alerts.",
    icon: BarChart3,
    image: "/dashboard-main.jpeg",
    objectPosition: "0% 0%",
    rotation: 0,
    yOffset: 0,
    prominent: true,
  },
  {
    id: "routes",
    label: "Route History",
    feature: "View every trip detail, stoppage duration and route replay on map.",
    icon: Route,
    image: "/dashboard-route.jpeg",
    objectPosition: "0% 0%",
    rotation: 5,
    yOffset: 24,
  },
];

function PhoneFrame({
  phone,
  hovered,
  onHover,
  onLeave,
}: {
  phone: typeof phones[0];
  hovered: string | null;
  onHover: () => void;
  onLeave: () => void;
}) {
  const isHovered = hovered === phone.id;
  const isOther = hovered !== null && !isHovered;
  const w = phone.prominent ? 252 : 220;
  const h = phone.prominent ? 530 : 460;

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: phone.prominent ? 0.1 : phone.rotation < 0 ? 0.2 : 0.3 }}
      style={{ marginTop: phone.yOffset }}
    >
      {/* Phone mockup */}
      <motion.div
        animate={{
          scale: isHovered ? 1.05 : isOther ? 0.95 : 1,
          y: isHovered ? -16 : 0,
          rotateZ: isHovered ? 0 : phone.rotation,
        }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        onHoverStart={onHover}
        onHoverEnd={onLeave}
        className="relative cursor-pointer"
        style={{
          width: w,
          height: h,
          borderRadius: 44,
          background: "linear-gradient(145deg, #0D1F35 0%, #060E1A 100%)",
          border: isHovered
            ? "2px solid rgba(14,206,206,0.6)"
            : "2px solid rgba(14,206,206,0.18)",
          boxShadow: isHovered
            ? `0 32px 80px rgba(0,0,0,0.55), 0 0 40px rgba(14,206,206,0.18), inset 0 1px 0 rgba(255,255,255,0.06)`
            : `0 20px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)`,
          padding: 8,
          transition: "border-color 0.25s, box-shadow 0.25s",
        }}
      >
        {/* Side buttons */}
        <div
          className="absolute"
          style={{
            left: -3,
            top: 100,
            width: 3,
            height: 36,
            borderRadius: "2px 0 0 2px",
            background: "rgba(14,206,206,0.25)",
          }}
        />
        <div
          className="absolute"
          style={{
            left: -3,
            top: 148,
            width: 3,
            height: 36,
            borderRadius: "2px 0 0 2px",
            background: "rgba(14,206,206,0.25)",
          }}
        />
        <div
          className="absolute"
          style={{
            right: -3,
            top: 120,
            width: 3,
            height: 56,
            borderRadius: "0 2px 2px 0",
            background: "rgba(14,206,206,0.18)",
          }}
        />

        {/* Screen */}
        <div
          className="relative overflow-hidden"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 38,
            background: "#060E1A",
          }}
        >
          {/* Status bar */}
          <div
            className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5"
            style={{ height: 36, background: "rgba(6,14,26,0.92)" }}
          >
            <span className="text-[10px] font-semibold text-white/80">9:41</span>
            <div
              className="h-4 w-20 rounded-full"
              style={{ background: "rgba(6,14,26,0.95)", border: "1px solid rgba(255,255,255,0.12)" }}
            />
            <div className="flex items-center gap-1.5">
              <div className="flex items-end gap-px">
                {[3, 5, 7, 9].map((h) => (
                  <div
                    key={h}
                    style={{ width: 2, height: h, borderRadius: 1, background: "rgba(255,255,255,0.8)" }}
                  />
                ))}
              </div>
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <rect x="0.5" y="0.5" width="11" height="9" rx="2.5" stroke="white" strokeOpacity="0.8" />
                <rect x="12" y="3" width="2" height="4" rx="1" fill="white" fillOpacity="0.6" />
                <rect x="1.5" y="1.5" width="9" height="7" rx="2" fill="white" fillOpacity="0.85" />
              </svg>
            </div>
          </div>

          {/* App screenshot */}
          <Image
            src={phone.image}
            alt={`LAS Mobility mobile app – ${phone.label}`}
            fill
            sizes="260px"
            className="object-cover"
            style={{ objectPosition: phone.objectPosition }}
          />

          {/* Bottom gradient */}
          <div
            className="absolute inset-x-0 bottom-0"
            style={{
              height: 80,
              background: "linear-gradient(to top, rgba(6,14,26,0.9) 0%, transparent 100%)",
            }}
          />

          {/* Home indicator */}
          <div
            className="absolute bottom-2.5 left-1/2 -translate-x-1/2"
            style={{ width: 48, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.35)" }}
          />
        </div>

        {/* Hover glow ring */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            borderRadius: 44,
            boxShadow: "inset 0 0 0 1.5px rgba(14,206,206,0.5)",
          }}
        />
      </motion.div>

      {/* Feature label below phone */}
      <motion.div
        animate={{ opacity: isOther ? 0.5 : 1, y: isHovered ? -4 : 0 }}
        transition={{ duration: 0.2 }}
        className="mt-6 text-center"
        style={{ maxWidth: w }}
      >
        {(() => {
          const Icon = phone.icon;
          return (
            <div className="flex items-center justify-center gap-1.5 mb-1.5">
              <Icon className="h-3.5 w-3.5" style={{ color: "var(--accent-text)" }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--accent-text)" }}>
                {phone.label}
              </span>
            </div>
          );
        })()}
        <p className="text-xs leading-5" style={{ color: "var(--text-muted)" }}>
          {phone.feature}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function MobileAppPreview() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="section-pad overflow-hidden" style={{ background: "var(--bg-base)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
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
            Mobile App
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--text-primary)" }}>
            Your fleet, always in{" "}
            <span className="gradient-text">your pocket</span>
          </h2>
          <p className="mt-4 text-lg" style={{ color: "var(--text-secondary)" }}>
            Track vehicles, monitor driver activity, and respond to alerts from anywhere — on iOS and Android.
          </p>
        </motion.div>

        {/* Phone triptych */}
        <div className="mt-16 flex items-start justify-center gap-6 lg:gap-10">
          {phones.map((phone) => (
            <PhoneFrame
              key={phone.id}
              phone={phone}
              hovered={hovered}
              onHover={() => setHovered(phone.id)}
              onLeave={() => setHovered(null)}
            />
          ))}
        </div>

        {/* App store CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-14 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href="#"
            className="flex items-center gap-3 rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #0B1628 0%, #0D2040 100%)",
              border: "1px solid rgba(14,206,206,0.25)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            }}
          >
            <Apple className="h-5 w-5" />
            <span>
              <span className="block text-[10px] font-normal opacity-70 leading-none mb-0.5">Download on the</span>
              App Store
            </span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #0B1628 0%, #0D2040 100%)",
              border: "1px solid rgba(14,206,206,0.25)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            }}
          >
            <Smartphone className="h-5 w-5" />
            <span>
              <span className="block text-[10px] font-normal opacity-70 leading-none mb-0.5">Get it on</span>
              Google Play
            </span>
          </a>
          <a
            href="/contact"
            className="flex items-center gap-2 text-sm font-semibold transition hover:opacity-80"
            style={{ color: "var(--accent-text)" }}
          >
            Request a demo <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
