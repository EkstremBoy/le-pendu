import { create } from "zustand";
import {
  type CategoryId,
  type GameStatus,
  type LengthId,
  type RealCategoryId,
  type SkinId,
  type ViewId,
  MAX_WRONG,
} from "@/lib/game/types";
import { isWordComplete, remainingLetters, wordHasLetter, fold } from "@/lib/game/letters";
import { dailyWord, pickWord, todayKey } from "@/lib/game/words";
import { hintQuote, loseQuote, rightQuote, winQuote, wrongQuote } from "@/lib/game/quotes";
import { loadStats, saveStats, type Stats } from "@/lib/game/storage";
import { isSkinUnlocked } from "@/lib/game/skins";
import { playSfx, setSoundEnabled, unlockAudio } from "@/lib/game/audio";
import { t, type Locale } from "@/lib/i18n";

export type Juice = "right" | "wrong" | "win" | "lose" | "pop" | null;

type State = {
  ready: boolean;
  view: ViewId;
  stats: Stats;
  length: LengthId;
  category: CategoryId;
  wordCategory: RealCategoryId | null;
  word: string;
  guessed: string[];
  wrongCount: number;
  hintUsed: boolean;
  status: GameStatus;
  isDaily: boolean;
  isDuo: boolean;
  quote: string | null;
  quoteKey: number;
  juice: Juice;
  juiceKey: number;
  used: string[];
};

type Actions = {
  hydrate: () => void;
  setView: (view: ViewId) => void;
  setLength: (length: LengthId) => void;
  setCategory: (category: CategoryId) => void;
  setSkin: (skin: SkinId) => void;
  toggleSound: () => void;
  setLocale: (locale: Locale) => void;
  startGame: (opts?: { daily?: boolean; duoWord?: string }) => void;
  guess: (letter: string) => void;
  useHint: () => void;
  backToMenu: () => void;
};

const initial: State = {
  ready: false,
  view: "menu",
  stats: loadStats(),
  length: "medium",
  category: "hasard",
  wordCategory: null,
  word: "",
  guessed: [],
  wrongCount: 0,
  hintUsed: false,
  status: "playing",
  isDaily: false,
  isDuo: false,
  quote: null,
  quoteKey: 0,
  juice: null,
  juiceKey: 0,
  used: [],
};

function persist(stats: Stats) {
  saveStats(stats);
  return stats;
}

export const useGame = create<State & Actions>((set, get) => ({
  ...initial,

  hydrate: () => {
    const stats = loadStats();
    setSoundEnabled(stats.sound);
    if (typeof document !== "undefined") document.documentElement.lang = stats.locale;
    set({ stats, ready: true, used: stats.recentWords ?? [] });
  },

  setView: (view) => set({ view }),
  setLength: (length) => set({ length }),
  setCategory: (category) => set({ category }),

  setSkin: (skin) => {
    const { stats } = get();
    if (!isSkinUnlocked(skin, stats.wins)) return;
    const next = persist({ ...stats, skin });
    set({ stats: next });
  },

  toggleSound: () => {
    const { stats } = get();
    const sound = !stats.sound;
    setSoundEnabled(sound);
    set({ stats: persist({ ...stats, sound }) });
  },

  setLocale: (locale) => {
    const { stats } = get();
    if (stats.locale === locale) return;
    if (typeof document !== "undefined") document.documentElement.lang = locale;
    set({ stats: persist({ ...stats, locale }) });
  },

  startGame: (opts) => {
    unlockAudio();
    const { length, category, stats, wordCategory: previousCategory } = get();
    const locale = stats.locale;
    const isDaily = Boolean(opts?.daily);
    const isDuo = Boolean(opts?.duoWord);
    const recent = stats.recentWords ?? [];
    const picked = opts?.duoWord
      ? null
      : isDaily
        ? dailyWord(new Date(), length, locale)
        : pickWord(
            category,
            length,
            new Set(recent),
            locale,
            Math.random,
            category === "hasard" ? previousCategory : null,
          );
    const word = opts?.duoWord ? opts.duoWord : picked!.word;
    const wordCategory = picked ? picked.category : null;
    playSfx("click");
    const nextRecent = isDuo
      ? recent
      : [...recent.filter((w) => w !== word.toLowerCase()), word.toLowerCase()].slice(-120);
    const nextStats = isDuo ? stats : persist({ ...stats, recentWords: nextRecent });
    set({
      view: "play",
      word,
      wordCategory,
      guessed: [],
      wrongCount: 0,
      hintUsed: false,
      status: "playing",
      isDaily,
      isDuo,
      quote: isDaily ? t(locale, "dailyStart") : null,
      quoteKey: Date.now(),
      juice: null,
      juiceKey: Date.now(),
      used: nextRecent,
      stats: nextStats,
    });
  },

  guess: (rawLetter) => {
    const letter = fold(rawLetter)[0] ?? "";
    if (!/[A-Z]/.test(letter)) return;
    const s = get();
    if (s.status !== "playing") return;
    if (s.guessed.includes(letter)) return;

    const guessed = [...s.guessed, letter];
    const hit = wordHasLetter(s.word, letter);

    const locale = s.stats.locale;
    if (hit) {
      const won = isWordComplete(s.word, guessed);
      if (won) {
        playSfx("win");
        const stats = applyWin(s.stats, s.isDaily);
        set({
          guessed,
          status: "won",
          quote: winQuote(s.wrongCount, locale),
          quoteKey: Date.now(),
          juice: "win",
          juiceKey: Date.now(),
          stats,
        });
        return;
      }
      playSfx("right");
      const q = rightQuote(locale);
      set({
        guessed,
        quote: q ?? s.quote,
        quoteKey: q ? Date.now() : s.quoteKey,
        juice: "right",
        juiceKey: Date.now(),
      });
      return;
    }

    const wrongCount = s.wrongCount + 1;
    const lost = wrongCount >= MAX_WRONG;
    if (lost) {
      playSfx("lose");
      const stats = persist({
        ...s.stats,
        losses: s.stats.losses + 1,
        streak: 0,
      });
      set({
        guessed,
        wrongCount,
        status: "lost",
        quote: loseQuote(locale),
        quoteKey: Date.now(),
        juice: "lose",
        juiceKey: Date.now(),
        stats,
      });
      return;
    }
    playSfx("wrong");
    playSfx("pop");
    set({
      guessed,
      wrongCount,
      quote: wrongQuote(wrongCount, locale, s.quote ?? undefined),
      quoteKey: Date.now(),
      juice: "wrong",
      juiceKey: Date.now(),
    });
  },

  useHint: () => {
    const s = get();
    if (s.status !== "playing" || s.hintUsed) return;
    const locale = s.stats.locale;
    const left = remainingLetters(s.word, s.guessed);
    if (left.length === 0) return;
    const letter = left[Math.floor(Math.random() * left.length)]!;
    playSfx("hint");
    const guessed = [...s.guessed, letter];
    const won = isWordComplete(s.word, guessed);
    if (won) {
      const stats = applyWin(s.stats, s.isDaily);
      set({
        guessed,
        hintUsed: true,
        status: "won",
        quote: winQuote(s.wrongCount, locale),
        quoteKey: Date.now(),
        juice: "win",
        juiceKey: Date.now(),
        stats,
      });
      return;
    }
    set({
      guessed,
      hintUsed: true,
      quote: hintQuote(locale, s.quote ?? undefined),
      quoteKey: Date.now(),
      juice: "right",
      juiceKey: Date.now(),
    });
  },

  backToMenu: () => {
    playSfx("click");
    set({ view: "menu", status: "playing", word: "", quote: null });
  },
}));

function applyWin(stats: Stats, isDaily: boolean): Stats {
  const wins = stats.wins + 1;
  const streak = stats.streak + 1;
  return persist({
    ...stats,
    wins,
    streak,
    bestStreak: Math.max(stats.bestStreak, streak),
    wordsFound: stats.wordsFound + 1,
    lastDailyWin: isDaily ? todayKey() : stats.lastDailyWin,
  });
}
