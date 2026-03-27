"use client";

import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section id="about" className="relative px-6 py-24 border-t border-border/50">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
             <div className="h-px flex-1 max-w-[60px] bg-muted-foreground/20" />
            <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">
              {"// IDENTITY VERIFICATION"}
            </span>
          </div>
          <h2 className="font-mono text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            About Me
          </h2>
        </motion.div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
           {/* Terminal-style Bio */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-12 space-y-6"
          >
            <div className="relative border border-border bg-background/50 p-6 md:p-8">
               {/* Decorative corners */}
               <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-foreground/50" />
               <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-foreground/50" />
               <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-foreground/50" />

               <div className="mb-8 p-4 border-l-2 border-primary bg-primary/5">
                  <h4 className="font-mono text-sm font-bold text-primary mb-2 uppercase tracking-wider">
                   // TL;DR
                 </h4>
                  <p className="font-mono text-sm md:text-base text-muted-foreground leading-relaxed">
                   MSCS Grad '25 @ Iowa State. Full Stack Engineer & AI Researcher. Ship production apps with Next.js, Supabase & CI/CD. Build autonomous AI content pipelines. Steer LLM internals with PyTorch. Seeking SWE / Full Stack / AI roles.
                 </p>
               </div>


                <p className="font-sans text-lg md:text-xl leading-relaxed text-muted-foreground mb-8">
                 I am <span className="text-foreground font-semibold">Devendra Sai Mupparaju</span>, a Master of Science in Computer Science graduate from Iowa State University (December 2025). I build full-stack platforms end-to-end, engineer autonomous AI systems, and research ways to make AI models more reliable — from production Next.js deployments and multi-API automation pipelines to training-free LLM steering techniques.
               </p>

               <div className="space-y-6">
                 <div>
                    <h3 className="font-mono text-base font-bold text-foreground mb-2 uppercase tracking-wider text-cyan">
                     Full Stack Engineering
                   </h3>
                   <p className="font-sans text-sm md:text-base leading-relaxed text-muted-foreground">
                     Architected Grocery Square, a production-grade e-commerce platform with Next.js App Router and Supabase/PostgreSQL, deployed via GitHub Actions CI/CD to GitHub Pages with SSG pre-rendering across thousands of product routes.
                     <br className="mb-2" />
                     Built Hobby Hive, a real-time social platform using React and Supabase, featuring instant video updates through a Time Capsule architecture and dynamic TypeScript dashboards for data visualization.
                     <br className="mb-2" />
                     Engineered Bounce Streak during a hackathon — a 2D arcade game on Reddit Devvit serving 3,000+ concurrent users at 60 FPS, with deterministic daily challenges via seeded randomization in Phaser and TypeScript.
                   </p>
                 </div>

                 <div>
                    <h3 className="font-mono text-base font-bold text-foreground mb-2 uppercase tracking-wider text-amber">
                     AI Engineering & Research
                   </h3>
                   <p className="font-sans text-sm md:text-base leading-relaxed text-muted-foreground">
                     Developed a training-free Activation Steering method in PyTorch that injects a correctness vector into CodeLLM residual streams during inference, boosting CodeLlama-7B repair accuracy from 48% to 56% and eliminating invalid code generation entirely.
                     <br className="mb-2" />
                     Secured deep learning training loops inside Intel SGX enclaves, isolating computation from OS-level vulnerabilities and maintaining 100% data privacy during simulated system compromise scenarios.
                     <br className="mb-2" />
                     Formally verified fairness properties of a federated learning protocol using NuSMV and CTL, modeling the 3-client workflow as a finite-state machine to prove no client starvation or deadlocks occur across aggregation rounds.
                   </p>
                 </div>

                 <div>
                    <h3 className="font-mono text-base font-bold text-foreground mb-2 uppercase tracking-wider text-rose">
                     Autonomous AI Systems
                   </h3>
                   <p className="font-sans text-sm md:text-base leading-relaxed text-muted-foreground">
                     Built an end-to-end autonomous content pipeline ("The Social Speaker") that researches trending topics via Perplexity API, generates 3-slide Instagram carousel narratives with Gemini 2.5-Flash, creates 1080×1080 dark-mode visuals using Imagen 3, and auto-publishes to Instagram — all without manual intervention.
                     <br className="mb-2" />
                     Engineered a multi-tier image generation fallback chain (Imagen 3 → Pollinations → Pillow) and integrated 4 external APIs with retry logic and structured CSV logging, scheduled daily via Windows Task Scheduler.
                   </p>
                 </div>
               </div>
               <div className="mt-8 pt-6 border-t border-border/50 flex flex-wrap gap-8">
                  <div>
                    <span className="block font-mono text-xs tracking-[0.2em] text-muted-foreground/60 uppercase mb-1">LOCATION</span>
                    <span className="font-mono text-base text-foreground">Open to Relocate (United States)</span>
                  </div>
                  <div>
                    <span className="block font-mono text-xs tracking-[0.2em] text-muted-foreground/60 uppercase mb-1">STATUS</span>
                    <span className="font-mono text-base text-green">Online / Open to Work</span>
                  </div>
                   <div>
                    <span className="block font-mono text-xs tracking-[0.2em] text-muted-foreground/60 uppercase mb-1">EXPERIENCE</span>
                    <span className="font-mono text-base text-foreground">2+ Years (Full Stack + AI Research)</span>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
