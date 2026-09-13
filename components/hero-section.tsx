"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Mail, Github, Linkedin, FileText as FileIcon } from "lucide-react";
import { Typewriter } from "@/components/typewriter";
import { Crosshair } from "@/components/crosshair";
import { SpotlightAvatar } from "@/components/spotlight-avatar";

const socials = [
  { href: "https://www.linkedin.com/in/devendrasaim/", label: "LinkedIn", Icon: Linkedin },
  { href: "https://github.com/devendrasaim", label: "GitHub", Icon: Github },
  { href: "mailto:mdevendrasai9@gmail.com", label: "Email", Icon: Mail },
];

export function HeroSection() {
  const reduce = useReducedMotion();
  const [nameComplete, setNameComplete] = useState(false);

  // Everything after the name arrives in one pass. Chaining reveals off each
  // other pushed the primary action several seconds down the page.
  const revealed = nameComplete || reduce;

  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] items-center overflow-hidden px-6 pb-20 pt-28 lg:px-10 lg:pt-32"
    >
      {/* Scan line */}
      <div
        className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="animate-scan-line absolute h-px w-full bg-foreground/[0.035]" />
      </div>

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 100%)",
          opacity: 0.5,
        }}
      />

      <Crosshair position="top-left" />
      <Crosshair position="bottom-right" />

      <div className="relative z-20 mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
        <div className="min-w-0 order-2 text-center lg:order-1 lg:text-left">
          <h1 className="font-mono text-[1.6rem] font-bold leading-[1.05] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-[3.5rem]">
            <Typewriter
              text="DEVENDRA SAI MUPPARAJU"
              speed={45}
              onComplete={() => setNameComplete(true)}
            />
          </h1>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={revealed ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={revealed ? "" : "invisible"}
          >
            <p className="mt-5 font-mono text-sm tracking-[0.12em] text-cyan sm:text-base">
              Software Engineer at VelocitiPM
            </p>

            <p className="mx-auto mt-6 max-w-[52ch] font-sans text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
              I build the React and TypeScript interfaces people work in day to
              day, along with the Supabase and PostgreSQL layer underneath them.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:items-start lg:justify-start">
              <a
                href="#contact"
                className="group inline-flex w-full items-center justify-center gap-2 border border-foreground bg-foreground px-6 py-3.5 font-mono text-sm tracking-wider text-background transition-colors duration-200 hover:bg-transparent hover:text-foreground sm:w-auto"
              >
                Get in touch
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
              <a
                href="/docs/Resume.pdf?v=updated"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 border border-border-strong px-6 py-3.5 font-mono text-sm tracking-wider text-muted-foreground transition-colors duration-200 hover:border-foreground hover:text-foreground sm:w-auto"
              >
                <FileIcon className="h-4 w-4" />
                Resume
              </a>
            </div>

            <div className="mt-8 flex items-center justify-center gap-1 lg:justify-start">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center text-faint transition-colors duration-200 hover:text-foreground"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* min-w-0: grid items default to min-width:auto and refuse to shrink
            below their content, so the avatar's fixed-width glow wrapper blew
            this column out past the viewport and shunted the photo off centre
            on phones. */}
        <div className="order-1 flex min-w-0 justify-center lg:order-2">
          <SpotlightAvatar
            src="/images/profile-hero.webp"
            alt="Devendra Sai Mupparaju"
            size={240}
          />
        </div>
      </div>
    </section>
  );
}
