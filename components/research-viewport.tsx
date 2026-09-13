"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crosshair } from "@/components/crosshair";

type AccentColor = "amber" | "cyan" | "green" | "rose";

interface ResearchViewportProps {
  viewportLabel: string;
  /** Retained for data compatibility; the page uses one locked accent. */
  accentColor?: AccentColor;
  pdfUrl: string;
  title: string;
  link?: string;
}

// One locked accent for the page; the prop is kept for data compatibility.
const colors = {
  text: "text-cyan",
  border: "border-border",
  bg: "bg-surface",
};

export function ResearchViewport({ viewportLabel, pdfUrl, title, link }: ResearchViewportProps) {
  const [isPdfHovered, setIsPdfHovered] = useState(false);

  return (
    <div className="relative max-w-2xl">
      <div
        className={`relative border ${colors.border} ${colors.bg} aspect-[16/10] flex items-center justify-center overflow-hidden`}
        onMouseEnter={() => setIsPdfHovered(true)}
        onMouseLeave={() => setIsPdfHovered(false)}
      >
        <Crosshair position="top-left" />
        <Crosshair position="bottom-right" />

        {/* Active dot + label */}
        <div className="absolute left-8 top-3 z-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
            {viewportLabel}
          </span>
        </div>

        {/* PDF Preview (First Page) */}
        <div className="absolute inset-0 pointer-events-none p-1">
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
            title={`${title} preview`}
            className="w-full h-full border-0 opacity-80 rounded-sm"
          />
        </div>
      </div>

      {/* Optional repo link */}
      {link && (
        <div className="mt-3">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative inline-flex items-center gap-2 border ${colors.border} ${colors.bg} px-4 py-2 font-mono text-xs tracking-[0.15em] ${colors.text} hover:bg-current/10 transition-all duration-200 group`}
          >
            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-current/50" />
            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-current/50" />
            {"View project"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>
        </div>
      )}

      {/* PDF Hover Popup (full reader) */}
      <AnimatePresence>
        {isPdfHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: 10, scaleY: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute top-0 left-0 right-0 z-30 origin-top"
            style={{ height: "480px" }}
            onMouseEnter={() => setIsPdfHovered(true)}
            onMouseLeave={() => setIsPdfHovered(false)}
          >
            <div className={`h-full border ${colors.border} bg-background/95 backdrop-blur-sm flex flex-col overflow-hidden`}>
              <div className={`flex items-center justify-between px-4 py-2 border-b ${colors.border}`}>
                <div className="flex items-center gap-2">
                          <span className={`font-mono text-[9px] tracking-[0.2em] uppercase ${colors.text}`}>
                    {"Report preview"}
                  </span>
                </div>
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`font-mono text-[9px] tracking-wider ${colors.text} hover:opacity-70 transition-opacity`}
                >
                  {"Open full report"}
                </a>
              </div>
              <div className="flex-1 overflow-hidden">
                <iframe
                  src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
                  title="Research Report PDF Viewer"
                  className="w-full h-full border-0"
                  style={{ minHeight: "100%" }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}