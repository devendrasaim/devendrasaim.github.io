"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/section";
import { PixelCompanion } from "@/components/pixel-companion";
import { useScrollFocus } from "@/components/use-scroll-focus";

const focusAreas = [
  {
    title: "AI Product Engineering",
    description:
      "At VelocitiPM I build the React and TypeScript screens product teams plan their sprints in, and the Velo AI interface that drafts tickets and user stories. Behind it, I feed product design context into the Python AI service so the drafts match what was actually designed. Users edit every draft before it is saved.",
  },
  {
    title: "Enterprise Generative AI",
    description:
      "At ServiceNow I configured Now Assist to summarize incidents and draft resolution notes and knowledge articles. I built the Flow Designer actions that sent incident details to the AI service and routed drafts to agents for review, and wrote Python checks that compared each response with the source incident.",
  },
  {
    title: "Data Pipelines & Validation",
    description:
      "At Cognizant I built reusable Python and SQL pipelines that turned raw enterprise data into datasets for analytics and machine learning. I cleaned it with Pandas and NumPy and added validation checks that caught bad records before they reached downstream systems.",
  },
  {
    title: "AI-Assisted Development",
    description:
      "I use Claude, Codex, and Antigravity most days to read unfamiliar codebases, prototype, debug, and refactor. They speed the work up and sometimes catch what I miss. The architecture and validation calls stay with me.",
  },
];

/* The career in one glance, oldest first, so the closing note reads as a
   timeline rather than a list of buzzwords. */
const timeline = [
  { year: "2022", label: "Data pipelines" },
  { year: "2024", label: "Enterprise AI" },
  { year: "2025", label: "LLM research" },
  { year: "2026", label: "AI product" },
];

/* One focus area. The index and title glow neon and the description brightens
   while the row crosses the middle of the screen; hover still lights the
   index for pointer users. */
function FocusRow({
  area,
  index,
  reduce,
}: {
  area: (typeof focusAreas)[number];
  index: number;
  reduce: boolean;
}) {
  const [ref, inFocus] = useScrollFocus<HTMLElement>();

  return (
    <motion.article
      ref={ref}
      data-focus={inFocus}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="glow-scope group grid grid-cols-1 gap-x-10 gap-y-4 border-t border-border py-8 transition-colors duration-300 last:border-b hover:border-border-strong md:grid-cols-[3rem_minmax(0,14rem)_minmax(0,1fr)] md:py-10"
    >
      <span
        aria-hidden="true"
        className="glow-neon font-mono text-xs tabular-nums text-faint group-hover:text-cyan"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="glow-neon font-mono text-lg font-bold leading-snug text-foreground">
        {area.title}
      </h3>
      <p className="glow-white max-w-[62ch] font-sans text-base leading-relaxed text-muted-foreground">
        {area.description}
      </p>
    </motion.article>
  );
}

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
            I build AI features that people can review before they rely on them.
          </h2>
          <p className="mt-8 max-w-[58ch] font-sans text-lg leading-relaxed text-muted-foreground">
            I&apos;m Devendra Sai Mupparaju, a founding software and AI engineer at
            VelocitiPM, where I work on the React and TypeScript front end and the
            Python service behind its AI ticket generation. Before that I rolled out
            generative AI incident summarization at ServiceNow, and before that I
            built data pipelines at Cognizant. In each job the AI worked only as well
            as the data going into it and the review step after it, so I build both.
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
          <FocusRow key={area.title} area={area} index={index} reduce={!!reduce} />
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
            I started on the data side at Cognizant, then put generative AI in
            front of service desk agents at ServiceNow. My MS research at Iowa State
            took me inside the models: with activation steering I raised
            CodeLlama-7B&apos;s HumanEval accuracy by 8 points without retraining it.
            At VelocitiPM I use all three on one product, and I would rather spend
            the extra day getting a feature right than ship something that only
            works in a demo.
          </p>
        </div>
        <ol className="space-y-1 font-mono text-xs leading-relaxed text-faint md:text-right">
          {timeline.map(({ year, label }) => (
            <li key={year}>
              <span className="tabular-nums text-cyan/70">{year}</span>{" "}
              {label}
            </li>
          ))}
        </ol>
      </motion.div>
    </Section>
  );
}
