"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MAX_WRONG } from "@/lib/game/types";
import { useGame } from "@/store/game-store";
import { Scene } from "./Scene";
import { WordBoard } from "./WordBoard";
import { Keyboard } from "./Keyboard";
import { cn } from "@/lib/utils";
import { categoryLabel, modeLabel, t } from "@/lib/i18n";
import { TiltAsk } from "./TiltAsk";
import { enableTilt } from "@/lib/game/gravity";

export function Play() {
  const {
    word,
    guessed,
    wrongCount,
    hintUsed,
    status,
    quote,
    quoteKey,
    juice,
    juiceKey,
    mode,
    category,
    isDaily,
    isDuo,
    stats,
    guess,
    useHint,
    startGame,
    setView,
    backToMenu,
  } = useGame();
  const locale = stats.locale;
  const [dock, setDock] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      const k = e.key.toUpperCase();
      if (k.length === 1 && k >= "A" && k <= "Z") {
        e.preventDefault();
        guess(k);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [guess]);

  useEffect(() => {
    setDock(false);
    if (status === "playing") return;
    const t = window.setTimeout(() => setDock(true), 900);
    return () => window.clearTimeout(t);
  }, [status, juiceKey]);

  const left = MAX_WRONG - wrongCount;
  const over = status !== "playing";

  const replay = () => {
    void enableTilt();
    if (isDuo) setView("duo");
    else startGame({ daily: isDaily });
  };

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-4 pb-6 pt-[max(0.75rem,env(safe-area-inset-top))]">
      <header className="mb-3 flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label={t(locale, "menu")} onClick={backToMenu}>
          <ArrowLeft className="size-5" />
        </Button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-ink">
            {isDuo ? t(locale, "twoPlayers") : isDaily ? t(locale, "daily") : categoryLabel(locale, category)}
          </p>
          <p className="text-xs text-muted">{modeLabel(locale, mode)}</p>
        </div>
        <ol className="flex gap-1" aria-label={t(locale, "lives", { n: left })}>
          {Array.from({ length: MAX_WRONG }).map((_, i) => (
            <li
              key={i}
              className={cn("size-2 rounded-full", i < wrongCount ? "bg-accent" : "bg-paper-3")}
            />
          ))}
        </ol>
        <Button
          variant="secondary"
          size="sm"
          disabled={hintUsed || over}
          onClick={useHint}
          aria-label={t(locale, "hint")}
        >
          <Lightbulb className="size-4" />
          {t(locale, "hint")}
        </Button>
      </header>

      <TiltAsk locale={locale} compact />

      <Scene
        wrongCount={wrongCount}
        status={status}
        skin={stats.skin}
        quote={quote}
        quoteKey={quoteKey}
        juice={juice}
        label={t(locale, "gallows")}
      />

      <div className="mt-4 mb-4">
        <WordBoard word={word} guessed={guessed} revealAll={status === "lost"} />
      </div>

      <div className="mt-auto">
        {dock && over ? (
          <div className="dock mb-3 rounded-[20px] border border-line bg-paper-2 px-4 py-4">
            <p className="font-display text-2xl tracking-tight">
              {status === "won" ? t(locale, "saved") : t(locale, "lost")}
            </p>
            <p className="mt-1 text-sm text-ink-soft">
              {status === "lost" ? (
                t(locale, "theWordWas", { word: word.toUpperCase() })
              ) : wrongCount === 0 ? (
                t(locale, "perfectWin")
              ) : left === 1 ? (
                t(locale, "triesLeftOne", { n: left })
              ) : (
                t(locale, "triesLeftMany", { n: left })
              )}
            </p>
            <div className="mt-4 flex gap-2">
              <Button className="flex-1" onClick={replay}>
                {t(locale, "replay")}
              </Button>
              <Button variant="secondary" className="flex-1" onClick={backToMenu}>
                {t(locale, "menu")}
              </Button>
            </div>
          </div>
        ) : null}
        <Keyboard word={word} guessed={guessed} disabled={over} onGuess={guess} locale={locale} />
      </div>
    </div>
  );
}
