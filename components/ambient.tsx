"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

/**
 * Ambient page layers: a cursor-tracked light and a static grain overlay.
 *
 * Both are decorative and inert - fixed, aria-hidden, pointer-events-none - so
 * they sit outside the document flow and never intercept interaction.
 */

/* Wide enough to read as room lighting rather than a flashlight dot. */
const LIGHT_SIZE = 680;

function CursorLight() {
  const reduce = useReducedMotion();

  /* Motion values, not state: the pointer updates on every frame and putting
     that in state would re-render the whole page tree each time. */
  const x = useMotionValue(-LIGHT_SIZE);
  const y = useMotionValue(-LIGHT_SIZE);
  const lit = useMotionValue(0);

  /* The lag is the effect. Tracking the cursor exactly reads as a hard
     attachment; trailing slightly behind reads as light in a room. */
  const springX = useSpring(x, { stiffness: 110, damping: 24, mass: 0.7 });
  const springY = useSpring(y, { stiffness: 110, damping: 24, mass: 0.7 });
  const springLit = useSpring(lit, { stiffness: 70, damping: 20 });

  useEffect(() => {
    if (reduce) return;
    /* Touch and pen have no hovering cursor to follow, and a light stuck
       wherever the last tap landed just looks broken. */
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX - LIGHT_SIZE / 2);
      y.set(event.clientY - LIGHT_SIZE / 2);
      lit.set(1);
    };
    /* Fade out only when the pointer actually leaves the window, so the light
       does not hang at the edge. Deliberately not tied to window blur: focus
       moves for all sorts of reasons the mouse knows nothing about (clicking
       the chat input, opening devtools), and a light that snaps off while the
       cursor is still sitting on the page reads as a bug. */
    const onLeave = () => lit.set(0);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce, x, y, lit]);

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 hidden rounded-full [@media(pointer:fine)]:block"
      style={{
        x: springX,
        y: springY,
        opacity: springLit,
        width: LIGHT_SIZE,
        height: LIGHT_SIZE,
        willChange: "transform",
        /* The existing accent, at an alpha low enough to feel like lighting
           rather than a coloured shape. No blur filter: the gradient is
           already soft, and blurring a 680px layer every frame is not. */
        background:
          "radial-gradient(circle closest-side," +
          " hsl(var(--cyan) / 0.085) 0%," +
          " hsl(var(--cyan) / 0.05) 32%," +
          " hsl(var(--cyan) / 0.018) 56%," +
          " transparent 76%)",
      }}
    />
  );
}

function Grain() {
  return (
    <div
      aria-hidden="true"
      /* Plain opacity rather than a blend mode on purpose: a full-viewport
         mix-blend layer forces the whole page to composite into one layer to
         blend against, which is exactly the kind of thing that costs scroll
         smoothness. On a near-black ground the two look the same anyway. */
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.03]"
      style={{
        /* Static SVG turbulence. Fixed and never animated, so it costs one
           paint rather than a repaint per scrolled pixel. */
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

export function Ambient() {
  return (
    <>
      <CursorLight />
      <Grain />
    </>
  );
}
