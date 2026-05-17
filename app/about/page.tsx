"use client";

import Link from "next/link";
import ThemeLogo from "@/components/ThemeLogo";
import { motion } from "framer-motion";
import {
  CheckCircle2, Target, Mail,
  Globe, Zap, Shield, ArrowRight, CalendarCheck, Briefcase,
} from "lucide-react";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";

const pillars = [
  "Real-time fleet visibility",
  "Safety and behaviour insights",
  "AI-powered operational intelligence",
  "Secure cloud platform",
  "Multi-branch management",
  "Enterprise-grade reliability",
];

const values = [
  { icon: Target, title: "Clarity over complexity", desc: "We build software that makes fleet operations simpler, not more complex." },
  { icon: Shield, title: "Reliability first",        desc: "99.9% uptime isn't a target — it's the minimum our customers depend on." },
  { icon: Zap,    title: "Speed that matters",       desc: "Alerts in under 5 seconds. Insights in real time. We optimise for what operators actually need fast." },
  { icon: Globe,  title: "Built for scale",          desc: "From a 5-vehicle local fleet to 1,000+ vehicles across multiple countries — LAS Mobility scales with you." },
];

const aboutLinks = [
  { href: "/about/mission",           label: "Mission & Vision",    desc: "The purpose that drives every decision we make." },
  { href: "/about/technology",        label: "Our Technology",      desc: "The platform architecture powering modern fleet ops." },
  { href: "/about/fleet-intelligence",label: "Fleet Intelligence",  desc: "AI-driven insights that keep fleets ahead." },
  { href: "/about/why-las-mobility",  label: "Why LAS Mobility",    desc: "What sets us apart in the fleet intelligence space." },
  { href: "/about/partners",          label: "Partners & Ecosystem",desc: "Our network of technology and channel partners." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero / Our Company */}
      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <div>
            <span className="inline-block rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ border: "1px solid var(--border-accent)", color: "var(--accent-text)", background: "var(--accent-glow)" }}>
              About LAS Mobility
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl" style={{ color: "var(--text-primary)" }}>
              Simplifying fleet operations with <span className="gradient-text">clear, intelligent visibility</span>
            </h1>
            <p className="mt-5 text-lg leading-8" style={{ color: "var(--text-secondary)" }}>
              LAS Mobility is a modern mobility intelligence platform for businesses that need better control over vehicles, drivers, routes, alerts, and performance. Built around practical fleet workflows, not complexity for its own sake.
            </p>
            <p className="mt-4 leading-7" style={{ color: "var(--text-secondary)" }}>
              Our focus is to help operators, managers, and leadership teams move from scattered tracking data to a trusted operating view that supports faster decisions and safer fleet performance.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm"><CalendarCheck className="h-4 w-4" /> Book a Demo</Link>
              <Link href="/features" className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition hover:opacity-80" style={{ border: "1px solid var(--border)", color: "var(--text-primary)", background: "var(--bg-card)" }}>Explore Platform <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="rounded-2xl p-8" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-glow)" }}>
            <ThemeLogo width={280} height={63} className="h-14 w-auto max-w-full" />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {pillars.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "var(--accent-text)" }} />
                  <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
            {[{ v:"2019", l:"Founded" }, { v:"50+", l:"Countries with active fleets" }, { v:"1,000+", l:"Vehicles tracked daily" }, { v:"99.9%", l:"Platform uptime SLA" }].map(({v,l},i) => (
              <div key={l} className="px-8 py-10 text-center" style={{ borderRight: i < 3 ? "1px solid var(--border)" : undefined }}>
                <p className="text-3xl font-bold" style={{ color: "var(--accent-text)" }}>{v}</p>
                <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section id="mission" className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Our Mission" title="Fleet software should make operations calmer, not noisier"
            description="LAS Mobility emphasizes useful alerts, clear analytics, role-based access, and intelligence that helps teams decide what to do next. The goal is simple: fewer blind spots, faster response, and better fleet outcomes." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, desc }) => (
              <motion.div key={title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}
                className="rounded-xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "var(--accent-glow)" }}>
                  <Icon className="h-5 w-5" style={{ color: "var(--accent-text)" }} />
                </span>
                <h3 className="mt-4 text-sm font-bold" style={{ color: "var(--text-primary)" }}>{title}</h3>
                <p className="mt-1.5 text-xs leading-5" style={{ color: "var(--text-secondary)" }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore About sections */}
      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Learn More" title="Explore what makes LAS Mobility different"
            description="Dive deeper into our technology, philosophy, and ecosystem." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {aboutLinks.map(({ href, label, desc }) => (
              <motion.div key={href} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
                <Link href={href} className="group flex h-full flex-col rounded-xl p-5 transition hover:border-[var(--border-accent)]"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <p className="font-semibold transition group-hover:text-[var(--accent-text)]" style={{ color: "var(--text-primary)" }}>{label}</p>
                  <p className="mt-1.5 flex-1 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>{desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold" style={{ color: "var(--accent-text)" }}>
                    Learn more <ArrowRight className="h-3 w-3 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers CTA */}
      <section className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl p-8 text-center sm:flex-row sm:text-left"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-accent)" }}>
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ background: "var(--accent-glow)" }}>
                <Briefcase className="h-6 w-6" style={{ color: "var(--accent-text)" }} />
              </span>
              <div>
                <p className="font-bold" style={{ color: "var(--text-primary)" }}>Join our team</p>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>We&apos;re hiring across engineering, sales, and customer success.</p>
              </div>
            </div>
            <Link href="/careers" className="btn-primary shrink-0 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm">
              <Briefcase className="h-4 w-4" /> View Open Roles
            </Link>
          </div>
        </div>
      </section>

      {/* Contact strip */}
      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl p-8 text-center sm:flex-row sm:text-left"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-accent)" }}>
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ background: "var(--accent-glow)" }}>
                <Mail className="h-6 w-6" style={{ color: "var(--accent-text)" }} />
              </span>
              <div>
                <p className="font-bold" style={{ color: "var(--text-primary)" }}>Get in touch</p>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Questions, demos, partnerships — we respond within one business day.</p>
              </div>
            </div>
            <Link href="/contact" className="btn-primary shrink-0 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm">
              <CalendarCheck className="h-4 w-4" /> Contact Us
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
