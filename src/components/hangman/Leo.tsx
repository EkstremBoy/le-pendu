"use client";

import type { ReactNode } from "react";
import type { GameStatus } from "@/lib/game/types";

const INK = "var(--color-ink)";
const PAPER = "var(--color-paper)";
const SKIN = "var(--puppet-skin)";
const HAIR = "var(--puppet-hair)";
const SHIRT = "var(--puppet-shirt)";
const PANTS = "var(--puppet-pants)";
const SHOE = "var(--puppet-shoe)";
const SHADE = "color-mix(in oklab, var(--puppet-skin) 72%, var(--color-ink))";
const SHIRT_SHADE = "color-mix(in oklab, var(--puppet-shirt) 78%, var(--color-ink))";
const LINE = 1.7;

function Limb({ on, children }: { on: boolean; children: ReactNode }) {
  return <g className={on ? "limb on" : "limb"}>{children}</g>;
}

/** Palm, three fingers and a thumb. Origin is the wrist; thumb points to +x. */
function Hand() {
  return (
    <g>
      <path
        d="M-5.4 0.6
           C-6.6 3.2 -6.5 7.2 -5.6 9.4
           L-5.7 11.6
           C-6.1 14.6 -4.2 16.2 -3.1 15.4
           C-2.4 13.2 -2 11.6 -1.7 10.4
           L-1.6 11.4
           C-1.9 14.6 -0.1 16.2 1 15.3
           C1.6 13.2 1.8 11.6 2 10.4
           L2.1 11
           C1.8 14 3.5 15.4 4.7 14.4
           C5.4 12.2 5 9.6 4.6 8
           C6.6 8.4 8.3 6.8 8 4.4
           C7.7 2.4 6 1.4 4.6 2.2
           L4.4 0.8
           C2.6 2.2 -0.4 2.4 -5.4 0.6 Z"
        fill={SKIN}
        stroke={INK}
        strokeWidth="1.35"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M-2.6 10.2 L-3 13.6 M0.6 10.2 L0.5 13.8"
        fill="none"
        stroke={SHADE}
        strokeWidth="0.7"
        strokeLinecap="round"
      />
    </g>
  );
}

function Arm({ flip = false }: { flip?: boolean }) {
  return (
    <g transform={flip ? "scale(-1 1)" : undefined}>
      <path
        d="M-13 69
           C-18 73 -26 82 -26 94
           C-26 104 -24 111 -21 114
           C-18.4 116 -15.4 114.4 -15.4 111
           C-16 102 -17 90 -15 80
           C-14 74 -11 70 -9 68 Z"
        fill={SHIRT}
        stroke={INK}
        strokeWidth={LINE}
        strokeLinejoin="round"
      />
      <path
        d="M-22 84 C-19 87 -17 86 -16 83"
        fill="none"
        stroke={PAPER}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.28"
      />
      <path
        d="M-23 108 Q-19 111 -16 108"
        fill="none"
        stroke={SHIRT_SHADE}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <g transform="translate(-19 111) scale(0.66)">
        <Hand />
      </g>
    </g>
  );
}

function Leg({ flip = false }: { flip?: boolean }) {
  return (
    <g transform={flip ? "scale(-1 1)" : undefined}>
      <path
        d="M-4 104
           C-7 120 -14 138 -15 152
           L-6 153
           C-5 138 -1 120 2 104 Z"
        fill={PANTS}
        stroke={INK}
        strokeWidth={LINE}
        strokeLinejoin="round"
      />
      <path
        d="M-12 124 Q-11 136 -13 148"
        fill="none"
        stroke={PAPER}
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.18"
      />
      <path
        d="M-22 150
           C-25.5 151 -26 157 -20 159.5
           L-4 160
           C-1 160 -0.4 155 -2.6 151
           L-6 150 Z"
        fill={SHOE}
        stroke={INK}
        strokeWidth="1.45"
        strokeLinejoin="round"
      />
      <path
        d="M-17 153.2 H-7"
        fill="none"
        stroke={PAPER}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.35"
      />
    </g>
  );
}

function Torso() {
  return (
    <g>
      <path
        d="M0 61
           C-11 58 -18 65 -20 75
           C-22 88 -20 102 -17 112
           C-14 118 -8 120 0 120
           C8 120 14 118 17 112
           C20 102 22 88 20 75
           C18 65 11 58 0 61 Z"
        fill={SHIRT}
        stroke={INK}
        strokeWidth={LINE}
        strokeLinejoin="round"
      />
      <path d="M0 72 V108" stroke={SHIRT_SHADE} strokeWidth="1.15" strokeLinecap="round" />
      <circle cx="0" cy="82" r="1.45" fill={PAPER} />
      <circle cx="0" cy="94" r="1.45" fill={PAPER} />
      <path
        d="M-12 74 Q-8 88 -11 108"
        fill="none"
        stroke={PAPER}
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.22"
      />
      <path
        d="M-12 113 Q0 117 12 113"
        fill="none"
        stroke={SHIRT_SHADE}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </g>
  );
}

function Pocket() {
  return (
    <path
      d="M5 66 H12.4 Q13.8 66 13.8 67.6 V74.2 Q13.8 75.8 12.2 75.8 H5.8 Q4.6 75.8 4.6 74.2 V67.6 Q4.6 66 6 66 Z"
      fill={SHIRT_SHADE}
      stroke={INK}
      strokeWidth="1.15"
      strokeLinejoin="round"
    />
  );
}

function Face({ status, panic }: { status: GameStatus; panic: boolean }) {
  if (status === "lost") {
    return (
      <g>
        <ellipse cx="-12" cy="6" rx="4.2" ry="2.4" fill="#e7a08a" opacity="0.55" />
        <ellipse cx="12" cy="6" rx="4.2" ry="2.4" fill="#e7a08a" opacity="0.55" />
        <path
          d="M-12 -8 Q-7.5 -5.5 -4 -8.5"
          fill="none"
          stroke={HAIR}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M4 -8.5 Q8.5 -5.5 12 -8"
          fill="none"
          stroke={HAIR}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M-11 -2.5 L-5 2.5 M-5 -2.5 L-11 2.5"
          stroke={INK}
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M5 -2.5 L11 2.5 M11 -2.5 L5 2.5"
          stroke={INK}
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <ellipse cx="0" cy="12.5" rx="3.2" ry="3.6" fill={PAPER} stroke={INK} strokeWidth="1.35" />
      </g>
    );
  }

  if (status === "won") {
    return (
      <g>
        <ellipse cx="-12" cy="7" rx="4.6" ry="2.6" fill="#e7a08a" opacity="0.8" />
        <ellipse cx="12" cy="7" rx="4.6" ry="2.6" fill="#e7a08a" opacity="0.8" />
        <path
          d="M-12 -7 Q-7.5 -11 -4 -7"
          fill="none"
          stroke={HAIR}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M4 -7 Q8.5 -11 12 -7"
          fill="none"
          stroke={HAIR}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M-11 -1 Q-7.6 -6 -4.2 -1"
          fill="none"
          stroke={INK}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M4.2 -1 Q7.6 -6 11 -1"
          fill="none"
          stroke={INK}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M-6.5 9.5 Q0 16 6.5 9.5"
          fill="none"
          stroke={INK}
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path d="M-4.2 10.2 Q0 14 4.2 10.2" fill="#e07a62" opacity="0.85" />
      </g>
    );
  }

  const brow = panic ? -10.5 : -8.2;
  return (
    <g>
      <ellipse cx="-12.2" cy="7.2" rx="4.4" ry="2.5" fill="#e7a08a" opacity="0.72" />
      <ellipse cx="12.2" cy="7.2" rx="4.4" ry="2.5" fill="#e7a08a" opacity="0.72" />
      <path
        d={`M-12.4 ${brow} Q-8 ${brow - (panic ? 1.2 : 2.4)} -4.2 ${brow + 0.6}`}
        fill="none"
        stroke={HAIR}
        strokeWidth="1.55"
        strokeLinecap="round"
      />
      <path
        d={`M4.2 ${brow + 0.4} Q8.4 ${brow - (panic ? 1.6 : 2.2)} 12.4 ${brow}`}
        fill="none"
        stroke={HAIR}
        strokeWidth="1.55"
        strokeLinecap="round"
      />
      <ellipse cx="-7.2" cy="-1.2" rx="4.5" ry="5" fill={PAPER} stroke={INK} strokeWidth="1.15" />
      <ellipse cx="7.4" cy="-1.2" rx="4.5" ry="5" fill={PAPER} stroke={INK} strokeWidth="1.15" />
      <circle cx={panic ? -6.4 : -6.6} cy={panic ? -0.4 : -1.4} r="2.35" fill="#5a3a28" />
      <circle cx={panic ? 8.2 : 8} cy={panic ? -0.4 : -1.4} r="2.35" fill="#5a3a28" />
      <circle cx="-7.4" cy="-2.6" r="0.95" fill={PAPER} />
      <circle cx="7.2" cy="-2.6" r="0.95" fill={PAPER} />
      <path
        d="M-1.2 3.2 Q0.2 5.4 2.2 3.6"
        fill="none"
        stroke={SHADE}
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      {panic ? (
        <ellipse cx="0" cy="11.5" rx="3.1" ry="3.5" fill={PAPER} stroke={INK} strokeWidth="1.4" />
      ) : (
        <path
          d="M-5.6 9.2 Q0 13.6 5.8 9"
          fill="none"
          stroke={INK}
          strokeWidth="1.65"
          strokeLinecap="round"
        />
      )}
      {panic ? (
        <g>
          <ellipse cx="16.5" cy="-1" rx="1.7" ry="2.6" fill="#8ec5e8" />
          <ellipse cx="16.2" cy="-1.8" rx="0.6" ry="0.9" fill={PAPER} opacity="0.8" />
        </g>
      ) : null}
    </g>
  );
}

function Head({ status, panic }: { status: GameStatus; panic: boolean }) {
  return (
    <g>
      <path
        d="M-5.2 13 L-6.4 28 Q-7 36 -5 42 L5 42 Q7 36 6.4 28 L5.2 13 Z"
        fill={SKIN}
        stroke={INK}
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <ellipse cx="-18.5" cy="44" rx="3.6" ry="4.8" fill={SKIN} stroke={INK} strokeWidth="1.25" />
      <ellipse cx="18.5" cy="44" rx="3.6" ry="4.8" fill={SKIN} stroke={INK} strokeWidth="1.25" />
      <ellipse cx="-17.2" cy="44.4" rx="1.5" ry="2.6" fill="#e7b89a" opacity="0.7" />
      <ellipse cx="17.2" cy="44.4" rx="1.5" ry="2.6" fill="#e7b89a" opacity="0.7" />
      <ellipse cx="0" cy="42" rx="19.2" ry="20.4" fill={SKIN} stroke={INK} strokeWidth={LINE} />
      <path
        d="M-16.6 40
           C-21.2 28 -13.2 17.2 -3.2 16.4
           C1.6 16 5.4 12.2 7.4 8
           C8.8 13.4 14.2 16.2 18.2 27
           C20.4 34 17.4 46 13.2 49.2
           C7.2 39 1.4 35.6 -3.4 37
           C-10.2 38.6 -14.2 44 -16.6 40 Z"
        fill={HAIR}
        stroke={INK}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M-12.5 36 Q-5 41 3.5 34.5"
        fill="none"
        stroke={HAIR}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M-8 22 Q-2 26 5 21"
        fill="none"
        stroke={PAPER}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.22"
      />
      <ellipse cx="2" cy="58" rx="8" ry="2.4" fill={SHADE} opacity="0.28" />
      <g transform="translate(0 44)">
        <Face status={status} panic={panic} />
      </g>
    </g>
  );
}

export function LeoFigure({
  show,
  status,
  panic,
}: {
  show: (step: number) => boolean;
  status: GameStatus;
  panic: boolean;
}) {
  return (
    <g>
      <Limb on={show(5)}>
        <Leg />
      </Limb>
      <Limb on={show(6)}>
        <Leg flip />
      </Limb>
      <Limb on={show(2)}>
        <Torso />
      </Limb>
      <Limb on={show(3)}>
        <Arm />
      </Limb>
      <Limb on={show(4)}>
        <Arm flip />
      </Limb>
      <Limb on={show(2)}>
        <Pocket />
      </Limb>
      <Limb on={show(1)}>
        <Head status={status} panic={panic} />
      </Limb>
    </g>
  );
}
