"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* Tube geometry, px. The standoff is what makes it read as a light fixture
   around the photo rather than a glowing border on it, and it gives the tube's
   inward spill somewhere to land. Radii stay concentric with the photo's own
   1.75rem corners: each ring's radius is the one inside it plus its offset. */
const PHOTO_RADIUS = 28;
const TUBE_GAP = 18;
const TUBE_THICKNESS = 8;
const TUBE_OUTER_RADIUS = PHOTO_RADIUS + TUBE_GAP + TUBE_THICKNESS;
const TUBE_CORE_INSET = 2.5;

interface SpotlightAvatarProps {
  src: string;
  alt: string;
  size?: number;
}

export function SpotlightAvatar({ src, alt, size = 180 }: SpotlightAvatarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative flex items-center justify-center cursor-pointer"
        /* maxWidth matters: this wrapper only exists to give the glow rings room,
           but at size 240 it is 432px wide, which overflows a phone viewport and
           gets clipped by the body's overflow-x, pushing the photo off centre.
           The rings are absolutely positioned and can still spill past the edge. */
        style={{ width: size * 1.8, height: size * 2.05, maxWidth: "100%" }}
        onClick={() => setIsOpen(true)}
        role="button"
        tabIndex={0}
        aria-label={`View ${alt} full size`}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setIsOpen(true); }}
      >
        {/* Outermost soft glow */}
        <div
          className="absolute inset-0 rounded-[1.75rem]"
          style={{
            background:
              "radial-gradient(circle, hsla(0, 0%, 100%, 0.03) 0%, hsla(0, 0%, 100%, 0.01) 40%, transparent 70%)",
          }}
        />

        {/* Mid glow ring */}
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute rounded-full"
          style={{
            width: size * 1.4,
            height: size * 1.4,
            background:
              "radial-gradient(circle, hsla(0, 0%, 100%, 0.06) 0%, hsla(0, 0%, 100%, 0.02) 50%, transparent 70%)",
          }}
        />

        {/* Inner glow directly behind image */}
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute rounded-full"
          style={{
            width: size * 1.15,
            height: size * 1.15,
            background:
              "radial-gradient(circle, hsla(0, 0%, 100%, 0.08) 0%, hsla(0, 0%, 100%, 0.03) 60%, transparent 80%)",
            filter: "blur(8px)",
          }}
        />

        {/* Fluorescent tube. Two concentric rings, not one bordered box: a real
            tube is a thick glass body with a hot core burning down the middle
            of that thickness, and a single border can only ever be a flat line.
            The whole fixture animates on opacity alone, so the blooms rasterise
            once and the strike costs nothing per frame. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute animate-tube-strike motion-reduce:!animate-none motion-reduce:opacity-100"
          style={{
            width: size + 2 * (TUBE_GAP + TUBE_THICKNESS),
            height: size * 1.3 + 2 * (TUBE_GAP + TUBE_THICKNESS),
            willChange: "opacity",
          }}
        >
          {/* Glass body. The inset shadows are the point of the standoff gap:
              they throw light inward across it, so the tube lights the space
              around the photo instead of just outlining it. */}
          <div
            className="absolute inset-0"
            style={{
              borderRadius: TUBE_OUTER_RADIUS,
              /* Saturated enough that the glass itself carries the accent. Pale
                 phosphor-white is truer to a real tube, but then the only cyan
                 on screen is the outer bloom and it stops reading as the
                 theme's colour. */
              border: `${TUBE_THICKNESS}px solid hsl(187 88% 74% / 0.95)`,
              boxShadow: [
                "0 0 8px hsl(var(--cyan) / 0.9)",
                "0 0 20px hsl(var(--cyan) / 0.7)",
                "0 0 45px hsl(var(--cyan) / 0.5)",
                "0 0 90px hsl(var(--cyan) / 0.28)",
                "0 0 150px hsl(var(--cyan) / 0.14)",
                "inset 0 0 14px hsl(var(--cyan) / 0.6)",
                "inset 0 0 34px hsl(var(--cyan) / 0.3)",
              ].join(", "),
            }}
          />

          {/* Hot core, inset so it sits inside the glass rather than on its edge. */}
          <div
            className="absolute"
            style={{
              inset: TUBE_CORE_INSET,
              borderRadius: TUBE_OUTER_RADIUS - TUBE_CORE_INSET,
              /* Kept thin and near-white: the hottest part of a tube is the
                 whitest, and leaving glass visible either side of it is what
                 gives the ring depth instead of flatness. */
              border: "2.5px solid hsl(187 100% 97%)",
              boxShadow: "0 0 8px hsl(187 100% 92% / 0.95)",
            }}
          />
        </div>

        {/* Profile image */}
        <div
          className="relative rounded-[1.75rem] overflow-hidden"
          style={{ width: size, height: size * 1.3 }}
        >
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
          />

          {/* Subtle inner shadow for depth */}
          <div
            className="absolute inset-0 rounded-[1.75rem]"
            style={{
              boxShadow: "inset 0 0 20px hsla(0, 0%, 0%, 0.4)",
            }}
          />
        </div>
      </motion.div>

      {/* Lightbox overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer"
            onClick={close}
            role="dialog"
            aria-label="Enlarged profile picture"
          >
            {/* Enlarged image — click on image also closes */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Glow behind enlarged image */}
              <div
                className="absolute inset-[-20%] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, hsla(0, 0%, 100%, 0.06) 0%, transparent 70%)",
                  filter: "blur(40px)",
                }}
              />

              {/* Border ring */}
              <div className="relative rounded-[2rem] overflow-hidden border-2 border-border/30 w-[260px] h-[340px] sm:w-[320px] sm:h-[416px] md:w-[360px] md:h-[468px]">
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-full object-cover"
                />

                {/* Inner shadow for depth */}
                <div
                  className="absolute inset-0 rounded-[1.75rem]"
                  style={{
                    boxShadow: "inset 0 0 40px hsla(0, 0%, 0%, 0.3)",
                  }}
                />
              </div>
            </motion.div>

            {/* Tap anywhere hint */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-8 font-mono text-xs tracking-[0.2em] text-muted-foreground/50 uppercase"
            >
              tap anywhere to close
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
