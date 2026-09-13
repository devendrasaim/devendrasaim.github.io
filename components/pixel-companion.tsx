"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface PixelCompanionProps {
  src: string;
  /* Intrinsic size of the clip. Each one ships pre-cropped to its drawing and
     pre-scaled, so the canvas matches it exactly and every frame is a 1:1 blit
     with no resampling. */
  width: number;
  height: number;
  className?: string;
}

/* The clip is white line art on black. Keying on luminance keeps the linework
   and drops everything else, so the sprite sits on the page background rather
   than inside a video rectangle. The ramp between the two thresholds turns
   compression halos into soft alpha instead of gray fringing. */
const KEY_LOW = 45;
const KEY_HIGH = 120;

/* Linework is repainted in the theme's foreground so it matches body text
   rather than glaring pure white. */
const INK: [number, number, number] = [237, 237, 239];

/**
 * Looping pixel-art sprite. The clip's black background is keyed out on a
 * canvas at runtime, so the drawing reads as line art on the page instead of
 * as an embedded video.
 */
export function PixelCompanion({
  src,
  width,
  height,
  className = "",
}: PixelCompanionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;

    const range = KEY_HIGH - KEY_LOW;

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(video, 0, 0);
      const image = ctx.getImageData(0, 0, width, height);
      const data = image.data;
      for (let i = 0; i < data.length; i += 4) {
        const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        let alpha: number;
        if (lum <= KEY_LOW) alpha = 0;
        else if (lum >= KEY_HIGH) alpha = 255;
        else alpha = Math.round((255 * (lum - KEY_LOW)) / range);
        data[i] = INK[0];
        data[i + 1] = INK[1];
        data[i + 2] = INK[2];
        data[i + 3] = alpha;
      }
      ctx.putImageData(image, 0, 0);
    };

    if (reduce) {
      // One keyed frame, no loop: the corner still carries the drawing.
      video.pause();
      const onSeeked = () => drawFrame();
      video.addEventListener("seeked", onSeeked);
      video.currentTime = 3;
      return () => video.removeEventListener("seeked", onSeeked);
    }

    // The keying pass runs per frame, so it only runs while the sprite is
    // actually on screen. Below lg the canvas is display:none and the observer
    // never fires, which keeps the whole thing idle on smaller viewports.
    let rafId: number | null = null;
    const start = () => {
      if (rafId !== null) return;
      video.play().catch(() => {});
      const loop = () => {
        drawFrame();
        rafId = requestAnimationFrame(loop);
      };
      rafId = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = null;
      video.pause();
    };

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: "128px" },
    );
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      stop();
    };
  }, [reduce, width, height]);

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        className="absolute h-px w-px opacity-0"
        tabIndex={-1}
      />
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="h-auto w-full [image-rendering:pixelated]"
      />
    </motion.div>
  );
}
