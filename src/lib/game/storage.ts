import type { SkinId } from "./types";
import { unlockedSkins } from "./skins";
import type { Locale } from "@/lib/i18n";

const KEY = "fiou-save-v1";
const VERSION = 1;

export type Stats = {
  version: number;
  wins: number;
  losses: number;
  streak: number;
  bestStreak: number;
  wordsFound: number;
  skin: SkinId;
  sound: boolean;
  lastDailyWin: string | null;
  locale: Locale;
  recentWords: string[];
};

const DEFAULTS: Stats = {
  version: VERSION,
  wins: 0,
  losses: 0,
  streak: 0,
  bestStreak: 0,
  wordsFound: 0,
  skin: "leo",
  sound: true,
  lastDailyWin: null,
  locale: "fr",
  recentWords: [],
};

function migrate(raw: Partial<Stats> & { version?: number }): Stats {
  const locale: Locale = raw.locale === "en" ? "en" : "fr";
  const recentWords = Array.isArray(raw.recentWords)
    ? raw.recentWords.filter((w): w is string => typeof w === "string").slice(-120)
    : [];
  return { ...DEFAULTS, ...raw, locale, recentWords, version: VERSION };
}

export function loadStats(): Stats {
  if (typeof window === "undefined") return { ...DEFAULTS };
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULTS };
    const parsed = JSON.parse(raw) as Partial<Stats>;
    const stats = migrate(parsed);
    const open = unlockedSkins(stats.wins);
    if (!open.includes(stats.skin)) stats.skin = "leo";
    return stats;
  } catch {
    return { ...DEFAULTS };
  }
}

export function saveStats(stats: Stats): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ ...stats, version: VERSION }));
  } catch {
    /* private mode / quota */
  }
}
