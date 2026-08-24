export type Locale = "fr" | "en";

export const LOCALES: Locale[] = ["fr", "en"];

const FR = {
  appTitle: "Le Pendu",
  menuTag: "Version douce",
  menuLead: "Sauve {name} avant la dernière lettre.",
  level: "Niveau",
  category: "Catégorie",
  saveThem: "Sauve-le",
  daily: "Défi du jour",
  dailyDone: "Défi (fait)",
  dailyStart: "Le défi du jour. Pas de pression.",
  twoPlayers: "Deux joueurs",
  characters: "Personnages",
  winOne: "{n} victoire",
  winMany: "{n} victoires",
  streak: "série {n}",
  record: "(record {n})",
  soundOn: "Couper le son",
  soundOff: "Activer le son",
  menu: "Menu",
  hint: "Indice",
  lives: "{n} essais restants",
  saved: "Sauvé !",
  lost: "Perdu.",
  theWordWas: "Le mot était {word}.",
  perfectWin: "Sans une seule erreur. Il n’est même pas monté.",
  triesLeftOne: "{n} essai restant.",
  triesLeftMany: "{n} essais restants.",
  replay: "Rejouer",
  keyboard: "Clavier",
  letter: "Lettre {letter}",
  gallows: "La potence",
  duoLead: "Un mot secret, puis on passe le téléphone.",
  secretWord: "Mot secret",
  showWord: "Afficher le mot",
  hideWord: "Masquer le mot",
  duoHint: "3 à 14 lettres. Accents acceptés.",
  duoGo: "C’est parti",
  duoEmpty: "Écris un mot.",
  duoDigits: "Pas de chiffres, seulement des lettres.",
  duoChars: "Lettres, espaces ou tirets seulement.",
  duoShort: "Au moins 3 lettres.",
  duoLong: "14 lettres maximum, pour que ça tienne.",
  duoPlaceholder: "ex. libellule",
  skinsLead: "Se débloquent avec les victoires.",
  winsNeeded: "{n} victoires",
  langFr: "FR",
  langEn: "EN",
  language: "Langue",
  modeMiniLabel: "Mini",
  modeKidLabel: "Normal",
  modeAdoLabel: "Expert",
  modeMiniBlurb: "Mots courts, bien connus.",
  modeKidBlurb: "Un vrai défi, encore lisible.",
  modeAdoBlurb: "Longs, pièges, vocabulaire large.",
  catHasard: "Hasard",
  catAnimaux: "Animaux",
  catNourriture: "Nourriture",
  catEcole: "École",
  catSports: "Sports",
  catEspace: "Espace",
  catMaison: "Maison",
  catNature: "Nature",
  catMetiers: "Métiers",
  skinLeo: "Le classique. Il a toujours un peu chaud.",
  skinNori: "Neuf vies, et il les compte à voix haute.",
  skinBit: "Batterie à 2 %. Il le mentionne.",
  skinRex: "Un dinosaure. Sur une corde. Évidemment.",
  tiltAsk: "Autoriser le mouvement",
  tiltHint: "Pour que les pieds restent vers le bas quand tu penches le téléphone.",
  tiltDenied: "Refusé. Appuie encore pour réessayer.",
} as const;

type Dict = { [K in keyof typeof FR]: string };

const EN: Dict = {
  appTitle: "Hangman",
  menuTag: "The gentle cut",
  menuLead: "Save {name} before the last letter.",
  level: "Level",
  category: "Category",
  saveThem: "Save him",
  daily: "Daily challenge",
  dailyDone: "Daily (done)",
  dailyStart: "Today’s challenge. No pressure.",
  twoPlayers: "Two players",
  characters: "Characters",
  winOne: "{n} win",
  winMany: "{n} wins",
  streak: "streak {n}",
  record: "(best {n})",
  soundOn: "Mute sound",
  soundOff: "Unmute sound",
  menu: "Menu",
  hint: "Hint",
  lives: "{n} tries left",
  saved: "Saved!",
  lost: "Lost.",
  theWordWas: "The word was {word}.",
  perfectWin: "Not a single miss. He never even climbed up.",
  triesLeftOne: "{n} try left.",
  triesLeftMany: "{n} tries left.",
  replay: "Play again",
  keyboard: "Keyboard",
  letter: "Letter {letter}",
  gallows: "The gallows",
  duoLead: "A secret word, then pass the phone.",
  secretWord: "Secret word",
  showWord: "Show word",
  hideWord: "Hide word",
  duoHint: "3 to 14 letters. Accents are fine.",
  duoGo: "Let’s go",
  duoEmpty: "Type a word.",
  duoDigits: "Letters only, no numbers.",
  duoChars: "Letters, spaces or hyphens only.",
  duoShort: "At least 3 letters.",
  duoLong: "14 letters max, so it still fits.",
  duoPlaceholder: "e.g. butterfly",
  skinsLead: "Unlocked with wins.",
  winsNeeded: "{n} wins",
  langFr: "FR",
  langEn: "EN",
  language: "Language",
  modeMiniLabel: "Mini",
  modeKidLabel: "Normal",
  modeAdoLabel: "Expert",
  modeMiniBlurb: "Short, familiar words.",
  modeKidBlurb: "A real challenge, still readable.",
  modeAdoBlurb: "Longer words, wider vocabulary.",
  catHasard: "Random",
  catAnimaux: "Animals",
  catNourriture: "Food",
  catEcole: "School",
  catSports: "Sports",
  catEspace: "Space",
  catMaison: "Home",
  catNature: "Nature",
  catMetiers: "Jobs",
  skinLeo: "The classic. Always a little too warm.",
  skinNori: "Nine lives, and he counts them out loud.",
  skinBit: "Battery at 2%. He will mention it.",
  skinRex: "A dinosaur. On a rope. Obviously.",
  tiltAsk: "Allow motion",
  tiltHint: "So their feet stay down when you tilt the phone.",
  tiltDenied: "Denied. Tap again to retry.",
};

export const STRINGS: Record<Locale, Dict> = { fr: FR, en: EN };

export type StringKey = keyof typeof FR;

export function t(
  locale: Locale,
  key: StringKey,
  vars?: Record<string, string | number>,
): string {
  let out: string = STRINGS[locale][key] ?? STRINGS.fr[key];
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      out = out.replaceAll(`{${k}}`, String(v));
    }
  }
  return out;
}

export function categoryLabel(locale: Locale, id: string): string {
  const map: Record<string, StringKey> = {
    hasard: "catHasard",
    animaux: "catAnimaux",
    nourriture: "catNourriture",
    ecole: "catEcole",
    sports: "catSports",
    espace: "catEspace",
    maison: "catMaison",
    nature: "catNature",
    metiers: "catMetiers",
  };
  return t(locale, map[id] ?? "catHasard");
}

export function modeLabel(locale: Locale, id: string): string {
  const map: Record<string, StringKey> = {
    mini: "modeMiniLabel",
    kid: "modeKidLabel",
    ado: "modeAdoLabel",
  };
  return t(locale, map[id] ?? "modeKidLabel");
}

export function modeBlurb(locale: Locale, id: string): string {
  const map: Record<string, StringKey> = {
    mini: "modeMiniBlurb",
    kid: "modeKidBlurb",
    ado: "modeAdoBlurb",
  };
  return t(locale, map[id] ?? "modeKidBlurb");
}

export function skinBlurb(locale: Locale, id: string): string {
  const map: Record<string, StringKey> = {
    leo: "skinLeo",
    nori: "skinNori",
    bit: "skinBit",
    rex: "skinRex",
  };
  return t(locale, map[id] ?? "skinLeo");
}
