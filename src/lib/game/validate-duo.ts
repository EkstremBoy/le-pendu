import { fold, letterCount } from "./letters";
import { t, type Locale } from "@/lib/i18n";

export function parseSecretWord(
  raw: string,
  locale: Locale = "fr",
): { ok: true; word: string } | { ok: false; reason: string } {
  const trimmed = raw.trim().replace(/\s+/g, " ");
  if (trimmed.length === 0) return { ok: false, reason: t(locale, "duoEmpty") };
  if (/[0-9]/.test(trimmed)) return { ok: false, reason: t(locale, "duoDigits") };
  const folded = fold(trimmed);
  if (/[^A-Z \-']/.test(folded)) {
    return { ok: false, reason: t(locale, "duoChars") };
  }
  const n = letterCount(trimmed);
  if (n < 3) return { ok: false, reason: t(locale, "duoShort") };
  if (n > 14) return { ok: false, reason: t(locale, "duoLong") };
  return { ok: true, word: trimmed };
}