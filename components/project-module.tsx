"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crosshair } from "@/components/crosshair";

interface ProjectModuleProps {
  moduleId: string;
  title: string;
  tags: string[];
  description: string;
  viewportLabel: string;
  accentColor: "amber" | "cyan" | "green" | "rose";
  reversed?: boolean;
  link?: string;
  image?: string;
  pdfUrl?: string;
}

const accentMap = {
  amber: {
    text: "text-amber",
    border: "border-amber/30",
    bg: "bg-amber/5",
    dot: "bg-amber",
    tagBorder: "border-amber/20",
    tagText: "text-amber/80",
    line: "bg-amber/20",
  },
  cyan: {
    text: "text-cyan",
    border: "border-cyan/30",
    bg: "bg-cyan/5",
    dot: "bg-cyan",
    tagBorder: "border-cyan/20",
    tagText: "text-cyan/80",
    line: "bg-cyan/20",
  },
  green: {
    text: "text-green",
    border: "border-green/30",
    bg: "bg-green/5",
    dot: "bg-green",
    tagBorder: "border-green/20",
    tagText: "text-green/80",
    line: "bg-green/20",
  },
  rose: {
    text: "text-rose",
    border: "border-rose/30",
    bg: "bg-rose/5",
    dot: "bg-rose",
    tagBorder: "border-rose/20",
    tagText: "text-rose/80",
    line: "bg-rose/20",
  },
};

export function ProjectModule({
  moduleId,
  title,
  tags,
  description,
  viewportLabel,
  accentColor,
  reversed = false,
  link,
  image,
  pdfUrl,
}: ProjectModuleProps) {
  const hasMedia = !!(image || pdfUrl);
  const colors = accentMap[accentColor];
  const [isPdfHovered, setIsPdfHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
    >
      {/* Text */}
      <div 
        className={`space-y-6 
          ${reversed && hasMedia ? "lg:order-2" : ""} 
          ${!hasMedia ? "lg:col-span-2 lg:flex lg:flex-col lg:items-center lg:text-center" : ""}
        `}
      >
        <div className={`space-y-3 ${!hasMedia ? "lg:flex lg:flex-col lg:items-center" : ""}`}>
          <span
            className={`font-mono text-[10px] tracking-[0.3em] uppercase ${colors.text}`}
          >
            {moduleId}
          </span>
          <h3 className="font-mono text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            {title}
          </h3>
        </div>

        <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`border ${colors.tagBorder} ${colors.tagText} px-3 py-1 font-mono text-[11px] tracking-wider`}
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="font-sans text-sm md:text-base leading-relaxed text-muted-foreground max-w-lg">
          {description}
        </p>

        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 font-mono text-xs tracking-wider ${colors.text} hover:opacity-70 transition-opacity`}
          >
            <span className="h-px w-4 bg-current" />
            {"VIEW_PROJECT"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>
        )}
      </div>

      {/* Visual Viewport */}
      {hasMedia && (
        <div className={`${reversed ? "lg:order-1" : ""} relative`}>
          <div
            className={`relative border ${colors.border} ${colors.bg} aspect-[16/10] flex items-center justify-center overflow-hidden`}
            onMouseEnter={() => pdfUrl && setIsPdfHovered(true)}
            onMouseLeave={() => pdfUrl && setIsPdfHovered(false)}
          >
            <Crosshair position="top-left" />
            <Crosshair position="top-right" />
            <Crosshair position="bottom-left" />
            <Crosshair position="bottom-right" />

            {/* Active dot */}
            <div className="absolute top-3 left-8 flex items-center gap-2 z-10">
              <div
                className={`h-1.5 w-1.5 rounded-full ${colors.dot} animate-pulse-slow`}
              />
              <span className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground/50 uppercase">
                Active
              </span>
            </div>

            {image ? (
              <img
                src={image}
                alt={`${title} preview`}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            ) : (
              <>
                {/* PDF Preview (First Page) */}
                <div className="absolute inset-0 pointer-events-none p-1">
                  <iframe
                    src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                    title={`${title} preview`}
                    className="w-full h-full border-0 opacity-80 rounded-sm"
                  />
                   {/* Overlay for "Hover" text visibility */}
                   <div className="absolute inset-0 bg-background/0 hover:bg-background/0 transition-colors" />
                </div>
              </>
            )}
          </div>

          {/* PDF Hover Popup */}
          {pdfUrl && (
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
                  <div
                    className={`h-full border ${colors.border} bg-background/95 backdrop-blur-sm flex flex-col overflow-hidden`}
                  >
                    {/* Header */}
                    <div
                      className={`flex items-center justify-between px-4 py-2 border-b ${colors.border}`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-1.5 w-1.5 rounded-full ${colors.dot}`}
                        />
                        <span
                          className={`font-mono text-[9px] tracking-[0.2em] uppercase ${colors.text}`}
                        >
                          {"REPORT_VIEWER"}
                        </span>
                      </div>
                      <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`font-mono text-[9px] tracking-wider ${colors.text} hover:opacity-70 transition-opacity`}
                      >
                        {"OPEN_FULL"}
                      </a>
                    </div>

                    {/* PDF iframe */}
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
          )}
        </div>
      )}
    </motion.div>
  );
}
