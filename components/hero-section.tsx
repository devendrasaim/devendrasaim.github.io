"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, FileText as FileIcon } from "lucide-react";
import { Typewriter } from "@/components/typewriter";
import { Crosshair } from "@/components/crosshair";
import { SpotlightAvatar } from "@/components/spotlight-avatar";

export function HeroSection() {
  const [nameComplete, setNameComplete] = useState(false);
  const [subtitleComplete, setSubtitleComplete] = useState(false);
  const [focusComplete, setFocusComplete] = useState(false);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 py-24 lg:px-10 overflow-hidden">
      {/* Scan line overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute w-full h-px bg-foreground/[0.03] animate-scan-line will-change-transform" />
      </div>

      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          opacity: 0.3,
        }}
      />

      <Crosshair position="top-left" />
      <Crosshair position="top-right" />
      <Crosshair position="bottom-left" />
      <Crosshair position="bottom-right" />

      <div className="relative z-20 grid w-full max-w-7xl mx-auto items-center gap-4 lg:grid-cols-[minmax(260px,30%)_minmax(0,70%)] lg:gap-12 xl:gap-16">
        {/* Profile Picture with Spotlight */}
        <div className="flex justify-center lg:justify-start">
          <SpotlightAvatar
            src="/images/profile.JPEG"
            alt="Devendra Sai Mupparaju"
            size={240}
          />
        </div>

        <div className="min-w-0 text-center lg:text-left">
        {/* Name */}
        <h1 className="font-mono text-lg sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground break-words">
          <Typewriter
            text="DEVENDRA SAI MUPPARAJU"
            speed={60}
            onComplete={() => setNameComplete(true)}
          />
        </h1>

        {/* Subtitle */}
        {nameComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-8 md:mb-10 px-0"
          >
            <p className="font-mono text-xs sm:text-sm md:text-base tracking-[0.1em] sm:tracking-[0.15em] text-foreground">
              <Typewriter
                text="Software Engineer @ VelocitiPM"
                speed={30}
                onComplete={() => setSubtitleComplete(true)}
              />
            </p>
            {subtitleComplete && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="mt-3 font-mono text-[10px] sm:text-xs md:text-sm tracking-[0.1em] sm:tracking-[0.15em] text-muted-foreground"
              >
                <Typewriter
                  text="Frontend Systems | Data | AI-Assisted Development"
                  speed={30}
                  onComplete={() => setFocusComplete(true)}
                />
              </motion.p>
            )}
          </motion.div>
        )}

        {/* Manifesto */}
        {focusComplete && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-8 md:mb-12 px-4 lg:px-0"
          >
            I build reliable product experiences across frontend systems and
            data. At VelocitiPM, I turn complex workflows into clear React and
            TypeScript interfaces, connect them to Supabase and PostgreSQL, and
            use AI tools to move thoughtfully from idea to production.
          </motion.p>
        )}

        {/* CTA Buttons */}
        {focusComplete && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex w-full flex-col items-center justify-center gap-4 px-6 md:px-0 lg:items-start"
          >
            <a
              href="mailto:mdevendrasai9@gmail.com"
              className="group relative inline-flex w-fit items-center justify-center gap-2 border border-foreground/20 px-3 py-3 font-mono text-sm tracking-wider text-foreground transition-all duration-200 hover:scale-105 hover:border-foreground hover:bg-foreground hover:text-background"
            >
              <Mail className="h-4 w-4" />
              mdevendrasai9@gmail.com
            </a>
            <a
              href="/docs/Resume.pdf?v=updated"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex w-fit items-center justify-center gap-2 border border-foreground/10 px-3 py-3 font-mono text-sm tracking-wider text-muted-foreground transition-all duration-200 hover:scale-105 hover:border-foreground hover:bg-foreground hover:text-background"
            >
              <FileIcon className="h-4 w-4" />
              Resume
            </a>
            <div className="flex items-center justify-center gap-4 lg:justify-start">
              <a
                href="https://www.linkedin.com/in/devendrasaim/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-foreground/10 text-muted-foreground transition-all duration-200 hover:scale-110 hover:border-foreground/40 hover:bg-foreground hover:text-background"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/devendrasaim"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="group relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-foreground/10 text-muted-foreground transition-all duration-200 hover:scale-110 hover:border-foreground/40 hover:bg-foreground hover:text-background"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
        )}
        </div>
      </div>
    </section>
  );
}
