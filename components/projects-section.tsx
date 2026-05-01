"use client";

import { motion } from "framer-motion";
import { ProjectModule } from "@/components/project-module";

const CATEGORIES = [
  { key: "web",      label: "WEB APPLICATIONS" },
  { key: "ai",       label: "AI & MACHINE LEARNING" },
  { key: "security", label: "SYSTEMS & SECURITY" },
  { key: "game",     label: "GAME / HACKATHON" },
] as const;
type CategoryKey = typeof CATEGORIES[number]["key"];

const projects = [
  {
    moduleId: "MODULE_A",
    category: "web" as CategoryKey,
    title: "GROCERY SQUARE",
    tags: ["Next.js", "Supabase", "PostgreSQL", "GitHub Actions"],
    description:
      "Architected a production-grade full-stack grocery e-commerce platform deployed to GitHub Pages via automated CI/CD pipelines. Leveraged Next.js SSG with generateStaticParams to pre-render product routes at build time, eliminating runtime 404 errors at scale. Engineered a resilient fallback architecture toggling between live Supabase/PostgreSQL and local mock data for zero-downtime deployments across environments.",
    viewportLabel: "ECOMMERCE_DEPLOYMENT_CORE",
    accentColor: "green" as const,
    link: "https://devendrasaim.github.io/GrocerySquare/",
    image: "/images/grocery.gif",
  },
  {
    moduleId: "MODULE_B",
    category: "ai" as CategoryKey,
    title: "AUTONOMOUS JOB APPLICATION AGENT",
    tags: ["Python", "Gemini 2.5 Pro", "Playwright", "Apify", "Notion API", "Firebase Firestore", "React", "TypeScript"],
    description:
      "5-agent pipeline that automates the entire job application lifecycle: Agent 1 scouts jobs from LinkedIn/Indeed via Apify with relevance scoring and deduplication. Agent 2 scrapes ATS forms (Greenhouse/Lever) and maps every field with Gemini. Agent 3 generates tailored cover letters and elevator pitches per role. Agent 4 answers every unique form question from the candidate profile. Agent 5 fills and submits via Playwright browser automation — pausing for human confirmation before final submit. Parallel systems include a Gmail IMAP watcher, a resume tailor with ATS scoring and PDF generation, and a real-time React + Firebase Kanban board.",
    viewportLabel: "MULTI_AGENT_PIPELINE",
    accentColor: "rose" as const,
    flowchart: "jobagent" as const,
  },
  {
    moduleId: "MODULE_C",
    category: "ai" as CategoryKey,
    title: "AI SOCIAL MEDIA GENERATOR",
    tags: ["Python", "Google Gemini API", "Imagen 3", "Pillow", "Perplexity API", "REST APIs", "Instagram Automation"],
    description:
      "Autonomous content pipeline that pulls trending AI topics via Perplexity API, generates captions with Gemini 2.5-Flash, creates images using Imagen 3, and auto-publishes directly to Instagram via instagrapi — fully scheduled with zero manual steps and no paid publishing APIs. Features a multi-tier fallback chain for image generation (Imagen 3 → Pollinations → Pillow), a custom slide compositor with topographic texture and gradient typography, plus 4 external APIs integrated with retry logic and structured CSV logging.",
    viewportLabel: "AUTONOMOUS_CONTENT_PIPELINE",
    accentColor: "cyan" as const,
    link: "https://github.com/devendrasaim/AI-Social-Media-Generator",
    liveLink: "https://www.instagram.com/myaiguru9/",
    flowchart: "social" as const,
  },
  {
    moduleId: "MODULE_D",
    category: "ai" as CategoryKey,
    title: "UI NAVIGATOR AGENT",
    tags: ["Python", "Gemini 1.5 Flash", "Playwright", "SpeechRecognition", "Pillow"],
    description:
      "Web navigation agent that accepts voice or text commands and autonomously interacts with any website using AI vision and browser automation. Uses Set-of-Mark element tagging so Gemini can visually parse and click UI elements — no site-specific scripting required. Works universally across any website with full voice input support.",
    viewportLabel: "BROWSER_AUTOMATION_VIEWPORT",
    accentColor: "amber" as const,
    link: "https://github.com/devendrasaim/ui-navigator-agent",
  },
  {
    moduleId: "MODULE_E",
    category: "security" as CategoryKey,
    title: (
      <>
        PRIVACY PRESERVING
        <br />
        USING INTEL SGX
      </>
    ),
    tags: ["Intel SGX", "PyTorch", "C++"],
    description:
      "Proved the integrity of sensitive training loops in untrusted environments. By leveraging Intel SGX enclaves, this architecture isolates computation from OS-level vulnerabilities, ensuring privacy was maintained even during simulated system compromise scenarios.",
    viewportLabel: "ENCRYPTED_TERMINAL_OUTPUT",
    accentColor: "amber" as const,
    pdfUrl: "/docs/secure-deep-learning-sgx.pdf",
  },
  {
    moduleId: "MODULE_F",
    category: "ai" as CategoryKey,
    title: "ACTIVATION STEERING APR",
    tags: ["PyTorch", "CodeLLM", "Activation Steering"],
    description:
      "A training-free method for enhancing CodeLLM reliability in Automatic Program Repair. Computes a correctness vector from contrastive buggy/fixed code pairs and injects it into the model's residual stream during inference. Eliminated invalid code generation entirely and boosted CodeLlama-7B accuracy from 48% to 56%.",
    viewportLabel: "RESIDUAL_STREAM_MONITOR",
    accentColor: "cyan" as const,
    link: "https://github.com/devendrasaim/automatic-program-repair-steering",
    pdfUrl: "/docs/activation-steering-apr.pdf",
  },
  {
    moduleId: "MODULE_G",
    category: "web" as CategoryKey,
    title: "HOBBY HIVE",
    tags: ["React", "Supabase", "Real-Time Systems"],
    description:
      "Validated real-time data scalability by architecting a 'Time Capsule' feature with Supabase, ensuring instant video updates. Established a seamless user experience strategy by engineering dynamic dashboards in TypeScript to visualize complex hobby progress data intuitively.",
    viewportLabel: "DATA_VISUALIZATION_DASHBOARD",
    accentColor: "green" as const,
    link: "https://hobby-hive-lovat.vercel.app/",
    image: "/images/hobby-hive.gif",
  },
  {
    moduleId: "MODULE_H",
    category: "game" as CategoryKey,
    title: "BOUNCE STREAK (HACKATHON)",
    tags: ["Reddit Devvit", "Hackathon Project", "Phaser", "TypeScript"],
    description:
      "Engineered a high-performance 2D arcade physics engine optimized for mobile browsers. Implemented 'cushion' collision detection to deliver a smooth 60 FPS experience. Architected a deterministic daily challenge system using seeded randomization, ensuring identical physics conditions for thousands of concurrent users.",
    viewportLabel: "PHYSICS_SIMULATION_VIEWPORT",
    accentColor: "amber" as const,
    link: "https://www.reddit.com/r/bounce_streak_dev/comments/1r1adpg/bouncestreak/",
    image: "/images/gameplay.gif",
  },
  {
    moduleId: "MODULE_I",
    category: "security" as CategoryKey,
    title: "FEDERATED FAIRNESS VERIFICATION",
    tags: ["NuSMV", "CTL", "Formal Verification", "Python"],
    description:
      "Formal verification of fairness properties in a 3-client federated learning protocol. Models the FL workflow as a finite-state machine in NuSMV, encodes CTL properties for liveness, safety, and fairness, then automatically verifies no client is starved and no deadlocks occur across bounded aggregation rounds.",
    viewportLabel: "FORMAL_VERIFICATION_ENGINE",
    accentColor: "rose" as const,
    link: "https://github.com/devendrasaim/federated-fairness-verification",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="relative px-6 py-32">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 max-w-[60px] bg-muted-foreground/20" />
            <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">
              {"// SYSTEM MODULES"}
            </span>
          </div>
          <h2 className="font-mono text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            Project Architecture
          </h2>
        </motion.div>

        {/* Grouped modules */}
        <div className="space-y-24">
          {CATEGORIES.map(({ key, label }) => {
            const catProjects = projects.filter((p) => p.category === key);
            if (!catProjects.length) return null;
            return (
              <div key={key} className="space-y-32">
                {/* Category divider */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-6"
                >
                  <div className="h-px flex-1 bg-white/20" />
                  <span
                    className="font-mono text-xs tracking-[0.3em] font-bold uppercase text-white"
                    style={{
                      textShadow:
                        "0 0 8px rgba(255,255,255,0.9), 0 0 20px rgba(200,240,255,0.6), 0 0 40px rgba(180,220,255,0.3)",
                    }}
                  >
                    {label}
                  </span>
                  <div className="h-px flex-1 bg-white/20" />
                </motion.div>

                {/* Projects under this category */}
                <div className="space-y-32">
                  {catProjects.map((project, idx) => (
                    <ProjectModule
                      key={project.moduleId}
                      {...project}
                      reversed={idx % 2 !== 0}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
