"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useInView } from "framer-motion";

export interface CarouselSlide {
  /** 16:10 version that fills the viewport frame. */
  src: string;
  /** Original, uncropped screenshot shown in the pop-up. Falls back to src. */
  full?: string;
  alt: string;
}

interface ImageCarouselProps {
  slides: CarouselSlide[];
  /** Milliseconds each slide stays up before auto-advancing. */
  interval?: number;
}

/* Slides enter from the side they are travelling toward: "next" pushes the
   current image out to the left and brings the new one in from the right,
   "previous" does the reverse. */
const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0.4 }),
  center: { x: "0%", opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0.4 }),
};

/* Fills its parent (the project viewport frame). Auto-advances only while the
   frame is on screen and not being hovered, so a reader studying a dense
   screenshot is not pulled away from it. Clicking an arrow or dot restarts
   the timer from zero. */
export function ImageCarousel({ slides, interval = 4000 }: ImageCarouselProps) {
  const [[index, direction], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.4 });
  const count = slides.length;

  useEffect(() => setMounted(true), []);

  const go = useCallback(
    (dir: number) => setState(([i]) => [(i + dir + count) % count, dir]),
    [count],
  );
  const goTo = (target: number) =>
    setState(([i]) => (target === i ? [i, 1] : [target, target > i ? 1 : -1]));

  // Re-armed on every index change, so a manual move resets the countdown.
  useEffect(() => {
    if (!inView || paused || open || count < 2) return;
    const id = window.setTimeout(() => go(1), interval);
    return () => window.clearTimeout(id);
  }, [index, inView, paused, open, count, interval, go]);

  // While the pop-up is open: lock page scroll, and let Escape close it and
  // the arrow keys page through the screenshots.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, go]);

  // Preload the remaining slides once the frame first comes into view.
  useEffect(() => {
    if (!inView) return;
    slides.forEach(({ src }) => {
      const img = new Image();
      img.src = src;
    });
  }, [inView, slides]);

  const slide = slides[index];

  return (
    <>
    <div
      ref={rootRef}
      className="group/carousel absolute inset-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Project screenshots"
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          draggable={false}
          decoding="async"
          className="absolute inset-0 h-full w-full select-none object-contain"
        />
      </AnimatePresence>

      {/* Click anywhere on the picture (outside the arrows and dots) to open
          the full screenshot. */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View full screenshot: ${slide.alt}`}
        className="absolute inset-0 z-10 cursor-zoom-in focus-visible:outline focus-visible:outline-1 focus-visible:outline-cyan"
      />

      <ArrowButton side="left" onClick={() => go(-1)} />
      <ArrowButton side="right" onClick={() => go(1)} />

      <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show screenshot ${i + 1} of ${count}`}
            aria-current={i === index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-cyan" : "w-1.5 bg-foreground/35 hover:bg-foreground/70"
            }`}
          />
        ))}
      </div>
    </div>

    {/* Portalled to <body>: the project card is animated with transforms,
        which would otherwise trap a fixed overlay inside the card. */}
    {mounted &&
      createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              key="lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 p-4 backdrop-blur-md md:p-10"
              onClick={() => setOpen(false)}
              role="dialog"
              aria-modal="true"
              aria-label="Full screenshot"
            >
              <motion.img
                key={slide.full ?? slide.src}
                src={slide.full ?? slide.src}
                alt={slide.alt}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="max-h-[calc(100vh-7rem)] max-w-[calc(100vw-2rem)] border border-border object-contain shadow-2xl md:max-w-[calc(100vw-10rem)]"
              />

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                autoFocus
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-foreground/30 bg-background/70 text-foreground transition-colors hover:border-cyan hover:text-cyan focus-visible:border-cyan focus-visible:outline-none"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              {count > 1 && (
                <>
                  <ArrowButton side="left" onClick={(e) => { e.stopPropagation(); go(-1); }} fixed />
                  <ArrowButton side="right" onClick={(e) => { e.stopPropagation(); go(1); }} fixed />
                </>
              )}

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center font-mono text-[11px] tracking-[0.18em] text-muted-foreground">
                {index + 1} / {count}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}

function ArrowButton({
  side,
  onClick,
  fixed = false,
}: {
  side: "left" | "right";
  onClick: (e: React.MouseEvent) => void;
  fixed?: boolean;
}) {
  const isLeft = side === "left";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isLeft ? "Previous screenshot" : "Next screenshot"}
      className={`${fixed ? "fixed" : "absolute"} top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/30 bg-background/70 text-foreground backdrop-blur-sm transition-all duration-200 hover:border-cyan hover:text-cyan focus-visible:border-cyan focus-visible:outline-none ${
        isLeft ? (fixed ? "left-4" : "left-3") : fixed ? "right-4" : "right-3"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {isLeft ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
      </svg>
    </button>
  );
}
