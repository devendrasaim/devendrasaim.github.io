"use client";

import type { ReactNode } from "react";
import { useScrollFocus } from "@/components/use-scroll-focus";

/* A timeline bullet that brightens to white, with its dash turning neon, while
   it crosses the middle of the screen. Shared by the work and research
   timelines so both read the same way. */
export function GlowBullet({ children }: { children: ReactNode }) {
  const [ref, inFocus] = useScrollFocus<HTMLLIElement>();

  return (
    <li ref={ref} data-focus={inFocus} className="glow-scope flex items-start gap-3">
      <span
        aria-hidden="true"
        className="glow-mark mt-[0.6em] h-px w-3 shrink-0 bg-border-strong"
      />
      <span className="glow-white">{children}</span>
    </li>
  );
}
