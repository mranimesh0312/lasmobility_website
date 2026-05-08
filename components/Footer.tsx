"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Twitter, Linkedin, Github, ArrowRight } from "lucide-react";

const platform = [
  { href: "/features",       label: "Features" },
  { href: "/solutions",      label: "Solutions" },
  { href: "/industries",     label: "Industries" },
  { href: "/ai-intelligence",label: "AI Intelligence" },
  { href: "/about",          label: "About Us" },
  { href: "/contact",        label: "Contact" },
];

const legal = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms",   label: "Terms of Service" },
];

const features = [
  { href: "/features#tracking", label: "Live Tracking" },
  { href: "/features#safety",   label: "Driver Safety" },
  { href: "/features#fuel",     label: "Fuel Monitoring" },
  { href: "/features#routes",   label: "Route Analytics" },
  { href: "/features#alerts",   label: "Smart Alerts" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--bg-deep)",
        borderTop: "1px solid var(--border)",
      }}
    >
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Image src="/logo.svg" width={240} height={54} alt="LAS Mobility" className="h-12 w-auto" />
            <p className="mt-5 max-w-xs text-sm leading-7" style={{ color: "var(--text-secondary)" }}>
              AI-powered fleet management and mobility intelligence — real-time visibility, safety insights, and operational excellence for modern businesses.
            </p>
            <div className="mt-6 space-y-3">
              <a
                href="mailto:support@lasmobility.com"
                className="flex items-center gap-2 text-sm transition hover:opacity-80"
                style={{ color: "var(--text-secondary)" }}
              >
                <Mail className="h-4 w-4 shrink-0" style={{ color: "var(--accent-text)" }} />
                support@lasmobility.com
              </a>
              <div className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                <MapPin className="h-4 w-4 shrink-0" style={{ color: "var(--accent-text)" }} />
                Built for modern fleet teams worldwide
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border transition hover:opacity-80"
                  style={{ border: "1px solid var(--border)", color: "var(--text-secondary)" }}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Platform</h3>
            <ul className="mt-4 space-y-2.5">
              {platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium transition hover:opacity-80"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Features</h3>
            <ul className="mt-4 space-y-2.5">
              {features.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium transition hover:opacity-80"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Stay Updated</h3>
            <p className="mt-4 text-sm" style={{ color: "var(--text-secondary)" }}>
              Fleet management insights, product updates, and industry news.
            </p>
            <form className="mt-4" onSubmit={(e) => e.preventDefault()}>
              <div
                className="flex overflow-hidden rounded-lg border"
                style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
              >
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-transparent px-3 py-2.5 text-sm outline-none placeholder:opacity-40"
                  style={{ color: "var(--text-primary)" }}
                />
                <button
                  type="submit"
                  className="btn-primary flex items-center gap-1 px-3 py-2.5 text-xs font-semibold"
                >
                  Subscribe <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </form>
            <ul className="mt-6 space-y-2.5">
              {legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium transition hover:opacity-80"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t px-4 py-5 sm:px-6 lg:px-8" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-sm sm:flex-row" style={{ color: "var(--text-muted)" }}>
          <p>&copy; {new Date().getFullYear()} LAS Mobility. All rights reserved.</p>
          <p>AI-Powered Fleet Intelligence Platform</p>
        </div>
      </div>
    </footer>
  );
}
