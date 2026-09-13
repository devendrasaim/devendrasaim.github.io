"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crosshair } from "@/components/crosshair";
import { WorkflowFlowchart } from "@/components/workflow-flowchart";
import { JobAgentFlowchart } from "@/components/job-agent-flowchart";

interface ProjectModuleProps {
  moduleId: string;
  title: string | React.ReactNode;
  tags: string[];
  description: string;
  viewportLabel?: string;
  /** Retained for data compatibility; the page uses one locked accent. */
  accentColor?: "amber" | "cyan" | "green" | "rose";
  reversed?: boolean;
  link?: string;
  liveLink?: string;
  image?: string;
  /** Looping demo clip. Replaces the multi-megabyte GIFs these previews used to
      be: same visual, a fraction of the bytes, and it streams progressively
      instead of showing nothing until the whole file has arrived. */
  video?: string;
  /** Still frame shown instantly while the clip loads. */
  poster?: string;
  pdfUrl?: string;
  flowchart?: "social" | "jobagent";
}

const colors = {
  text: "text-cyan",
  border: "border-border",
  bg: "bg-surface",
  tagBorder: "border-border",
};

export function ProjectModule({
  moduleId,
  title,
  tags,
  accentColor = "cyan",
  description,
  viewportLabel,
  reversed = false,
  link,
  liveLink,
  image,
  video,
  poster,
  pdfUrl,
  flowchart,
}: ProjectModuleProps) {
  const hasMedia = !!(image || video || pdfUrl || flowchart !== undefined);
  const [isPdfHovered, setIsPdfHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
    >
      {/* Text */}
      <div
        className={`space-y-6
          ${reversed && hasMedia ? "lg:order-2" : ""}
          ${!hasMedia ? "lg:col-span-2 lg:flex lg:flex-col lg:items-center lg:text-center" : ""}
        `}
      >
        <div className={`space-y-3 ${!hasMedia ? "lg:flex lg:flex-col lg:items-center" : ""}`}>
          <h3 className="font-mono text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            {title}
          </h3>
        </div>

        <p className="max-w-[58ch] font-sans text-base leading-relaxed text-muted-foreground md:text-[17px]">
          {description}
        </p>

        {tags.length > 0 && (
          <ul className={`flex flex-wrap gap-2 ${!hasMedia ? "lg:justify-center" : ""}`}>
            {tags.map((tag) => (
              <li
                key={tag}
                className="border border-border/70 px-2.5 py-1 font-mono text-[11px] tracking-wide text-faint"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        {(link || liveLink) && (
          <div className="flex flex-wrap gap-3 pt-1">
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 border border-border-strong px-4 py-2.5 font-mono text-xs tracking-[0.12em] text-muted-foreground transition-colors duration-200 hover:border-foreground hover:text-foreground"
              >
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
            )}
            {liveLink && (
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 border border-border-strong px-4 py-2.5 font-mono text-xs tracking-[0.12em] text-muted-foreground transition-colors duration-200 hover:border-foreground hover:text-foreground"
              >
                {"Live demo"}
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
            )}
          </div>
        )}
      </div>

      {/* Visual Viewport */}
      {hasMedia && (
        <div className={`${reversed ? "lg:order-1" : ""} relative`}>
          <div
            className={`relative border ${colors.border} ${colors.bg} ${flowchart ? "aspect-square" : "aspect-[16/10]"} flex items-center justify-center overflow-hidden`}
            onMouseEnter={() => pdfUrl && setIsPdfHovered(true)}
            onMouseLeave={() => pdfUrl && setIsPdfHovered(false)}
          >
            <Crosshair position="top-left" />
            <Crosshair position="bottom-right" />

            <div className="absolute left-8 top-3 z-10">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                {viewportLabel ?? "Preview"}
              </span>
            </div>

            {video ? (
              <>
                {!imageLoaded && !poster && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none">
                    <div className={`w-6 h-6 border border-t-transparent rounded-full animate-spin ${colors.text} opacity-40`} />
                    <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/40 uppercase">
                      LOADING_MEDIA
                    </span>
                  </div>
                )}
                <video
                  src={video}
                  poster={poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  /* No preload: nothing is fetched until the browser decides to
                     autoplay it, which it only does once the module is on
                     screen. The poster covers the gap. */
                  preload="none"
                  aria-label={typeof title === "string" ? `${title} demo` : `${moduleId} demo`}
                  onLoadedData={() => setImageLoaded(true)}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              </>
            ) : image ? (
              <>
                {!imageLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none">
                    <div className={`w-6 h-6 border border-t-transparent rounded-full animate-spin ${colors.text} opacity-40`} />
                    <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/40 uppercase">
                      LOADING_MEDIA
                    </span>
                  </div>
                )}
                <img
                  src={image}
                  alt={typeof title === "string" ? `${title} preview` : `${moduleId} preview`}
                  loading="lazy"
                  decoding="async"
                  onLoad={() => setImageLoaded(true)}
                  className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                />
              </>
            ) : flowchart === "social" ? (
              <WorkflowFlowchart accentColor={accentColor} />
            ) : flowchart === "jobagent" ? (
              <JobAgentFlowchart accentColor={accentColor} />
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
                      <span
                        className={`font-mono text-[10px] uppercase tracking-[0.18em] ${colors.text}`}
                      >
                        {"Report preview"}
                      </span>
                      <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`font-mono text-[9px] tracking-wider ${colors.text} hover:opacity-70 transition-opacity`}
                      >
                        {"Open full report"}
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
