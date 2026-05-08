import Link from "next/link";
import { ArrowRight, CalendarCheck } from "lucide-react";

type CTASectionProps = {
  title?: string;
  description?: string;
};

export default function CTASection({
  title = "Ready to run your fleet with sharper visibility?",
  description = "Book a LAS Mobility demo and see how real-time tracking, intelligent alerts, and AI-powered insights can support safer, more efficient operations."
}: CTASectionProps) {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-lg bg-ink px-6 py-12 shadow-glow sm:px-10 lg:flex lg:items-center lg:justify-between lg:px-12">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-mint">Demo request</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">{description}</p>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-cyan px-5 py-3 text-sm font-semibold text-ink transition hover:bg-mint focus:outline-none focus:ring-2 focus:ring-cyan focus:ring-offset-2 focus:ring-offset-ink"
          >
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
            Book a Demo
          </Link>
          <Link
            href="/features"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-ink"
          >
            Explore Features
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
