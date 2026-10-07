import type { Metadata, Viewport } from "next";
import { Unbounded, Hanken_Grotesk, Readex_Pro } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

/* Unbounded is round and wide like the tubes of the name; Hanken does the
   reading; Readex Pro is the monoline Arabic the tubes were traced from. */
const display = Unbounded({ variable: "--font-display", subsets: ["latin"], display: "swap" });
const text = Hanken_Grotesk({ variable: "--font-text", subsets: ["latin"], display: "swap" });
const arabic = Readex_Pro({ variable: "--font-arabic", subsets: ["arabic", "latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://yahiakerroum-portfolio.vercel.app"),
  title: "Yahia Kerroum: AI engineering student building whole products",
  description:
    "Yahia Kerroum is an AI engineering student at ENSIA in Algiers. Kanoun, FPL Assistant, Qima, DzairAI and more: products built end to end, from the model to the screen.",
  openGraph: {
    title: "Yahia Kerroum",
    description: "AI engineering student in Algiers, building whole products, from the model to the screen.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#eceef2",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable} ${arabic.variable}`}>
      <body>
        <SmoothScroll />
        {children}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
