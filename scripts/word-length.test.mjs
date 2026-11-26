import assert from "node:assert/strict";
import { register } from "node:module";
import test from "node:test";

register("./ts-resolve.mjs", import.meta.url);

const { letterCount } = await import("../src/lib/game/letters.ts");
const { LENGTHS, REAL_CATEGORY_IDS } = await import("../src/lib/game/types.ts");
const { LENGTH_BOUNDS, MIN_POOL, bankCounts, lengthHint, pickWord, widenPool, wordsFor } =
  await import("../src/lib/game/words.ts");

const LOCALES = ["fr", "en"];

test("every category and length has a full pool in both languages", () => {
  for (const locale of LOCALES) {
    const counts = bankCounts(locale);
    for (const cat of REAL_CATEGORY_IDS) {
      for (const length of LENGTHS) {
        const n = counts[`${cat}.${length}`];
        assert.ok(n >= MIN_POOL, `${locale} ${cat} ${length} has ${n}, want >= ${MIN_POOL}`);
        const { min, max } = LENGTH_BOUNDS[locale][length];
        for (const word of wordsFor(cat, length, locale)) {
          const letters = letterCount(word);
          assert.ok(
            letters >= min && letters <= max,
            `${locale} ${cat} ${length} "${word}" has ${letters} letters`,
          );
        }
      }
    }
  }
});

test("no listed word falls outside the board", () => {
  for (const locale of LOCALES) {
    for (const word of wordsFor("hasard", "short", locale).concat(
      wordsFor("hasard", "medium", locale),
      wordsFor("hasard", "long", locale),
    )) {
      const n = letterCount(word);
      assert.ok(n >= 3 && n <= 14, `${word} (${n})`);
      assert.equal(word.includes(" "), false);
    }
  }
});

test("hasard picks a real category and a word from that category", () => {
  for (const locale of LOCALES) {
    for (const length of LENGTHS) {
      const seen = new Set();
      for (let i = 0; i < 48; i++) {
        const pick = pickWord("hasard", length, new Set(), locale);
        assert.ok(REAL_CATEGORY_IDS.includes(pick.category), pick.category);
        const pool = wordsFor(pick.category, length, locale);
        assert.ok(
          pool.some((w) => w.toLowerCase() === pick.word.toLowerCase()),
          `${pick.word} not in ${pick.category}`,
        );
        seen.add(pick.category);
      }
      assert.ok(seen.size >= 3, `${locale} ${length} only saw ${[...seen].join(",")}`);
    }
  }
});

test("a chosen category stays that category", () => {
  const pick = pickWord("espace", "long", new Set(), "fr", () => 0);
  assert.equal(pick.category, "espace");
  assert.ok(wordsFor("espace", "long", "fr").includes(pick.word));
});

test("hasard avoids the previous word's category", () => {
  for (const locale of LOCALES) {
    for (const length of LENGTHS) {
      const first = pickWord("hasard", length, new Set(), locale, () => 0);
      const second = pickWord("hasard", length, new Set(), locale, () => 0, first.category);
      assert.notEqual(second.category, first.category);
      const third = pickWord("hasard", length, new Set(), locale, () => 0.99, second.category);
      assert.notEqual(third.category, second.category);
    }
  }
});

test("widenPool keeps the requested band until it is too small", () => {
  const bands = {
    short: ["a", "b"],
    medium: ["cccccc", "dddddd"],
    long: ["eeeeeeeee"],
  };
  assert.deepEqual(widenPool(bands, "medium", 2), ["cccccc", "dddddd"]);
  assert.deepEqual(widenPool(bands, "short", 3), ["a", "b", "cccccc", "dddddd"]);
  assert.deepEqual(widenPool(bands, "long", 8), ["eeeeeeeee", "cccccc", "dddddd", "a", "b"]);
});

test("length hints follow the bounds", () => {
  assert.equal(lengthHint("fr", "short"), "3 à 5 lettres.");
  assert.equal(lengthHint("fr", "medium"), "6 à 8 lettres.");
  assert.equal(lengthHint("fr", "long"), "9 à 14 lettres.");
  assert.equal(lengthHint("en", "short"), "3 to 5 letters.");
  assert.equal(lengthHint("en", "long"), "9 to 14 letters.");
});
