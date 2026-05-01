"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AccentColor = "amber" | "cyan" | "green" | "rose";

interface JobAgentFlowchartProps {
  accentColor?: AccentColor;
}

// ViewBox: 400 × 400  (square — fills container with no letterboxing)
//
// Z-CASCADE layout — three horizontal rows, flow changes direction each row:
//
//  Row 1 (y=70):  [AGENT_SYS] ──▶ [JOB SCOUT] ──▶ [ATS PARSER]
//                                                         │
//                                               ┌─────────┴─────────┐
//  Row 2 (y=200): [WRITER]                  [ANSWERER]              │
//                 (cover letter)            (form Q&A)              │
//                      │                        │                   │
//                      └──────────┬─────────────┘                  │
//  Row 3 (y=330):          [PLAYWRIGHT] ──▶ [SUBMIT]
//                           (browser)       (confirm)
//
// Key visual differences from WorkflowFlowchart:
//  - Square ViewBox (400×400) vs portrait (380×430)
//  - Horizontal main flow on rows 1 and 3 vs vertical-only
//  - WRITER + ANSWERER activate simultaneously (true parallel agents)
//  - Z-shaped path: right → down-left → right

const ROOT_NODE   = { id: "init", label: "AGENT_SYS.PY", sub: "orchestrator", cx: 80,  cy: 70,  w: 110, h: 34 };
const IDLE_CENTER = { x: 200, y: 200 };
const IDLE_SCALE  = 2.0;

const OTHER_NODES = [
  { id: "scout",    label: "JOB SCOUT",  sub: "Apify scraper",  cx: 210, cy: 70,  w: 110, h: 34 },
  { id: "analyze",  label: "ATS PARSER", sub: "field mapping",  cx: 340, cy: 70,  w: 110, h: 34 },
  { id: "writer",   label: "WRITER",     sub: "cover letter",   cx: 130, cy: 200, w: 110, h: 34 },
  { id: "answerer", label: "ANSWERER",   sub: "form Q&A",       cx: 270, cy: 200, w: 110, h: 34 },
  { id: "play",     label: "PLAYWRIGHT", sub: "browser fill",   cx: 200, cy: 330, w: 110, h: 34 },
  { id: "confirm",  label: "SUBMIT",     sub: "human confirm",  cx: 340, cy: 330, w: 110, h: 34 },
] as const;

// Node boundaries used to derive edge endpoints:
//   init:     left=25,  right=135, mid-y=70
//   scout:    left=155, right=265, mid-y=70
//   analyze:  left=285, right=395, top=53, bottom=87, mid-y=70
//   writer:   left=75,  right=185, top=183, bottom=217, mid-x=130
//   answerer: left=215, right=325, top=183, bottom=217, mid-x=270
//   play:     left=145, right=255, top=313, bottom=347, mid-x=200, mid-y=330
//   confirm:  left=285, right=395, top=313, mid-y=330

const EDGES = [
  // Row 1: left-to-right horizontal flow
  { id: "e1", d: "M 135 70  L 155 70" },                          // init → scout
  { id: "e2", d: "M 265 70  L 285 70" },                          // scout → analyze
  // Fork: analyze bottom forks down then branches to writer and answerer
  { id: "e3", d: "M 340 87  L 340 135 L 130 135 L 130 183" },    // analyze → writer
  { id: "e4", d: "M 340 87  L 340 135 L 270 135 L 270 183" },    // analyze → answerer
  // Converge: writer and answerer both funnel down into playwright
  { id: "e5", d: "M 130 217 L 130 263 L 196 263 L 196 313" },    // writer → playwright
  { id: "e6", d: "M 270 217 L 270 263 L 204 263 L 204 313" },    // answerer → playwright
  // Row 3: left-to-right horizontal flow
  { id: "e7", d: "M 255 330 L 285 330" },                         // playwright → submit
] as const;

const ARROWS = [
  { edgeId: "e1", points: "149,64  149,76  155,70"  },   // right-pointing into scout
  { edgeId: "e2", points: "279,64  279,76  285,70"  },   // right-pointing into analyze
  { edgeId: "e3", points: "124,177 136,177 130,183" },   // down-pointing into writer
  { edgeId: "e4", points: "264,177 276,177 270,183" },   // down-pointing into answerer
  { edgeId: "e5", points: "190,307 202,307 196,313" },   // down-pointing into playwright (left)
  { edgeId: "e6", points: "198,307 210,307 204,313" },   // down-pointing into playwright (right)
  { edgeId: "e7", points: "279,324 279,336 285,330" },   // right-pointing into submit
] as const;

// WRITER and ANSWERER activate in the same step — true parallel execution
const PIPELINE: [number, string[], string[]][] = [
  [0,    ["e1"],       []],
  [340,  [],           ["scout"]],
  [680,  ["e2"],       []],
  [980,  [],           ["analyze"]],
  [1320, ["e3", "e4"], []],                    // fork edges draw simultaneously
  [1670, [],           ["writer", "answerer"]], // both agents light up at once
  [2020, ["e5", "e6"], []],                    // convergence edges draw simultaneously
  [2370, [],           ["play"]],
  [2710, ["e7"],       []],
  [3010, [],           ["confirm"]],
];
const PIPELINE_DONE = 3370;

type Phase = "idle" | "settling" | "pipeline" | "done";

export function JobAgentFlowchart({ accentColor = "rose" }: JobAgentFlowchartProps) {
  const [phase, setPhase]               = useState<Phase>("idle");
  const [visibleNodes, setVisibleNodes] = useState<Set<string>>(new Set());
  const [visibleEdges, setVisibleEdges] = useState<Set<string>>(new Set());
  const [animKey, setAnimKey]           = useState(0);
  const timersRef    = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isHoveredRef = useRef(false);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const startPipeline = useCallback(() => {
    setVisibleNodes(new Set(["init"]));

    PIPELINE.forEach(([delay, edges, nodes]) => {
      const t = setTimeout(() => {
        if (edges.length) setVisibleEdges((prev) => new Set([...prev, ...edges]));
        if (nodes.length) setVisibleNodes((prev) => new Set([...prev, ...nodes]));
      }, delay);
      timersRef.current.push(t);
    });

    const t = setTimeout(() => {
      if (isHoveredRef.current) {
        setPhase("done");
      } else {
        setPhase("idle");
        setVisibleNodes(new Set());
        setVisibleEdges(new Set());
        setAnimKey((k) => k + 1);
      }
    }, PIPELINE_DONE);
    timersRef.current.push(t);
  }, []);

  const handleHover = useCallback(() => {
    isHoveredRef.current = true;
    if (phase === "idle") setPhase("settling");
  }, [phase]);

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
    if (phase === "done") {
      clearTimers();
      setPhase("idle");
      setVisibleNodes(new Set());
      setVisibleEdges(new Set());
      setAnimKey((k) => k + 1);
    }
  }, [phase, clearTimers]);

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

  const rootX     = phase === "idle" ? IDLE_CENTER.x : ROOT_NODE.cx;
  const rootY     = phase === "idle" ? IDLE_CENTER.y : ROOT_NODE.cy;
  const rootScale = phase === "idle" ? IDLE_SCALE : 1;

  const ghostOpacity = phase === "idle" ? 0.05 : phase === "settling" ? 0.08 : 0;

  return (
    <div
      className="absolute inset-0 select-none"
      onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}
      onClick={() => { if (phase === "idle") handleHover(); }}
      style={{ cursor: phase === "idle" ? "pointer" : "default" }}
    >
      <svg
        viewBox="0 0 400 400"
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

        {/* ── Other nodes ───────────────────────────────── */}
        {OTHER_NODES.map((node) => {
          const vis     = visibleNodes.has(node.id);
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
                  rx={2}
                  style={{
                    fill:          vis ? accentActive : accentFaint,
                    stroke:        accent,
                    strokeWidth:   vis ? 1 : 0.5,
                    strokeOpacity: vis ? 0.55 : 0.25,
                  }}
                />
                {vis && (
                  <motion.circle
                    cx={-node.w / 2 + 8} cy={0} r={2.5}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ fill: accent }}
                  />
                )}
                <text y={-5} textAnchor="middle" dominantBaseline="middle"
                  style={{
                    fill:          vis ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                    fontSize:      "12px",
                    fontFamily:    "'JetBrains Mono', 'Courier New', monospace",
                    fontWeight:    "600",
                    letterSpacing: "0.06em",
                    pointerEvents: "none",
                  }}
                >{node.label}</text>
                <text y={8} textAnchor="middle" dominantBaseline="middle"
                  style={{
                    fill:          "hsl(var(--muted-foreground))",
                    fontSize:      "10px",
                    fontFamily:    "'JetBrains Mono', 'Courier New', monospace",
                    opacity:       0.65,
                    letterSpacing: "0.03em",
                    pointerEvents: "none",
                  }}
                >{"// " + node.sub}</text>
              </motion.g>
            </g>
          );
        })}

        {/* ── ROOT NODE ─────────────────────────────────── */}
        <motion.g
          key={`root-pos-${animKey}`}
          initial={{ x: IDLE_CENTER.x, y: IDLE_CENTER.y }}
          animate={{ x: rootX, y: rootY }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={handleRootSettled}
        >
          <motion.g
            key={`root-scale-${animKey}`}
            initial={{ scale: IDLE_SCALE }}
            animate={{ scale: rootScale }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "0px 0px" }}
          >
            <AnimatePresence>
              {phase === "idle" && (
                <motion.rect
                  key="glow-ring"
                  x={-ROOT_NODE.w / 2 - 6} y={-ROOT_NODE.h / 2 - 6}
                  width={ROOT_NODE.w + 12}  height={ROOT_NODE.h + 12}
                  rx={4}
                  fill="none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.08, 0.35, 0.08] }}
                  exit={{ opacity: 0, transition: { duration: 0.3 } }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  style={{ stroke: accent, strokeWidth: 0.7 }}
                />
              )}
            </AnimatePresence>

            <rect
              x={-ROOT_NODE.w / 2} y={-ROOT_NODE.h / 2}
              width={ROOT_NODE.w}   height={ROOT_NODE.h}
              rx={2}
              style={{
                fill:          accentActive,
                stroke:        accent,
                strokeWidth:   1,
                strokeOpacity: 0.55,
              }}
            />

            {(phase === "pipeline" || phase === "done") && (
              <motion.circle
                cx={-ROOT_NODE.w / 2 + 8} cy={0} r={2.5}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{ fill: accent }}
              />
            )}

            <text y={-5} textAnchor="middle" dominantBaseline="middle"
              style={{
                fill:          "hsl(var(--foreground))",
                fontSize:      "12px",
                fontFamily:    "'JetBrains Mono', 'Courier New', monospace",
                fontWeight:    "600",
                letterSpacing: "0.06em",
                pointerEvents: "none",
              }}
            >{ROOT_NODE.label}</text>

            <text y={8} textAnchor="middle" dominantBaseline="middle"
              style={{
                fill:          "hsl(var(--muted-foreground))",
                fontSize:      "10px",
                fontFamily:    "'JetBrains Mono', 'Courier New', monospace",
                opacity:       0.65,
                letterSpacing: "0.03em",
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
              y={IDLE_CENTER.y + 52}
              textAnchor="middle"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                fill:          accent,
                fontSize:      "9px",
                fontFamily:    "'JetBrains Mono', monospace",
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
              color:       accent,
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
