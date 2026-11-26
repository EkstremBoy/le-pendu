"use client";

import {
  Briefcase,
  CalendarDays,
  House,
  Leaf,
  Medal,
  PawPrint,
  Pencil,
  Rocket,
  Shuffle,
  Shirt,
  UtensilsCrossed,
  Users,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORY_IDS, LENGTHS, type CategoryId } from "@/lib/game/types";
import { skinName } from "@/lib/game/skins";
import { lengthHint, todayKey } from "@/lib/game/words";
import { useGame } from "@/store/game-store";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { categoryLabel, lengthLabel, t } from "@/lib/i18n";
import { LangToggle } from "./LangToggle";
import { TiltAsk } from "./TiltAsk";
import { enableTilt } from "@/lib/game/gravity";

const ICONS: Record<CategoryId, LucideIcon> = {
  hasard: Shuffle,
  animaux: PawPrint,
  nourriture: UtensilsCrossed,
  ecole: Pencil,
  sports: Medal,
  espace: Rocket,
  maison: House,
  nature: Leaf,
  metiers: Briefcase,
};

export function Menu() {
  const { length, category, stats, setLength, setCategory, startGame, setView, toggleSound } =
    useGame();
  const locale = stats.locale;
  const heroName = skinName(stats.skin, locale);
  const dailyDone = stats.lastDailyWin === todayKey();

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-5 pb-10 pt-[max(1.5rem,env(safe-area-inset-top))]">
      <header className="mb-8">
        <div className="flex items-center justify-between gap-2">
          <h1 className="min-w-0 font-display text-[2.65rem] leading-none text-ink sm:text-6xl">
            {t(locale, "appTitle")}
          </h1>
          <div className="flex shrink-0 items-center gap-0.5">
            <LangToggle />
            <Button
              variant="ghost"
              size="icon"
              aria-label={stats.sound ? t(locale, "soundOn") : t(locale, "soundOff")}
              onClick={toggleSound}
            >
              {stats.sound ? <Volume2 className="size-5" /> : <VolumeX className="size-5" />}
            </Button>
          </div>
        </div>
        <p className="mt-2 max-w-[22rem] text-pretty text-ink-soft">
          {t(locale, "menuLead", { name: heroName })}
        </p>
      </header>

      <section className="mb-6">
        <p className="mb-2 text-xs font-medium tracking-wide text-muted uppercase">
          {t(locale, "length")}
        </p>
        <div className="grid grid-cols-3 gap-2 rounded-[20px] bg-paper-2 p-1.5">
          {LENGTHS.map((id) => {
            const on = length === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setLength(id)}
                className={cn(
                  "rounded-[14px] px-2 py-3 text-center transition-colors duration-150",
                  on ? "bg-paper text-ink shadow-sm" : "text-ink-soft hover:text-ink",
                )}
              >
                <span className="block text-sm font-semibold">{lengthLabel(locale, id)}</span>
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-sm text-ink-soft">{lengthHint(locale, length)}</p>
      </section>

      <section className="mb-8">
        <p className="mb-2 text-xs font-medium tracking-wide text-muted uppercase">
          {t(locale, "category")}
        </p>
        <div className="flex flex-wrap gap-2">
          {CATEGORY_IDS.map((id) => {
            const Icon = ICONS[id];
            const on = category === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setCategory(id)}
                className={cn(
                  "inline-flex h-10 items-center gap-1.5 rounded-full border px-3 text-sm transition-colors duration-150",
                  on
                    ? "border-ink bg-ink text-paper"
                    : "border-line bg-paper text-ink-soft hover:bg-paper-2 hover:text-ink",
                )}
              >
                <Icon className="size-3.5" strokeWidth={2} />
                {categoryLabel(locale, id)}
              </button>
            );
          })}
        </div>
      </section>

      <TiltAsk locale={locale} />

      <Button
        size="lg"
        className="h-12 w-full rounded-[18px] text-base"
        onClick={() => {
          void enableTilt();
          startGame();
        }}
      >
        {t(locale, "saveThem")}
      </Button>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <Button
          variant="secondary"
          onClick={() => {
            void enableTilt();
            startGame({ daily: true });
          }}
        >
          <CalendarDays className="size-4" />
          {dailyDone ? t(locale, "dailyDone") : t(locale, "daily")}
        </Button>
        <Button variant="secondary" onClick={() => setView("duo")}>
          <Users className="size-4" />
          {t(locale, "twoPlayers")}
        </Button>
      </div>

      <Button
        variant="ghost"
        className="mt-2 w-full justify-center"
        onClick={() => setView("skins")}
      >
        <Shirt className="size-4" />
        {t(locale, "characters")}
      </Button>

      <p className="mt-auto pt-8 text-center text-sm tabular-nums text-muted">
        {stats.wins === 1
          ? t(locale, "winOne", { n: stats.wins })
          : t(locale, "winMany", { n: stats.wins })}
        <span className="mx-2 text-line">·</span>
        {t(locale, "streak", { n: stats.streak })}
        {stats.bestStreak > 0 ? ` ${t(locale, "record", { n: stats.bestStreak })}` : ""}
      </p>
    </div>
  );
}
