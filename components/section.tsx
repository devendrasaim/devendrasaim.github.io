"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * One rhythm for every section on the page: same vertical scale, same container
 * width, same heading treatment. Sections differ by their content, not by their
 * padding.
 */

type Width = "narrow" | "default" | "wide";

const widths: Record<Width, string> = {
  narrow: "max-w-3xl",
  default: "max-w-4xl",
  wide: "max-w-6xl",
};

interface SectionProps {
  id: string;
  children: ReactNode;
  width?: Width;
  /** First section after the hero does not need a rule above it. */
  divided?: boolean;
  className?: string;
}

export function Section({
  id,
  children,
  width = "default",
  divided = true,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`relative px-6 py-20 md:py-28 lg:py-32 ${className}`}>
      {divided && (
        <div
          aria-hidden="true"
          className="rule-top absolute inset-x-6 top-0 h-px md:inset-x-10"
        />
      )}
      <div className={`${widths[width]} mx-auto`}>{children}</div>
    </section>
  );
}

interface SectionHeadingProps {
  title: string;
  /** One short line under the heading. Optional by design; most sections skip it. */
  lede?: string;
  /** Right-aligned count or status, e.g. "7 projects". */
  meta?: string;
  className?: string;
}

export function SectionHeading({
  title,
  lede,
  meta,
  className = "",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-12 md:mb-16 ${className}`}
    >
      <div className="flex items-baseline justify-between gap-6">
        <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          {title}
        </h2>
        {meta && (
          <span className="hidden shrink-0 font-mono text-xs tracking-wider text-faint sm:block">
            {meta}
          </span>
        )}
      </div>
      {lede && (
        <p className="mt-4 max-w-[60ch] font-sans text-base leading-relaxed text-muted-foreground">
          {lede}
        </p>
      )}
    </motion.div>
  );
}
