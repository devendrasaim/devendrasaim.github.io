"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AccentColor = "amber" | "cyan" | "green" | "rose";

interface WorkflowFlowchartProps {
  accentColor?: AccentColor;
}

// ViewBox: 560 × 350 (16:10) — transparent background
// Layout: ROOT on RIGHT, pipeline flows LEFT then DOWN through fork
const NODES = [
  { id: "init",    label: "AUTOMATE.PY",  sub: "entry point",    cx: 490, cy: 85,  w: 115, h: 34 },
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
  { id: "e1",  d: "M 432 85  L 402 85" },                                 // ROOT ← QUEUE  (←)
  { id: "e2",  d: "M 287 85  L 252 85" },                                 // QUEUE ← TOPIC (←)
  { id: "e3l", d: "M 200 102 L 200 133 L 110 133 L 110 169" },            // TOPIC → YT   (↙)
  { id: "e3r", d: "M 200 102 L 200 133 L 265 133 L 265 169" },            // TOPIC → PP   (↘)
  { id: "e4l", d: "M 110 201 L 110 232 L 169 232 L 169 251" },            // YT → GEMINI  (↘)
  { id: "e4r", d: "M 265 201 L 265 232 L 205 232 L 205 251" },            // PP → GEMINI  (↙)
  { id: "e5",  d: "M 187 285 L 187 315" },                                // GEMINI → PUB (↓)
] as const;

// Arrowhead tips at each edge endpoint
const ARROWS = [
  { edgeId: "e1",  points: "409,79 409,91 402,85"   },  // ← left
  { edgeId: "e2",  points: "259,79 259,91 252,85"   },  // ← left
  { edgeId: "e3l", points: "104,162 116,162 110,169" },  // ↓ down
  { edgeId: "e3r", points: "259,162 271,162 265,169" },  // ↓ down
  { edgeId: "e4l", points: "163,244 175,244 169,251" },  // ↓ down
  { edgeId: "e4r", points: "199,244 211,244 205,251" },  // ↓ down
  { edgeId: "e5",  points: "181,308 193,308 187,315" },  // ↓ down
] as const;

// [delay_ms, edges[], nodes[]]
const SCHEDULE: [number, string[], string[]][] = [
  [0,    [],             ["init"]],
  [360,  ["e1"],         []],
  [670,  [],             ["queue"]],
  [1020, ["e2"],         []],
  [1320, [],             ["topic"]],
  [1670, ["e3l", "e3r"], []],
  [2020, [],             ["yt", "pp"]],
  [2370, ["e4l", "e4r"], []],
  [2720, [],             ["gemini"]],
  [3060, ["e5"],         []],
  [3360, [],             ["publish"]],
];

const DONE_AT = 3720;

export function WorkflowFlowchart({ accentColor = "cyan" }: WorkflowFlowchartProps) {
  const [visibleNodes, setVisibleNodes] = useState<Set<string>>(new Set());
  const [visibleEdges, setVisibleEdges] = useState<Set<string>>(new Set());
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const run = useCallback(() => {
    if (started && !done) return;
    clearTimers();
    setVisibleNodes(new Set());
    setVisibleEdges(new Set());
    setStarted(true);
    setDone(false);
    setAnimKey((k) => k + 1);

    SCHEDULE.forEach(([delay, edges, nodes]) => {
      const t = setTimeout(() => {
        if (edges.length) setVisibleEdges((prev) => new Set([...prev, ...edges]));
        if (nodes.length) setVisibleNodes((prev) => new Set([...prev, ...nodes]));
      }, delay);
      timersRef.current.push(t);
    });

    const t = setTimeout(() => setDone(true), DONE_AT);
    timersRef.current.push(t);
  }, [started, done, clearTimers]);

  const accent       = `hsl(var(--${accentColor}))`;
  const accentFaint  = `hsla(var(--${accentColor}) / 0.07)`;
  const accentActive = `hsla(var(--${accentColor}) / 0.14)`;

  return (
    <div
      className="absolute inset-0 select-none"
      onMouseEnter={() => { if (!started || done) run(); }}
      onClick={() => { if (!started || done) run(); }}
      style={{ cursor: !started || done ? "pointer" : "default" }}
    >
      <svg
        viewBox="0 0 560 350"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        {/* No background rect — fully transparent */}

        {/* Edges */}
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
              animate={{
                pathLength: vis ? 1 : 0,
                opacity: vis ? 0.6 : (started ? 0 : 0.05),
              }}
              transition={{
                pathLength: { duration: 0.42, ease: "easeInOut" },
                opacity: { duration: 0.15 },
              }}
              style={{ stroke: accent }}
            />
          );
        })}

        {/* Arrowheads */}
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

        {/* Nodes */}
        {NODES.map((node) => {
          const vis = visibleNodes.has(node.id);
          // ROOT gets a brighter ghost to signal it's the entry point
          const ghostOpacity = node.id === "init" ? 0.2 : 0.08;

          return (
            <g key={node.id} transform={`translate(${node.cx}, ${node.cy})`}>
              <motion.g
                key={`${node.id}-${animKey}`}
                initial={{ opacity: 0, scale: 0.72 }}
                animate={{
                  opacity: vis ? 1 : (started ? 0 : ghostOpacity),
                  scale:   vis ? 1 : (started ? 0.72 : 1),
                }}
                transition={{
                  opacity: { duration: vis ? 0.3 : 0.08 },
                  scale:   { duration: vis ? 0.4 : 0.08, ease: [0.22, 1, 0.36, 1] },
                }}
                style={{ transformOrigin: "0px 0px" }}
              >
                {/* Node rect */}
                <rect
                  x={-node.w / 2}
                  y={-node.h / 2}
                  width={node.w}
                  height={node.h}
                  style={{
                    fill: vis ? accentActive : accentFaint,
                    stroke: accent,
                    strokeWidth: vis ? 1 : 0.5,
                    strokeOpacity: vis ? 0.55 : 0.25,
                  }}
                />

                {/* Pulsing active dot */}
                {vis && (
                  <motion.circle
                    cx={-node.w / 2 + 9}
                    cy={0}
                    r={2.5}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ fill: accent }}
                  />
                )}

                {/* Primary label */}
                <text
                  y={-4}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    fill: vis ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                    fontSize: "13px",
                    fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                    fontWeight: "600",
                    letterSpacing: "0.08em",
                    pointerEvents: "none",
                  }}
                >
                  {node.label}
                </text>

                {/* Sub label */}
                <text
                  y={9}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    fill: "hsl(var(--muted-foreground))",
                    fontSize: "10px",
                    fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                    opacity: 0.6,
                    letterSpacing: "0.04em",
                    pointerEvents: "none",
                  }}
                >
                  {"// " + node.sub}
                </text>
              </motion.g>
            </g>
          );
        })}

        {/* Idle hint — positioned below ROOT node */}
        <AnimatePresence>
          {!started && (
            <motion.text
              key="hint"
              x={490}
              y={116}
              textAnchor="middle"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.35, 0.8, 0.35] }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                fill: accent,
                fontSize: "9px",
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "0.22em",
              }}
            >
              HOVER TO RUN
            </motion.text>
          )}
        </AnimatePresence>
      </svg>

      {/* Replay button */}
      <AnimatePresence>
        {done && (
          <motion.button
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => { e.stopPropagation(); run(); }}
            className="absolute bottom-3 right-3 font-mono text-[9px] tracking-[0.2em] uppercase border px-2.5 py-1 transition-opacity hover:opacity-80"
            style={{
              color: accent,
              borderColor: `hsla(var(--${accentColor}) / 0.35)`,
              background: `hsla(var(--${accentColor}) / 0.06)`,
            }}
          >
            ↺ REPLAY
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
