"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, FileText as FileIcon } from "lucide-react";
import { Typewriter } from "@/components/typewriter";
import { Crosshair } from "@/components/crosshair";
import { SpotlightAvatar } from "@/components/spotlight-avatar";

export function HeroSection() {
  const [nameComplete, setNameComplete] = useState(false);
  const [subtitleComplete, setSubtitleComplete] = useState(false);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
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

      <div className="relative z-20 max-w-3xl mx-auto text-center">
        {/* Profile Picture with Spotlight */}
        <div className="flex justify-center mb-8">
          <SpotlightAvatar
            src="/images/Profile.png"
            alt="Devendra Sai Mupparaju"
            size={160}
          />
        </div>

        {/* System label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-8"
        >
          <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">
            {"// KERNEL INITIALIZATION"}
          </span>
        </motion.div>

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
            className="mb-8 md:mb-10 px-0 sm:px-4"
          >
            <p className="font-mono text-[10px] sm:text-sm md:text-base tracking-[0.1em] sm:tracking-[0.15em] text-muted-foreground">
              <Typewriter
                text="Software Engineer | MSCS Graduate | System Architect"
                speed={30}
                onComplete={() => setSubtitleComplete(true)}
              />
            </p>
          </motion.div>
        )}

        {/* Manifesto */}
        {subtitleComplete && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-12 px-4"
          >
            I believe in code that feels, not just functions. Built on care and
            curiosity, my work explores how deep logic shapes simple experiences.
            From the smooth flow of a game to the quiet safety of a secure
            system, every project is a connection, grounded in trust and made to
            last.
          </motion.p>
        )}

        {/* CTA Buttons */}
        {subtitleComplete && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-6 md:px-0"
          >
            <a
              href="mailto:mdevendrasai9@gmail.com"
              className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 border border-foreground/20 px-8 py-3 font-mono text-sm tracking-wider text-foreground transition-all hover:border-foreground hover:bg-foreground hover:text-background"
            >
              <Mail className="h-4 w-4" />
              Contact Me
            </a>
            <a
              href="https://github.com/devendrasaim"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 border border-foreground/10 px-8 py-3 font-mono text-sm tracking-wider text-muted-foreground transition-all hover:border-foreground/30 hover:text-foreground"
            >
              <Github className="h-4 w-4" />
              Access Repository
            </a>
            <a
              href="/docs/Resume.pdf?v=updated"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 border border-foreground/10 px-8 py-3 font-mono text-sm tracking-wider text-muted-foreground transition-all hover:border-foreground/30 hover:text-foreground"
            >
              <FileIcon className="h-4 w-4" />
              Resume
            </a>
          </motion.div>
        )}

        {/* System status line */}
        {subtitleComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-16 font-mono text-[10px] tracking-[0.2em] text-muted-foreground/40 uppercase"
          >
            {"SYS.INIT > ALL MODULES LOADED > READY"}
          </motion.div>
        )}
      </div>
    </section>
  );
}
