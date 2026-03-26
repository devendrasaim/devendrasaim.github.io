"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AccentColor = "amber" | "cyan" | "green" | "rose";

interface WorkflowFlowchartProps {
  accentColor?: AccentColor;
}

// ViewBox: 560 × 350 (16:10) — transparent background
// ROOT starts large at CENTER, then settles to its actual position on hover

const ROOT_NODE   = { id: "init", label: "AUTOMATE.PY", sub: "entry point",    cx: 490, cy: 85,  w: 115, h: 34 };
const IDLE_CENTER = { x: 280, y: 168 };  // center of the viewBox
const IDLE_SCALE  = 2.6;

const OTHER_NODES = [
  { id: "queue",   label: "QUEUE MGMT",   sub: "brainstorm < 3", cx: 345, cy: 85,  w: 115, h: 34 },
  { id: "topic",   label: "PICK TOPIC",   sub: "source routing", cx: 200, cy: 85,  w: 105, h: 34 },
  { id: "yt",      label: "YOUTUBE",      sub: "video extract",  cx: 110, cy: 185, w: 100, h: 32 },
  { id: "pp",      label: "PERPLEXITY",   sub: "web search",     cx: 265, cy: 185, w: 105, h: 32 },
  { id: "gemini",  label: "GEMINI 2.5",   sub: "AI processing",  cx: 187, cy: 268, w: 120, h: 34 },
  { id: "publish", label: "INSTAGRAM",    sub: "Imagen → post",  cx: 187, cy: 332, w: 130, h: 34 },
] as const;

// ROOT:    cx=490, w=115 → left=432.5, right=547.5, top=68,  bottom=102
// QUEUE:   cx=345, w=115 → left=287.5, right=402.5, top=68,  bottom=102
// TOPIC:   cx=200, w=105 → left=147.5, right=252.5, top=68,  bottom=102
// YT:      cx=110, w=100 → left=60,    right=160,   top=169, bottom=201
// PP:      cx=265, w=105 → left=212.5, right=317.5, top=169, bottom=201
// GEMINI:  cx=187, w=120 → left=127,   right=247,   top=251, bottom=285
// PUBLISH: cx=187, w=130 → left=122,   right=252,   top=315, bottom=349
const EDGES = [
  { id: "e1",  d: "M 432 85  L 402 85" },
  { id: "e2",  d: "M 287 85  L 252 85" },
  { id: "e3l", d: "M 200 102 L 200 133 L 110 133 L 110 169" },
  { id: "e3r", d: "M 200 102 L 200 133 L 265 133 L 265 169" },
  { id: "e4l", d: "M 110 201 L 110 232 L 169 232 L 169 251" },
  { id: "e4r", d: "M 265 201 L 265 232 L 205 232 L 205 251" },
  { id: "e5",  d: "M 187 285 L 187 315" },
] as const;

const ARROWS = [
  { edgeId: "e1",  points: "409,79 409,91 402,85"   },
  { edgeId: "e2",  points: "259,79 259,91 252,85"   },
  { edgeId: "e3l", points: "104,162 116,162 110,169" },
  { edgeId: "e3r", points: "259,162 271,162 265,169" },
  { edgeId: "e4l", points: "163,244 175,244 169,251" },
  { edgeId: "e4r", points: "199,244 211,244 205,251" },
  { edgeId: "e5",  points: "181,308 193,308 187,315" },
] as const;

// Pipeline starts immediately after ROOT has settled into position
const PIPELINE: [number, string[], string[]][] = [
  [0,    ["e1"],         []],
  [340,  [],             ["queue"]],
  [680,  ["e2"],         []],
  [980,  [],             ["topic"]],
  [1320, ["e3l", "e3r"], []],
  [1670, [],             ["yt", "pp"]],
  [2020, ["e4l", "e4r"], []],
  [2370, [],             ["gemini"]],
  [2710, ["e5"],         []],
  [3010, [],             ["publish"]],
];
const PIPELINE_DONE = 3370;

type Phase = "idle" | "settling" | "pipeline" | "done";

export function WorkflowFlowchart({ accentColor = "cyan" }: WorkflowFlowchartProps) {
  const [phase, setPhase]               = useState<Phase>("idle");
  const [visibleNodes, setVisibleNodes] = useState<Set<string>>(new Set());
  const [visibleEdges, setVisibleEdges] = useState<Set<string>>(new Set());
  const [animKey, setAnimKey]           = useState(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  // Called after ROOT finishes settling into its position
  const startPipeline = useCallback(() => {
    setVisibleNodes(new Set(["init"]));  // mark ROOT as active

    PIPELINE.forEach(([delay, edges, nodes]) => {
      const t = setTimeout(() => {
        if (edges.length) setVisibleEdges((prev) => new Set([...prev, ...edges]));
        if (nodes.length) setVisibleNodes((prev) => new Set([...prev, ...nodes]));
      }, delay);
      timersRef.current.push(t);
    });

    const t = setTimeout(() => setPhase("done"), PIPELINE_DONE);
    timersRef.current.push(t);
  }, []);

  // Triggered when mouse enters the viewport
  const handleHover = useCallback(() => {
    if (phase === "idle") setPhase("settling");
  }, [phase]);

  // Called by Framer Motion when ROOT finishes its position animation
  const handleRootSettled = useCallback(() => {
    if (phase === "settling") {
      setPhase("pipeline");
      startPipeline();
    }
  }, [phase, startPipeline]);

  const handleReplay = useCallback(() => {
    clearTimers();
    setPhase("idle");
    setVisibleNodes(new Set());
    setVisibleEdges(new Set());
    setAnimKey((k) => k + 1);
  }, [clearTimers]);

  const accent       = `hsl(var(--${accentColor}))`;
  const accentFaint  = `hsla(var(--${accentColor}) / 0.07)`;
  const accentActive = `hsla(var(--${accentColor}) / 0.14)`;

  // ROOT target position and scale based on phase
  const rootX     = phase === "idle" ? IDLE_CENTER.x : ROOT_NODE.cx;
  const rootY     = phase === "idle" ? IDLE_CENTER.y : ROOT_NODE.cy;
  const rootScale = phase === "idle" ? IDLE_SCALE : 1;

  // Ghost opacity for non-root nodes (very faint in idle, fading out as pipeline starts)
  const ghostOpacity = phase === "idle" ? 0.05 : phase === "settling" ? 0.08 : 0;

  return (
    <div
      className="absolute inset-0 select-none"
      onMouseEnter={handleHover}
      onClick={() => { if (phase === "idle") handleHover(); }}
      style={{ cursor: phase === "idle" ? "pointer" : "default" }}
    >
      <svg
        viewBox="0 0 560 350"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        {/* ── Edges ─────────────────────────────────────── */}
        {EDGES.map((edge) => {
          const vis = visibleEdges.has(edge.id);
          return (
            <motion.path
              key={`${edge.id}-${animKey}`}
              d={edge.d}
              fill="none"
              strokeWidth="1.5"
              strokeLinecap="square"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: vis ? 1 : 0, opacity: vis ? 0.6 : 0 }}
              transition={{
                pathLength: { duration: 0.42, ease: "easeInOut" },
                opacity:    { duration: 0.15 },
              }}
              style={{ stroke: accent }}
            />
          );
        })}

        {/* ── Arrowheads ────────────────────────────────── */}
        {ARROWS.map(({ edgeId, points }) => (
          <motion.polygon
            key={`arr-${edgeId}-${animKey}`}
            points={points}
            initial={{ opacity: 0 }}
            animate={{ opacity: visibleEdges.has(edgeId) ? 0.55 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ fill: accent }}
          />
        ))}

        {/* ── Other nodes (ghost → pipeline reveal) ─────── */}
        {OTHER_NODES.map((node) => {
          const vis = visibleNodes.has(node.id);
          const opacity = vis ? 1 : ghostOpacity;
          const scale   = vis ? 1 : (phase === "pipeline" ? 0.72 : 1);

          return (
            <g key={node.id} transform={`translate(${node.cx}, ${node.cy})`}>
              <motion.g
                key={`${node.id}-${animKey}`}
                initial={{ opacity: 0, scale: 0.72 }}
                animate={{ opacity, scale }}
                transition={{
                  opacity: { duration: vis ? 0.3 : 0.25 },
                  scale:   { duration: vis ? 0.4 : 0.25, ease: [0.22, 1, 0.36, 1] },
                }}
                style={{ transformOrigin: "0px 0px" }}
              >
                <rect
                  x={-node.w / 2} y={-node.h / 2}
                  width={node.w}   height={node.h}
                  style={{
                    fill:         vis ? accentActive : accentFaint,
                    stroke:       accent,
                    strokeWidth:  vis ? 1 : 0.5,
                    strokeOpacity: vis ? 0.55 : 0.25,
                  }}
                />
                {vis && (
                  <motion.circle
                    cx={-node.w / 2 + 9} cy={0} r={2.5}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ fill: accent }}
                  />
                )}
                <text y={-4} textAnchor="middle" dominantBaseline="middle"
                  style={{
                    fill: vis ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                    fontSize: "13px",
                    fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                    fontWeight: "600",
                    letterSpacing: "0.08em",
                    pointerEvents: "none",
                  }}
                >{node.label}</text>
                <text y={9} textAnchor="middle" dominantBaseline="middle"
                  style={{
                    fill: "hsl(var(--muted-foreground))",
                    fontSize: "10px",
                    fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                    opacity: 0.6,
                    letterSpacing: "0.04em",
                    pointerEvents: "none",
                  }}
                >{"// " + node.sub}</text>
              </motion.g>
            </g>
          );
        })}

        {/* ── ROOT NODE — intro hero animation ──────────── */}
        {/* Outer motion.g drives the POSITION (center → actual) */}
        <motion.g
          key={`root-pos-${animKey}`}
          initial={{ x: IDLE_CENTER.x, y: IDLE_CENTER.y }}
          animate={{ x: rootX, y: rootY }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={handleRootSettled}
        >
          {/* Inner motion.g drives the SCALE (big → normal) */}
          <motion.g
            key={`root-scale-${animKey}`}
            initial={{ scale: IDLE_SCALE }}
            animate={{ scale: rootScale }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "0px 0px" }}
          >
            {/* Pulsing outer ring — idle state only */}
            <AnimatePresence>
              {phase === "idle" && (
                <motion.rect
                  key="glow-ring"
                  x={-ROOT_NODE.w / 2 - 6}
                  y={-ROOT_NODE.h / 2 - 6}
                  width={ROOT_NODE.w + 12}
                  height={ROOT_NODE.h + 12}
                  fill="none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.08, 0.35, 0.08] }}
                  exit={{ opacity: 0, transition: { duration: 0.3 } }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  style={{ stroke: accent, strokeWidth: 0.7 }}
                />
              )}
            </AnimatePresence>

            {/* Node rect */}
            <rect
              x={-ROOT_NODE.w / 2} y={-ROOT_NODE.h / 2}
              width={ROOT_NODE.w}   height={ROOT_NODE.h}
              style={{
                fill:         accentActive,
                stroke:       accent,
                strokeWidth:  1,
                strokeOpacity: 0.55,
              }}
            />

            {/* Active pulse dot — visible only after settled */}
            {(phase === "pipeline" || phase === "done") && (
              <motion.circle
                cx={-ROOT_NODE.w / 2 + 9} cy={0} r={2.5}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{ fill: accent }}
              />
            )}

            {/* Primary label */}
            <text y={-4} textAnchor="middle" dominantBaseline="middle"
              style={{
                fill: "hsl(var(--foreground))",
                fontSize: "13px",
                fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                fontWeight: "600",
                letterSpacing: "0.08em",
                pointerEvents: "none",
              }}
            >{ROOT_NODE.label}</text>

            {/* Sub label */}
            <text y={9} textAnchor="middle" dominantBaseline="middle"
              style={{
                fill: "hsl(var(--muted-foreground))",
                fontSize: "10px",
                fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                opacity: 0.6,
                letterSpacing: "0.04em",
                pointerEvents: "none",
              }}
            >{"// " + ROOT_NODE.sub}</text>
          </motion.g>
        </motion.g>

        {/* ── Idle hint ─────────────────────────────────── */}
        <AnimatePresence>
          {phase === "idle" && (
            <motion.text
              key={`hint-${animKey}`}
              x={IDLE_CENTER.x}
              y={IDLE_CENTER.y + 57}
              textAnchor="middle"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                fill: accent,
                fontSize: "9px",
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "0.22em",
                pointerEvents: "none",
              }}
            >
              HOVER TO RUN
            </motion.text>
          )}
        </AnimatePresence>
      </svg>

      {/* ── Replay button ─────────────────────────────── */}
      <AnimatePresence>
        {phase === "done" && (
          <motion.button
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleReplay}
            className="absolute bottom-3 right-3 font-mono text-[9px] tracking-[0.2em] uppercase border px-2.5 py-1 transition-opacity hover:opacity-80"
            style={{
              color: accent,
              borderColor: `hsla(var(--${accentColor}) / 0.35)`,
              background:  `hsla(var(--${accentColor}) / 0.06)`,
            }}
          >
            ↺ REPLAY
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
