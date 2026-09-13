"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/section";
import { PixelCompanion } from "@/components/pixel-companion";

const focusAreas = [
  {
    title: "Product Engineering",
    description:
      "I build the interfaces customers use every day: authentication, onboarding, application shells, and the dense data views in between. React and TypeScript are my main tools.",
  },
  {
    title: "Data & Systems",
    description:
      "When a feature needs work below the UI, I do that too: Supabase, PostgreSQL, edge functions, and API integrations. How the data is modeled usually decides how the feature behaves once real users are on it, so that is where I spend the time.",
  },
  {
    title: "AI-Assisted Development",
    description:
      "I use Claude, Codex, and Antigravity most days to read unfamiliar codebases, prototype, debug, and refactor. They speed the work up and sometimes catch what I miss. The architecture and validation calls stay with me.",
  },
];

export function AboutSection() {
  const reduce = useReducedMotion();

  return (
    <Section id="about" width="wide">
      {/* Lead block. The sprite holds the right column from lg up, sized and
          top-aligned to sit against the statement rather than float over it.
          Below lg the statement needs the full width, so the sprite drops. */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_13rem] lg:items-start lg:gap-12 xl:grid-cols-[minmax(0,1fr)_18rem]">
        {/* Lead statement. Deliberately larger than a section heading: after the
            hero this is the most important moment on the page. */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <h2 className="font-mono text-[1.75rem] leading-[1.15] font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            I build product features from the interface down to the database.
          </h2>
          <p className="mt-8 max-w-[58ch] font-sans text-lg leading-relaxed text-muted-foreground">
            I&apos;m Devendra Sai Mupparaju, a Software Engineer at VelocitiPM. Most of
            my work is frontend, but it rarely stops there. I write the React, shape
            the database features behind it, and stay with a problem across the stack
            until the whole workflow works.
          </p>
        </motion.div>

        <PixelCompanion
          src="/videos/about-pixel-loop.mp4"
          width={392}
          height={360}
          className="hidden lg:-mt-3 lg:block"
        />
      </div>

      {/* Focus areas as an indexed list. Hairlines instead of card boxes: the
          rows are related, so they read better as one table than three tiles. */}
      <div className="mt-16 md:mt-24">
        {focusAreas.map((area, index) => (
          <motion.article
            key={area.title}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group grid grid-cols-1 gap-x-10 gap-y-4 border-t border-border py-8 transition-colors duration-300 last:border-b hover:border-border-strong md:grid-cols-[3rem_minmax(0,14rem)_minmax(0,1fr)] md:py-10"
          >
            <span
              aria-hidden="true"
              className="font-mono text-xs tabular-nums text-faint transition-colors duration-300 group-hover:text-cyan"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-mono text-lg font-bold leading-snug text-foreground">
              {area.title}
            </h3>
            <p className="max-w-[62ch] font-sans text-base leading-relaxed text-muted-foreground">
              {area.description}
            </p>
          </motion.article>
        ))}
      </div>

      {/* Closing note */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="mt-16 grid grid-cols-1 gap-8 md:mt-20 md:grid-cols-[minmax(0,1fr)_auto] md:items-end"
      >
        <div className="border-l-2 border-cyan/50 pl-6 md:pl-8">
          <h3 className="font-mono text-base font-bold text-foreground">
            Where the range comes from
          </h3>
          <p className="mt-3 max-w-[62ch] font-sans text-base leading-relaxed text-muted-foreground">
            I have an MS in Computer Science, and I have worked on full-stack
            products, AI systems, and applied research. What carries over from all
            of it is ownership. I would rather spend the extra day understanding a
            problem and simplifying the system than ship something that only works
            in a demo.
          </p>
        </div>
        <p className="font-mono text-xs leading-relaxed text-faint md:text-right">
          Frontend
          <br />
          Databases
          <br />
          AI workflows
        </p>
      </motion.div>
    </Section>
  );
}
