/* Tactile feedback for keyword chips: a soft synthesized tick, plus a short
   vibration on touch devices that support it (Android; iOS Safari has no
   Vibration API).

   The tick is generated with the Web Audio API, so there is no audio file to
   download. Browsers only allow sound after the visitor has interacted with
   the page, so the audio context is created on the first click, tap, or key
   press; hovers before that are silent. */

let ctx: AudioContext | null = null;
let unlocked = false;
let lastTick = 0;

function unlock() {
  if (unlocked) return;
  unlocked = true;
  try {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (Ctor) ctx = new Ctor();
    void ctx?.resume();
  } catch {
    ctx = null;
  }
}

if (typeof window !== "undefined") {
  const opts = { once: true, capture: true } as const;
  window.addEventListener("pointerdown", unlock, opts);
  window.addEventListener("keydown", unlock, opts);
}

/* A quiet, high, very short click: a sine blip that drops in pitch and dies
   in about 40ms, so it reads as a tick rather than a beep. */
function tick() {
  if (!ctx || ctx.state !== "running") return;
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(2200, now);
  osc.frequency.exponentialRampToValueAtTime(900, now + 0.035);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.05, now + 0.003);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.05);
}

/** Call when the pointer lands on a chip. */
export function chipFeedback(pointerType: string) {
  const t = performance.now();
  // Sweeping fast across a row should not turn into a buzz.
  if (t - lastTick < 35) return;
  lastTick = t;

  tick();
  if (pointerType !== "mouse" && "vibrate" in navigator) {
    try {
      navigator.vibrate(8);
    } catch {
      /* Some browsers throw if vibration is blocked by policy. */
    }
  }
}
