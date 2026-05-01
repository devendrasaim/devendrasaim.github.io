"use client";

import { motion } from "framer-motion";

const skillCategories = [
  {
    id: "LANG",
    name: "Languages",
    items: ["Python", "C++", "TypeScript", "JavaScript", "SQL", "Linux/Bash"],
    accent: "cyan" as const,
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
    accent: "rose" as const,
    fullWidth: false,
  },
  {
    id: "WEB",
    name: "Web & Full Stack",
    items: ["React", "Next.js", "Node.js", "Flask", "Tailwind CSS", "Vite", "Phaser 3", "Framer Motion", "Shadcn UI"],
    accent: "amber" as const,
    fullWidth: false,
  },
  {
    id: "OPS",
    name: "Cloud & DevOps",
    items: ["AWS (EC2, S3, IAM)", "GitHub Actions", "CI/CD", "Docker", "Slurm (HPC)", "Intel SGX", "Firebase", "Vercel", "Windows Task Scheduler"],
    accent: "green" as const,
    fullWidth: false,
  },
  {
    id: "DB",
    name: "Databases & Storage",
    items: ["PostgreSQL", "Supabase", "MySQL", "Redis", "pgvector", "Vector Databases", "Embeddings"],
    accent: "cyan" as const,
    fullWidth: false,
  },
  {
    id: "API",
    name: "APIs & Services",
    items: ["Apify", "Notion API", "Gmail IMAP", "Firebase Firestore", "Resend", "instagrapi", "Discord Webhook", "Reddit Devvit SDK"],
    accent: "amber" as const,
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
    accent: "rose" as const,
    fullWidth: true,
  },
];

const accentMap = {
  cyan:  { border: "border-cyan/20",  bg: "bg-cyan/5",  text: "text-cyan"  },
  amber: { border: "border-amber/20", bg: "bg-amber/5", text: "text-amber" },
  rose:  { border: "border-rose/20",  bg: "bg-rose/5",  text: "text-rose"  },
  green: { border: "border-green/20", bg: "bg-green/5", text: "text-green" },
};

export function SkillsSection() {
  return (
    <section id="skills" className="relative px-6 py-24">
      <div className="max-w-6xl mx-auto">
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
              {"// SYSTEM CAPABILITIES"}
            </span>
          </div>
          <h2 className="font-mono text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            Technical Skills
          </h2>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
                <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className={`border ${accentMap[category.accent].border} bg-background/50 p-5 md:p-8 relative overflow-hidden group ${category.fullWidth ? "md:col-span-2" : ""}`}
                >
                    {/* Background tint on hover */}
                     <div className={`absolute inset-0 ${accentMap[category.accent].bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-mono text-xl font-bold text-foreground">{category.name}</h3>
                             <span className={`font-mono text-xs tracking-widest uppercase opacity-60 ${accentMap[category.accent].text}`}>
                                {category.id}_MODULE
                             </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {category.items.map((item) => (
                                <span
                                    key={item}
                                    className="px-3 py-1.5 border border-border/60 bg-background/50 text-muted-foreground font-mono text-sm tracking-wide"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
