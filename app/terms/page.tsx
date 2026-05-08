import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for LAS Mobility. Startup-friendly placeholder terms for legal review before launch."
};

const sections = [
  ["Use of Services", "LAS Mobility provides fleet management, vehicle tracking, analytics, alerts, and mobility intelligence tools for business use. Customers and users must use the services lawfully and in accordance with applicable agreements and policies."],
  ["Accounts and Access", "Customers are responsible for maintaining accurate account information, protecting login credentials, managing role-based access, and ensuring authorized users follow internal security and operational policies."],
  ["Customer Responsibilities", "Customers are responsible for fleet devices, vehicle installation, driver and employee notices, regulatory compliance, consent requirements, and lawful use of GPS, telematics, and operational data."],
  ["Platform Availability", "LAS Mobility aims to provide reliable services, but availability may be affected by maintenance, network conditions, device connectivity, third-party providers, or events outside reasonable control."],
  ["Intellectual Property", "The website, platform, software, design, content, trademarks, and related materials are owned by LAS Mobility or its licensors. Customers retain rights to their business data subject to applicable agreements."],
  ["Limitations", "The platform provides operational visibility and decision support. Customers remain responsible for business decisions, safety policies, compliance, dispatch actions, and field operations."],
  ["Contact", "Questions about these terms can be sent to support@lasmobility.com."]
];

export default function TermsPage() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan">Legal</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink">Terms of Service</h1>
        <p className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          These are placeholder terms for early-stage website use. LAS Mobility should complete legal review before relying on them for customers or commercial contracts.
        </p>
        <div className="mt-10 space-y-8">
          {sections.map(([title, body]) => (
            <article key={title}>
              <h2 className="text-xl font-semibold text-ink">{title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
