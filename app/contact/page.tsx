import type { Metadata } from "next";
import { Mail, PhoneCall, Sparkles } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact LAS Mobility to request a demo for AI-powered fleet management, real-time tracking, and fleet intelligence.",
};

const infoCards = [
  { icon: Mail,      color: "var(--accent-text)", label: "support@lasmobility.com",            href: "mailto:support@lasmobility.com" },
  { icon: PhoneCall, color: "#22C55E",             label: "Demo requests and product inquiries", href: null },
  { icon: Sparkles,  color: "#8B5CF6",             label: "AI fleet intelligence consultation",  href: null },
];

export default function ContactPage() {
  return (
    <section className="section-pad" style={{ background: "var(--bg-base)" }}>
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div>
          <span
            className="inline-block rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{ border: "1px solid var(--border-accent)", color: "var(--accent-text)", background: "var(--accent-glow)" }}
          >
            Contact
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl" style={{ color: "var(--text-primary)" }}>
            Book a LAS Mobility demo
          </h1>
          <p className="mt-5 text-lg leading-8" style={{ color: "var(--text-secondary)" }}>
            Tell us about your fleet size, operating model, and visibility goals. We&apos;ll help you evaluate how LAS Mobility can support real-time tracking, alerts, safety insights, and AI-powered analytics.
          </p>
          <div className="mt-8 space-y-3">
            {infoCards.map(({ icon: Icon, color, label, href }) => {
              const Wrapper = href ? "a" : "div";
              return (
                <Wrapper
                  key={label}
                  {...(href ? { href } : {})}
                  className="flex items-center gap-3 rounded-xl border p-4 transition"
                  style={{ border: "1px solid var(--border)", background: "var(--bg-card)" }}
                >
                  <Icon className="h-5 w-5 shrink-0" style={{ color }} />
                  <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{label}</span>
                </Wrapper>
              );
            })}
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
