"use client";

import { chipFeedback } from "@/lib/chip-feedback";

/* Keyword chips. Each chip lights up on its own the moment the pointer is on
   it: cyan frame, faint tint, soft glow, brighter label. No travelling
   highlight and no transition, so it switches on and off instantly. Landing
   on a chip also gives a soft tick (and a short vibration on touch). */

const sizes = {
  /* Skills grid: the chips are the content. */
  md: "bg-background/60 px-3 py-1.5 text-[13px] text-muted-foreground",
  /* Tag rows under a role or project: supporting detail. */
  sm: "px-2.5 py-1 text-[11px] text-faint",
};

const HOVER =
  "hover:border-cyan hover:bg-cyan/[0.08] hover:text-foreground hover:shadow-[0_0_18px_-6px_hsl(var(--cyan)/0.85)]";

interface SlideChipsProps {
  items: string[];
  size?: keyof typeof sizes;
  className?: string;
}

export function SlideChips({ items, size = "sm", className = "" }: SlideChipsProps) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((item) => (
        <li
          key={item}
          onPointerEnter={(e) => chipFeedback(e.pointerType)}
          className={`border border-border/70 font-mono tracking-wide ${sizes[size]} ${HOVER}`}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
