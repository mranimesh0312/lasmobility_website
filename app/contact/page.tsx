import type { Metadata } from "next";
import { Mail, PhoneCall, Sparkles } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact LAS Mobility to request a demo for AI-powered fleet management, real-time tracking, and fleet intelligence."
};

export default function ContactPage() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan">Contact</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">Book a LAS Mobility demo</h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Tell us about your fleet size, operating model, and visibility goals. We will help you evaluate how LAS Mobility can support real-time tracking, alerts, safety insights, and AI-powered analytics.
          </p>
          <div className="mt-8 space-y-4">
            <a href="mailto:support@lasmobility.com" className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm hover:border-cyan">
              <Mail className="h-5 w-5 text-electric" aria-hidden="true" />
              <span className="font-semibold text-ink">support@lasmobility.com</span>
            </a>
            <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <PhoneCall className="h-5 w-5 text-mint" aria-hidden="true" />
              <span className="font-semibold text-ink">Demo requests and product inquiries</span>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <Sparkles className="h-5 w-5 text-cyan" aria-hidden="true" />
              <span className="font-semibold text-ink">AI fleet intelligence consultation</span>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
