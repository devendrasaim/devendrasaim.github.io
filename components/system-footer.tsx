"use client";

import { motion } from "framer-motion";
import { Github, Mail, Shield, Cpu, MapPin } from "lucide-react";

export function SystemFooter() {
  return (
    <footer id="contact" className="relative border-t border-border px-6 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
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
              {"// SYSTEM STATUS"}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {/* Status indicators */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Cpu className="h-3.5 w-3.5 text-green" />
              <span className="font-mono text-xs tracking-wider text-muted-foreground">
                System:{" "}
                <span className="text-green">Online</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-3.5 w-3.5 text-cyan" />
              <span className="font-mono text-xs tracking-wider text-muted-foreground">
                Location:{" "}
                <span className="text-foreground">Open to Relocate</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-3.5 w-3.5 text-amber" />
              <span className="font-mono text-xs tracking-wider text-muted-foreground">
                Encryption:{" "}
                <span className="text-amber">Verified</span>
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <a
              href="https://github.com/devendrasaim"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <Github className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="font-mono text-xs tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
                github.com/devendrasaim
              </span>
            </a>
            <a
              href="mailto:mdevendrasai9@gmail.com"
              className="flex items-center gap-3 group"
            >
              <Mail className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="font-mono text-xs tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
                mdevendrasai9@gmail.com
              </span>
            </a>
          </div>

          {/* Debug log style */}
          <div className="border border-border p-4">
            <div className="space-y-1.5">
              <p className="font-mono text-[10px] text-muted-foreground/50">
                {"[LOG] Session initialized"}
              </p>
              <p className="font-mono text-[10px] text-muted-foreground/50">
                {"[LOG] Modules loaded: 3/3"}
              </p>
              <p className="font-mono text-[10px] text-muted-foreground/50">
                {"[LOG] Encryption handshake: OK"}
              </p>
              <p className="font-mono text-[10px] text-green/60">
                {"[STATUS] All systems operational"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/40 uppercase">
            {"DEVENDRA SAI MUPPARAJU // SYSTEM INTERFACE v1.0"}
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/40 uppercase">
            {"BUILD: 2026.02.11 // STATUS: STABLE"}
          </span>
        </div>
      </div>
    </footer>
  );
}
