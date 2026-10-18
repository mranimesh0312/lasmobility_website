"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, ChevronDown, ArrowRight,
  Map, Route, ShieldAlert, Fuel, BrainCircuit, BellRing,
  Truck, Building2, Zap, PackageCheck, School, UsersRound,
  Thermometer, Fingerprint, Video, Clock,
  Package, Bus, Factory, Landmark, Ambulance, Wrench,
  BarChart3, Sparkles, Users, Briefcase, Mail, Target, Globe, LogIn, CalendarCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import ThemeLogo from "@/components/ThemeLogo";
import AnnouncementBar from "@/components/AnnouncementBar";
import ModulePreview from "@/components/modules/ModulePreview";
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

/** Hardware modules that are live in the app (own pages under /features). */
const liveModules = [
  {
    icon: Fuel,
    label: "Fuel Monitoring",
    desc: "Tank level, refuel and drain events, cost per km",
    href: "/features/fuel-monitoring",
    image: "/module-fuel.svg",
  },
  {
    icon: Thermometer,
    label: "Temperature Monitoring",
    desc: "Cold chain readings and threshold breach alerts",
    href: "/features/temperature-monitoring",
    image: "/module-temperature.svg",
  },
  {
    icon: Fingerprint,
    label: "Driver Identification",
    desc: "iButton / RFID keys, every trip tied to a driver",
    href: "/features/driver-identification",
    image: "/module-driver-id.svg",
  },
];

const comingSoonFeatures = [
  {
    icon: Video,
    label: "Dash Cam & DVR",
    desc: "Event-triggered recording, live feed, AI detection",
    href: "/features/dash-cam-dvr",
    image: "/module-dashcam.svg",
  },
];

const solutions = [
  { icon: Truck,        label: "Logistics & Delivery",   desc: "Real-time visibility for freight and last-mile ops", stat: "Cost per delivery tracked",   href: "/solutions/logistics-delivery" },
  { icon: School,       label: "School Transport",        desc: "Student safety, live tracking, and parent alerts",   stat: "Driver behaviour on record",      href: "/solutions/school-transport" },
  { icon: UsersRound,   label: "Employee Transport",      desc: "Shift visibility, route adherence, driver scores",   stat: "On-time runs tracked",           href: "/solutions/employee-transport" },
  { icon: Building2,    label: "Enterprise Fleet",        desc: "Multi-branch control, AI insights, role-based access", stat: "Utilisation by branch",  href: "/solutions/enterprise-fleet" },
  { icon: PackageCheck, label: "Delivery Operations",     desc: "Sequence stops, reduce idle, improve SLAs",         stat: "More drops per route",     href: "/solutions/delivery-operations" },
  { icon: Zap,          label: "Field Operations",        desc: "Dispatch technicians, track mobile teams live",      stat: "Nearest technician dispatched", href: "/solutions/field-operations" },
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

/** "Log in" opens the LAS Mobility web app (the website has no login of its own). */
const APP_LOGIN_URL = `${process.env.NEXT_PUBLIC_APP_URL ?? "https://lasmobility-web.vercel.app"}/login`;

/** The site's dark-theme header palette, applied over dark sections in either theme. */
const DARK_TONE = {
  "--nav-bg": "rgb(var(--ink-deep-rgb) / 0.72)",
  "--bg-card": "var(--surface-2)",
  "--text-primary": "var(--slate-50)",
  "--text-secondary": "var(--slate-400)",
  "--text-muted": "var(--slate-400)",
  "--border": "rgb(var(--white-rgb) / 0.08)",
  "--border-accent": "rgb(var(--accent-rgb) / 0.3)",
  "--accent-glow": "rgb(var(--accent-rgb) / 0.12)",
} as React.CSSProperties;

export default function Navbar() {
  const pathname = usePathname();
  const { open: openBookDemo } = useBookDemo();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  // A short grace period before a dropdown closes, so a pointer that cuts a
  // corner on its way to a menu item doesn't lose the menu.
  const closeTimer = useRef<number | undefined>(undefined);
  const openDropdown = (label: string | null) => {
    window.clearTimeout(closeTimer.current);
    setActiveDropdown(label);
  };
  const closeDropdownSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setActiveDropdown(null), 160);
  };

  // Scroll-aware header: always on screen (it is the site's navigation), with a
  // shadow once scrolled and page progress drawn along its edge. Its height
  // never changes while scrolling, so scroll-driven sections stay in sync.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setActiveDropdown(null); }, [pathname]);

  // A dark full-screen section under the header (the homepage story) sets
  // <html data-header-tone="dark">; the header then uses its dark palette.
  const [overDark, setOverDark] = useState(false);
  useEffect(() => {
    const html = document.documentElement;
    const read = () => setOverDark(html.dataset.headerTone === "dark");
    read();
    const mo = new MutationObserver(read);
    mo.observe(html, { attributes: true, attributeFilter: ["data-header-tone"] });
    return () => mo.disconnect();
  }, []);

  // Publish the header height so full-screen sections (the homepage story)
  // can sit underneath it instead of starting below it.
  const headerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const set = () => document.documentElement.style.setProperty("--site-header-h", `${el.offsetHeight}px`);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <header
      id="site-header"
      ref={headerRef}
      // Over the always-dark story the header takes the dark accent set too.
      className={`sticky top-0 z-50 w-full transition-all duration-300 motion-reduce:transition-none ${overDark ? "theme-dark-scope" : ""}`}
      style={{
        ...(overDark ? DARK_TONE : null),
        background: "var(--nav-bg)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 24px rgb(var(--black-rgb) / 0.12)" : "none",

      }}
    >
      <div
        ref={progressRef}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left"
        style={{ background: "var(--accent)", transform: "scaleX(0)" }}
      />
      <AnnouncementBar />
      <nav
        className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 xl:px-8"
        aria-label="Primary navigation"
      >
        {/* Logo — never shrinks */}
        <Link href="/" className="flex shrink-0 items-center" aria-label="LAS Mobility home">
          <ThemeLogo width={156} height={31} priority forceDark={overDark} />
        </Link>

        {/* Desktop nav — shown from xl (1280px) upward */}
        <div className="hidden min-w-0 flex-1 items-center justify-center xl:flex">
          <div className="flex items-center gap-0.5">
            {navLinks.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              const hasDropdown = !!item.dropdown;
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => openDropdown(hasDropdown ? item.label : null)}
                  onMouseLeave={closeDropdownSoon}
                >
                  <Link
                    href={item.href}
                    className={`relative z-10 flex h-9 items-center gap-1 whitespace-nowrap rounded-[10px] px-2.5 text-[13.5px] font-medium transition-colors duration-150 2xl:px-3.5 ${
                      active || activeDropdown === item.label
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    } ${active ? "" : "hover:bg-[var(--bg-muted)]"} ${activeDropdown === item.label && !active ? "bg-[var(--bg-muted)]" : ""}`}
                  >
                    {item.label}
                    {/* Coming Soon reads like the other links, marked with a quiet amber dot. */}
                    {item.label === "Coming Soon" && (
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--warning)" }} aria-hidden="true" />
                    )}
                    {hasDropdown && (
                      <ChevronDown
                        className={`h-3 w-3 shrink-0 transition-transform duration-200 ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>
                  {/* Active page: a highlight that slides between items. */}
                  {active && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-[10px]"
                      style={{ background: "var(--accent-glow)", boxShadow: "inset 0 0 0 1px var(--border-accent)" }}
                      transition={{ type: "spring", stiffness: 480, damping: 38 }}
                    />
                  )}

                  {/* Mega dropdown */}
                  <AnimatePresence>
                    {hasDropdown && activeDropdown === item.label && (
                      <motion.div
                        // Centering goes through framer's `x` (a CSS transform would be
                        // overwritten by the `y` animation), and the gap below the
                        // trigger is padding, so the pointer never leaves the hover area.
                        // The wide Features panel centres on the viewport under the
                        // sticky header, so it never spills off narrower screens.
                        initial={{ opacity: 0, y: 10, x: item.dropdown === "coming-soon" ? 0 : "-50%" }}
                        animate={{ opacity: 1, y: 0, x: item.dropdown === "coming-soon" ? 0 : "-50%" }}
                        exit={{ opacity: 0, y: 10, x: item.dropdown === "coming-soon" ? 0 : "-50%" }}
                        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                        className={item.dropdown === "features" ? "fixed pt-2" : "absolute top-full pt-2"}
                        style={
                          item.dropdown === "coming-soon"
                            ? { right: 0 }
                            : item.dropdown === "features"
                              ? { left: "50%", top: "calc(var(--site-header-h, 100px) - 14px)" }
                              : { left: "50%" }
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
        {/* Theme, Log in and Book a Demo share one height (40px) and radius (10px). */}
        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <ThemeSwitcher />
          <Link
            href={APP_LOGIN_URL}
            className="inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-[10px] px-4 text-[13px] font-semibold transition-colors duration-150 hover:border-[var(--border-accent)] hover:bg-[var(--bg-card-hover)]"
            style={{
              color: "var(--text-primary)",
              border: "1px solid var(--border)",
              background: "var(--bg-card)",
            }}
          >
            <LogIn className="hidden h-4 w-4 2xl:block" style={{ color: "var(--text-muted)" }} /> Log in
          </Link>
          <button
            type="button"
            onClick={() => openBookDemo("navbar")}
            className="btn-primary inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-[10px] px-4 text-[13px] font-semibold"
          >
            <CalendarCheck className="hidden h-4 w-4 2xl:block" /> Book a Demo
          </button>
        </div>

        {/* Tablet / Mobile controls — visible below xl */}
        <div className="flex shrink-0 items-center gap-2 xl:hidden">
          <ThemeSwitcher />
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-[10px] border transition"
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

      {/* Mobile / tablet menu. It overlays the page below the header instead of
          growing the header, and scrolls on its own: on short laptop screens
          the full menu is taller than the viewport, and a sticky header that
          grows can't be scrolled, so its lower links were unreachable. */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            data-lenis-prevent
            className="absolute inset-x-0 top-full overflow-y-auto overscroll-contain border-t shadow-2xl xl:hidden"
            style={{
              maxHeight: "calc(100svh - var(--site-header-h, 100px))",
              borderColor: "var(--border)",
              background: "var(--nav-bg)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            <div className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">
              {navLinks.map((item) => {
                const list = item.dropdown === "features" ? [...features, ...liveModules] : item.dropdown === "solutions" ? solutions : item.dropdown === "industries" ? industriesNav : item.dropdown === "ai" ? aiNav : item.dropdown === "about" ? aboutNav : item.dropdown === "coming-soon" ? comingSoonFeatures : null;
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
                  href={APP_LOGIN_URL}
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
type NavItem = { icon: LucideIcon; label: string; desc: string; href: string; image?: string };

/** One row in the features menu; hovering or focusing it drives the preview. */
function FeatureRow({ item, active, onPreview, isNew = false }: { item: NavItem; active: boolean; onPreview: (i: NavItem) => void; isNew?: boolean }) {
  const { icon: Icon, label, desc, href, image } = item;
  return (
    <Link
      href={href}
      className="group flex h-full items-start gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150"
      style={{ background: active ? "var(--accent-glow)" : "transparent" }}
      onMouseEnter={() => onPreview(item)}
      onFocus={() => onPreview(item)}
    >
      <span className="relative mt-0.5 h-9 w-9 shrink-0">
        {image ? (
          <span className="relative block h-9 w-9 overflow-hidden rounded-lg" style={{ border: "1px solid var(--border)" }}>
            <Image src={image} alt="" fill sizes="36px" className="object-cover object-left-top" />
          </span>
        ) : (
          <span className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: "var(--accent-glow)", border: "1px solid var(--border-accent)" }}>
            <Icon className="h-4 w-4" style={{ color: "var(--accent-text)" }} />
          </span>
        )}
        {/* "New" marker sits on the icon so it never pushes the title onto two lines. */}
        {isNew && (
          <span
            className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full"
            style={{ background: "var(--success)", boxShadow: "0 0 0 2px var(--bg-card)" }}
            aria-hidden="true"
          />
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold leading-5" style={{ color: "var(--text-primary)" }}>
          {label}
          {isNew && <span className="sr-only"> (new)</span>}
        </span>
        <span className="mt-0.5 line-clamp-2 text-xs leading-4" style={{ color: "var(--text-muted)" }}>{desc}</span>
      </span>
    </Link>
  );
}

function FeaturesMegaMenu() {
  const [preview, setPreview] = useState<NavItem>(features[0]);
  const PreviewIcon = preview.icon;
  // Filled row by row (two platform items, then one hardware module) so every
  // row shares one height across all three equal columns.
  const rows = [0, 1, 2].map((r) => [features[r * 2], features[r * 2 + 1], liveModules[r]] as const);
  const hardwareCell = "border-l pl-2";
  return (
    <div
      className="w-[1040px] max-w-[calc(100vw-32px)] overflow-hidden rounded-2xl p-1.5"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        boxShadow: "0 24px 60px rgb(var(--black-rgb) / 0.24), 0 4px 16px rgb(var(--black-rgb) / 0.1)",
      }}
    >
      <div className="grid grid-cols-[1fr_260px] gap-1.5">
        <div className="flex flex-col p-2">
          <div className="grid flex-1 grid-cols-3 gap-x-1 gap-y-1">
            <p className="col-span-2 px-3 pb-1 text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
              Platform
            </p>
            <p
              className={`${hardwareCell} flex items-center gap-1.5 px-3 pb-1 text-[10px] font-bold uppercase tracking-widest`}
              style={{ color: "var(--text-muted)", borderColor: "var(--border)" }}
            >
              Hardware modules
              <span className="ml-auto flex items-center gap-1 normal-case tracking-normal" style={{ color: "var(--success)" }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--success)" }} aria-hidden="true" /> New &amp; live
              </span>
            </p>
            {rows.map(([a, b, hw]) => (
              <Fragment key={hw.href}>
                <FeatureRow item={a} active={preview.href === a.href} onPreview={setPreview} />
                <FeatureRow item={b} active={preview.href === b.href} onPreview={setPreview} />
                <div className={hardwareCell} style={{ borderColor: "var(--border)" }}>
                  <FeatureRow item={hw} active={preview.href === hw.href} onPreview={setPreview} isNew />
                </div>
              </Fragment>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between border-t px-3 pt-3" style={{ borderColor: "var(--border)" }}>
            <Link href="/features" className="flex items-center gap-1 text-xs font-semibold transition hover:opacity-80" style={{ color: "var(--accent-text)" }}>
              View all features <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link href="/coming-soon" className="flex items-center gap-1 text-xs transition hover:opacity-80" style={{ color: "var(--text-muted)" }}>
              <Clock className="h-3 w-3" /> Coming next: Dash Cam &amp; DVR
            </Link>
          </div>
        </div>

        {/* Preview: follows the hovered item. Always dark, like the product. */}
        <Link
          href={preview.href}
          className="theme-dark-scope group relative flex flex-col overflow-hidden rounded-xl"
          style={{ background: "var(--surface-0)", border: "1px solid rgb(var(--mist-rgb) / 0.08)" }}
        >
          {/* Coded preview from the module page's own panel data; icon for non-module links. */}
          <div className="relative h-48 overflow-hidden border-b" style={{ borderColor: "rgb(var(--mist-rgb) / 0.08)" }}>
            {ModulePreview({ href: preview.href }) ?? (
              <span className="flex h-full items-center justify-center" style={{ background: "rgb(var(--accent-rgb) / 0.08)" }}>
                <PreviewIcon className="h-10 w-10" style={{ color: "var(--accent-text)" }} />
              </span>
            )}
          </div>
          <div className="flex flex-1 flex-col p-4">
            <p className="text-sm font-bold" style={{ color: "var(--mist)" }}>{preview.label}</p>
            <p className="mt-1 text-xs leading-5" style={{ color: "rgb(var(--mist-rgb) / 0.65)" }}>{preview.desc}</p>
            <span className="mt-auto inline-flex items-center gap-1 pt-3 text-xs font-semibold" style={{ color: "var(--accent-text)" }}>
              Open {preview.label} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

/* ── Coming Soon Mega Menu ── */
function ComingSoonMegaMenu() {
  return (
    <div
      className="w-[600px] max-w-[calc(100vw-32px)] overflow-hidden rounded-2xl p-1.5"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        boxShadow: "0 24px 60px rgb(var(--black-rgb) / 0.24)",
      }}
    >
      <div className="p-2">
        <p className="mb-2 flex items-center gap-1.5 px-2 text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--warning)" }}>
          <Clock className="h-3 w-3" /> In development
        </p>
        {comingSoonFeatures.map(({ icon: Icon, label, desc, href, image }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-center gap-4 rounded-xl p-3 transition-colors"
            style={{ border: "1px solid rgb(var(--warning-rgb) / 0.25)", background: "rgb(var(--warning-rgb) / 0.05)" }}
          >
            {image ? (
              <span className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg" style={{ border: "1px solid var(--border)" }}>
                <Image src={image} alt="" fill sizes="96px" className="object-cover object-left-top" />
              </span>
            ) : (
              <Icon className="h-6 w-6" style={{ color: "var(--warning)" }} />
            )}
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-1.5">
                <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{label}</span>
                <span className="rounded-full px-1.5 py-px text-[9px] font-bold uppercase" style={{ background: "rgb(var(--warning-rgb) / 0.15)", color: "var(--warning)" }}>Soon</span>
              </span>
              <span className="mt-0.5 block text-xs leading-4" style={{ color: "var(--text-muted)" }}>{desc}</span>
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" style={{ color: "var(--warning)" }} />
          </Link>
        ))}

        <p className="mb-1.5 mt-4 flex items-center gap-1.5 px-2 text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--success)" }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--success)" }} aria-hidden="true" /> Recently launched
        </p>
        <div className="grid grid-cols-3 gap-1.5">
          {liveModules.map(({ icon: Icon, label, href }) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col gap-2 rounded-xl p-3 transition-colors hover:bg-[var(--accent-glow)]"
              style={{ border: "1px solid var(--border)" }}
            >
              <Icon className="h-4 w-4" style={{ color: "var(--accent-text)" }} />
              <span className="text-xs font-semibold leading-4" style={{ color: "var(--text-primary)" }}>{label}</span>
            </Link>
          ))}
        </div>

        <div className="mt-3 border-t px-2 pt-3" style={{ borderColor: "var(--border)" }}>
          <Link href="/coming-soon" className="flex items-center gap-1 text-xs font-semibold transition hover:opacity-80" style={{ color: "var(--warning)" }}>
            Roadmap &amp; launches <ArrowRight className="h-3.5 w-3.5" />
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
        border: "1px solid rgb(var(--success-rgb) / 0.25)",
        boxShadow: "0 20px 60px rgb(var(--black-rgb) / 0.22), 0 0 40px rgb(var(--success-rgb) / 0.05)",
      }}
    >
      <div className="p-3">
        <div className="mb-3 flex items-center gap-2 px-1">
          <span
            className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest"
            style={{ background: "rgb(var(--success-rgb) / 0.12)", border: "1px solid rgb(var(--success-rgb) / 0.3)", color: "var(--success)" }}
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
                (e.currentTarget as HTMLElement).style.background = "rgb(var(--success-rgb) / 0.05)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgb(var(--success-rgb) / 0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.borderColor = "transparent";
              }}
            >
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: "rgb(var(--success-rgb) / 0.1)", border: "1px solid rgb(var(--success-rgb) / 0.25)" }}>
                <Icon className="h-4 w-4" style={{ color: "var(--success)" }} />
              </span>
              <span>
                <span className="block text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{label}</span>
                <span className="mt-0.5 block text-xs leading-4" style={{ color: "var(--text-muted)" }}>{desc}</span>
                <span className="mt-1 block text-[10px] font-semibold" style={{ color: "var(--accent-text)" }}>{stat}</span>
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-3 border-t px-1 pt-3" style={{ borderColor: "var(--border)" }}>
          <Link
            href="/solutions"
            className="flex items-center gap-1.5 text-xs font-semibold transition hover:opacity-80"
            style={{ color: "var(--success)" }}
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
        boxShadow: "0 20px 60px rgb(var(--black-rgb) / 0.22), 0 4px 16px rgb(var(--black-rgb) / 0.1)",
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
                  style={{ background: "rgb(var(--accent-rgb) / 0.25)", border: "1px solid rgb(var(--accent-rgb) / 0.4)" }}
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
        border: "1px solid rgb(var(--violet-rgb) / 0.3)",
        boxShadow: "0 20px 60px rgb(var(--black-rgb) / 0.22), 0 0 40px rgb(var(--violet-rgb) / 0.06)",
      }}
    >
      <div className="p-3">
        <div className="mb-3 flex items-center gap-2 px-1">
          <span
            className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest"
            style={{ background: "rgb(var(--violet-rgb) / 0.12)", border: "1px solid rgb(var(--violet-rgb) / 0.3)", color: "var(--violet)" }}
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
                (e.currentTarget as HTMLElement).style.background = "rgb(var(--violet-rgb) / 0.06)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgb(var(--violet-rgb) / 0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.borderColor = "transparent";
              }}
            >
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: "rgb(var(--violet-rgb) / 0.1)", border: "1px solid rgb(var(--violet-rgb) / 0.25)" }}>
                <Icon className="h-4 w-4" style={{ color: "var(--violet)" }} />
              </span>
              <span>
                <span className="block text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{label}</span>
                <span className="mt-0.5 block text-xs leading-4" style={{ color: "var(--text-muted)" }}>{desc}</span>
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-3 border-t px-1 pt-3" style={{ borderColor: "var(--border)" }}>
          <Link href="/ai-intelligence" className="flex items-center gap-1.5 text-xs font-semibold transition hover:opacity-80" style={{ color: "var(--violet)" }}>
            Explore AI Intelligence <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ── About Mega Menu ── */
function AboutMegaMenu() {
  // Two columns keep the menu inside short viewports; Contact sits in the footer.
  const items = aboutNav.filter((i) => i.href !== "/contact");
  return (
    <div
      className="w-[640px] max-w-[calc(100vw-32px)] overflow-hidden rounded-2xl p-1"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        boxShadow: "0 20px 60px rgb(var(--black-rgb) / 0.18), 0 4px 16px rgb(var(--black-rgb) / 0.08)",
      }}
    >
      <div className="p-3">
        <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
          About LAS Mobility
        </p>
        <div className="grid grid-cols-2 gap-1">
          {items.map(({ icon: Icon, label, desc, href }) => (
            <Link
              key={href + label}
              href={href}
              className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-[var(--accent-glow)]"
            >
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: "var(--accent-glow)", border: "1px solid var(--border-accent)" }}>
                <Icon className="h-4 w-4" style={{ color: "var(--accent-text)" }} />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{label}</span>
                <span className="mt-0.5 line-clamp-2 text-xs leading-4" style={{ color: "var(--text-muted)" }}>{desc}</span>
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-2 flex items-center justify-between border-t px-2 pt-3" style={{ borderColor: "var(--border)" }}>
          <Link href="/contact" className="flex items-center gap-1 text-xs font-semibold transition hover:opacity-80" style={{ color: "var(--accent-text)" }}>
            <Mail className="h-3.5 w-3.5" /> Contact us <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>Talk to our team or book a demo</span>
        </div>
      </div>
    </div>
  );
}
