import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for LAS Mobility. Startup-friendly placeholder policy for review before launch."
};

const sections = [
  ["Information We Collect", "LAS Mobility may collect account information, contact details, company information, fleet configuration data, location-related vehicle data, device health data, usage analytics, and support communications when you use the platform or contact us."],
  ["How We Use Information", "We use information to provide fleet tracking and analytics services, operate dashboards and alerts, improve platform reliability, respond to support requests, secure accounts, and communicate about product updates or demo requests."],
  ["Fleet and Location Data", "Fleet operations may involve GPS, trip, geofence, speed, idle, route, and device data. Customers are responsible for ensuring they have appropriate rights, notices, and consents for their fleet, drivers, employees, and authorized users."],
  ["Data Sharing", "We do not sell personal information. We may share data with trusted service providers that support hosting, analytics, communication, security, and product operations, subject to appropriate confidentiality and data protection obligations."],
  ["Security", "LAS Mobility is designed as a secure cloud platform with role-based access and operational safeguards. No system is completely secure, and customers should use strong account practices and appropriate internal policies."],
  ["Data Retention", "We retain information for as long as needed to provide services, comply with legal obligations, resolve disputes, and support legitimate business purposes unless a different period is required by contract or law."],
  ["Contact", "Questions about privacy can be sent to support@lasmobility.com."]
];

export default function PrivacyPage() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan">Legal</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink">Privacy Policy</h1>
        <p className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          This is a startup-friendly placeholder policy for website launch preparation. LAS Mobility should have this reviewed by qualified legal counsel before production use.
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
