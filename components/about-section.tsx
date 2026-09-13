"use client";

import { motion } from "framer-motion";

const focusAreas = [
  {
    title: "Product Engineering",
    description:
      "I build the interfaces and workflows customers depend on—from authentication and onboarding to responsive application shells and data-rich product experiences. My primary stack is React, TypeScript, and modern frontend architecture.",
  },
  {
    title: "Data & Systems",
    description:
      "I work beyond the UI when the product needs it, contributing to Supabase, PostgreSQL, edge functions, APIs, and backend integrations. I care about how data is modeled, how state moves through a system, and how the full feature behaves in production.",
  },
  {
    title: "AI-Assisted Development",
    description:
      "Claude, Codex, and Antigravity are part of my daily engineering workflow. I use them to understand codebases, prototype solutions, debug issues, refactor safely, and review implementation choices—while keeping architecture, validation, and quality under human judgment.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="relative px-6 py-24 border-t border-border/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="font-mono text-xs tracking-[0.25em] text-cyan uppercase mb-4">
            Software Engineer · Product Builder
          </p>
          <h2 className="font-mono text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-6">
            I turn complex product requirements into software people can rely on.
          </h2>
          <p className="font-sans text-lg md:text-xl leading-relaxed text-muted-foreground max-w-3xl">
            I&apos;m Devendra Sai Mupparaju, a Software Engineer at VelocitiPM. My work
            sits at the intersection of frontend engineering and data: building
            polished React experiences, shaping database-backed features, and
            following problems across the stack until the complete workflow works.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
          {focusAreas.map((area, index) => (
            <motion.article
              key={area.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background p-6 md:p-8"
            >
              <span className="font-mono text-xs text-cyan/70">0{index + 1}</span>
              <h3 className="font-mono text-lg font-bold text-foreground mt-5 mb-4">
                {area.title}
              </h3>
              <p className="font-sans text-sm md:text-base leading-relaxed text-muted-foreground">
                {area.description}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-end border-l-2 border-cyan/60 pl-6 md:pl-8"
        >
          <div>
            <h3 className="font-mono text-lg font-bold text-foreground mb-3">
              Engineering with range and ownership
            </h3>
            <p className="font-sans text-base leading-relaxed text-muted-foreground max-w-3xl">
              My MS in Computer Science and work across full-stack products, AI
              systems, and applied research give me a broad technical foundation.
              The common thread is ownership: understand the problem, make the
              system simpler, and ship work that holds up beyond the demo.
            </p>
          </div>
          <div className="md:text-right">
            <span className="block font-mono text-xs tracking-[0.2em] text-muted-foreground/60 uppercase mb-2">
              Current focus
            </span>
            <span className="font-mono text-sm text-foreground">
              Frontend · Databases · AI Workflows
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}