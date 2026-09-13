"use client";

import { motion } from "framer-motion";
import { Section, SectionHeading } from "@/components/section";
import { ResearchViewport } from "@/components/research-viewport";

type AccentColor = "amber" | "cyan" | "green" | "rose";

interface ExperienceEntry {
  role: string;
  company: string;
  advisor: string;
  period: string;
  description: string[];
  tags: string[];
  viewport?: {
    viewportLabel: string;
    accentColor: AccentColor;
    pdfUrl: string;
    link?: string;
  };
}

const experienceData: ExperienceEntry[] = [
  {
    role: "Graduate Research Assistant: Activation Steering for Automatic Program Repair",
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
      "Novel finding: middle transformer layers are optimal for code generation tasks, while late layers are optimal for repair. That points to task-dependent reasoning stages in CodeLLM architecture.",
    ],
    tags: ["Python", "PyTorch", "CodeLlama-7B", "Qwen2.5-Coder", "HumanEval", "Defects4J", "Slurm", "Activation Steering"],
    viewport: {
      viewportLabel: "Report preview",
      accentColor: "cyan",
      pdfUrl: "/docs/activation-steering-apr.pdf",
      link: "https://github.com/devendrasaim/automatic-program-repair-steering",
    },
  },
  {
    role: "Graduate Research Assistant: Secure Deep Learning & Federated Learning Fairness",
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
    viewport: {
      viewportLabel: "Report preview",
      accentColor: "cyan",
      pdfUrl: "/docs/secure-deep-learning-sgx.pdf",
    },
  },
];

export function ExperienceSection() {
  return (
    <Section id="research" width="default">
        <SectionHeading title="Research Experience" />

        {/* Timeline/List */}
        <div className="space-y-14 md:space-y-20">
            {experienceData.map((exp, index) => (
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
                        <span className="font-mono text-sm text-faint">{exp.advisor}</span>
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

                    {exp.viewport && (
                        <div className="mt-6">
                            <ResearchViewport
                                viewportLabel={exp.viewport.viewportLabel}
                                accentColor={exp.viewport.accentColor}
                                pdfUrl={exp.viewport.pdfUrl}
                                link={exp.viewport.link}
                                title={exp.role}
                            />
                        </div>
                    )}
                </motion.div>
            ))}
        </div>
    </Section>
  );
}
