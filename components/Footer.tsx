import Image from "next/image";
import Link from "next/link";
import { Mail, MapPinned } from "lucide-react";

const links = [
  { href: "/features", label: "Features" },
  { href: "/solutions", label: "Solutions" },
  { href: "/industries", label: "Industries" },
  { href: "/ai-intelligence", label: "AI Intelligence" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#06152b]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.3fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <Image src="/logo.svg" width={280} height={63} alt="LAS Mobility" className="h-14 w-auto max-w-[280px]" />
          <p className="mt-5 max-w-md leading-7 text-slate-300">
            AI-powered fleet management and mobility intelligence for businesses that need real-time visibility, operational control, and safer fleet performance.
          </p>
          <div className="mt-6 space-y-3 text-sm text-slate-300">
            <a href="mailto:support@lasmobility.com" className="flex items-center gap-2 hover:text-cyan">
              <Mail className="h-4 w-4" aria-hidden="true" />
              support@lasmobility.com
            </a>
            <div className="flex items-center gap-2">
              <MapPinned className="h-4 w-4 text-cyan" aria-hidden="true" />
              Built for modern fleet teams
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">Platform</h2>
          <div className="mt-4 grid gap-3">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-300 hover:text-cyan">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">Company</h2>
          <div className="mt-4 grid gap-3">
            <Link href="/privacy" className="text-sm font-medium text-slate-300 hover:text-cyan">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm font-medium text-slate-300 hover:text-cyan">
              Terms of Service
            </Link>
            <Link href="https://lasmobility.com" className="text-sm font-medium text-slate-300 hover:text-cyan">
              lasmobility.com
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 sm:px-6 lg:px-8">
        <p className="mx-auto max-w-7xl text-sm text-slate-400">
          &copy; {new Date().getFullYear()} LAS Mobility. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
