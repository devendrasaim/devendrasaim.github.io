"use client";

import { motion } from "framer-motion";

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
    <section id="work" className="relative px-6 py-24 border-t border-border/50">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
             <div className="h-px flex-1 max-w-[60px] bg-muted-foreground/20" />
            <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">
              {"// WORK TIMELINE"}
            </span>
          </div>
          <h2 className="font-mono text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            Work Experience
          </h2>
        </motion.div>

        {/* Timeline/List */}
        <div className="space-y-12">
            {workData.map((exp, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative pl-8 border-l border-border/50"
                >
                    {/* Timeline Dot */}
                    <div className="absolute left-[-5px] top-0 h-2.5 w-2.5 rounded-full bg-cyan shadow-[0_0_10px_rgba(6,182,212,0.5)]" />

                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                        <h3 className="font-mono text-base font-bold text-foreground leading-snug max-w-xl">{exp.role}</h3>
                        <span className="font-mono text-sm text-cyan shrink-0">{exp.period}</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
                        <span className="text-base text-foreground/90">{exp.company}</span>
                        <span className="text-sm text-muted-foreground font-mono">| {exp.location}</span>
                    </div>

                    <ul className="list-none space-y-2 mb-6 font-sans text-sm text-muted-foreground leading-relaxed max-w-2xl">
                        {exp.description.map((bullet, i) => (
                           <li key={i} className="flex items-start gap-2">
                             <span className="text-cyan/70 mt-1 font-mono text-sm shrink-0">{">"}</span>
                             <span>{bullet}</span>
                           </li>
                        ))}
                    </ul>

                    {exp.tags.length > 0 && (
                         <div className="flex flex-wrap gap-2">
                            {exp.tags.map(tag => (
                                <span key={tag} className="text-xs font-mono border border-cyan/30 px-2 py-0.5 text-cyan/90 bg-cyan/5 rounded-sm">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}