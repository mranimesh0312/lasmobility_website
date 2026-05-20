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
  Thermometer, Fingerprint, Video, Clock,
  Package, Bus, Factory, Landmark, Ambulance, Wrench,
  BarChart3, Sparkles, Users, Briefcase, Mail, Target, Globe,
} from "lucide-react";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import ThemeLogo from "@/components/ThemeLogo";
import AnnouncementBar from "@/components/AnnouncementBar";
import { useBookDemo } from "@/context/BookDemoContext";

const features = [
  {
    icon: Map,
    label: "Live Tracking",
    desc: "Real-time GPS position for every vehicle",
    href: "/features/live-tracking",
    image: "/module-tracking.svg",
  },
  {
    icon: Route,
    label: "Route Analytics",
    desc: "Replay trips, review stops, analyse distance",
    href: "/features/route-analytics",
    image: "/module-routes.svg",
  },
  {
    icon: ShieldAlert,
    label: "Driver Safety",
    desc: "Score behaviour, reduce harsh events",
    href: "/features/driver-safety",
    image: "/module-safety.svg",
  },
  {
    icon: BellRing,
    label: "Smart Alerts",
    desc: "Instant notifications for critical events",
    href: "/features/smart-alerts",
    image: "/module-alerts.svg",
  },
  {
    icon: BrainCircuit,
    label: "AI Intelligence",
    desc: "Recommendations powered by fleet data",
    href: "/ai-intelligence",
  },
  {
    icon: Route,
    label: "Route Optimization",
    desc: "Plan efficient routes to cut mileage and time",
    href: "/features/route-optimization",
    image: "/module-optimization.svg",
  },
];

const comingSoonFeatures = [
  {
    icon: Thermometer,
    label: "Temperature Monitoring",
    desc: "Real-time cold chain visibility and threshold alerts",
    href: "/features/temperature-monitoring",
    image: "/module-temperature.svg",
  },
  {
    icon: Fuel,
    label: "Fuel Monitoring",
    desc: "Tank-level tracking, theft detection, cost per km",
    href: "/features/fuel-monitoring",
    image: "/module-fuel.svg",
  },
  {
    icon: Fingerprint,
    label: "Driver Identification",
    desc: "RFID / iButton login — know who's behind the wheel",
    href: "/features/driver-identification",
    image: "/module-driver-id.svg",
  },
  {
    icon: Video,
    label: "Dash Cam & DVR",
    desc: "Event-triggered recording, live feed, AI detection",
    href: "/features/dash-cam-dvr",
    image: "/module-dashcam.svg",
  },
];

const solutions = [
  { icon: Truck,        label: "Logistics & Delivery",   desc: "Real-time visibility for freight and last-mile ops", stat: "↓ 22% cost per delivery",   href: "/solutions/logistics-delivery" },
  { icon: School,       label: "School Transport",        desc: "Student safety, live tracking, and parent alerts",   stat: "98% safety compliance",      href: "/solutions/school-transport" },
  { icon: UsersRound,   label: "Employee Transport",      desc: "Shift visibility, route adherence, driver scores",   stat: "94% on-time rate",           href: "/solutions/employee-transport" },
  { icon: Building2,    label: "Enterprise Fleet",        desc: "Multi-branch control, AI insights, role-based access", stat: "↑ 18% fleet utilisation",  href: "/solutions/enterprise-fleet" },
  { icon: PackageCheck, label: "Delivery Operations",     desc: "Sequence stops, reduce idle, improve SLAs",         stat: "20% more drops per day",     href: "/solutions/delivery-operations" },
  { icon: Zap,          label: "Field Operations",        desc: "Dispatch technicians, track mobile teams live",      stat: "30% more service calls/day", href: "/solutions/field-operations" },
];

const industriesNav = [
  { icon: Truck,     label: "Logistics & Transport",  desc: "Long-haul, regional, and inter-city freight",     href: "/industries/logistics-transport",  image: "/industry-truck.avif" },
  { icon: Package,   label: "Last-Mile Delivery",     desc: "High-frequency urban parcel and courier",          href: "/industries/last-mile-delivery",   image: "/industry-delivery-van.avif" },
  { icon: School,    label: "Education Transport",    desc: "School buses, university shuttle, campus fleet",   href: "/industries/education-transport",  image: "/industry-school-bus.avif" },
  { icon: Bus,       label: "Corporate Mobility",     desc: "Employee commute, office shuttle, shift runs",     href: "/industries/corporate-mobility",   image: "/industry-employee-bus.avif" },
  { icon: Factory,   label: "Construction & Assets",  desc: "Site vehicles, equipment, heavy machinery",        href: "/industries/construction-assets",  image: "/industry-construction.avif" },
  { icon: Wrench,    label: "Field Service",          desc: "Technician dispatch and service vehicles",          href: "/industries/field-service",        image: "/industry-car-rental.avif" },
  { icon: Landmark,  label: "Government Fleets",      desc: "Public sector, institutional, civic fleets",       href: "/industries/government-fleets",    image: "/industry-mining.avif" },
  { icon: Ambulance, label: "Specialized Fleets",     desc: "Healthcare, emergency, time-critical ops",         href: "/industries/specialized-fleets",   image: "/industry-emergency.avif" },
];

const aiNav = [
  { icon: Sparkles,     label: "AI Overview",          desc: "The intelligence layer powering every insight",     href: "/ai-intelligence" },
  { icon: Route,        label: "Route Intelligence",   desc: "AI-optimised sequencing and deviation analysis",    href: "/ai-intelligence#route" },
  { icon: ShieldAlert,  label: "Driver Intelligence",  desc: "Risk scoring, coaching insights, trend analysis",   href: "/ai-intelligence#drivers" },
  { icon: BarChart3,    label: "Fleet Analytics",      desc: "Predictive performance and operational recommendations", href: "/ai-intelligence#analytics" },
];

const aboutNav = [
  { icon: Building2, label: "Our Company",        desc: "Who we are and what we build",                    href: "/about" },
  { icon: Target,    label: "Mission & Vision",   desc: "The purpose and direction behind everything we do", href: "/about/mission" },
  { icon: Zap,       label: "Our Technology",     desc: "The platform powering modern fleet operations",    href: "/about/technology" },
  { icon: BrainCircuit, label: "Fleet Intelligence", desc: "AI-driven insights that keep fleets ahead",    href: "/about/fleet-intelligence" },
  { icon: Globe,     label: "Why LAS Mobility",   desc: "Why operators choose LAS Mobility",               href: "/about/why-las-mobility" },
  { icon: Briefcase, label: "Partners",           desc: "Our ecosystem of technology and channel partners", href: "/about/partners" },
  { icon: Mail,      label: "Contact Us",         desc: "Talk to our team or book a demo",                 href: "/contact" },
];

const navLinks = [
  { label: "Features",       href: "/features",        dropdown: "features" },
  { label: "Solutions",      href: "/solutions",       dropdown: "solutions" },
  { label: "Industries",     href: "/industries",      dropdown: "industries" },
  { label: "AI Intelligence",href: "/ai-intelligence", dropdown: "ai" },
  { label: "About",          href: "/about",           dropdown: "about" },
  { label: "Careers",        href: "/careers",         dropdown: null },
  { label: "Coming Soon",    href: "/coming-soon",     dropdown: "coming-soon" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { open: openBookDemo } = useBookDemo();
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
      <AnnouncementBar />
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-6 xl:px-8"
        aria-label="Primary navigation"
      >
        {/* Logo — never shrinks */}
        <Link href="/" className="flex shrink-0 items-center" aria-label="LAS Mobility home">
          <ThemeLogo width={160} height={36} className="h-9 w-auto" priority />
        </Link>

        {/* Desktop nav — shown from xl (1280px) upward */}
        <div className="hidden min-w-0 flex-1 items-center justify-center xl:flex">
          <div className="flex items-center">
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
                    className={`flex items-center gap-0.5 whitespace-nowrap rounded-lg px-2.5 py-2 text-[13px] font-medium transition-all ${
                      item.label === "Coming Soon"
                        ? "font-semibold"
                        : active
                        ? "text-[var(--accent-text)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                    style={item.label === "Coming Soon" ? { color: "#F59E0B" } : undefined}
                  >
                    {item.label === "Coming Soon" && <Clock className="h-3 w-3 mr-0.5 shrink-0" />}
                    {item.label}
                    {hasDropdown && (
                      <ChevronDown
                        className={`h-3 w-3 shrink-0 transition-transform duration-200 ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>
                  {active && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2.5 right-2.5 h-0.5 rounded-full"
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
                        className="absolute top-full mt-2"
                        style={
                          item.dropdown === "coming-soon"
                            ? { right: 0 }
                            : { left: "50%", transform: "translateX(-50%)" }
                        }
                      >
                        {item.dropdown === "features" && <FeaturesMegaMenu />}
                        {item.dropdown === "solutions" && <SolutionsMegaMenu />}
                        {item.dropdown === "industries" && <IndustriesMegaMenu />}
                        {item.dropdown === "ai" && <AiMegaMenu />}
                        {item.dropdown === "about" && <AboutMegaMenu />}
                        {item.dropdown === "coming-soon" && <ComingSoonMegaMenu />}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop actions — never shrinks, shown from xl upward */}
        <div className="hidden shrink-0 items-center gap-1.5 xl:flex">
          <ThemeSwitcher />
          <Link
            href="/login"
            className="inline-flex h-9 items-center whitespace-nowrap rounded-lg px-3.5 text-[13px] font-semibold transition-all hover:opacity-90"
            style={{
              color: "var(--text-primary)",
              border: "1px solid var(--border)",
              background: "var(--bg-card)",
            }}
          >
            Log in
          </Link>
          <button
            type="button"
            onClick={() => openBookDemo("navbar")}
            className="btn-primary inline-flex h-9 items-center whitespace-nowrap rounded-lg px-3.5 text-[13px] font-semibold"
          >
            Book a Demo
          </button>
        </div>

        {/* Tablet / Mobile controls — visible below xl */}
        <div className="flex shrink-0 items-center gap-2 xl:hidden">
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
            className="overflow-hidden border-t xl:hidden"
            style={{
              borderColor: "var(--border)",
              background: "var(--nav-bg)",
              backdropFilter: "blur(24px)",
            }}
          >
            <div className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">
              {navLinks.map((item) => {
                const list = item.dropdown === "features" ? features : item.dropdown === "solutions" ? solutions : item.dropdown === "industries" ? industriesNav : item.dropdown === "ai" ? aiNav : item.dropdown === "about" ? aboutNav : item.dropdown === "coming-soon" ? comingSoonFeatures : null;
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
                <button
                  type="button"
                  onClick={() => { setMobileOpen(false); openBookDemo("navbar-mobile"); }}
                  className="btn-primary flex-1 rounded-lg px-4 py-3 text-center text-sm"
                >
                  Book a Demo
                </button>
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
      className="w-[680px] overflow-hidden rounded-2xl p-1"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.22), 0 4px 16px rgba(0,0,0,0.1)",
      }}
    >
      <div className="grid grid-cols-[1fr_196px]">
        {/* Left: feature list */}
        <div className="p-3">
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
            Platform Features
          </p>
          <div className="grid grid-cols-2 gap-0.5">
            {features.map(({ icon: Icon, label, desc, href, image }) => (
              <Link
                key={href + label}
                href={href}
                className="group flex items-start gap-3 rounded-xl p-3 transition-all"
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--accent-glow)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                {image ? (
                  <div className="relative mt-0.5 h-8 w-8 shrink-0 overflow-hidden rounded-lg" style={{ border: "1px solid var(--border-accent)" }}>
                    <Image src={image} alt={label} fill sizes="32px" className="object-cover object-left-top" />
                  </div>
                ) : (
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: "var(--accent-glow)", border: "1px solid var(--border-accent)" }}>
                    <Icon className="h-4 w-4" style={{ color: "var(--accent-text)" }} />
                  </span>
                )}
                <span>
                  <span className="block text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{label}</span>
                  <span className="mt-0.5 block text-xs leading-4" style={{ color: "var(--text-muted)" }}>{desc}</span>
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-3 border-t px-3 pt-3" style={{ borderColor: "var(--border)" }}>
            <Link href="/features" className="flex items-center gap-1 text-xs font-semibold transition hover:opacity-80" style={{ color: "var(--accent-text)" }}>
              View all features <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Right: visual panel */}
        <div className="relative m-1 flex flex-col overflow-hidden rounded-xl" style={{ background: "linear-gradient(135deg, #060E1A 0%, #0B1628 100%)" }}>
          <div className="relative flex-1 overflow-hidden">
            <Image src="/module-tracking.svg" alt="Live Tracking Module" fill className="object-cover object-center opacity-90" />
          </div>
          <div className="p-4">
            <p className="text-xs font-bold text-white">Live Tracking</p>
            <p className="mt-1 text-[11px] leading-4" style={{ color: "rgba(200,235,255,0.65)" }}>
              Real-time GPS, vehicle status, and live fleet command.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Coming Soon Mega Menu ── */
function ComingSoonMegaMenu() {
  return (
    <div
      className="w-[580px] overflow-hidden rounded-2xl p-1"
      style={{
        background: "var(--bg-card)",
        border: "1px solid rgba(245,158,11,0.3)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.22), 0 0 40px rgba(245,158,11,0.06)",
      }}
    >
      <div className="p-3">
        <div className="mb-3 flex items-center gap-2 px-2">
          <span
            className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest"
            style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.35)", color: "#F59E0B" }}
          >
            <Clock className="h-3 w-3" /> Coming Soon
          </span>
          <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
            Next-generation hardware integrations
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {comingSoonFeatures.map(({ icon: Icon, label, desc, href, image }) => (
            <Link
              key={href + label}
              href={href}
              className="group flex items-start gap-3 rounded-xl p-3 transition-all"
              style={{ border: "1px solid var(--border)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(245,158,11,0.05)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,158,11,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              }}
            >
              {image ? (
                <div className="relative mt-0.5 h-10 w-10 shrink-0 overflow-hidden rounded-lg" style={{ border: "1px solid rgba(245,158,11,0.25)" }}>
                  <Image src={image} alt={label} fill sizes="40px" className="object-cover object-left-top" />
                </div>
              ) : (
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)" }}>
                  <Icon className="h-5 w-5" style={{ color: "#F59E0B" }} />
                </span>
              )}
              <span>
                <span className="flex items-center gap-1.5">
                  <span className="block text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{label}</span>
                  <span className="rounded-full px-1.5 py-px text-[9px] font-bold uppercase" style={{ background: "rgba(245,158,11,0.15)", color: "#F59E0B" }}>Soon</span>
                </span>
                <span className="mt-0.5 block text-xs leading-4" style={{ color: "var(--text-muted)" }}>{desc}</span>
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-3 border-t px-2 pt-3" style={{ borderColor: "var(--border)" }}>
          <Link href="/coming-soon" className="flex items-center gap-1 text-xs font-semibold transition hover:opacity-80" style={{ color: "#F59E0B" }}>
            See all upcoming features <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ── Solutions Mega Menu ── */
function SolutionsMegaMenu() {
  return (
    <div
      className="w-[620px] overflow-hidden rounded-2xl p-1"
      style={{
        background: "var(--bg-card)",
        border: "1px solid rgba(34,197,94,0.25)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.22), 0 0 40px rgba(34,197,94,0.05)",
      }}
    >
      <div className="p-3">
        <div className="mb-3 flex items-center gap-2 px-1">
          <span
            className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest"
            style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)", color: "#22C55E" }}
          >
            Solutions
          </span>
          <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
            Built around how your fleet operates
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1">
          {solutions.map(({ icon: Icon, label, desc, stat, href }) => (
            <Link
              key={href + label}
              href={href}
              className="group flex items-start gap-3 rounded-xl p-3 transition-all"
              style={{ border: "1px solid transparent" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(34,197,94,0.05)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(34,197,94,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.borderColor = "transparent";
              }}
            >
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)" }}>
                <Icon className="h-4 w-4" style={{ color: "#22C55E" }} />
              </span>
              <span>
                <span className="block text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{label}</span>
                <span className="mt-0.5 block text-xs leading-4" style={{ color: "var(--text-muted)" }}>{desc}</span>
                <span className="mt-1 block text-[10px] font-bold" style={{ color: "#22C55E" }}>{stat}</span>
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-3 border-t px-1 pt-3" style={{ borderColor: "var(--border)" }}>
          <Link
            href="/solutions"
            className="flex items-center gap-1.5 text-xs font-semibold transition hover:opacity-80"
            style={{ color: "#22C55E" }}
          >
            View all solutions <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ── Industries Mega Menu ── */
function IndustriesMegaMenu() {
  return (
    <div
      className="w-[700px] overflow-hidden rounded-2xl p-1"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.22), 0 4px 16px rgba(0,0,0,0.1)",
      }}
    >
      <div className="p-3">
        <div className="mb-3 flex items-center gap-2 px-1">
          <span
            className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest"
            style={{ background: "var(--accent-glow)", border: "1px solid var(--border-accent)", color: "var(--accent-text)" }}
          >
            Industries
          </span>
          <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
            Sector-specific fleet intelligence
          </span>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {industriesNav.map(({ icon: Icon, label, desc, href, image }) => (
            <Link
              key={href + label}
              href={href}
              className="group overflow-hidden rounded-xl transition-all"
              style={{ border: "1px solid var(--border)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              }}
            >
              <div className="relative h-16 overflow-hidden">
                <Image
                  src={image}
                  alt={label}
                  fill
                  sizes="160px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <span
                  className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-md backdrop-blur-sm"
                  style={{ background: "rgba(14,206,206,0.25)", border: "1px solid rgba(14,206,206,0.4)" }}
                >
                  <Icon className="h-3 w-3 text-cyan-300" />
                </span>
              </div>
              <div className="p-2.5" style={{ background: "var(--bg-card)" }}>
                <p className="text-[11px] font-bold leading-tight" style={{ color: "var(--text-primary)" }}>{label}</p>
                <p className="mt-0.5 text-[10px] leading-3.5" style={{ color: "var(--text-muted)" }}>{desc}</p>
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

/* ── AI Intelligence Mega Menu ── */
function AiMegaMenu() {
  return (
    <div
      className="w-[480px] overflow-hidden rounded-2xl p-1"
      style={{
        background: "var(--bg-card)",
        border: "1px solid rgba(139,92,246,0.3)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.22), 0 0 40px rgba(139,92,246,0.06)",
      }}
    >
      <div className="p-3">
        <div className="mb-3 flex items-center gap-2 px-1">
          <span
            className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest"
            style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.3)", color: "#8B5CF6" }}
          >
            <BrainCircuit className="h-3 w-3" /> AI Intelligence
          </span>
          <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>Fleet intelligence, automated</span>
        </div>
        <div className="grid grid-cols-1 gap-0.5">
          {aiNav.map(({ icon: Icon, label, desc, href }) => (
            <Link
              key={href + label}
              href={href}
              className="flex items-start gap-3 rounded-xl p-3 transition-all"
              style={{ border: "1px solid transparent" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(139,92,246,0.06)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,92,246,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.borderColor = "transparent";
              }}
            >
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.25)" }}>
                <Icon className="h-4 w-4" style={{ color: "#8B5CF6" }} />
              </span>
              <span>
                <span className="block text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{label}</span>
                <span className="mt-0.5 block text-xs leading-4" style={{ color: "var(--text-muted)" }}>{desc}</span>
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-3 border-t px-1 pt-3" style={{ borderColor: "var(--border)" }}>
          <Link href="/ai-intelligence" className="flex items-center gap-1.5 text-xs font-semibold transition hover:opacity-80" style={{ color: "#8B5CF6" }}>
            Explore AI Intelligence <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ── About Mega Menu ── */
function AboutMegaMenu() {
  return (
    <div
      className="w-[380px] overflow-hidden rounded-2xl p-1"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)",
      }}
    >
      <div className="p-3">
        <p className="mb-3 px-1 text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
          About LAS Mobility
        </p>
        <div className="grid grid-cols-1 gap-0.5">
          {aboutNav.map(({ icon: Icon, label, desc, href }) => (
            <Link
              key={href + label}
              href={href}
              className="flex items-start gap-3 rounded-xl p-3 transition-all"
              style={{ border: "1px solid transparent" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--accent-glow)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.borderColor = "transparent";
              }}
            >
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: "var(--accent-glow)", border: "1px solid var(--border-accent)" }}>
                <Icon className="h-4 w-4" style={{ color: "var(--accent-text)" }} />
              </span>
              <span>
                <span className="block text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{label}</span>
                <span className="mt-0.5 block text-xs leading-4" style={{ color: "var(--text-muted)" }}>{desc}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
