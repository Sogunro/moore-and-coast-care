import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { business } from "@/lib/site";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import "./globals.css";

// Self-hosted at build time by next/font — no runtime request to Google.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://moorandcoastcare.co.uk"),
  title: {
    default: `${business.name} — Exceptional Home Care in Whitby`,
    template: `%s | ${business.name}`,
  },
  description: business.intro,
  openGraph: {
    title: `${business.name} — Exceptional Home Care in Whitby`,
    description: business.intro,
    type: "website",
    locale: "en_GB",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${cormorant.variable} ${manrope.variable}`}>
      <body>
        {/* Skip link for keyboard and screen-reader users */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-warm-white"
        >
          Skip to content
        </a>
        <Reveal />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
