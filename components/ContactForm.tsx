"use client";

import { Send } from "lucide-react";

export default function ContactForm() {
  return (
    <form className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft" aria-label="Demo request form">
      <div className="grid gap-5 sm:grid-cols-2">
        {[
          ["name", "Name", "Your name", "text"],
          ["company", "Company", "Company name", "text"],
          ["email", "Email", "you@company.com", "email"],
          ["phone", "Phone", "+91 00000 00000", "tel"],
          ["fleetSize", "Fleet Size", "Number of vehicles", "text"]
        ].map(([id, label, placeholder, type]) => (
          <div key={id} className={id === "fleetSize" ? "sm:col-span-2" : ""}>
            <label htmlFor={id} className="text-sm font-semibold text-ink">
              {label}
            </label>
            <input
              id={id}
              name={id}
              type={type}
              placeholder={placeholder}
              className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-cyan focus:ring-4 focus:ring-cyan/15"
            />
          </div>
        ))}
        <div className="sm:col-span-2">
          <label htmlFor="message" className="text-sm font-semibold text-ink">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Tell us about your fleet, operational goals, and preferred demo timing."
            className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-cyan focus:ring-4 focus:ring-cyan/15"
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-electric px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink sm:w-auto"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        Request Demo
      </button>
      <p className="mt-4 text-sm text-slate-500">
        This form is UI-ready. Connect it to your preferred CRM, email service, or server action before launch.
      </p>
    </form>
  );
}
