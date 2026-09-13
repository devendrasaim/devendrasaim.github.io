"use client";

import { motion } from "framer-motion";
import { Section, SectionHeading } from "@/components/section";
import { ProjectModule } from "@/components/project-module";
import { PixelCompanion } from "@/components/pixel-companion";

const CATEGORIES = [
  { key: "web",      label: "WEB APPLICATIONS" },
  { key: "ai",       label: "AI & MACHINE LEARNING" },
  { key: "security", label: "SYSTEMS & SECURITY" },
  { key: "game",     label: "GAME / HACKATHON" },
] as const;
type CategoryKey = typeof CATEGORIES[number]["key"];

const projects = [
  {
    moduleId: "grocery-square",
    category: "web" as CategoryKey,
    title: "GROCERY SQUARE",
    tags: ["Next.js", "Supabase", "PostgreSQL", "GitHub Actions"],
    description:
      "A full-stack grocery e-commerce platform that deploys to GitHub Pages through an automated CI/CD pipeline. Next.js SSG with generateStaticParams pre-renders every product route at build time, which got rid of the runtime 404s as the catalog grew. A fallback layer switches between live Supabase/PostgreSQL and local mock data, so deploys across environments never go down.",
    viewportLabel: "Live demo",
    accentColor: "cyan" as const,
    link: "https://devendrasaim.github.io/GrocerySquare/",
    video: "/videos/grocery.mp4",
    poster: "/images/posters/grocery.webp",
  },
  {
    moduleId: "job-agent",
    category: "ai" as CategoryKey,
    title: "AUTONOMOUS JOB APPLICATION AGENT",
    tags: ["Python", "Gemini 2.5 Pro", "Playwright", "Apify", "Notion API", "Firebase Firestore", "React", "TypeScript"],
    description:
      "5-agent pipeline that automates the entire job application lifecycle: Agent 1 scouts jobs from LinkedIn/Indeed via Apify with relevance scoring and deduplication. Agent 2 scrapes ATS forms (Greenhouse/Lever) and maps every field with Gemini. Agent 3 generates tailored cover letters and elevator pitches per role. Agent 4 answers every unique form question from the candidate profile. Agent 5 fills and submits via Playwright browser automation, pausing for human confirmation before the final submit. Running alongside the pipeline are a Gmail IMAP watcher, a resume tailor with ATS scoring and PDF generation, and a real-time React + Firebase Kanban board.",
    viewportLabel: "Pipeline diagram",
    accentColor: "cyan" as const,
    flowchart: "jobagent" as const,
  },
  {
    moduleId: "social-generator",
    category: "ai" as CategoryKey,
    title: "AI SOCIAL MEDIA GENERATOR",
    tags: ["Python", "Google Gemini API", "Imagen 3", "Pillow", "Perplexity API", "REST APIs", "Instagram Automation"],
    description:
      "Autonomous content pipeline that pulls trending AI topics via Perplexity API, generates captions with Gemini 2.5-Flash, creates images using Imagen 3, and publishes straight to Instagram via instagrapi. The whole thing runs on a schedule with no manual steps and no paid publishing APIs. Image generation falls back through Imagen 3 → Pollinations → Pillow, and a custom slide compositor handles the topographic texture and gradient typography. Four external APIs are wired in with retry logic and structured CSV logging.",
    viewportLabel: "Pipeline diagram",
    accentColor: "cyan" as const,
    link: "https://github.com/devendrasaim/AI-Social-Media-Generator",
    liveLink: "https://www.instagram.com/myaiguru9/",
    flowchart: "social" as const,
  },
  {
    moduleId: "ui-navigator",
    category: "ai" as CategoryKey,
    title: "UI NAVIGATOR AGENT",
    tags: ["Python", "Gemini 1.5 Flash", "Playwright", "SpeechRecognition", "Pillow"],
    description:
      "Web navigation agent that takes voice or text commands and works through any website on its own, using AI vision and browser automation. Set-of-Mark element tagging lets Gemini visually parse and click UI elements, so no site-specific scripting is required and it works on any site. Voice input is supported throughout.",
    viewportLabel: "Browser automation",
    accentColor: "cyan" as const,
    link: "https://github.com/devendrasaim/ui-navigator-agent",
  },
  {
    moduleId: "hobby-hive",
    category: "web" as CategoryKey,
    title: "HOBBY HIVE",
    tags: ["React", "Supabase", "Real-Time Systems"],
    description:
      "A 'Time Capsule' feature built on Supabase, which pushes video updates instantly and gave me a way to test how the real-time data scaled. The TypeScript dashboards update as data comes in and make complex hobby progress readable at a glance.",
    viewportLabel: "Live demo",
    accentColor: "cyan" as const,
    link: "https://hobby-hive-lovat.vercel.app/",
    video: "/videos/hobby-hive.mp4",
    poster: "/images/posters/hobby-hive.webp",
  },
  {
    moduleId: "bounce-streak",
    category: "game" as CategoryKey,
    title: "BOUNCE STREAK (HACKATHON)",
    tags: ["Reddit Devvit", "Hackathon Project", "Phaser", "TypeScript"],
    description:
      "A 2D arcade physics engine tuned to run fast in mobile browsers. 'Cushion' collision detection keeps it smooth at 60 FPS. The daily challenge is deterministic: seeded randomization gives thousands of concurrent players identical physics conditions.",
    viewportLabel: "Gameplay",
    accentColor: "cyan" as const,
    link: "https://www.reddit.com/r/bounce_streak_dev/comments/1r1adpg/bouncestreak/",
    video: "/videos/gameplay.mp4",
    poster: "/images/posters/gameplay.webp",
  },
  {
    moduleId: "federated-fairness",
    category: "security" as CategoryKey,
    title: "FEDERATED FAIRNESS VERIFICATION",
    tags: ["NuSMV", "CTL", "Formal Verification", "Python"],
    description:
      "Formal verification of fairness properties in a 3-client federated learning protocol. Models the FL workflow as a finite-state machine in NuSMV, encodes CTL properties for liveness, safety, and fairness, then automatically verifies no client is starved and no deadlocks occur across bounded aggregation rounds.",
    viewportLabel: "Verification model",
    accentColor: "cyan" as const,
    link: "https://github.com/devendrasaim/federated-fairness-verification",
  },
];

/* The header sprite is right-aligned to the container, and the first category
   rule runs underneath it. These two must stay in step: RULE_INSET is the
   sprite width plus a gap, so the rule stops short of the artwork instead of
   slicing through it. */
const SPRITE_WIDTH = "w-64 lg:w-[22rem] xl:w-[29rem]";
const RULE_INSET = "md:pr-[17.5rem] lg:pr-[23.75rem] xl:pr-[31rem]";

export function ProjectsSection() {
  return (
    <Section id="projects" width="wide">
        {/* Sprite for the header band. The wrapper is zero-height so this adds
            no layout: it hangs up into the section padding beside the title,
            and the first category rule stops short of it. */}
        <div className="relative h-0">
          <PixelCompanion
            src="/videos/projects-pixel-loop.mp4"
            width={476}
            height={288}
            className={`absolute right-0 -top-16 hidden md:block lg:-top-20 xl:-top-24 ${SPRITE_WIDTH}`}
          />
        </div>

        <SectionHeading title="Projects" />

        {/* Grouped modules */}
        <div className="space-y-28 md:space-y-36">
          {CATEGORIES.map(({ key, label }, categoryIndex) => {
            const catProjects = projects.filter((p) => p.category === key);
            if (!catProjects.length) return null;
            return (
              <div key={key} className="space-y-16 md:space-y-20">
                {/* Category divider */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`flex items-center gap-5 ${categoryIndex === 0 ? RULE_INSET : ""}`}
                >
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-muted-foreground">
                    {label}
                  </span>
                  <div className="h-px flex-1 bg-border" />
                </motion.div>

                {/* Projects under this category */}
                <div className="space-y-24 md:space-y-32">
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
    </Section>
  );
}
