import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { BackToTop, ScrollProgress } from "@/components/motion";
import { Analytics } from "@/components/Analytics";
import { business } from "@/data/business";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Max Gadgets | iPhones, bulk orders and repairs in Ado-Ekiti",
    template: "%s | Max Gadgets",
  },
  description:
    "Shop the latest iPhones, order in bulk, or bring your phone in for expert repair at Max Gadgets, Block A, Shop 13, Fayose Market, Ado-Ekiti.",
  applicationName: "Max Gadgets",
  alternates: { canonical: "./" },
  openGraph: {
    title: "Max Gadgets",
    description: "Good phones. Smart choices. iPhones, bulk orders and repairs in Ado-Ekiti.",
    siteName: "Max Gadgets",
    type: "website",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Max Gadgets",
    description: "Good phones. Smart choices. iPhones, bulk orders and repairs in Ado-Ekiti.",
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "MobilePhoneStore",
  name: business.name,
  legalName: business.legalName,
  telephone: business.phones[0].tel,
  email: business.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.line1,
    addressLocality: "Ado-Ekiti",
    addressRegion: "Ekiti State",
    addressCountry: "NG",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-NG">
      <head>
        <link rel="preload" href="/fonts/bricolage-grotesque-latin-wght-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/manrope-latin-wght-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <noscript>
          <style>{".reveal,.reveal-wipe{opacity:1!important;transform:none!important;clip-path:none!important}.grow-bar{width:var(--w)!important}"}</style>
        </noscript>
      </head>
      <body className="bg-white font-sans text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
        >
          Skip to main content
        </a>
        <div className="legacy-notice" role="note">
          Your browser is out of date, so this page may look wrong. Please update it, or WhatsApp or call us on {business.phones[0].display}.
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ScrollProgress />
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <Analytics />
        <BackToTop />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
