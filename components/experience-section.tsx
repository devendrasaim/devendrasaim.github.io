"use client";

import { motion } from "framer-motion";

const experienceData = [
  {
    role: "Graduate Research Assistant — Activation Steering for Automatic Program Repair",
    company: "Iowa State University",
    advisor: "Advisor: Prof. Simanta Mitra",
    period: "Aug 2025 - Dec 2025",
    description: [
      "Designed and implemented a training-free activation steering method in PyTorch to improve CodeLLM reliability for automatic bug-fixing tasks.",
      "Computed a correctness vector from contrastive buggy/fixed code pairs and injected it into the model's residual stream during inference using PyTorch forward hooks.",
      "Boosted CodeLlama-7B repair accuracy from 48.12% to 56.25% (+8.13pp) and eliminated invalid code generation entirely (4.38% → 0.00%).",
      "Improved Qwen2.5-Coder-7B accuracy from 63.12% to 70.00% (+6.88pp) on HumanEval benchmarks.",
      "Achieved +4.43pp accuracy gain on Qwen2.5-Coder-14B across 565 real-world Java bugs in the Defects4J dataset.",
      "Ran 40+ experimental configurations across a layer-strength hyperparameter grid on HPC Slurm clusters.",
      "Novel finding: middle transformer layers are optimal for code generation tasks; late layers are optimal for repair — revealing task-dependent reasoning stages in CodeLLM architecture.",
    ],
    tags: ["Python", "PyTorch", "CodeLlama-7B", "Qwen2.5-Coder", "HumanEval", "Defects4J", "Slurm", "Activation Steering"],
  },
  {
    role: "Graduate Research Assistant — Secure Deep Learning & Federated Learning Fairness",
    company: "Iowa State University",
    advisor: "Department of Computer Science",
    period: "Jan 2025 - May 2025",
    description: [
      "Engineered deep learning training loops inside Intel SGX hardware enclaves using C++ and the Darknet framework, isolating computation from OS-level vulnerabilities.",
      "Implemented AES-GCM encrypted model weight export/import, maintaining 100% data privacy even during simulated system compromise scenarios.",
      "Achieved ~50% training overhead (27.43s vs 41.07s) deemed acceptable for privacy-critical production workloads.",
      "Formally verified fairness properties of a 3-client federated learning protocol using NuSMV model checker and CTL temporal logic.",
      "Encoded and verified liveness, safety, starvation-freedom, deadlock-freedom, and bounded round completion properties across all aggregation rounds.",
    ],
    tags: ["C/C++", "Intel SGX SDK", "Darknet", "NuSMV", "CTL Logic", "Python", "Bash", "Federated Learning"],
  },
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
              {"// RESEARCH TIMELINE"}
            </span>
          </div>
          <h2 className="font-mono text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            Research Experience
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
                        <h3 className="font-mono text-base font-bold text-foreground leading-snug max-w-xl">{exp.role}</h3>
                        <span className="font-mono text-sm text-cyan shrink-0">{exp.period}</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
                        <span className="text-base text-foreground/90">{exp.company}</span>
                        <span className="text-sm text-muted-foreground font-mono">| {exp.advisor}</span>
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
