"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

const MAX_TILT = 34;
const FLIP_ON = -0.42;
const FLIP_OFF = 0.18;

export type TiltPerm = "unknown" | "ask" | "on" | "denied" | "na";

type PermCtor = {
  requestPermission?: () => Promise<string>;
};

let perm: TiltPerm = "unknown";
const subs = new Set<(p: TiltPerm) => void>();

function setPerm(next: TiltPerm) {
  if (perm === next) return;
  perm = next;
  subs.forEach((fn) => fn(next));
}

function orientCtor(): PermCtor | null {
  if (typeof window === "undefined") return null;
  return DeviceOrientationEvent as unknown as PermCtor;
}

function motionCtor(): PermCtor | null {
  if (typeof window === "undefined") return null;
  return DeviceMotionEvent as unknown as PermCtor;
}

export function isHandheld(): boolean {
  if (typeof window === "undefined") return false;
  const ua = navigator.userAgent || "";
  if (/Mobi|Android|iPhone|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua)) return true;
  if (/iPad/i.test(ua)) return true;
  if (navigator.platform === "MacIntel" && (navigator.maxTouchPoints ?? 0) > 1) return true;
  return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
}

function canUseSensors(): boolean {
  if (typeof window === "undefined") return false;
  if (!isHandheld()) return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  return "DeviceOrientationEvent" in window || "DeviceMotionEvent" in window;
}

function needsMotionPrompt(): boolean {
  const ctor = orientCtor();
  return typeof ctor?.requestPermission === "function";
}

function detectPerm(): TiltPerm {
  if (!canUseSensors()) return "na";
  if (needsMotionPrompt()) return "ask";
  return "on";
}

/** Call from a real click/tap. iOS only shows the sheet in that stack. */
export function enableTilt(): Promise<boolean> {
  if (!canUseSensors()) {
    setPerm("na");
    return Promise.resolve(false);
  }
  const orient = orientCtor();
  const motion = motionCtor();
  const ask =
    typeof orient?.requestPermission === "function"
      ? orient.requestPermission()
      : Promise.resolve("granted");

  return ask
    .then((res) => {
      if (res === "granted") {
        if (typeof motion?.requestPermission === "function") {
          void motion.requestPermission().catch(() => "denied");
        }
        setPerm("on");
        return true;
      }
      setPerm("denied");
      return false;
    })
    .catch(() => {
      setPerm("denied");
      return false;
    });
}

export function useTiltPermission(): TiltPerm {
  const [p, setP] = useState<TiltPerm>(perm);
  useEffect(() => {
    subs.add(setP);
    if (perm === "unknown") setPerm(detectPerm());
    else setP(perm);
    return () => {
      subs.delete(setP);
    };
  }, []);
  return p;
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function fromOrientation(beta: number, gamma: number): { x: number; y: number } {
  const b = (beta * Math.PI) / 180;
  const g = (gamma * Math.PI) / 180;
  return { x: -Math.sin(g), y: Math.sin(b) };
}

export function useGravity() {
  const permState = useTiltPermission();
  const [tilt, setTilt] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const tiltRef = useRef(0);
  const flipRef = useRef(false);
  const targetRef = useRef(0);
  const vecRef = useRef({ x: 0, y: 1 });
  const raf = useRef(0);

  useEffect(() => {
    if (permState !== "on") return;

    const applyVec = (x: number, y: number) => {
      const mag = Math.hypot(x, y);
      if (mag < 0.12) return;
      vecRef.current = { x: x / mag, y: y / mag };
    };

    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.beta == null || e.gamma == null) return;
      const v = fromOrientation(e.beta, e.gamma);
      applyVec(v.x, v.y);
    };

    const onMotion = (e: DeviceMotionEvent) => {
      const g = e.accelerationIncludingGravity;
      if (!g || g.x == null || g.y == null) return;
      applyVec(-g.x, -g.y);
    };

    window.addEventListener("deviceorientation", onOrient, true);
    window.addEventListener("devicemotion", onMotion, true);

    const tick = () => {
      const { x, y } = vecRef.current;
      const inverted = flipRef.current ? y < FLIP_OFF : y < FLIP_ON;
      if (inverted !== flipRef.current) {
        flipRef.current = inverted;
        setFlipped(inverted);
      }
      let angle = (Math.atan2(x, y === 0 ? 0.001 : y) * 180) / Math.PI;
      if (inverted) angle = angle > 0 ? angle - 180 : angle + 180;
      targetRef.current = clamp(angle, -MAX_TILT, MAX_TILT);
      tiltRef.current += (targetRef.current - tiltRef.current) * 0.18;
      const rounded = Math.round(tiltRef.current * 10) / 10;
      setTilt((prev) => (Math.abs(prev - rounded) > 0.15 ? rounded : prev));
      raf.current = window.requestAnimationFrame(tick);
    };
    raf.current = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("deviceorientation", onOrient, true);
      window.removeEventListener("devicemotion", onMotion, true);
      window.cancelAnimationFrame(raf.current);
    };
  }, [permState]);

  return { tilt, flipped, perm: permState, enableTilt };
}

export const TiltContext = createContext({ tilt: 0, flipped: false });
export function useTilt() {
  return useContext(TiltContext);
}
