"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
        style={{ width: size * 1.8, height: size * 1.8 }}
        onClick={() => setIsOpen(true)}
        role="button"
        tabIndex={0}
        aria-label={`View ${alt} full size`}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setIsOpen(true); }}
      >
        {/* Outermost soft glow */}
        <div
          className="absolute inset-0 rounded-full"
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

        {/* Thin border ring */}
        <div
          className="absolute rounded-full border border-border/40"
          style={{ width: size + 8, height: size + 8 }}
        />

        {/* Profile image */}
        <div
          className="relative rounded-full overflow-hidden"
          style={{ width: size, height: size }}
        >
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
          />

          {/* Subtle inner shadow for depth */}
          <div
            className="absolute inset-0 rounded-full"
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
              <div className="relative rounded-full overflow-hidden border-2 border-border/30 w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px]">
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-full object-cover"
                />

                {/* Inner shadow for depth */}
                <div
                  className="absolute inset-0 rounded-full"
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
