"use client";

import { motion } from "framer-motion";
import { Section, SectionHeading } from "@/components/section";
import { SlideChips } from "@/components/slide-chips";
import { GlowBullet } from "@/components/glow-bullet";
import { useScrollFocus } from "@/components/use-scroll-focus";

interface WorkEntry {
  role: string;
  company: string;
  type: string;
  period: string;
  summary: string;
  description: string[];
  tags: string[];
}

/* Mirrors work_experience in lib/DevendraSaiProfile.json, newest first. */
const workData: WorkEntry[] = [
  {
    role: "Founding Software and AI Engineer",
    company: "VelocitiPM",
    type: "Full-time · Remote",
    period: "May 2026 - Present",
    summary:
      "Product planning and sprint management platform. I build the React and TypeScript front end and the Python AI service behind its ticket generation.",
    description: [
      "Built the sprint planning board in React and TypeScript, with drag-and-drop between sprints and backlog, completion views, and bulk edits across tasks.",
      "Built the Velo AI interface that drafts tickets and user stories, with a review step so users can edit every draft before it is saved.",
      "Fed product design context into the Python AI service and standardized how that context is prepared across model providers, so generated tickets line up with the actual design.",
      "Rebuilt sign-up, login, and onboarding, including a product tour that saves its progress to the backend so a returning user picks up where they left off.",
      "Automated status changes so a finished prototype job or a new ticket advances its initiative and the linked strategy theme, which keeps the roadmap current without manual updates.",
      "Turned detailed Figma mockups into production screens, including searchable, filterable side panels for linking related work items.",
      "Wrote automated tests with each feature change to catch regressions, and used Claude to plan, implement, and review code.",
    ],
    tags: ["React", "TypeScript", "Python", "FastAPI", "LangGraph", "Supabase", "PostgreSQL", "Tailwind CSS", "Figma", "Claude", "Docker Compose"],
  },
  {
    role: "AI Implementation Engineer (Co-op)",
    company: "ServiceNow",
    type: "",
    period: "May 2024 - Apr 2025",
    summary:
      "Generative AI for IT service desks on the ServiceNow platform: incident summaries, resolution notes, and knowledge articles that agents review before use.",
    description: [
      "Configured Now Assist to summarize incidents and draft resolution notes and knowledge articles, reducing manual write-up work for service desk agents.",
      "Built Flow Designer actions and JavaScript scripts that gathered incident details, called the AI service, and routed drafts to agents for review.",
      "Worked on the Vertex AI integration through the Generative AI Controller, tuning prompts and input fields to make responses clearer and more consistent.",
      "Wrote Python validation scripts and API tests that flagged missing inputs and checked AI output against the source incident record.",
      "Set up role-based access and knowledge article approval workflows, fixed defects found in user acceptance testing, and documented the deployment process.",
    ],
    tags: ["Now Assist", "Generative AI Controller", "Vertex AI", "Flow Designer", "JavaScript", "Python", "API Testing", "Prompt Engineering", "Knowledge Management", "RBAC"],
  },
  {
    role: "AI and Software Engineer",
    company: "Cognizant",
    type: "",
    period: "Feb 2022 - Jul 2023",
    summary:
      "Data pipelines and preprocessing for enterprise analytics and machine learning work.",
    description: [
      "Built reusable Python and SQL pipelines that turned raw enterprise data into structured datasets for analytics and machine learning.",
      "Cleaned and prepared data with Pandas and NumPy, handling missing values, removing duplicates, and building features for model evaluation.",
      "Added automated validation checks that caught inconsistent and anomalous records before they reached downstream systems.",
      "Built document extraction workflows that converted unstructured enterprise content into usable inputs for analysis.",
    ],
    tags: ["Python", "SQL", "Pandas", "NumPy", "Data Pipelines", "Data Validation", "Feature Engineering", "Document Extraction"],
  },
];

export function WorkExperienceSection() {
  return (
    <Section id="work" width="default">
        <SectionHeading title="Work Experience" />

        {/* Timeline/List */}
        <div className="space-y-14 md:space-y-20">
            {workData.map((exp, index) => (
                <WorkItem key={exp.company} exp={exp} index={index} />
            ))}
        </div>
    </Section>
  );
}

/* One role on the timeline. The role title and marker stay neon while any part
   of the role is at the middle of the screen; each bullet lights on its own. */
function WorkItem({ exp, index }: { exp: WorkEntry; index: number }) {
  const [ref, inFocus] = useScrollFocus<HTMLDivElement>();

  return (
    <motion.div
        ref={ref}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="relative border-l border-border pl-7 md:pl-10"
    >
        {/* Heading block is its own glow scope, so the role's focus lights the
            title without also lighting every bullet underneath it. */}
        <div data-focus={inFocus} className="glow-scope">
            {/* Marker on the timeline rule */}
            <div className="glow-mark absolute left-[-3px] top-2 h-1.5 w-1.5 bg-cyan" aria-hidden="true" />

            <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                <h3 className="glow-neon max-w-2xl font-mono text-lg font-bold leading-snug text-foreground md:text-xl">{exp.role}</h3>
                <span className="shrink-0 font-mono text-xs tabular-nums text-faint">{exp.period}</span>
            </div>
        </div>

        <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-mono text-sm text-cyan">{exp.company}</span>
            {exp.type && <span className="font-mono text-sm text-faint">{exp.type}</span>}
        </div>

        <p className="mb-6 max-w-[68ch] font-sans text-[15px] italic leading-relaxed text-faint">
            {exp.summary}
        </p>

        <ul className="mb-6 max-w-[68ch] space-y-3 font-sans text-[15px] leading-relaxed text-muted-foreground">
            {exp.description.map((bullet) => (
                <GlowBullet key={bullet}>{bullet}</GlowBullet>
            ))}
        </ul>

        {exp.tags.length > 0 && (
            <SlideChips items={exp.tags} />
        )}
    </motion.div>
  );
}