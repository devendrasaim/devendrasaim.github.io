"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

const facts = [
  { label: "Now", value: "Software Engineer at VelocitiPM" },
  { label: "Study", value: "MS Computer Science, Iowa State" },
  { label: "Location", value: "West New York, NJ. Open to relocate." },
];

const links = [
  { label: "Email", value: "mdevendrasai9@gmail.com", href: "mailto:mdevendrasai9@gmail.com", Icon: Mail },
  { label: "GitHub", value: "github.com/devendrasaim", href: "https://github.com/devendrasaim", Icon: Github },
  { label: "LinkedIn", value: "in/devendrasaim", href: "https://www.linkedin.com/in/devendrasaim/", Icon: Linkedin },
];

export function SystemFooter() {
  const reduce = useReducedMotion();

  return (
    <footer className="relative border-t border-border px-6 py-16 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1fr)_auto] md:gap-20"
        >
          <dl className="space-y-4">
            {facts.map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-1 sm:flex-row sm:gap-6">
                <dt className="w-20 shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                  {label}
                </dt>
                <dd className="font-mono text-sm text-muted-foreground">{value}</dd>
              </div>
            ))}
          </dl>

          <ul className="space-y-4">
            {links.map(({ label, value, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group inline-flex items-center gap-3"
                >
                  <Icon className="h-4 w-4 text-faint transition-colors group-hover:text-cyan" />
                  <span className="font-mono text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                    {value}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-border pt-8 sm:flex-row sm:items-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
            Devendra Sai Mupparaju
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
            Updated February 2026
          </span>
        </div>
      </div>
    </footer>
  );
}
