/* Rotating neon palette for keyword boxes (tech tags, courses, etc.).
   Idle stays neutral (the chip keeps its faint border and text). On hover each
   keyword lights up in the next color — cyan → amber → green → rose, repeating
   down a row — with a matching border and a soft glow. Full static class
   strings so Tailwind keeps them through purge. */
export const NEON_CHIPS = [
  "hover:border-cyan hover:text-cyan hover:shadow-[0_0_14px_-6px_hsl(var(--cyan)/0.85)]",
  "hover:border-amber hover:text-amber hover:shadow-[0_0_14px_-6px_hsl(var(--amber)/0.85)]",
  "hover:border-green hover:text-green hover:shadow-[0_0_14px_-6px_hsl(var(--green)/0.85)]",
  "hover:border-rose hover:text-rose hover:shadow-[0_0_14px_-6px_hsl(var(--rose)/0.85)]",
] as const;

/** Neon hover class string for the keyword at position `i` in a list. */
export const neonChip = (i: number) => NEON_CHIPS[i % NEON_CHIPS.length];

/* Neon hover treatment for action buttons ("View project", "Live demo"), keyed
   by the owning item's accent color. Idle is handled at the call site (bright
   white); this only adds the on-hover border, text, and glow. Full static
   strings so Tailwind keeps them through purge. */
export const NEON_BUTTON: Record<"amber" | "cyan" | "green" | "rose", string> = {
  cyan:  "hover:border-cyan hover:text-cyan hover:shadow-[0_0_22px_-6px_hsl(var(--cyan)/0.7)]",
  amber: "hover:border-amber hover:text-amber hover:shadow-[0_0_22px_-6px_hsl(var(--amber)/0.7)]",
  green: "hover:border-green hover:text-green hover:shadow-[0_0_22px_-6px_hsl(var(--green)/0.7)]",
  rose:  "hover:border-rose hover:text-rose hover:shadow-[0_0_22px_-6px_hsl(var(--rose)/0.7)]",
};
