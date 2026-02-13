"use client";

import { motion } from "framer-motion";
import { ProjectModule } from "@/components/project-module";

const projects = [
  {
    moduleId: "MODULE_A",
    title: "SECURE_ENCLAVE_PROTOCOLS",
    tags: ["Intel SGX", "PyTorch", "C++"],
    description:
      "Proved the integrity of sensitive training loops in untrusted environments. By leveraging Intel SGX enclaves, this architecture isolates computation from OS-level vulnerabilities, ensuring privacy was maintained even during simulated system compromise scenarios.",
    viewportLabel: "ENCRYPTED_TERMINAL_OUTPUT",
    accentColor: "amber" as const,
    pdfUrl: "/docs/secure-deep-learning-sgx.pdf",
  },
  {
    moduleId: "MODULE_B",
    title: "ACTIVATION_STEERING_APR",
    tags: ["PyTorch", "CodeLLM", "Activation Steering"],
    description:
      "A training-free method for enhancing CodeLLM reliability in Automatic Program Repair. Computes a correctness vector from contrastive buggy/fixed code pairs and injects it into the model's residual stream during inference. Eliminated invalid code generation entirely and boosted CodeLlama-7B accuracy from 48% to 56%.",
    viewportLabel: "RESIDUAL_STREAM_MONITOR",
    accentColor: "cyan" as const,
    link: "https://github.com/devendrasaim/automatic-program-repair-steering",
    pdfUrl: "/docs/activation-steering-apr.pdf",
  },
  {
    moduleId: "MODULE_C",
    title: "HOBBY_HIVE_GRID",
    tags: ["React", "Supabase", "Real-Time Systems"],
    description:
      "Validated real-time data scalability by architecting a 'Time Capsule' feature with Supabase, ensuring instant video updates. Established a seamless user experience strategy by engineering dynamic dashboards in TypeScript to visualize complex hobby progress data intuitively.",
    viewportLabel: "DATA_VISUALIZATION_DASHBOARD",
    accentColor: "green" as const,
    link: "https://hobby-hive-lovat.vercel.app/",
    image: "/images/hobby-hive.gif",
  },
  {
    moduleId: "MODULE_D",
    title: "BOUNCE_STREAK_ENGINE",
    tags: ["Reddit Devvit", "Phaser", "TypeScript"],
    description:
      "Engineered a high-performance 2D arcade physics engine optimized for mobile browsers. Implemented 'cushion' collision detection to deliver a smooth 60 FPS experience. Architected a deterministic daily challenge system using seeded randomization, ensuring identical physics conditions for thousands of concurrent users.",
    viewportLabel: "PHYSICS_SIMULATION_VIEWPORT",
    accentColor: "amber" as const,
    link: "https://www.reddit.com/r/bounce_streak_dev/comments/1r1adpg/bouncestreak/",
    image: "/images/gameplay.gif",
  },
  {
    moduleId: "MODULE_E",
    title: "FEDERATED_FAIRNESS_VERIFICATION",
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
            <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
              {"// SYSTEM MODULES"}
            </span>
          </div>
          <h2 className="font-mono text-xl md:text-2xl font-bold text-foreground tracking-tight">
            Project Architecture
          </h2>
        </motion.div>

        {/* Modules */}
        <div className="space-y-32">
          {projects.map((project, index) => (
            <ProjectModule
              key={project.moduleId}
              {...project}
              reversed={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
