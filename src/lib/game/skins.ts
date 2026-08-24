import type { SkinId } from "./types";
import type { Locale } from "@/lib/i18n";

export const SKIN_META: Record<
  SkinId,
  { name: string; nameEn: string; blurb: string; winsNeeded: number }
> = {
  leo: { name: "Léo", nameEn: "Leo", blurb: "Le classique. Il a toujours un peu chaud.", winsNeeded: 0 },
  nori: { name: "Nori", nameEn: "Nori", blurb: "Neuf vies, et il les compte à voix haute.", winsNeeded: 3 },
  bit: { name: "Bit", nameEn: "Bit", blurb: "Batterie à 2 %. Il le mentionne.", winsNeeded: 8 },
  rex: { name: "Rex", nameEn: "Rex", blurb: "Un dinosaure. Sur une corde. Évidemment.", winsNeeded: 15 },
};

export function skinName(id: SkinId, locale: Locale = "fr"): string {
  const meta = SKIN_META[id];
  return locale === "en" ? meta.nameEn : meta.name;
}

export function unlockedSkins(wins: number): SkinId[] {
  return (Object.keys(SKIN_META) as SkinId[]).filter(
    (id) => wins >= SKIN_META[id].winsNeeded,
  );
}

export function isSkinUnlocked(id: SkinId, wins: number): boolean {
  return wins >= SKIN_META[id].winsNeeded;
}
