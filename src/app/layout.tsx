import type { Metadata } from "next";
import { Caveat, DM_Serif_Display, Manrope } from "next/font/google";
import { business } from "@/lib/site";
import { TopBar } from "@/components/TopBar";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import "./globals.css";

// Self-hosted at build time by next/font — no runtime request to Google.
// DM Serif Display ships a single weight (400) by design; the headline voice
// comes from its size and its contrast against Manrope, not from bolding it.
const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dm-serif",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

// The handwritten signature ("More life together"). Used at most twice on the
// whole site — a human mark, not a typeface we design with.
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-caveat",
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
    <html lang="en-GB" className={`${dmSerif.variable} ${manrope.variable} ${caveat.variable}`}>
      <body>
        {/* Skip link for keyboard and screen-reader users */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Reveal />
        <TopBar />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
