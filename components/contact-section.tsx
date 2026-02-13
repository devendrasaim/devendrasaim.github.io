"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, ArrowRight } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="relative px-6 py-32 border-t border-border/50">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
             <div className="flex items-center justify-center gap-4 mb-8">
                 <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                  {"// TRANSMISSION ENDPOINT"}
                </span>
             </div>

            <h2 className="font-mono text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-8">
                Ready to Collaborate?
            </h2>

            <p className="font-sans text-lg text-muted-foreground leading-relaxed mb-12 max-w-xl mx-auto">
                I am currently open to new opportunities and collaborations. 
                Whether you have a question or just want to explore a potential project, 
                initialize a connection below.
            </p>

            <a
              href="mailto:mdevendrasai9@gmail.com"
              className="group relative inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 font-mono text-sm tracking-widest uppercase hover:bg-foreground/90 transition-colors"
            >
              <span>Initialize Connection</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>

            {/* Social Links */}
             <div className="mt-16 flex justify-center gap-8">
                <a href="https://github.com/devendrasaim" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
                    <div className="p-3 border border-border rounded-full group-hover:border-foreground transition-colors">
                        <Github className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                    </div>
                    <span className="font-mono text-[10px] tracking-wider text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">GITHUB</span>
                </a>
                 <a href="https://www.linkedin.com/in/devendrasaim/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
                    <div className="p-3 border border-border rounded-full group-hover:border-foreground transition-colors">
                        <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                    </div>
                    <span className="font-mono text-[10px] tracking-wider text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">LINKEDIN</span>
                </a>
                 <a href="mailto:mdevendrasai9@gmail.com" className="flex flex-col items-center gap-2 group">
                    <div className="p-3 border border-border rounded-full group-hover:border-foreground transition-colors">
                        <Mail className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                    </div>
                    <span className="font-mono text-[10px] tracking-wider text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">EMAIL</span>
                </a>
             </div>
        </motion.div>
      </div>
    </section>
  );
}
