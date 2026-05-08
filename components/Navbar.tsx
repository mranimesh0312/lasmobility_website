"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, ChevronDown, ArrowRight,
  Map, Route, ShieldAlert, Fuel, BrainCircuit, BellRing,
  Truck, Building2, Zap, PackageCheck, School, UsersRound,
} from "lucide-react";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const features = [
  {
    icon: Map,
    label: "Live Tracking",
    desc: "Real-time GPS position for every vehicle",
    href: "/features#tracking",
  },
  {
    icon: Route,
    label: "Route Analytics",
    desc: "Optimise trips and cut dead mileage",
    href: "/features#routes",
  },
  {
    icon: ShieldAlert,
    label: "Driver Safety",
    desc: "Score behaviour, reduce harsh events",
    href: "/features#safety",
    image: "/module-safety.svg",
  },
  {
    icon: Fuel,
    label: "Fuel Monitoring",
    desc: "Track consumption and detect anomalies",
    href: "/features#fuel",
    image: "/module-fuel.svg",
  },
  {
    icon: BellRing,
    label: "Smart Alerts",
    desc: "Instant notifications for critical events",
    href: "/features#alerts",
  },
  {
    icon: BrainCircuit,
    label: "AI Intelligence",
    desc: "Recommendations powered by fleet data",
    href: "/ai-intelligence",
  },
];

const solutions = [
  {
    icon: Truck,
    label: "Logistics & Delivery",
    desc: "Real-time visibility for freight and last-mile ops",
    href: "/industries",
    image: "/industry-truck.avif",
  },
  {
    icon: School,
    label: "School Transport",
    desc: "Student safety with live tracking and alerts",
    href: "/industries",
    image: "/industry-school-bus.avif",
  },
  {
    icon: UsersRound,
    label: "Employee Transport",
    desc: "Reliable trip visibility and route monitoring",
    href: "/industries",
    image: "/industry-employee-bus.avif",
  },
  {
    icon: Building2,
    label: "Enterprise Fleet",
    desc: "Centralised control for large multi-branch fleets",
    href: "/solutions#enterprise",
    image: "/industry-construction.avif",
  },
  {
    icon: PackageCheck,
    label: "Delivery Operations",
    desc: "Improve on-time performance, reduce delays",
    href: "/industries",
    image: "/industry-delivery-van.avif",
  },
  {
    icon: Zap,
    label: "Field Operations",
    desc: "Track mobile teams and service vehicles live",
    href: "/solutions#field",
    image: "/industry-car-rental.avif",
  },
];

const navLinks = [
  { label: "Features",       href: "/features",        dropdown: "features" },
  { label: "Solutions",      href: "/solutions",       dropdown: "solutions" },
  { label: "Industries",     href: "/industries",      dropdown: null },
  { label: "AI Intelligence",href: "/ai-intelligence", dropdown: null },
  { label: "About",          href: "/about",           dropdown: null },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <header
      className="sticky top-0 z-50 w-full transition-all duration-300"
      style={{
        background: "var(--nav-bg)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.12)" : "none",
      }}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Primary navigation"
      >
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center" aria-label="LAS Mobility home">
          <Image src="/logo.svg" width={220} height={50} alt="LAS Mobility" priority className="h-10 w-auto" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            const hasDropdown = !!item.dropdown;
            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => hasDropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                    active
                      ? "text-[var(--accent-text)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {item.label}
                  {hasDropdown && (
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        activeDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>
                {active && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                    style={{ background: "var(--accent)" }}
                  />
                )}

                {/* Mega dropdown */}
                <AnimatePresence>
                  {hasDropdown && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute left-1/2 top-full mt-2"
                      style={{ transform: "translateX(-50%)" }}
                    >
                      {item.dropdown === "features" && (
                        <FeaturesMegaMenu />
                      )}
                      {item.dropdown === "solutions" && (
                        <SolutionsMegaMenu />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <ThemeSwitcher />
          <Link
            href="/login"
            className="rounded-lg px-4 py-2 text-sm font-semibold transition-all hover:opacity-90"
            style={{
              color: "var(--text-primary)",
              border: "1px solid var(--border)",
              background: "var(--bg-card)",
            }}
          >
            Log in
          </Link>
          <Link href="/contact" className="btn-primary rounded-lg px-4 py-2.5 text-sm">
            Book a Demo
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeSwitcher />
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border transition"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
            }}
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t lg:hidden"
            style={{
              borderColor: "var(--border)",
              background: "var(--nav-bg)",
              backdropFilter: "blur(24px)",
            }}
          >
            <div className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">
              {navLinks.map((item) => {
                const list = item.dropdown === "features" ? features : item.dropdown === "solutions" ? solutions : null;
                return (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      className={`block rounded-lg px-3 py-3 text-sm font-semibold transition ${
                        pathname === item.href
                          ? "text-[var(--accent-text)]"
                          : "text-[var(--text-secondary)]"
                      }`}
                    >
                      {item.label}
                    </Link>
                    {list && (
                      <div className="ml-4 mt-0.5 grid grid-cols-2 gap-0.5">
                        {list.map(({ icon: Icon, label, href }) => (
                          <Link
                            key={href + label}
                            href={href}
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition"
                            style={{ color: "var(--text-muted)" }}
                          >
                            <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--accent-text)" }} />
                            {label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="mt-3 flex gap-2">
                <Link
                  href="/login"
                  className="flex-1 rounded-lg px-4 py-3 text-center text-sm font-semibold transition"
                  style={{ border: "1px solid var(--border)", color: "var(--text-primary)" }}
                >
                  Log in
                </Link>
                <Link href="/contact" className="btn-primary flex-1 rounded-lg px-4 py-3 text-center text-sm">
                  Book a Demo
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ── Features Mega Menu ── */
function FeaturesMegaMenu() {
  return (
    <div
      className="w-[620px] overflow-hidden rounded-2xl p-1"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)",
      }}
    >
      <div className="grid grid-cols-[1fr_200px]">
        {/* Left: feature list */}
        <div className="p-3">
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
            Platform Features
          </p>
          <div className="grid grid-cols-2 gap-0.5">
            {features.map(({ icon: Icon, label, desc, href }) => (
              <Link
                key={href + label}
                href={href}
                className="group flex items-start gap-3 rounded-xl p-3 transition-all"
                style={{ color: "var(--text-secondary)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--accent-glow)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                <span
                  className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: "var(--accent-glow)", border: "1px solid var(--border-accent)" }}
                >
                  <Icon className="h-4 w-4" style={{ color: "var(--accent-text)" }} />
                </span>
                <span>
                  <span className="block text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                    {label}
                  </span>
                  <span className="mt-0.5 block text-xs leading-4" style={{ color: "var(--text-muted)" }}>
                    {desc}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Right: visual panel */}
        <div
          className="relative flex flex-col overflow-hidden rounded-xl m-1"
          style={{ background: "linear-gradient(135deg, #060E1A 0%, #0B1628 100%)" }}
        >
          <div className="relative flex-1 overflow-hidden">
            <Image
              src="/module-safety.svg"
              alt="Driver Safety Module"
              fill
              className="object-cover object-center opacity-80"
            />
          </div>
          <div className="p-4">
            <p className="text-xs font-bold text-white">Driver Safety Module</p>
            <p className="mt-1 text-[11px] leading-4" style={{ color: "rgba(200,235,255,0.65)" }}>
              Real-time scoring, harsh event detection, and coaching triggers.
            </p>
            <Link
              href="/features"
              className="mt-3 flex items-center gap-1 text-xs font-semibold"
              style={{ color: "var(--accent-text)" }}
            >
              View all features <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Solutions Mega Menu ── */
function SolutionsMegaMenu() {
  return (
    <div
      className="w-[680px] overflow-hidden rounded-2xl p-1"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)",
      }}
    >
      <div className="p-3">
        <p className="mb-3 px-1 text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
          Industries &amp; Solutions
        </p>
        <div className="grid grid-cols-3 gap-2">
          {solutions.map(({ icon: Icon, label, desc, href, image }) => (
            <Link
              key={href + label}
              href={href}
              className="group relative overflow-hidden rounded-xl transition-all"
              style={{ border: "1px solid var(--border)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              }}
            >
              {/* Image thumbnail */}
              <div className="relative h-24 overflow-hidden">
                <Image
                  src={image}
                  alt={label}
                  fill
                  sizes="220px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <span
                  className="absolute left-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-lg backdrop-blur-sm"
                  style={{ background: "rgba(14,206,206,0.25)", border: "1px solid rgba(14,206,206,0.4)" }}
                >
                  <Icon className="h-3.5 w-3.5 text-cyan-300" />
                </span>
              </div>
              {/* Text */}
              <div className="p-3" style={{ background: "var(--bg-card)" }}>
                <p className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>{label}</p>
                <p className="mt-0.5 text-[11px] leading-4" style={{ color: "var(--text-muted)" }}>{desc}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-3 border-t px-1 pt-3" style={{ borderColor: "var(--border)" }}>
          <Link
            href="/industries"
            className="flex items-center gap-1.5 text-xs font-semibold transition hover:opacity-80"
            style={{ color: "var(--accent-text)" }}
          >
            View all industries <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
