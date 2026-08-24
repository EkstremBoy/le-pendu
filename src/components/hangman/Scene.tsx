"use client";

import type { ReactNode } from "react";
import type { GameStatus, SkinId } from "@/lib/game/types";
import type { Juice } from "@/store/game-store";
import { useTilt } from "@/lib/game/gravity";

const HANG_X = 708;
const HANG_Y = 320;
const HANG_SCALE = 4.8;

const INK = "var(--color-ink)";
const PAPER = "var(--color-paper)";

type Props = {
  wrongCount: number;
  status: GameStatus;
  skin: SkinId;
  quote: string | null;
  quoteKey: number;
  juice: Juice;
  label?: string;
};

function Face({
  status,
  panic,
  skin,
}: {
  status: GameStatus;
  panic: boolean;
  skin: SkinId;
}) {
  const robot = skin === "bit";
  const cat = skin === "nori";
  const dino = skin === "rex";
  const iris = dino ? "#3d4f2a" : cat ? "#c45c3e" : "#5a3a28";

  if (robot) {
    if (status === "lost") {
      return (
        <g>
          <rect x="-16" y="-12" width="32" height="20" rx="4" fill={INK} />
          <path d="M-8 -4 L-4 2 M-4 -4 L-8 2" stroke="#f2b6a8" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M4 -4 L8 2 M8 -4 L4 2" stroke="#f2b6a8" strokeWidth="1.8" strokeLinecap="round" />
          <rect x="-6" y="12" width="12" height="5" rx="2" fill={INK} />
        </g>
      );
    }
    if (status === "won") {
      return (
        <g>
          <rect x="-16" y="-12" width="32" height="20" rx="4" fill={INK} />
          <path d="M-10 -2 Q-7 -7 -4 -2" fill="none" stroke="#9ad0c8" strokeWidth="2" strokeLinecap="round" />
          <path d="M4 -2 Q7 -7 10 -2" fill="none" stroke="#9ad0c8" strokeWidth="2" strokeLinecap="round" />
          <path d="M-7 14 Q0 20 7 14" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
        </g>
      );
    }
    return (
      <g>
        <rect x="-16" y="-12" width="32" height="20" rx="4" fill={INK} />
        <rect x="-12" y="-7" width="9" height="10" rx="1.6" fill={panic ? "#e7c46a" : "#9ad0c8"} />
        <rect x="3" y="-7" width="9" height="10" rx="1.6" fill={panic ? "#e7c46a" : "#9ad0c8"} />
        <circle cx="-7.5" cy={panic ? -1 : -3} r="1.7" fill={INK} />
        <circle cx="7.5" cy={panic ? -1 : -3} r="1.7" fill={INK} />
        {panic ? (
          <ellipse cx="0" cy="15" rx="4" ry="4.4" fill={PAPER} stroke={INK} strokeWidth="1.6" />
        ) : (
          <rect x="-7" y="13" width="14" height="3" rx="1.4" fill={INK} />
        )}
      </g>
    );
  }

  if (status === "lost") {
    return (
      <g>
        <ellipse cx="-13" cy="8" rx="5.6" ry="3.4" fill="#e7a08a" opacity="0.55" />
        <ellipse cx="13" cy="8" rx="5.6" ry="3.4" fill="#e7a08a" opacity="0.55" />
        <path d="M-16 -9 Q-9 -4 -5 -9" fill="none" stroke={INK} strokeWidth="2.3" strokeLinecap="round" />
        <path d="M5 -9 Q9 -4 16 -9" fill="none" stroke={INK} strokeWidth="2.3" strokeLinecap="round" />
        <ellipse cx="-9" cy="-2" rx="6.4" ry="7" fill={PAPER} />
        <ellipse cx="9" cy="-2" rx="6.4" ry="7" fill={PAPER} />
        <path d="M-12.6 -5.4 L-5.4 1.4 M-5.4 -5.4 L-12.6 1.4" stroke={INK} strokeWidth="2.3" strokeLinecap="round" />
        <path d="M5.4 -5.4 L12.6 1.4 M12.6 -5.4 L5.4 1.4" stroke={INK} strokeWidth="2.3" strokeLinecap="round" />
        <ellipse cx="0" cy="14" rx="5.6" ry="3.8" fill="#2c261e" />
        <ellipse cx="0" cy="14.8" rx="3.4" ry="2.2" fill="#c45c3e" />
        <path d="M1 16 Q6 22 2 20 Q0 18 1 16 Z" fill="#e07a62" stroke={INK} strokeWidth="0.9" strokeLinejoin="round" />
      </g>
    );
  }

  if (status === "won") {
    return (
      <g>
        <ellipse cx="-13" cy="8" rx="6" ry="3.6" fill="#e7a08a" opacity="0.78" />
        <ellipse cx="13" cy="8" rx="6" ry="3.6" fill="#e7a08a" opacity="0.78" />
        <path d="M-16 -10 Q-9 -16 -4 -9" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
        <path d="M4 -9 Q9 -16 16 -10" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
        <path d="M-13 -1 Q-9 -9 -5 -1" fill="none" stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
        <path d="M5 -1 Q9 -9 13 -1" fill="none" stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
        <path d="M-10 10 Q0 22 10 10 Z" fill="#2c261e" />
        <path d="M-7 11 Q0 19 7 11" fill={PAPER} />
        <path d="M-4 13.5 L-2.2 13.5 L-2.2 16 L-4 16 Z" fill={PAPER} />
        <path d="M2.2 13.5 L4 13.5 L4 16 L2.2 16 Z" fill={PAPER} />
      </g>
    );
  }

  const lookY = panic ? -4.2 : -1.6;
  const lookL = panic ? -8.2 : -7.6;
  const lookR = panic ? 9.6 : 10.2;
  return (
    <g>
      <ellipse cx="-13.5" cy="8.5" rx="5.6" ry="3.3" fill="#e7a08a" opacity="0.7" />
      <ellipse cx="13.5" cy="8.5" rx="5.6" ry="3.3" fill="#e7a08a" opacity="0.7" />
      {panic ? (
        <>
          <path d="M-17 -11 Q-10 -17 -4 -9" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
          <path d="M4 -9 Q10 -17 17 -11" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M-16 -8 Q-10 -7 -5 -9.5" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M5 -10.5 Q10 -14 16 -8" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
        </>
      )}
      <ellipse cx="-9" cy="-2.2" rx="7.1" ry="8.2" fill={PAPER} stroke={INK} strokeWidth="0.9" opacity="0.95" />
      <ellipse cx="9" cy="-2.2" rx="7.1" ry="8.2" fill={PAPER} stroke={INK} strokeWidth="0.9" opacity="0.95" />
      <circle cx={lookL} cy={lookY} r="4.4" fill={iris} />
      <circle cx={lookR} cy={lookY} r="4.4" fill={iris} />
      <circle cx={lookL} cy={lookY} r="2.15" fill={INK} />
      <circle cx={lookR} cy={lookY} r="2.15" fill={INK} />
      <circle cx={lookL - 1.5} cy={lookY - 1.6} r="1.35" fill={PAPER} />
      <circle cx={lookR - 1.5} cy={lookY - 1.6} r="1.35" fill={PAPER} />
      <path d="M-16.2 -4 Q-9 -9.6 -2.2 -4" fill="none" stroke={INK} strokeWidth="1.5" strokeLinecap="round" opacity="0.28" />
      <path d="M2.2 -4 Q9 -9.6 16.2 -4" fill="none" stroke={INK} strokeWidth="1.5" strokeLinecap="round" opacity="0.28" />
      <ellipse cx="0" cy="6.4" rx="2.1" ry="1.5" fill="#e2a88a" />
      {cat ? (
        <>
          <path d="M-22 6 L-14 8 M-22 10 L-14 10 M-22 14 L-14 12" stroke={INK} strokeWidth="1.15" strokeLinecap="round" opacity="0.7" />
          <path d="M22 6 L14 8 M22 10 L14 10 M22 14 L14 12" stroke={INK} strokeWidth="1.15" strokeLinecap="round" opacity="0.7" />
        </>
      ) : null}
      {panic ? (
        <>
          <ellipse cx="0" cy="15" rx="4.6" ry="5.2" fill={PAPER} stroke={INK} strokeWidth="1.8" />
          <ellipse cx="21" cy="0" rx="3.4" ry="5" fill="#8ec5e8" />
          <ellipse cx="21" cy="2.2" rx="1.6" ry="2.1" fill="#d5e3ee" />
        </>
      ) : (
        <path d="M-8 12.5 Q-2 14 0 13.5 Q4 18 9 12" fill="none" stroke={INK} strokeWidth="2.15" strokeLinecap="round" />
      )}
    </g>
  );
}

function Limb({ on, children }: { on: boolean; children: ReactNode }) {
  return <g className={on ? "limb on" : "limb"}>{children}</g>;
}

export function Scene({ wrongCount, status, skin, quote, quoteKey, juice, label }: Props) {
  const perfect = status === "won" && wrongCount === 0;
  const show = (n: number) => perfect || wrongCount >= n;
  const panic = status === "playing" && wrongCount >= 5;
  const confetti = status === "won";
  const { tilt } = useTilt();
  const robot = skin === "bit";

  return (
    <div
      className={`stage skin-${skin} w-full`}
      data-wrong={wrongCount}
      data-status={status}
      data-perfect={perfect ? "true" : "false"}
      data-juice={juice ?? ""}
      aria-label={label}
    >
      <svg className="stage-svg" viewBox="0 0 1200 1600" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">
        <image href="/art/hills.jpg?v=6" x="0" y="0" width="1200" height="1600" />
        <g transform={`translate(${HANG_X} ${HANG_Y}) rotate(${status === "won" ? 0 : tilt})`}>
        <g className="swing-root">
          {status === "playing" ? (
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="-2.4;2.4;-2.4"
              dur="2.8s"
              repeatCount="indefinite"
            />
          ) : null}
          <g transform={`scale(${HANG_SCALE})`}>
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="12"
              stroke="var(--color-rope)"
              strokeWidth="3.4"
              strokeLinecap="round"
              opacity={status === "won" ? 0 : 1}
            />
            <ellipse cx="0" cy="12" rx="2.4" ry="1.8" fill="var(--color-rope)" opacity={status === "won" ? 0 : 1} />
            <g className="halo">
              <ellipse cx="0" cy="16" rx="20" ry="7" fill="none" stroke="#e9c46a" strokeWidth="2.4" />
            </g>

            {skin === "nori" ? (
              <Limb on={show(2)}>
                <path d="M14 92 Q34 108 20 128" fill="none" stroke={INK} strokeWidth="8.2" strokeLinecap="round" />
                <path d="M14 92 Q34 108 20 128" fill="none" stroke="var(--puppet-extra)" strokeWidth="6.2" strokeLinecap="round" />
                <ellipse cx="18" cy="130" rx="4.6" ry="3.6" fill="var(--puppet-extra)" stroke={INK} strokeWidth="1.1" />
              </Limb>
            ) : null}
            {skin === "rex" ? (
              <Limb on={show(2)}>
                <path d="M14 90 Q36 100 24 128" fill="none" stroke={INK} strokeWidth="9.4" strokeLinecap="round" />
                <path d="M14 90 Q36 100 24 128" fill="none" stroke="var(--puppet-skin)" strokeWidth="7.2" strokeLinecap="round" />
                <path d="M20 124 L30 132 L16 132 Z" fill="var(--puppet-skin)" stroke={INK} strokeWidth="1.1" strokeLinejoin="round" />
              </Limb>
            ) : null}

            <Limb on={show(5)}>
              <path d="M-8 104 Q-14 124 -12 140" fill="none" stroke={INK} strokeWidth="11" strokeLinecap="round" />
              <path d="M-8 104 Q-14 124 -12 140" fill="none" stroke="var(--puppet-pants)" strokeWidth="8.4" strokeLinecap="round" />
              <ellipse cx="-12" cy="144" rx="8.4" ry="4.6" fill="var(--puppet-shoe)" stroke={INK} strokeWidth="1.15" />
              <ellipse cx="-18" cy="143" rx="3.6" ry="2.6" fill="var(--puppet-shoe)" />
              <ellipse cx="-10" cy="142.4" rx="2.4" ry="1.2" fill={PAPER} opacity="0.22" />
            </Limb>
            <Limb on={show(6)}>
              <path d="M8 104 Q14 124 12 140" fill="none" stroke={INK} strokeWidth="11" strokeLinecap="round" />
              <path d="M8 104 Q14 124 12 140" fill="none" stroke="var(--puppet-pants)" strokeWidth="8.4" strokeLinecap="round" />
              <ellipse cx="12" cy="144" rx="8.4" ry="4.6" fill="var(--puppet-shoe)" stroke={INK} strokeWidth="1.15" />
              <ellipse cx="18" cy="143" rx="3.6" ry="2.6" fill="var(--puppet-shoe)" />
              <ellipse cx="14" cy="142.4" rx="2.4" ry="1.2" fill={PAPER} opacity="0.22" />
            </Limb>

            <Limb on={show(2)}>
              <path
                d="M-19 62 C-26 70 -27 88 -22 100 C-16 112 -7 116 0 116 C7 116 16 112 22 100 C27 88 26 70 19 62 C10 58 0 59 -19 62 Z"
                fill="var(--puppet-shirt)"
                stroke={INK}
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
              <path d="M-10 63 Q0 70 10 63" fill="none" stroke={PAPER} strokeWidth="2.4" strokeLinecap="round" opacity="0.55" />
              <circle cx="0" cy="80" r="2.15" fill="var(--puppet-pants)" opacity="0.55" />
              <circle cx="0" cy="90" r="2.15" fill="var(--puppet-pants)" opacity="0.55" />
              <path d="M-18 102 Q0 112 18 102 Q12 116 0 117 Q-12 116 -18 102 Z" fill="var(--puppet-pants)" stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
              <ellipse cx="-6" cy="78" rx="6" ry="4" fill={PAPER} opacity="0.14" />
            </Limb>

            <Limb on={show(3)}>
              <path d="M-22 66 Q-42 80 -34 104" fill="none" stroke={INK} strokeWidth="10.2" strokeLinecap="round" />
              <path d="M-22 66 Q-42 80 -34 104" fill="none" stroke="var(--puppet-shirt)" strokeWidth="7.6" strokeLinecap="round" />
              <path d="M-34 100 Q-38 112 -30 116" fill="none" stroke="var(--puppet-skin)" strokeWidth="6.2" strokeLinecap="round" />
              <ellipse cx="-29" cy="119" rx="6.4" ry="5.4" fill="var(--puppet-skin)" stroke={INK} strokeWidth="1.15" />
              <ellipse cx="-23" cy="120.2" rx="2.6" ry="3.1" fill="var(--puppet-skin)" stroke={INK} strokeWidth="0.9" />
            </Limb>
            <Limb on={show(4)}>
              <path d="M22 66 Q42 80 34 104" fill="none" stroke={INK} strokeWidth="10.2" strokeLinecap="round" />
              <path d="M22 66 Q42 80 34 104" fill="none" stroke="var(--puppet-shirt)" strokeWidth="7.6" strokeLinecap="round" />
              <path d="M34 100 Q38 112 30 116" fill="none" stroke="var(--puppet-skin)" strokeWidth="6.2" strokeLinecap="round" />
              <ellipse cx="29" cy="119" rx="6.4" ry="5.4" fill="var(--puppet-skin)" stroke={INK} strokeWidth="1.15" />
              <ellipse cx="23" cy="120.2" rx="2.6" ry="3.1" fill="var(--puppet-skin)" stroke={INK} strokeWidth="0.9" />
            </Limb>

            <Limb on={show(1)}>
              {skin === "nori" ? (
                <g>
                  <path d="M-8 16 L-24 -8 L2 18 Z" fill="var(--puppet-extra)" stroke={INK} strokeWidth="1.3" strokeLinejoin="round" />
                  <path d="M8 16 L24 -8 L-2 18 Z" fill="var(--puppet-extra)" stroke={INK} strokeWidth="1.3" strokeLinejoin="round" />
                  <path d="M-7 16 L-16 2 L1 18 Z" fill="#f4b8a8" />
                  <path d="M7 16 L16 2 L-1 18 Z" fill="#f4b8a8" />
                </g>
              ) : null}
              {skin === "rex" ? (
                <g>
                  <path d="M-9 14 L-14 -10 L0 16 Z" fill="var(--puppet-extra)" stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
                  <path d="M-1 12 L1 -12 L8 16 Z" fill="var(--puppet-extra)" stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
                  <path d="M8 14 L16 -8 L2 16 Z" fill="var(--puppet-extra)" stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
                </g>
              ) : null}
              {skin === "bit" ? (
                <g>
                  <line x1="0" y1="12" x2="0" y2="-2" stroke={INK} strokeWidth="4.2" strokeLinecap="round" />
                  <line x1="0" y1="12" x2="0" y2="-2" stroke="var(--puppet-extra)" strokeWidth="2.6" strokeLinecap="round" />
                  <circle cx="0" cy="-4" r="4.2" fill="var(--puppet-extra)" stroke={INK} strokeWidth="1.2" />
                  <circle cx="0" cy="-4" r="1.7" fill={PAPER} />
                </g>
              ) : null}

              {robot ? (
                <rect x="-22" y="18" width="44" height="46" rx="10" fill="var(--puppet-skin)" stroke={INK} strokeWidth="1.8" />
              ) : (
                <ellipse cx="0" cy="42" rx="24" ry="26.5" fill="var(--puppet-skin)" stroke={INK} strokeWidth="1.8" />
              )}

              {!robot ? (
                <g>
                  <path d="M-24 36 Q-28 14 -10 10 Q0 2 10 10 Q28 14 24 36 Q14 18 0 16 Q-14 18 -24 36 Z" fill="var(--puppet-hair)" />
                  <path d="M7 8 Q16 -10 3 6" fill="none" stroke="var(--puppet-hair)" strokeWidth="3.8" strokeLinecap="round" />
                  <path d="M-12 16 Q-4 20 6 15" fill="none" stroke="var(--puppet-hair)" strokeWidth="2.2" strokeLinecap="round" opacity="0.35" />
                </g>
              ) : (
                <rect x="-22" y="18" width="44" height="8" rx="3" fill="var(--puppet-extra)" opacity="0.55" />
              )}

              {!robot ? (
                <ellipse cx="-22" cy="46" rx="4.2" ry="5.4" fill="var(--puppet-skin)" stroke={INK} strokeWidth="1.15" />
              ) : null}
              {!robot ? (
                <ellipse cx="22" cy="46" rx="4.2" ry="5.4" fill="var(--puppet-skin)" stroke={INK} strokeWidth="1.15" />
              ) : null}

              {skin === "rex" ? (
                <g>
                  <ellipse cx="0" cy="58" rx="13" ry="8" fill="var(--puppet-shirt)" stroke={INK} strokeWidth="1.2" />
                  <ellipse cx="-7" cy="56" rx="2.1" ry="1.5" fill={INK} opacity="0.35" />
                  <ellipse cx="7" cy="56" rx="2.1" ry="1.5" fill={INK} opacity="0.35" />
                </g>
              ) : null}

              <g transform="translate(0 44)">
                <Face status={status} panic={panic} skin={skin} />
              </g>
            </Limb>
          </g>
        </g>
        </g>
      </svg>

      {quote ? (
        <p key={quoteKey} className={wrongCount === 0 && status === "playing" ? "speech speech-empty" : "speech"} aria-live="polite">
          {quote}
        </p>
      ) : null}

      {confetti ? (
        <div className="confetti" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              style={{
                left: `${8 + i * 7.5}%`,
                background: i % 3 === 0 ? "var(--color-accent)" : i % 3 === 1 ? "var(--color-sage)" : "var(--color-ink)",
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
