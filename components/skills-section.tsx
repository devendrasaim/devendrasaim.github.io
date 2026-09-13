"use client";

import { motion } from "framer-motion";
import { Section, SectionHeading } from "@/components/section";

const skillCategories = [
  {
    id: "LANG",
    name: "Languages",
    items: ["Python", "C++", "TypeScript", "JavaScript", "SQL", "Linux/Bash"],
    fullWidth: false,
  },
  {
    id: "AI",
    name: "AI & Machine Learning",
    items: [
      "PyTorch", "TensorFlow", "Scikit-learn",
      "LLM Integration", "Prompt Engineering", "Activation Steering",
      "Agentic Workflow Design", "Multi-Agent Systems",
      "Gemini API", "OpenAI API", "Perplexity API", "Imagen 3",
      "Vercel AI SDK", "RAG Architecture", "Browser Automation with Vision Models",
    ],
    fullWidth: false,
  },
  {
    id: "WEB",
    name: "Web & Full Stack",
    items: ["React", "Next.js", "Node.js", "Flask", "Tailwind CSS", "Vite", "Phaser 3", "Framer Motion", "Shadcn UI"],
    fullWidth: false,
  },
  {
    id: "OPS",
    name: "Cloud & DevOps",
    items: ["AWS (EC2, S3, IAM)", "GitHub Actions", "CI/CD", "Docker", "Slurm (HPC)", "Intel SGX", "Firebase", "Vercel", "Windows Task Scheduler"],
    fullWidth: false,
  },
  {
    id: "DB",
    name: "Databases & Storage",
    items: ["PostgreSQL", "Supabase", "MySQL", "Redis", "pgvector", "Vector Databases", "Embeddings"],
    fullWidth: false,
  },
  {
    id: "API",
    name: "APIs & Services",
    items: ["Apify", "Notion API", "Gmail IMAP", "Firebase Firestore", "Resend", "instagrapi", "Discord Webhook", "Reddit Devvit SDK"],
    fullWidth: false,
  },
  {
    id: "CORE",
    name: "Key Concepts",
    items: [
      "Agentic Pipelines", "Multi-API Orchestration", "Fault-Tolerant Systems",
      "RESTful APIs", "Real-time Systems", "Static Site Generation",
      "Distributed Systems", "Formal Verification", "System Security",
      "ATS Resume Optimization", "Agile",
    ],
    fullWidth: true,
  },
];

/* Publishes the cursor position to the hovered cell as CSS custom properties,
   so the highlight can track it with no React state and no re-render. Only ever
   runs for the single cell currently under the pointer. */
function trackSpotlight(event: React.PointerEvent<HTMLDivElement>) {
    const cell = event.currentTarget;
    const bounds = cell.getBoundingClientRect();
    cell.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
    cell.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
}

export function SkillsSection() {
  return (
    <Section id="skills" width="wide">
        <SectionHeading title="Technical Skills" />

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
            {skillCategories.map((category, index) => (
                <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className={`group relative overflow-hidden bg-background p-6 transition-colors duration-300 hover:bg-surface md:p-8 ${category.fullWidth ? "md:col-span-2" : ""}`}
                    onPointerMove={trackSpotlight}
                >
                    {/* Cursor-tracked highlight, echoing the page light. It sits
                        under the z-10 content so it lifts the surface without
                        washing out the text. */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{
                            background:
                                "radial-gradient(300px circle at var(--spot-x, 50%) var(--spot-y, 50%), hsl(var(--cyan) / 0.07), transparent 72%)",
                        }}
                    />

                    <div className="relative z-10">
                        {/* items-center, not baseline: a disc has no baseline to
                            sit on, so baseline alignment drops it low against
                            the heading. */}
                        <div className="mb-6 flex items-center justify-between gap-4">
                            <h3 className="font-mono text-lg font-bold text-foreground">{category.name}</h3>

                            {/* Count dial. Two stroked circles rather than a
                                border: a border can only change colour, while a
                                stroked arc can draw itself in, so the ring
                                completes as the cursor enters the cell. */}
                            <span className="relative grid h-7 w-7 shrink-0 place-items-center">
                                <svg
                                    viewBox="0 0 28 28"
                                    aria-hidden="true"
                                    /* -rotate-90 starts the arc at twelve o'clock
                                       instead of three. */
                                    className="absolute inset-0 h-full w-full -rotate-90"
                                >
                                    <circle
                                        cx="14" cy="14" r="13" fill="none" strokeWidth="1"
                                        /* Cyan at rest, not neutral, so the dial
                                           reads as an accent ring on its own;
                                           held low enough that seven of them
                                           down the page stay calm. */
                                        className="stroke-cyan/30"
                                    />
                                    <circle
                                        cx="14" cy="14" r="13" fill="none" strokeWidth="1"
                                        strokeLinecap="round"
                                        /* pathLength normalises the circumference to 1,
                                           so the dash maths is just 1 -> 0 and stays
                                           correct at any radius. */
                                        pathLength={1}
                                        strokeDasharray={1}
                                        className="stroke-cyan [stroke-dashoffset:1] transition-[stroke-dashoffset] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:[stroke-dashoffset:0] motion-reduce:transition-none"
                                    />
                                </svg>
                                <span className="font-mono text-[11px] leading-none tabular-nums text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                                    {category.items.length}
                                </span>
                                <span className="sr-only">skills</span>
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {category.items.map((item) => (
                                <span
                                    key={item}
                                    className="border border-border/70 bg-background/60 px-3 py-1.5 font-mono text-[13px] tracking-wide text-muted-foreground transition-colors duration-200 group-hover:border-border-strong"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    </Section>
  );
}
