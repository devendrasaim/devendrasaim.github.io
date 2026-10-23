"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

/* True while the element overlaps a thin band across the middle of the
   viewport. As the reader scrolls, each row lights up when it reaches the
   centre of the screen and dims again once it moves past, so the eye is led
   down a list one item at a time. Pair with the .glow-* classes in
   globals.css, which do the actual fading through CSS transitions. */
export function useScrollFocus<T extends Element>() {
  const ref = useRef<T>(null);
  // A 4%-tall band (about 36px on a laptop) is shorter than one two-line
  // bullet, so a list lights one item at a time instead of in a block.
  const inFocus = useInView(ref, { margin: "-48% 0px -48% 0px" });
  return [ref, inFocus] as const;
}
