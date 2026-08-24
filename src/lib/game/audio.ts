type Sfx = "right" | "wrong" | "win" | "lose" | "hint" | "click" | "pop";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let sfxBus: GainNode | null = null;
let enabled = true;

function ensure(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    ctx = new AC({ latencyHint: "interactive" });
    master = ctx.createGain();
    sfxBus = ctx.createGain();
    sfxBus.gain.value = 0.7;
    master.gain.value = enabled ? 0.9 : 0;
    sfxBus.connect(master);
    master.connect(ctx.destination);
  }
  return ctx;
}

export function unlockAudio(): void {
  const c = ensure();
  if (c && c.state === "suspended") void c.resume();
}

export function setSoundEnabled(on: boolean): void {
  enabled = on;
  if (master && ctx) {
    master.gain.setTargetAtTime(on ? 0.9 : 0, ctx.currentTime, 0.02);
  }
}

function beep(
  freq: number,
  dur: number,
  type: OscillatorType = "sine",
  gain = 0.08,
  delay = 0,
): void {
  const c = ensure();
  if (!c || !sfxBus || !enabled) return;
  if (c.state === "suspended") return;
  const t0 = c.currentTime + delay;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq * (1 + (Math.random() * 2 - 1) * 0.025), t0);
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(gain, t0 + 0.012);
  g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
  osc.connect(g);
  g.connect(sfxBus);
  osc.start(t0);
  osc.stop(t0 + dur + 0.03);
  osc.onended = () => {
    osc.disconnect();
    g.disconnect();
  };
}

export function playSfx(kind: Sfx): void {
  unlockAudio();
  switch (kind) {
    case "click":
      beep(740, 0.05, "triangle", 0.04);
      break;
    case "pop":
      beep(420, 0.08, "sine", 0.06);
      break;
    case "right":
      beep(523, 0.09, "triangle", 0.07);
      beep(784, 0.12, "sine", 0.05, 0.07);
      break;
    case "wrong":
      beep(140, 0.16, "triangle", 0.1);
      beep(110, 0.2, "sawtooth", 0.03, 0.04);
      break;
    case "hint":
      beep(660, 0.07, "square", 0.04);
      beep(990, 0.1, "sine", 0.05, 0.08);
      break;
    case "win":
      beep(523, 0.12, "sine", 0.07, 0);
      beep(659, 0.12, "sine", 0.07, 0.11);
      beep(784, 0.12, "sine", 0.07, 0.22);
      beep(1046, 0.28, "triangle", 0.08, 0.34);
      break;
    case "lose":
      beep(330, 0.18, "triangle", 0.07, 0);
      beep(247, 0.2, "triangle", 0.07, 0.16);
      beep(196, 0.36, "sine", 0.08, 0.32);
      break;
    default:
      break;
  }
}

if (typeof window !== "undefined") {
  window.addEventListener("pointerdown", () => unlockAudio(), { once: true });
  window.addEventListener("keydown", () => unlockAudio(), { once: true });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") unlockAudio();
  });
}
