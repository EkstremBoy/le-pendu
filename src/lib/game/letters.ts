export function fold(input: string): string {
  return input
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/œ/gi, "oe")
    .replace(/æ/gi, "ae")
    .toUpperCase();
}

export function isAlphaChar(ch: string): boolean {
  return /[A-Z]/.test(fold(ch));
}

export function letterCount(word: string): number {
  return [...word].filter((ch) => isAlphaChar(ch)).length;
}

export function foldedLetter(ch: string): string {
  const f = fold(ch);
  return f.length ? f[0]! : "";
}

export type Cell = {
  raw: string;
  folded: string;
  isLetter: boolean;
};

export function cellsOf(word: string): Cell[] {
  return [...word.toUpperCase()].map((raw) => {
    const folded = foldedLetter(raw);
    return { raw, folded, isLetter: folded.length === 1 && /[A-Z]/.test(folded) };
  });
}

export const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function remainingLetters(word: string, guessed: string[]): string[] {
  const guessedSet = new Set(guessed);
  const unique = new Set(
    cellsOf(word)
      .filter((c) => c.isLetter)
      .map((c) => c.folded),
  );
  return [...unique].filter((l) => !guessedSet.has(l));
}

export function isWordComplete(word: string, guessed: string[]): boolean {
  return remainingLetters(word, guessed).length === 0;
}

export function wordHasLetter(word: string, letter: string): boolean {
  const L = fold(letter)[0] ?? "";
  return cellsOf(word).some((c) => c.isLetter && c.folded === L);
}
