"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  { text: "BIOS_CHECK.............. OK", delay: 0 },
  { text: "MEMORY_SCAN............. OK", delay: 200 },
  { text: "DISPLAY_INIT............ OK", delay: 380 },
  { text: "LOADING PORTFOLIO.....", delay: 560 },
];

const BAR_SEGMENTS = 28;

interface PageLoaderProps {
  onComplete?: () => void;
}

export function PageLoader({ onComplete }: PageLoaderProps) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [powering, setPowering] = useState(false);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const DURATION = 2000;

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_LINES.forEach((line, i) => {
      timers.push(
        setTimeout(() => setVisibleLines((v) => Math.max(v, i + 1)), line.delay)
      );
    });

    const animate = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const p = Math.min(elapsed / DURATION, 1);
      setProgress(p);

      if (p < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        timers.push(
          setTimeout(() => {
            setPowering(true);
            setTimeout(() => {
              setVisible(false);
              onComplete?.();
            }, 600);
          }, 150)
        );
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      timers.forEach(clearTimeout);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const filledCount = Math.round(progress * BAR_SEGMENTS);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={
            powering
              ? { scaleY: 0.003, opacity: [1, 1, 0], transition: { duration: 0.5, ease: [0.4, 0, 1, 1] } }
              : { opacity: 0 }
          }
          style={{ transformOrigin: "center", zIndex: 9999 }}
          className="fixed inset-0 bg-background flex items-center justify-center"
        >
          {/* Grid background */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(6,182,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Scan line */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute left-0 right-0 h-px bg-cyan/10"
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Corner crosshairs */}
          <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-cyan/30" />
          <div className="absolute top-6 right-6 w-4 h-4 border-t border-r border-cyan/30" />
          <div className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-cyan/30" />
          <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-cyan/30" />

          {/* Content */}
          <div className="relative flex flex-col items-center gap-8 px-8 max-w-sm w-full">
            {/* Title */}
            <div className="text-center">
              <motion.p
                className="font-mono text-[10px] tracking-[0.4em] text-cyan/50 uppercase mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                SYSTEM BOOT
              </motion.p>
              <motion.h1
                className="font-mono text-2xl font-bold tracking-[0.2em] text-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.7, 1] }}
                transition={{ duration: 0.4, delay: 0.05 }}
              >
                DSM_PORTFOLIO
                <motion.span
                  className="text-cyan ml-1"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
                >
                  █
                </motion.span>
              </motion.h1>
            </div>

            {/* Boot log */}
            <div className="w-full font-mono text-[11px] space-y-1 min-h-[80px]">
              {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-muted-foreground/60 tracking-wider"
                >
                  <span className="text-cyan/40 mr-2">{">"}</span>
                  {line.text}
                  {i === visibleLines - 1 && progress < 1 && (
                    <motion.span
                      className="text-cyan ml-1"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.4, repeat: Infinity, repeatType: "reverse" }}
                    >
                      _
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="w-full space-y-2">
              <div className="flex gap-[3px] justify-center">
                {Array.from({ length: BAR_SEGMENTS }).map((_, i) => {
                  const filled = i < filledCount;
                  return (
                    <motion.span
                      key={i}
                      className="font-mono text-base leading-none select-none"
                      style={{ color: filled ? undefined : "rgba(6,182,212,0.12)" }}
                      animate={
                        filled
                          ? {
                              opacity: [0.55, 1, 0.55],
                              color: ["#06b6d4", "#67e8f9", "#06b6d4"],
                            }
                          : { opacity: 1 }
                      }
                      transition={
                        filled
                          ? {
                              duration: 0.6,
                              repeat: Infinity,
                              delay: (i % 4) * 0.15,
                              ease: "easeInOut",
                            }
                          : {}
                      }
                    >
                      █
                    </motion.span>
                  );
                })}
              </div>

              <div className="flex justify-between">
                <span className="font-mono text-[9px] text-cyan/40 tracking-widest">
                  LOADING SYS
                </span>
                <span className="font-mono text-[9px] text-cyan/60 tracking-widest">
                  {Math.round(progress * 100)}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
