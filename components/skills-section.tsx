"use client";

import { motion } from "framer-motion";

const skillCategories = [
  {
    id: "LANG",
    name: "Languages",
    items: ["Python", "C++", "TypeScript", "JavaScript", "Linux/Bash", "SQL"],
    accent: "cyan" as const,
  },
  {
    id: "OPS",
    name: "Cloud & Ops",
    items: ["AWS (EC2, S3, IAM)", "Git", "CI/CD", "Intel SGX", "Docker", "Slurm"],
    accent: "green" as const,
  },
  {
    id: "AI",
    name: "Machine Learning",
    items: ["PyTorch", "TensorFlow", "Scikit-learn", "Pandas", "NumPy", "Google Gemini API", "NLP"],
    accent: "rose" as const,
  },
  {
    id: "DB",
    name: "Databases",
    items: ["PostgreSQL", "Supabase", "Redis", "MySQL"],
    accent: "amber" as const,
  },
  {
    id: "WEB",
    name: "Web & Tools",
    items: ["React", "Node.js", "Phaser", "Flask", "Tailwind CSS", "Vite", "Power BI"],
    accent: "cyan" as const,
  },
  {
    id: "CORE",
    name: "Key Concepts",
    items: ["RESTful APIs", "Distributed Systems", "Data Structures", "System Security", "Agile"],
    accent: "amber" as const,
  },
];

const accentMap = {
    cyan: "border-cyan/20 bg-cyan/5 text-cyan",
    amber: "border-amber/20 bg-amber/5 text-amber",
    rose: "border-rose/20 bg-rose/5 text-rose",
    green: "border-green/20 bg-green/5 text-green",
}

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
            <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
              {"// SYSTEM CAPABILITIES"}
            </span>
          </div>
          <h2 className="font-mono text-xl md:text-2xl font-bold text-foreground tracking-tight">
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
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`border ${accentMap[category.accent].split(" ")[0]} bg-background/50 p-5 md:p-8 relative overflow-hidden group`}
                >
                    {/* Background tint on hover */}
                     <div className={`absolute inset-0 ${accentMap[category.accent].split(" ")[1]} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-mono text-lg font-bold text-foreground">{category.name}</h3>
                             <span className={`font-mono text-[10px] tracking-widest uppercase opacity-60 ${accentMap[category.accent].split(" ")[2]}`}>
                                {category.id}_MODULE
                             </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                            {category.items.map((item) => (
                                <span 
                                    key={item} 
                                    className="px-3 py-1.5 border border-border/60 bg-background/50 text-muted-foreground font-mono text-xs tracking-wide"
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
