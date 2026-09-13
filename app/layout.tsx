import React from "react"
import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";

import { Geist, JetBrains_Mono } from "next/font/google";
import { ChatWidget } from "@/components/chat-widget";

import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const siteUrl = "https://devendrasaim-portfolio.vercel.app";

export const metadata: Metadata = {
  title: "Devendra Sai Mupparaju | Full Stack Engineer & AI Researcher",
  description:
    "Full Stack Engineer & AI Researcher. MSCS Graduate from Iowa State. Building production apps with Next.js, Supabase & CI/CD. Steering LLM internals with PyTorch.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Devendra Sai Mupparaju | Full Stack Engineer & AI Researcher",
    description:
      "MSCS Graduate from Iowa State. Building production full-stack platforms and researching training-free LLM steering techniques.",
    url: siteUrl,
    siteName: "Devendra Sai Mupparaju",
    images: [
      {
        url: "/images/profile-og.jpg",
        width: 400,
        height: 400,
        alt: "Devendra Sai Mupparaju",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Devendra Sai Mupparaju | Full Stack Engineer & AI Researcher",
    description:
      "MSCS Graduate from Iowa State. Building production full-stack platforms and researching training-free LLM steering techniques.",
    images: ["/images/profile-og.jpg"],
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#030304",
};

import { LazyMotion, domAnimation } from "framer-motion";

import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <body suppressHydrationWarning className="font-sans antialiased">
        <LazyMotion features={domAnimation}>
          {children}
          <ChatWidget />
          <Analytics />
          <SpeedInsights />
        </LazyMotion>
      </body>
    </html>
  );
}
