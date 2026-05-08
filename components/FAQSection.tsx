"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How quickly can we get our fleet live on LAS Mobility?",
    a: "Most fleets are up and running within 24–48 hours. We provide GPS devices pre-configured and our onboarding team guides your setup. Larger enterprise deployments typically take 1–2 weeks depending on fleet size and integration needs.",
  },
  {
    q: "What hardware does LAS Mobility require?",
    a: "We supply plug-and-play OBD and hardwired GPS trackers compatible with all vehicle types — cars, trucks, buses, heavy equipment, and motorcycles. The devices are compact, weather-sealed, and self-configure on first power-up.",
  },
  {
    q: "Does LAS Mobility work internationally?",
    a: "Yes. Our platform supports GPS tracking globally with multi-carrier SIM support. We actively serve fleets across South Asia, Southeast Asia, the Middle East, and Africa, with more regions being added regularly.",
  },
  {
    q: "Can we integrate LAS Mobility with our existing ERP or TMS?",
    a: "Absolutely. We provide a full REST API and webhooks for ERP, TMS, fuel card, and accounting system integration. Enterprise customers receive dedicated integration support and custom connector development.",
  },
  {
    q: "How does the AI recommendation engine work?",
    a: "Our AI continuously analyzes trip data, driver behavior, fuel patterns, and route performance. It surfaces anomalies, scores risk, and generates plain-language recommendations — like reassigning vehicles to reduce idle time or flagging a driver for safety coaching.",
  },
  {
    q: "Is our fleet data secure and private?",
    a: "Yes. All data is encrypted at rest and in transit using AES-256 and TLS 1.3. We are SOC 2 Type II compliant and maintain strict role-based access controls. Your data is never shared with third parties.",
  },
  {
    q: "What kind of support do you provide?",
    a: "All plans include email and in-app chat support. Professional plans include priority response SLA. Enterprise customers receive a dedicated account manager and 24/7 emergency support line.",
  },
  {
    q: "Can managers see only their own branch vehicles?",
    a: "Yes. Our role-based access system lets you configure branch-level, department-level, or individual driver visibility. Each manager sees exactly what they should see — nothing more.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-pad" style={{ background: "var(--bg-base)" }}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-block rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ border: "1px solid var(--border-accent)", color: "var(--accent-text)", background: "var(--accent-glow)" }}>
            FAQ
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--text-primary)" }}>
            Frequently asked{" "}
            <span className="gradient-text">questions</span>
          </h2>
          <p className="mt-4 text-lg" style={{ color: "var(--text-secondary)" }}>
            Everything you need to know about the LAS Mobility platform.
          </p>
        </motion.div>

        <div className="mt-10 space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="overflow-hidden rounded-xl border"
              style={{
                border: open === i ? "1px solid var(--border-accent)" : "1px solid var(--border)",
                background: "var(--bg-card)",
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:opacity-80"
              >
                <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0"
                >
                  <ChevronDown className="h-4 w-4" style={{ color: "var(--accent-text)" }} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="border-t px-5 pb-5 pt-4 text-sm leading-7" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
