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
            <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
              {"// IDENTITY VERIFICATION"}
            </span>
          </div>
          <h2 className="font-mono text-xl md:text-2xl font-bold text-foreground tracking-tight">
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
                 <h4 className="font-mono text-xs font-bold text-primary mb-2 uppercase tracking-wider">
                   // TL;DR
                 </h4>
                 <p className="font-mono text-xs md:text-sm text-muted-foreground leading-relaxed">
                   MSCS Grad '25 @ Iowa State. Full Stack Engineer & AI Enthusiast. Built scalable games for 3k+ users & optimized AI security with Intel SGX. Seeking backend/AI roles.
                 </p>
               </div>


               <p className="font-sans text-base md:text-lg leading-relaxed text-muted-foreground mb-8">
                 I am <span className="text-foreground font-semibold">Devendra Sai Mupparaju</span>, a recent Master of Science in Computer Science graduate from Iowa State University (December 2025). I am actively seeking full-time opportunities in software engineering, backend architecture, and AI/ML development.
               </p>

               <div className="space-y-6">
                 <div>
                   <h3 className="font-mono text-sm font-bold text-foreground mb-2 uppercase tracking-wider text-cyan">
                     Full Stack Engineering & AI Innovation
                   </h3>
                   <p className="font-sans text-sm md:text-base leading-relaxed text-muted-foreground">
                     Expertise in architecting scalable web and gaming solutions, such as a Reddit Devvit community game that supports 3,000+ concurrent users while maintaining a consistent 60 FPS on mobile browsers.
                     <br className="mb-2" />
                     Strong foundation in AI model optimization, implementing "Activation Steering" in PyTorch to reduce code-fix generation error rates by 15% without full retraining.
                     <br className="mb-2" />
                     Developed dynamic, user-centric applications like the "Hop-bee" social platform, utilizing React and Supabase to facilitate real-time engagement and secure data handling.
                     <br className="mb-2" />
                     Experienced in game physics engineering, specifically designing deterministic daily challenge systems and optimizing collision detection algorithms using Phaser and TypeScript.
                   </p>
                 </div>

                 <div>
                   <h3 className="font-mono text-sm font-bold text-foreground mb-2 uppercase tracking-wider text-amber">
                     Cloud Automation & System Security
                   </h3>
                   <p className="font-sans text-sm md:text-base leading-relaxed text-muted-foreground">
                     Proficient in a diverse tech stack including Python, C++, TypeScript, SQL, and cloud tools like AWS and Docker.
                     <br className="mb-2" />
                     Experienced in Infrastructure-as-Code (IaC), automating AWS environment setups to reduce manual configuration time by 40% and enforcing granular IAM policies for security.
                     <br className="mb-2" />
                     Expertise in securing AI infrastructure, leveraging Intel SGX enclaves to harden training loops and maintain 100% data privacy during simulated compromise scenarios.
                     <br className="mb-2" />
                     Optimized large-scale computations on Slurm clusters, eliminating bottlenecks to achieve a 20% increase in model repair accuracy during stress tests.
                   </p>
                 </div>
               </div>
               <div className="mt-8 pt-6 border-t border-border/50 flex flex-wrap gap-8">
                  <div>
                    <span className="block font-mono text-[10px] tracking-[0.2em] text-muted-foreground/60 uppercase mb-1">LOCATION</span>
                    <span className="font-mono text-sm text-foreground">Ames, IA</span>
                  </div>
                  <div>
                    <span className="block font-mono text-[10px] tracking-[0.2em] text-muted-foreground/60 uppercase mb-1">STATUS</span>
                    <span className="font-mono text-sm text-green">Online / Open to Work</span>
                  </div>
                   <div>
                    <span className="block font-mono text-[10px] tracking-[0.2em] text-muted-foreground/60 uppercase mb-1">EXPERIENCE</span>
                    <span className="font-mono text-sm text-foreground">2+ Years</span>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
