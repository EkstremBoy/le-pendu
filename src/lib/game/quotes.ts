import type { Locale } from "@/lib/i18n";
import { MAX_WRONG } from "./types";

function pick<T>(list: T[], avoid?: T): T {
  if (list.length === 1) return list[0]!;
  const pool = avoid ? list.filter((x) => x !== avoid) : list;
  return pool[Math.floor(Math.random() * pool.length)]!;
}

const FR = {
  winSafe: ["Fiou.", "Bah voyons.", "Même pas transpiré.", "On oublie ça, d’accord ?"],
  winClose: ["Fiou !", "Fiou… trop juste.", "J’ai eu chaud. Genre vraiment chaud.", "Merci. Vraiment.", "On ne recommence pas tout de suite, hein."],
  winLast: ["Fiou… j’y étais.", "Une lettre. Une seule.", "Je vais m’asseoir un moment.", "Fiou. On ne se revoit plus ici."],
  winPerfect: ["Même pas besoin de corde.", "J’étais en bas, en fait.", "Vous voyez ? Rien du tout.", "Fiou. Enfin, à peine."],
  lose: ["Why ???", "Why ??? Sérieux ?", "J’avais des projets…", "Cette lettre-là. Pourquoi.", "Dis à maman que…", "Why. Juste why."],
  wrong: {
    1: ["Bonjour ?", "Ah. On commence.", "Je suis là, oui."],
    2: ["Ça va, encore.", "Un tronc. Classique.", "On respire."],
    3: ["Un bras. Le gauche, s’il te plaît.", "Tu es sûr ?", "Hmm."],
    4: ["Les deux bras. Je peux encore gesticuler.", "Aïe.", "On ralentit ?"],
    5: ["Je commence à transpirer.", "Une jambe. Déjà.", "Ça pique."],
    6: ["Plus qu’une.", "Je tiens. À peine.", "Le W, c’est rarement une bonne idée."],
  } as Record<number, string[]>,
  hint: ["On triche un peu. Je juge, mais j’accepte.", "Indice pris. Je ne dirai rien.", "D’accord. Juste cette fois.", "Tu as vu cette lettre, oui ?"],
  right: ["Oui !", "Comme ça.", "Continue.", "Voilà."],
  fallbackWrong: "Aïe.",
};

const EN = {
  winSafe: ["Phew.", "Easy.", "Didn’t even sweat.", "We forget that, deal?"],
  winClose: ["Fiou!", "Phew… close.", "That was hot. Like, actually hot.", "Thank you. Really.", "Let’s not do that again right away."],
  winLast: ["Fiou… I was this close.", "One letter. Just one.", "I need to sit down.", "Phew. We don’t meet here again."],
  winPerfect: ["Didn’t even need the rope.", "I was on the ground, actually.", "See? Nothing happened.", "Fiou. Barely."],
  lose: ["Why ???", "Why ??? Seriously?", "I had plans…", "That letter. Why.", "Tell mom that…", "Why. Just why."],
  wrong: {
    1: ["Hello?", "Ah. Here we go.", "I’m here, yes."],
    2: ["Still fine.", "A torso. Classic.", "Breathe."],
    3: ["An arm. The left one, please.", "You sure?", "Hmm."],
    4: ["Both arms. I can still wave.", "Ouch.", "Slow down?"],
    5: ["I’m starting to sweat.", "A leg. Already.", "That stings."],
    6: ["One left.", "Hanging in. Barely.", "W is rarely a good idea."],
  } as Record<number, string[]>,
  hint: ["A little cheat. I judge, but I accept.", "Hint taken. I won’t tell.", "Fine. Just this once.", "You saw that letter, yes?"],
  right: ["Yes!", "Like that.", "Keep going.", "There."],
  fallbackWrong: "Ouch.",
};

const PACK = { fr: FR, en: EN };

export function winQuote(wrongCount: number, locale: Locale = "fr"): string {
  const q = PACK[locale];
  if (wrongCount === 0) return pick(q.winPerfect);
  const left = MAX_WRONG - wrongCount;
  if (left <= 1) return pick(q.winLast);
  if (left <= 3) return pick(q.winClose);
  return pick(q.winSafe);
}

export function loseQuote(locale: Locale = "fr"): string {
  return pick(PACK[locale].lose);
}

export function wrongQuote(wrongCount: number, locale: Locale = "fr", last?: string): string {
  const q = PACK[locale];
  const list = q.wrong[wrongCount] ?? [q.fallbackWrong];
  return pick(list, last);
}

export function hintQuote(locale: Locale = "fr", last?: string): string {
  return pick(PACK[locale].hint, last);
}

export function rightQuote(locale: Locale = "fr"): string | null {
  if (Math.random() > 0.28) return null;
  return pick(PACK[locale].right);
}
