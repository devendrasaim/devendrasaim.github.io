import React from "react"
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ChatWidget } from "@/components/chat-widget";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Devendra Sai Mupparaju | System Interface",
  description:
    "Full-Stack Engineer & AI Researcher. Software Engineer, MSCS Graduate, System Architect.",
};

export const viewport: Viewport = {
  themeColor: "#030304",
};

import { LazyMotion, domAnimation } from "framer-motion";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <body suppressHydrationWarning className="font-sans antialiased">
        <LazyMotion features={domAnimation}>
          {children}
          <ChatWidget />
          <Analytics />
        </LazyMotion>
      </body>
    </html>
  );
}
