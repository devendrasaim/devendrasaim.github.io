"use client";

import { motion } from "framer-motion";

const experienceData = [
  {
    role: "Software Engineer",
    company: "Optum (UnitedHealth Group)",
    period: "Apr 2022 - Jun 2023",
    description: [
      "Built and maintained scalable backend systems and microservices using Java Spring Boot.",
      "Integrated Kafka-based event-driven architectures to support business-critical workflows.",
      "Designed and implemented CI/CD pipelines using Jenkins, GitHub Actions, JFrog, and Docker for smooth deployments.",
      "Configured cloud infrastructure on Azure Kubernetes Service (AKS) and integrated Azure Blob Storage.",
      "Enforced code quality standards using SonarQube and implemented best practices in testing, monitoring, and performance optimization.",
      "Developed 'NeuroShield', an award-winning internal AI security project protecting AI systems from prompt injection and adversarial attacks.",
      "Delivered core service features independently and drove team momentum in the absence of senior developers."
    ],
    tags: ["Java Spring Boot", "Kafka", "Microservices", "Jenkins", "Docker", "Azure AKS", "Azure Blob Storage", "SonarQube", "Prompt Engineering"],
  }
];

export function ExperienceSection() {
  return (
    <section id="experience" className="relative px-6 py-24 border-t border-border/50">
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
              {"// CAREER TIMELINE"}
            </span>
          </div>
          <h2 className="font-mono text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            Experience
          </h2>
        </motion.div>

        {/* Timeline/List */}
        <div className="space-y-12">
            {experienceData.map((exp, index) => (
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
                        <h3 className="font-mono text-xl font-bold text-foreground">{exp.role}</h3>
                        <span className="font-mono text-sm text-cyan">{exp.period}</span>
                    </div>
                    
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-4">
                        <span className="text-lg text-foreground/90">{exp.company}</span>
                    </div>

                    <ul className="list-none space-y-2 mb-6 font-sans text-base text-muted-foreground leading-relaxed max-w-2xl">
                        {exp.description.map((bullet, i) => (
                           <li key={i} className="flex items-start gap-2">
                             <span className="text-cyan/70 mt-1 font-mono text-sm">{">"}</span>
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
