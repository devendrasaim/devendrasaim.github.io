"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* Keyword chips with one shared highlight. Instead of each chip snapping to its
   own colour, a single cyan frame glides from chip to chip under the pointer
   (a Motion shared layout, sprung so it settles rather than stops), and fades
   out when the pointer leaves the row. */

const sizes = {
  /* Skills grid: the chips are the content. */
  md: "bg-background/60 px-3 py-1.5 text-[13px] text-muted-foreground",
  /* Tag rows under a role or project: supporting detail. */
  sm: "px-2.5 py-1 text-[11px] text-faint",
};

interface SlideChipsProps {
  items: string[];
  size?: keyof typeof sizes;
  className?: string;
}

export function SlideChips({ items, size = "sm", className = "" }: SlideChipsProps) {
  const [active, setActive] = useState<string | null>(null);
  const reduce = useReducedMotion();
  // Scopes the shared layout to this row, so a highlight never flies across
  // the page to a chip in another list.
  const layoutId = `chip-highlight-${useId()}`;

  return (
    <ul
      className={`flex flex-wrap gap-2 ${className}`}
      onPointerLeave={() => setActive(null)}
    >
      {items.map((item) => (
        <li
          key={item}
          data-active={active === item}
          onPointerEnter={() => setActive(item)}
          className={`relative border border-border/70 font-mono tracking-wide transition-colors duration-300 ease-out data-[active=true]:text-foreground ${sizes[size]}`}
        >
          <AnimatePresence>
            {active === item && (
              <motion.span
                layoutId={layoutId}
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : {
                        layout: { type: "spring", stiffness: 420, damping: 34, mass: 0.7 },
                        opacity: { duration: 0.25, ease: "easeOut" },
                      }
                }
                className="pointer-events-none absolute -inset-px border border-cyan bg-cyan/[0.08] shadow-[0_0_18px_-6px_hsl(var(--cyan)/0.85)]"
              />
            )}
          </AnimatePresence>
          <span className="relative">{item}</span>
        </li>
      ))}
    </ul>
  );
}
