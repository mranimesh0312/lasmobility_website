import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const modules = [
  {
    eyebrow: "Much more than telematics",
    title: "Monitor All Your Fleet Assets",
    description:
      "Simplify how your vehicles move and perform from one command dashboard. Go beyond track-and-trace with live tracking, performance scorecards, reports, and real-time alerts.",
    image: "/module-assets.svg",
    alt: "Fleet asset monitoring illustration with live vehicle status, fuel, stopped time, and route movement",
    href: "/features"
  },
  {
    eyebrow: "Safety backed by technology",
    title: "Protect Your Vehicles and Cargo",
    description:
      "Use driver behavior alerts, controlled immobilization workflows, SOS-ready signals, and vehicle activity insights to strengthen fleet safety operations.",
    image: "/module-safety.svg",
    alt: "Fleet safety illustration with harsh braking alert and immobilization control",
    href: "/solutions"
  },
  {
    eyebrow: "Powering positive business impact",
    title: "Enhance Your Fuel Economy",
    description:
      "Lower fuel costs with idle analysis, fuel variance detection, efficiency reports, and smart alerts that help teams act before waste becomes routine.",
    image: "/module-fuel.svg",
    alt: "Fuel economy dashboard illustration with fuel level trend and fuel drop alert",
    href: "/features"
  }
];

export default function ModuleShowcase() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-20">
        {modules.map((module, index) => (
          <article key={module.title} className={`grid items-center gap-12 lg:grid-cols-2 ${index % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""}`}>
            <div className="reveal-card">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan">{module.eyebrow}</p>
              <h2 className="mt-5 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">{module.title}</h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">{module.description}</p>
              <Link
                href={module.href}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-cyan px-8 py-4 text-base font-semibold text-ink shadow-soft transition hover:-translate-y-1 hover:bg-mint"
              >
                Explore
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
            <div className="reveal-card hover-lift overflow-hidden rounded-lg bg-slate-50 p-5 shadow-soft">
              <Image src={module.image} alt={module.alt} width={980} height={760} className="h-auto w-full rounded-md" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
