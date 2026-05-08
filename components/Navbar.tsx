"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, ChevronDown,
  Map, Route, ShieldAlert, Fuel, BrainCircuit, BellRing,
  Building2, Truck, Zap,
} from "lucide-react";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const features = [
  { icon: Map,          label: "Live Tracking",     href: "/features#tracking" },
  { icon: Route,        label: "Route Analytics",   href: "/features#routes" },
  { icon: ShieldAlert,  label: "Driver Safety",     href: "/features#safety" },
  { icon: Fuel,         label: "Fuel Monitoring",   href: "/features#fuel" },
  { icon: BellRing,     label: "Smart Alerts",      href: "/features#alerts" },
  { icon: BrainCircuit, label: "AI Intelligence",   href: "/ai-intelligence" },
];

const solutions = [
  { icon: Truck,    label: "Logistics & Delivery", href: "/solutions#logistics" },
  { icon: Building2,label: "Enterprise Fleet",     href: "/solutions#enterprise" },
  { icon: Zap,      label: "Field Operations",     href: "/solutions#field" },
];

const navLinks = [
  { label: "Features",      href: "/features",        dropdown: features },
  { label: "Solutions",     href: "/solutions",       dropdown: solutions },
  { label: "Industries",    href: "/industries",      dropdown: null },
  { label: "AI Intelligence",href: "/ai-intelligence",dropdown: null },
  { label: "About",         href: "/about",           dropdown: null },
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
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.2)" : "none",
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8" aria-label="Primary navigation">
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
                  {hasDropdown && <ChevronDown className={`h-3.5 w-3.5 transition-transform ${activeDropdown === item.label ? "rotate-180" : ""}`} />}
                </Link>
                {active && (
                  <motion.div layoutId="nav-indicator" className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full" style={{ background: "var(--accent)" }} />
                )}

                {/* Dropdown */}
                <AnimatePresence>
                  {hasDropdown && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-0 top-full mt-1 w-56 rounded-xl p-2"
                      style={{
                        background: "var(--bg-card)",
                        border: "1px solid var(--border)",
                        boxShadow: "var(--shadow-card)",
                        backdropFilter: "blur(20px)",
                      }}
                    >
                      {item.dropdown!.map(({ icon: Icon, label, href }) => (
                        <Link
                          key={href}
                          href={href}
                          className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition hover:opacity-80"
                          style={{ color: "var(--text-secondary)" }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                        >
                          <span className="flex h-7 w-7 items-center justify-center rounded-md" style={{ background: "var(--accent-glow)" }}>
                            <Icon className="h-3.5 w-3.5" style={{ color: "var(--accent-text)" }} />
                          </span>
                          {label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeSwitcher />
          <Link
            href="mailto:support@lasmobility.com"
            className="text-sm font-medium transition hover:opacity-80"
            style={{ color: "var(--text-secondary)" }}
          >
            support@lasmobility.com
          </Link>
          <Link
            href="/contact"
            className="btn-primary rounded-lg px-4 py-2.5 text-sm"
          >
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
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
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
            style={{ borderColor: "var(--border)", background: "var(--nav-bg)", backdropFilter: "blur(24px)" }}
          >
            <div className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">
              {navLinks.map((item) => (
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
                  {item.dropdown && (
                    <div className="ml-4 mt-0.5 space-y-0.5">
                      {item.dropdown.map(({ icon: Icon, label, href }) => (
                        <Link
                          key={href}
                          href={href}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition"
                          style={{ color: "var(--text-muted)" }}
                        >
                          <Icon className="h-3.5 w-3.5" style={{ color: "var(--accent-text)" }} />
                          {label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/contact"
                className="btn-primary mt-3 block rounded-lg px-4 py-3 text-center text-sm"
              >
                Book a Demo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
