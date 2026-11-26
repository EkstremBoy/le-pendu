export const MAX_WRONG = 7;

/** Word length, chosen from the letter counts in each language's lists. */
export const LENGTHS = ["short", "medium", "long"] as const;
export type LengthId = (typeof LENGTHS)[number];

export const CATEGORY_IDS = [
  "hasard",
  "animaux",
  "nourriture",
  "ecole",
  "sports",
  "espace",
  "maison",
  "nature",
  "metiers",
] as const;
export type CategoryId = (typeof CATEGORY_IDS)[number];

export type RealCategoryId = Exclude<CategoryId, "hasard">;

export const REAL_CATEGORY_IDS = CATEGORY_IDS.filter((id): id is RealCategoryId => id !== "hasard");

export const SKIN_IDS = ["leo", "nori", "bit", "rex"] as const;
export type SkinId = (typeof SKIN_IDS)[number];

export type GameStatus = "playing" | "won" | "lost";
export type ViewId = "menu" | "play" | "skins" | "duo";

export const CATEGORY_META: Record<CategoryId, { label: string }> = {
  hasard: { label: "Hasard" },
  animaux: { label: "Animaux" },
  nourriture: { label: "Nourriture" },
  ecole: { label: "École" },
  sports: { label: "Sports" },
  espace: { label: "Espace" },
  maison: { label: "Maison" },
  nature: { label: "Nature" },
  metiers: { label: "Métiers" },
};
