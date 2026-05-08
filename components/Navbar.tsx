"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/solutions", label: "Solutions" },
  { href: "/industries", label: "Industries" },
  { href: "/ai-intelligence", label: "AI Intelligence" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#06152b]/88 shadow-[0_12px_40px_rgba(2,8,23,0.18)] backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8" aria-label="Primary navigation">
        <Link href="/" className="flex items-center gap-3" aria-label="LAS Mobility home">
          <Image src="/logo.svg" width={248} height={56} alt="LAS Mobility" priority className="h-12 w-auto max-w-[220px] sm:max-w-[248px]" />
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                  active ? "bg-white/10 text-cyan" : "text-slate-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <Link href="mailto:support@lasmobility.com" className="text-sm font-medium text-slate-300 hover:text-cyan">
            support@lasmobility.com
          </Link>
          <Link href="/contact" className="rounded-md bg-cyan px-4 py-2.5 text-sm font-semibold text-ink shadow-glow transition hover:-translate-y-0.5 hover:bg-mint">
            Book a Demo
          </Link>
        </div>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-white lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </nav>
      {open ? (
        <div className="border-t border-white/10 bg-[#06152b] px-4 py-4 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-3 text-sm font-semibold ${
                  pathname === item.href ? "bg-white/10 text-cyan" : "text-slate-200"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-md bg-cyan px-4 py-3 text-center text-sm font-semibold text-ink"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
