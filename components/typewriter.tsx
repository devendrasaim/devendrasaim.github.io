"use client";

import { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

export function Typewriter({
  text,
  speed = 50,
  className = "",
  onComplete,
}: {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}) {
  const reduce = useReducedMotion();
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Reduced motion: no reveal, no cursor, just the finished line.
    if (reduce) {
      if (!isComplete) {
        setDisplayedText(text);
        setCurrentIndex(text.length);
        setIsComplete(true);
        onComplete?.();
      }
      return;
    }

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }

    if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, text, speed, isComplete, onComplete, reduce]);

  return (
    <span className={className}>
      {/* Assistive tech and crawlers get the whole string, not a partial one. */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {displayedText}
        <span
          className={`ml-0.5 inline-block h-[1em] w-[2px] align-middle bg-cyan ${
            isComplete ? "hidden" : "animate-blink"
          }`}
        />
      </span>
    </span>
  );
}
