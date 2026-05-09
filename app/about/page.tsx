"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2, Target, Users, Briefcase, Mail,
  MapPin, Globe, Zap, Shield, ArrowRight, CalendarCheck,
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

const team = [
  { name: "Arjun Mehta",    role: "CEO & Co-Founder",        bio: "15 years in fleet technology and enterprise SaaS. Previously built logistics platforms across South Asia." },
  { name: "Priya Sharma",   role: "CTO & Co-Founder",        bio: "Full-stack engineering leader with a background in real-time systems, IoT, and AI at scale." },
  { name: "Rahul Verma",    role: "VP Product",              bio: "Shaped product strategy for 3 fleet management companies. Expert in translating operator pain into intuitive workflows." },
  { name: "Divya Nair",     role: "Head of Customer Success", bio: "Onboarded 200+ fleets across logistics, school transport, and enterprise. Focused on outcomes, not just deployments." },
  { name: "Karan Singh",    role: "Head of AI & Analytics",  bio: "Built the intelligence layer that powers route optimisation, risk scoring, and anomaly detection in LAS Mobility." },
  { name: "Meera Iyer",     role: "Head of Sales",           bio: "Grew fleet tech revenue from zero to ₹10Cr in 18 months. Passionate about helping operators see the ROI clearly." },
];

const openings = [
  { title: "Senior Frontend Engineer",    team: "Engineering",      location: "Bangalore / Remote" },
  { title: "Fleet Operations Specialist", team: "Customer Success", location: "Mumbai" },
  { title: "AI/ML Engineer",             team: "AI & Analytics",   location: "Bangalore / Remote" },
  { title: "Enterprise Account Executive", team: "Sales",           location: "Delhi / Mumbai" },
];

const values = [
  { icon: Target, title: "Clarity over complexity", desc: "We build software that makes fleet operations simpler, not more complex." },
  { icon: Shield, title: "Reliability first",        desc: "99.9% uptime isn't a target — it's the minimum our customers depend on." },
  { icon: Zap,    title: "Speed that matters",       desc: "Alerts in under 5 seconds. Insights in real time. We optimise for what operators actually need fast." },
  { icon: Globe,  title: "Built for scale",          desc: "From a 5-vehicle local fleet to 1,000+ vehicles across multiple countries — LAS Mobility scales with you." },
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
            <Image src="/logo.svg" width={280} height={63} alt="LAS Mobility" className="h-14 w-auto max-w-full" />
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

      {/* Team */}
      <section id="team" className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Team" title="The people building LAS Mobility" description="A team of fleet technology veterans, engineers, and operators who've lived the problem firsthand." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map(({ name, role, bio }) => (
              <motion.div key={name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}
                className="rounded-xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <div className="flex h-12 w-12 items-center justify-center rounded-full text-base font-bold" style={{ background: "var(--accent-glow)", color: "var(--accent-text)", border: "1px solid var(--border-accent)" }}>
                  {name.split(" ").map(n => n[0]).join("")}
                </div>
                <h3 className="mt-4 text-base font-bold" style={{ color: "var(--text-primary)" }}>{name}</h3>
                <p className="mt-0.5 text-xs font-semibold" style={{ color: "var(--accent-text)" }}>{role}</p>
                <p className="mt-2 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>{bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers */}
      <section id="careers" className="section-pad" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Careers" title="Join the LAS Mobility team" description="We're building the future of fleet intelligence. If you want to work on hard problems that affect how millions of vehicles are managed, we'd love to meet you." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {openings.map(({ title, team: t, location }) => (
              <motion.div key={title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
                className="flex items-center gap-5 rounded-xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ background: "var(--accent-glow)" }}>
                  <Briefcase className="h-5 w-5" style={{ color: "var(--accent-text)" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold" style={{ color: "var(--text-primary)" }}>{title}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>{t}</span>
                    <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}><MapPin className="h-3 w-3" />{location}</span>
                  </div>
                </div>
                <Link href="/contact" className="shrink-0 rounded-lg px-3 py-2 text-xs font-semibold transition hover:opacity-80" style={{ background: "var(--accent-glow)", border: "1px solid var(--border-accent)", color: "var(--accent-text)" }}>
                  Apply
                </Link>
              </motion.div>
            ))}
          </div>
          <p className="mt-6 text-sm" style={{ color: "var(--text-muted)" }}>
            Don&apos;t see a fit? Send your CV to <a href="mailto:careers@lasmobility.com" className="font-semibold transition hover:opacity-70" style={{ color: "var(--accent-text)" }}>careers@lasmobility.com</a>
          </p>
        </div>
      </section>

      {/* Contact strip */}
      <section className="section-pad" style={{ background: "var(--bg-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl p-8 text-center sm:flex-row sm:text-left" style={{ background: "var(--bg-card)", border: "1px solid var(--border-accent)" }}>
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
