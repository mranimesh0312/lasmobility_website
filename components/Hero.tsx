"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck, CheckCircle2, Sparkles, Zap } from "lucide-react";
import DashboardMockup from "@/components/DashboardMockup";
import FleetMotionBackdrop from "@/components/FleetMotionBackdrop";

const trustSignals = ["Real-time tracking", "AI insights", "Driver safety", "Fuel intelligence"];

export default function Hero() {
  return (
    <section className="premium-gradient relative overflow-hidden px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-24">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[length:54px_54px]" />
      <FleetMotionBackdrop />
      <motion.div
        className="absolute left-[8%] top-28 hidden h-24 w-24 rounded-full border border-cyan/25 bg-cyan/10 blur-[1px] lg:block"
        animate={{ y: [0, -18, 0], opacity: [0.55, 0.9, 0.55] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-24 right-[6%] hidden h-32 w-32 rounded-full border border-mint/20 bg-mint/10 blur-[1px] lg:block"
        animate={{ y: [0, 18, 0], opacity: [0.45, 0.85, 0.45] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55 }}>
            <Image src="/logo.svg" width={360} height={81} alt="LAS Mobility" priority className="h-16 w-auto max-w-full sm:h-20" />
          </motion.div>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-cyan/25 bg-white/8 px-3 py-1.5 text-sm font-semibold text-cyan shadow-glow backdrop-blur">
            <Zap className="h-4 w-4" aria-hidden="true" />
            AI-powered mobility intelligence
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
          >
            AI-Powered Fleet Intelligence for Modern Mobility
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="mt-6 max-w-2xl text-lg leading-8 text-slate-300"
          >
            Track vehicles in real time, monitor driver behavior, optimize fleet operations, and unlock AI-driven insights from one intelligent platform.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-md bg-cyan px-5 py-3 text-sm font-semibold text-ink shadow-glow transition hover:-translate-y-0.5 hover:bg-mint">
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              Book a Demo
            </Link>
            <Link href="/features" className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 bg-white/8 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/14">
              Explore Features
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42 }}
            className="mt-8 grid max-w-2xl grid-cols-1 gap-3 text-sm text-slate-300 sm:grid-cols-2"
          >
            {trustSignals.map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.055] px-3 py-2 backdrop-blur">
                <CheckCircle2 className="h-4 w-4 text-mint" aria-hidden="true" />
                {item}
              </div>
            ))}
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.16 }}
          className="relative"
        >
          <div className="float-slow">
            <DashboardMockup />
          </div>
          <motion.div
            initial={{ opacity: 0, x: -16, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="float-delayed absolute -bottom-5 left-5 hidden rounded-md border border-white/10 bg-white/95 p-4 shadow-glow sm:block"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-electric" aria-hidden="true" />
              <p className="text-sm font-semibold text-ink">AI action recommended</p>
            </div>
            <p className="mt-1 text-xs text-slate-600">Reassign 3 vehicles to reduce idle time.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
