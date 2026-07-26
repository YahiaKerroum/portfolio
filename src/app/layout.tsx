import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yahiakerroum-portfolio.vercel.app"),
  title: "Yahia Kerroum — AI Engineer & Systems Builder",
  description:
    "AI engineer in Algiers building production-grade full-stack platforms, machine-learning pipelines, and intelligent systems.",
  openGraph: {
    title: "Yahia Kerroum — AI Engineer & Systems Builder",
    description:
      "Selected systems, engineering decisions, and measurable outcomes.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${plexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
