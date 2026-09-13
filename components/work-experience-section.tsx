"use client";

import { motion } from "framer-motion";
import { Section, SectionHeading } from "@/components/section";

const workData = [
  {
    role: "Software Engineer",
    company: "VelocitiPM",
    location: "Remote",
    period: "May 2026 - Present",
    description: [
      "VelocitiPM is an AI-assisted product management platform: it helps a product manager take an idea from a rough strategy all the way to an engineering-ready ticket, without switching between five different tools to do it. I work full stack on it, across the web app, the AI agent backend, and the database layer.",
      "Built the step where a product manager turns a validated idea directly into a ready-to-hand-off engineering ticket, complete with a proper user story, in a single flow, replacing what used to be a manual rewrite into a separate ticketing tool.",
      "Built the piece that carries a feature's actual design and prototype context along with its generated requirements, so a PM (or the engineer picking it up next) can see what was really designed instead of hunting down a separate design link.",
      "Designed the automation that keeps a feature's status in sync with its parent roadmap item as work moves forward, so a PM's roadmap reflects real progress automatically instead of needing to be updated by hand.",
      "Rebuilt the first-time experience for a new product manager signing up, from registration through their first guided tour of the platform, to cut down on drop-off in the first few minutes.",
      "Also worked on the AI agent side that generates the initiatives, user stories, and requirement docs a PM works from, improving how reliably it produces usable output.",
      "Wrote automated tests alongside nearly every feature to keep the platform dependable as new capabilities shipped quickly.",
    ],
    tags: ["React", "TypeScript", "Python", "FastAPI", "LangGraph", "Supabase", "PostgreSQL", "Tailwind CSS", "Framer Motion", "Docker Compose", "Git"],
  },
];

export function WorkExperienceSection() {
  return (
    <Section id="work" width="default">
        <SectionHeading title="Work Experience" />

        {/* Timeline/List */}
        <div className="space-y-14 md:space-y-20">
            {workData.map((exp, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative border-l border-border pl-7 md:pl-10"
                >
                    {/* Marker on the timeline rule */}
                    <div className="absolute left-[-3px] top-2 h-1.5 w-1.5 bg-cyan" aria-hidden="true" />

                    <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                        <h3 className="max-w-2xl font-mono text-lg font-bold leading-snug text-foreground md:text-xl">{exp.role}</h3>
                        <span className="shrink-0 font-mono text-xs tabular-nums text-faint">{exp.period}</span>
                    </div>

                    <div className="mb-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="font-mono text-sm text-cyan">{exp.company}</span>
                        <span className="font-mono text-sm text-faint">{exp.location}</span>
                    </div>

                    <ul className="mb-6 max-w-[68ch] space-y-3 font-sans text-[15px] leading-relaxed text-muted-foreground">
                        {exp.description.map((bullet, i) => (
                           <li key={i} className="flex items-start gap-3">
                             <span
                               aria-hidden="true"
                               className="mt-[0.6em] h-px w-3 shrink-0 bg-border-strong"
                             />
                             <span>{bullet}</span>
                           </li>
                        ))}
                    </ul>

                    {exp.tags.length > 0 && (
                         <div className="flex flex-wrap gap-2">
                            {exp.tags.map(tag => (
                                <span key={tag} className="border border-border/70 px-2.5 py-1 font-mono text-[11px] tracking-wide text-faint">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </motion.div>
            ))}
        </div>
    </Section>
  );
}