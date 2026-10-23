"use client";

import { motion } from "framer-motion";
import { Section, SectionHeading } from "@/components/section";
import { ResearchViewport } from "@/components/research-viewport";
import { SlideChips } from "@/components/slide-chips";
import { useScrollFocus } from "@/components/use-scroll-focus";
import { GlowBullet } from "@/components/glow-bullet";

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
      "Applied activation steering in PyTorch to improve code generation and bug repair in CodeLlama and Qwen models without changing model weights.",
      "Computed a correctness vector from contrastive buggy/fixed code pairs and injected it into the model's residual stream during inference using PyTorch forward hooks.",
      "Raised CodeLlama-7B's HumanEval accuracy from 48.12% to 56.25% (+8.13pp) and cut its invalid outputs from 4.38% to zero.",
      "Improved Qwen2.5-Coder-7B's HumanEval accuracy from 63.12% to 70.00% (+6.88pp).",
      "Improved Qwen2.5-Coder-14B repair accuracy on Defects4J, a set of 565 real-world Java bugs, from 60.88% to 65.31%.",
      "Ran 40+ layer and steering-strength configurations on a Slurm HPC cluster.",
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
                <ResearchItem key={exp.role} exp={exp} index={index} />
            ))}
        </div>
    </Section>
  );
}

/* One research role. Same treatment as the work timeline: the title stays
   neon while any part of the role is at the middle of the screen, and each
   bullet lights on its own. */
function ResearchItem({ exp, index }: { exp: ExperienceEntry; index: number }) {
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
        <div data-focus={inFocus} className="glow-scope">
            {/* Marker on the timeline rule */}
            <div className="glow-mark absolute left-[-3px] top-2 h-1.5 w-1.5 bg-cyan" aria-hidden="true" />

            <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                <h3 className="glow-neon max-w-2xl font-mono text-lg font-bold leading-snug text-foreground md:text-xl">{exp.role}</h3>
                <span className="shrink-0 font-mono text-xs tabular-nums text-faint">{exp.period}</span>
            </div>
        </div>

        <div className="mb-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-mono text-sm text-cyan">{exp.company}</span>
            <span className="font-mono text-sm text-faint">{exp.advisor}</span>
        </div>

        <ul className="mb-6 max-w-[68ch] space-y-3 font-sans text-[15px] leading-relaxed text-muted-foreground">
            {exp.description.map((bullet) => (
               <GlowBullet key={bullet}>{bullet}</GlowBullet>
            ))}
        </ul>

        {exp.tags.length > 0 && (
            <SlideChips items={exp.tags} />
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
  );
}
