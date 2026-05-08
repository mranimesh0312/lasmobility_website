"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 50000,  suffix: "+",  label: "Vehicles Tracked",    sub: "across global fleets" },
  { value: 99.9,   suffix: "%",  label: "Platform Uptime",     sub: "enterprise SLA" },
  { value: 18,     suffix: "%",  label: "Avg Fuel Savings",    sub: "via idle reduction" },
  { value: 42,     suffix: "%",  label: "Safety Improvement",  sub: "in driver scores" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) { setDisplay(value); clearInterval(timer); }
      else setDisplay(current);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {value % 1 === 0 ? Math.floor(display).toLocaleString() : display.toFixed(1)}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  return (
    <section style={{ background: "var(--bg-deep)", borderBottom: "1px solid var(--border)" }}>
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-0 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group relative border-r py-8 text-center last:border-r-0"
            style={{ borderColor: "var(--border)" }}
          >
            <p className="text-3xl font-bold sm:text-4xl gradient-text">
              <Counter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-1.5 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
              {stat.label}
            </p>
            <p className="mt-0.5 text-xs" style={{ color: "var(--text-muted)" }}>
              {stat.sub}
            </p>
            {/* Hover accent line */}
            <div
              className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full transition-all duration-300 group-hover:w-3/4"
              style={{ background: "var(--accent)" }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
