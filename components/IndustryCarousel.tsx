"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BusFront,
  CarFront,
  ChevronLeft,
  ChevronRight,
  Construction,
  PackageCheck,
  Route,
  School,
  ShieldAlert,
  Snowflake,
  Truck,
  UsersRound
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const industries = [
  {
    title: "Logistics",
    description: "Streamline fleet operations, optimize routes, and deliver more with real-time visibility.",
    image: "/industry-truck.avif",
    icon: Truck,
    href: "/industries"
  },
  {
    title: "School Transport",
    description: "Improve student safety with live tracking, route history, alerts, and controlled access.",
    image: "/industry-school-bus.avif",
    icon: School,
    href: "/industries"
  },
  {
    title: "Employee Transport",
    description: "Manage employee mobility with reliable trip visibility, safety alerts, and route monitoring.",
    image: "/industry-employee-bus.avif",
    icon: UsersRound,
    href: "/industries"
  },
  {
    title: "Construction",
    description: "Monitor assets on site, track equipment utilization, and improve project productivity.",
    image: "/industry-construction.avif",
    icon: Construction,
    href: "/industries"
  },
  {
    title: "Delivery Operations",
    description: "Improve on-time performance, reduce delays, and ensure every delivery counts.",
    image: "/industry-delivery-van.avif",
    icon: PackageCheck,
    href: "/industries"
  },
  {
    title: "Rental Fleets",
    description: "Track vehicle availability, usage, movement, and operational health across locations.",
    image: "/industry-car-rental.avif",
    icon: CarFront,
    href: "/industries"
  },
  {
    title: "Mining",
    description: "Monitor heavy vehicles, improve safety, and track productivity in remote environments.",
    image: "/industry-mining.avif",
    icon: Truck,
    href: "/industries"
  },
  {
    title: "Cold Chain",
    description: "Protect temperature-sensitive logistics with route visibility and real-time alerts.",
    image: "/industry-cold-chain.avif",
    icon: Snowflake,
    href: "/industries"
  },
  {
    title: "Public Transport",
    description: "Improve passenger operations with live vehicle tracking and route intelligence.",
    image: "/industry-public-transport.avif",
    icon: BusFront,
    href: "/industries"
  },
  {
    title: "Emergency Services",
    description: "Enable faster response coordination with live fleet visibility and location intelligence.",
    image: "/industry-emergency.avif",
    icon: ShieldAlert,
    href: "/industries"
  }
];

function getVisibleCount() {
  if (typeof window === "undefined") {
    return 3;
  }
  if (window.innerWidth < 768) {
    return 1;
  }
  if (window.innerWidth < 1024) {
    return 2;
  }
  return 3;
}

export default function IndustryCarousel() {
  const [visibleCount, setVisibleCount] = useState(3);
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const maxIndex = Math.max(industries.length - visibleCount, 0);
  const dots = useMemo(() => Array.from({ length: maxIndex + 1 }, (_, dotIndex) => dotIndex), [maxIndex]);

  useEffect(() => {
    const updateVisibleCount = () => {
      const nextVisibleCount = getVisibleCount();
      setVisibleCount(nextVisibleCount);
      setIndex((current) => Math.min(current, Math.max(industries.length - nextVisibleCount, 0)));
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const goPrevious = () => setIndex((current) => (current === 0 ? maxIndex : current - 1));
  const goNext = () => setIndex((current) => (current === maxIndex ? 0 : current + 1));

  const handleTouchEnd = (clientX: number) => {
    if (touchStart === null) {
      return;
    }
    const delta = touchStart - clientX;
    if (Math.abs(delta) > 42) {
      if (delta > 0) {
        goNext();
      } else {
        goPrevious();
      }
    }
    setTouchStart(null);
  };

  return (
    <section className="section-pad px-4 sm:px-6 lg:px-8" style={{ background: "var(--bg-base)" }}>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ border: "1px solid var(--border-accent)", color: "var(--accent-text)", background: "var(--accent-glow)" }}>Industries</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--text-primary)" }}>
              Built for fleets that keep <span className="gradient-text">businesses moving</span>
            </h2>
            <p className="mt-4 text-lg leading-8" style={{ color: "var(--text-secondary)" }}>
              From logistics to last-mile delivery, LAS Mobility adapts to every industry with real-time visibility, intelligent alerts, and AI-powered fleet insights.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={goPrevious}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border transition hover:-translate-y-0.5"
              style={{ border: "1px solid var(--border)", background: "var(--bg-card)", color: "var(--text-secondary)" }}
              aria-label="Show previous industries"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border transition hover:-translate-y-0.5"
              style={{ border: "1px solid var(--border)", background: "var(--bg-card)", color: "var(--text-secondary)" }}
              aria-label="Show next industries"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          className="mt-10 overflow-hidden"
          onTouchStart={(event) => setTouchStart(event.touches[0]?.clientX ?? null)}
          onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0]?.clientX ?? 0)}
        >
          <motion.div
            className="flex"
            animate={{ x: `-${index * (100 / visibleCount)}%` }}
            transition={{ type: "spring", stiffness: 140, damping: 24 }}
          >
            {industries.map((industry) => {
              const Icon = industry.icon;
              return (
                <div
                  key={industry.title}
                  className="shrink-0 px-2"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  <Link
                    href={industry.href}
                    className="group block h-[430px] overflow-hidden rounded-lg bg-ink shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-cyan"
                  >
                    <div className="relative h-full">
                      <Image
                        src={industry.image}
                        alt={`${industry.title} fleet industry background`}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/48 to-black/5" />
                      <div className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/12 text-cyan backdrop-blur">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div className="absolute inset-x-0 bottom-0 p-6">
                        <h3 className="text-2xl font-semibold text-white">{industry.title}</h3>
                        <p className="mt-3 text-sm leading-6 text-slate-300">{industry.description}</p>
                        <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan">
                          Learn More
                          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </motion.div>
        </div>

        <div className="mt-8 flex justify-center gap-2" aria-label="Industry carousel pagination">
          {dots.map((dot) => (
            <button
              key={dot}
              type="button"
              onClick={() => setIndex(dot)}
              className="h-2.5 rounded-full transition"
              style={{ width: dot === index ? "2rem" : "0.625rem", background: dot === index ? "var(--accent)" : "var(--border)" }}
              aria-label={`Go to industry slide ${dot + 1}`}
              aria-current={dot === index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
