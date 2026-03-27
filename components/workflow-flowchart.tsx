"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AccentColor = "amber" | "cyan" | "green" | "rose";

interface WorkflowFlowchartProps {
  accentColor?: AccentColor;
}

// ViewBox: 380 × 430  (vertical top-to-bottom flow)
// All nodes share w=120 for uniform appearance.
// Flow: ROOT(top) → QUEUE → TOPIC → fork(YT/PP) → GEMINI → INSTAGRAM(bottom)
//
// Node centers (cx, cy):
//   ROOT      cx=190, cy=44   top=27,  bottom=61
//   QUEUE     cx=190, cy=114  top=97,  bottom=131
//   TOPIC     cx=190, cy=184  top=167, bottom=201
//   YT        cx=110, cy=252  top=237, bottom=267  (h=30)
//   PP        cx=270, cy=252  top=237, bottom=267  (h=30)
//   GEMINI    cx=190, cy=320  top=303, bottom=337
//   INSTAGRAM cx=190, cy=390  top=373, bottom=407

const ROOT_NODE   = { id: "init", label: "AUTOMATE.PY", sub: "entry point", cx: 190, cy: 44, w: 120, h: 34 };
const IDLE_CENTER = { x: 190, y: 215 };
const IDLE_SCALE  = 2.0;

const OTHER_NODES = [
  { id: "queue",   label: "QUEUE MGMT",  sub: "brainstorm < 3", cx: 190, cy: 114, w: 120, h: 34 },
  { id: "topic",   label: "PICK TOPIC",  sub: "source routing", cx: 190, cy: 184, w: 120, h: 34 },
  { id: "yt",      label: "YOUTUBE",     sub: "video extract",  cx: 110, cy: 252, w: 120, h: 30 },
  { id: "pp",      label: "PERPLEXITY",  sub: "web search",     cx: 270, cy: 252, w: 120, h: 30 },
  { id: "gemini",  label: "GEMINI 2.5",  sub: "AI processing",  cx: 190, cy: 320, w: 120, h: 34 },
  { id: "publish", label: "INSTAGRAM",   sub: "Imagen → post",  cx: 190, cy: 390, w: 120, h: 34 },
] as const;

const EDGES = [
  { id: "e1",  d: "M 190 61  L 190 97" },
  { id: "e2",  d: "M 190 131 L 190 167" },
  { id: "e3l", d: "M 190 201 L 190 219 L 110 219 L 110 237" },
  { id: "e3r", d: "M 190 201 L 190 219 L 270 219 L 270 237" },
  { id: "e4l", d: "M 110 267 L 110 283 L 182 283 L 182 303" },
  { id: "e4r", d: "M 270 267 L 270 283 L 198 283 L 198 303" },
  { id: "e5",  d: "M 190 337 L 190 373" },
] as const;

const ARROWS = [
  { edgeId: "e1",  points: "184,91  196,91  190,97"  },
  { edgeId: "e2",  points: "184,161 196,161 190,167" },
  { edgeId: "e3l", points: "104,231 116,231 110,237" },
  { edgeId: "e3r", points: "264,231 276,231 270,237" },
  { edgeId: "e4l", points: "176,297 188,297 182,303" },
  { edgeId: "e4r", points: "192,297 204,297 198,303" },
  { edgeId: "e5",  points: "184,367 196,367 190,373" },
] as const;

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
        viewBox="0 0 380 430"
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
              y={IDLE_CENTER.y + 62}
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
