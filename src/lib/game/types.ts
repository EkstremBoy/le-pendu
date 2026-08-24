export const MAX_WRONG = 7;

export const MODES = ["mini", "kid", "ado"] as const;
export type ModeId = (typeof MODES)[number];

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

export const SKIN_IDS = ["leo", "nori", "bit", "rex"] as const;
export type SkinId = (typeof SKIN_IDS)[number];

export type GameStatus = "playing" | "won" | "lost";
export type ViewId = "menu" | "play" | "skins" | "duo";

export const MODE_META: Record<ModeId, { label: string; blurb: string }> = {
  mini: {
    label: "Mini",
    blurb: "Mots courts, bien connus.",
  },
  kid: {
    label: "Normal",
    blurb: "Un vrai défi, encore lisible.",
  },
  ado: {
    label: "Expert",
    blurb: "Longs, pièges, vocabulaire large.",
  },
};

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
