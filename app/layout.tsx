import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = "https://lasmobility.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LAS Mobility | AI-Powered Fleet Intelligence",
    template: "%s | LAS Mobility",
  },
  description:
    "LAS Mobility is an AI-powered fleet management and mobility intelligence platform for real-time visibility, safety insights, and better fleet performance.",
  keywords: [
    "fleet management software",
    "GPS tracking",
    "AI fleet intelligence",
    "vehicle tracking",
    "fleet analytics",
    "driver behavior monitoring",
    "fuel monitoring",
    "route optimization",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "LAS Mobility",
    title: "LAS Mobility | AI-Powered Fleet Intelligence",
    description:
      "Real-time fleet visibility, operational control, safety insights, and AI-powered mobility intelligence for modern businesses.",
    images: ["/og-image.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "LAS Mobility | AI-Powered Fleet Intelligence",
    description:
      "AI-powered fleet management software for tracking, safety, utilization, alerts, and analytics.",
  },
  icons: { icon: "/favicon.svg", apple: "/logo-dark.png" },
};

// Inline script runs synchronously before any paint — eliminates theme flicker.
const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('las-theme');
    document.documentElement.setAttribute('data-theme', t === 'light' ? 'light' : 'dark');
  } catch(e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        {/* Blocking script: sets correct data-theme before first paint */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={inter.variable}>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
