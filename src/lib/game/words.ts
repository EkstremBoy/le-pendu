import type { CategoryId, LengthId, RealCategoryId } from "./types";
import { LENGTHS, REAL_CATEGORY_IDS } from "./types";
import { letterCount } from "./letters";
import type { Locale } from "@/lib/i18n";
import { BANKS_EN } from "./words-en";

type Tier = "mini" | "kid" | "ado";
type SourceBanks = Record<RealCategoryId, Record<Tier, string[]>>;
type LengthBanks = Record<RealCategoryId, Record<LengthId, string[]>>;

/**
 * Letter-count bands, measured on the pooled lists (hyphens don't count).
 * The same cuts fit both languages: every category keeps at least 17 words
 * in each band. Words outside 3–14 letters are dropped so they still fit
 * the board.
 */
export const LENGTH_BOUNDS: Record<Locale, Record<LengthId, { min: number; max: number }>> = {
  fr: {
    short: { min: 3, max: 5 },
    medium: { min: 6, max: 8 },
    long: { min: 9, max: 14 },
  },
  en: {
    short: { min: 3, max: 5 },
    medium: { min: 6, max: 8 },
    long: { min: 9, max: 14 },
  },
};

/** Below this, a category × length pool is widened toward nearby lengths. */
export const MIN_POOL = 8;

const ABS_MIN = 3;
const ABS_MAX = 14;

const BANKS: SourceBanks = {
  animaux: {
    mini: [
      "oie", "âne", "rat", "chat", "lion", "loup", "ours", "chien", "tigre",
      "panda", "poule", "vache", "singe", "hibou", "poney", "zèbre", "koala",
      "aigle", "taupe", "lama", "cerf", "lynx", "dinde", "cygne", "crabe",
      "morse", "biche", "thon", "puce", "geai", "phoque", "truite", "loutre",
    ],
    kid: [
      "souris", "girafe", "dauphin", "tortue", "panthère", "autruche",
      "pingouin", "écureuil", "hamster", "renard", "baleine", "requin",
      "chameau", "mouton", "canard", "hérisson", "lézard", "fourmi",
      "abeille", "moineau", "pélican", "cheval", "lapin", "toucan",
      "oiseau", "chouette", "gazelle", "colibri", "pigeon", "corbeau",
      "cigogne", "blaireau", "sanglier", "chevreuil", "furet", "cobaye",
      "jaguar", "otarie", "merle", "bison", "alpaga", "perroquet",
      "papillon", "chenille", "libellule", "coccinelle", "saumon",
      "ragondin", "manchot", "flamant", "castor", "iguane", "vipère",
      "crapaud", "mouette", "goéland", "chèvre", "poulain", "agneau",
      "caribou", "méduse", "poulpe", "crevette", "homard", "escargot",
      "araignée", "canari", "perruche", "okapi", "tapir", "suricate",
      "fennec", "hyène", "chaton", "chiot", "poussin", "têtard",
      "vison", "puma", "lémur", "gecko", "héron", "bélier",
      "langouste", "limace", "cafard", "paon", "yak", "élan",
    ],
    ado: [
      "crocodile", "hippopotame", "rhinocéros", "chimpanzé", "salamandre",
      "caméléon", "kangourou", "labrador", "perroquet",
      "moustique", "scorpion", "chinchilla", "pangolin", "éléphant",
      "guépard", "hippocampe", "sauterelle", "pieuvre", "antilope",
      "phacochère", "axolotl", "capybara", "dromadaire", "orang-outan",
      "gorille", "mygale", "bouquetin", "marmotte", "bélette", "putois",
      "narval", "orque", "cachalot", "albatros", "vautour",
      "faucon", "épervier", "porc-épic", "tatou", "grenouille",
      "libellule", "coccinelle", "calopsitte", "martinets",
      "salamandre", "caméléon", "rhinocéros", "hippopotame",
      "ornithorynque", "échidné", "wombat", "wallaby", "koala",
      "mandrill", "babouin", "gibbon", "bonobo", "gorille",
      "léopard", "ocelot", "serval", "caracal", "lynx",
      "belette", "hermine", "fouine", "martre", "loutre",
      "manchot", "pétrel", "cormoran", "scarabée", "lucane",
      "phalène", "mille-pattes", "scolopendre", "tarentule",
      "ornithorynque", "échidné", "wombat", "wallaby",
      "mandrill", "babouin", "gibbon", "bonobo",
      "léopard", "ocelot", "serval", "caracal",
      "hermine", "fouine", "martre",
    ],
  },
  nourriture: {
    mini: [
      "eau", "riz", "pain", "lait", "miel", "noix", "soupe", "tarte",
      "pomme", "poire", "pêche", "sucre", "pizza", "crêpe", "pâtes",
      "melon", "kiwi", "jus", "glace", "oeuf", "sel", "thé", "café",
      "maïs", "figue", "mûre", "pain", "thon", "blé", "soja",
    ],
    kid: [
      "banane", "orange", "tomate", "carotte", "fromage", "gâteau",
      "yaourt", "biscuit", "chocolat", "poulet", "saumon", "cerise",
      "raisin", "salade", "poivron", "épinard", "gaufre", "caramel",
      "abricot", "haricot", "citron", "beurre", "compote", "fraise",
      "frites", "brioche", "confiture", "popcorn", "muffin", "nougat",
      "omelette", "saucisse", "vanille", "menthe", "cacao",
      "mangue", "ananas", "pastèque", "clémentine", "radis", "navet",
      "courge", "lentille", "risotto", "granola", "céréale", "toast",
      "crêpe", "gaufrette", "praline", "amande", "noisette", "cajou",
      "datte", "figue", "olive", "avocat", "concombre", "courgette",
      "brocoli", "chou", "poireau", "ail", "oignon", "échalote",
      "persil", "thym", "laurier", "sauge", "sirop", "confit",
      "yaourt", "fromage", "raclette", "fondue", "gratin", "quiche",
      "tajine", "nem", "samoussa", "sushis", "maki", "ramen",
    ],
    ado: [
      "aubergine", "framboise", "myrtille", "champignon", "croissant",
      "spaghetti", "mayonnaise", "saucisson", "meringue", "ratatouille",
      "pamplemousse", "clémentine", "tartiflette", "cassoulet",
      "bolognaise", "lasagnes", "madeleine", "macaron", "guacamole",
      "pistache", "brocoli", "profiterole", "chouquette",
      "tiramisu", "cheesecake", "carbonara", "bouillabaisse",
      "gaspacho", "taboulé", "houmous", "falafel", "couscous",
      "paella", "basilic", "coriandre", "curcuma", "gingembre",
      "cardamome", "cannelle", "financier", "millefeuille",
      "éclair", "religieuse", "paris-brest", "tarte-tatin",
      "choucroute", "bourguignon", "blanquette", "pot-au-feu",
      "cassoulet", "aligot", "brandade", "tapenade", "aioli",
      "vinaigrette", "béchamel", "hollandaise", "pesto",
      "parmesan", "mozzarella", "ricotta", "mascarpone",
      "gorgonzola", "roquefort", "camembert", "comté",
    ],
  },
  ecole: {
    mini: [
      "mot", "rang", "note", "colle", "école", "livre", "table", "stylo",
      "craie", "carte", "bus", "cours", "page", "ligne", "règle", "gomme",
      "copie", "sac", "ami", "jeu", "zéro", "plus", "moins", "classe",
      "banc", "ardoise", "feutre", "ciseau",
    ],
    kid: [
      "cahier", "classe", "crayon", "ciseaux", "cartable", "écolier",
      "lecture", "calcul", "histoire", "tableau", "compas", "devoirs",
      "matière", "science", "anglais", "français", "rentrée", "bulletin",
      "moyenne", "pupitre", "dictée", "poésie", "numéro", "leçon",
      "récré", "maître", "maîtresse", "addition",
      "soustraction", "problème", "géographie", "musique", "dessin",
      "atelier", "cantine", "couloir", "vestiaire", "trousse",
      "gommette", "feutre", "surligneur", "équerre", "rapporteur",
      "pochette", "classeur", "agenda",
      "sonnerie", "surveillant",
      "directeur", "directrice", "élève", "copain",
      "copine", "alphabet", "syllabe", "phrase", "chapitre",
      "exercice", "correction", "barème", "mention",
    ],
    ado: [
      "dictionnaire", "laboratoire", "bibliothèque", "professeur",
      "géographie", "récréation", "orthographe", "conjugaison",
      "équation", "théorème", "microscope", "encyclopédie",
      "dissertation", "évaluation", "algèbre", "géométrie",
      "philosophie", "littérature", "papeterie", "contrôle",
      "rédaction", "grammaire", "proviseur", "lycéen", "collège",
      "trimestre", "coefficient", "exposé", "vocabulaire",
      "ponctuation", "fraction", "pourcentage",
      "statistique", "expérience", "hypothèse", "brouillon",
      "université", "baccalauréat", "brevet",
      "annales", "révisions", "fiche",
      "méthode", "analyse", "synthèse", "commentaire",
      "argument", "exemple", "citation",
      "physique", "chimie", "biologie",
      "espagnol", "allemand", "italien", "latin",
      "technologie", "informatique", "algorithmique",
    ],
  },
  sports: {
    mini: [
      "ski", "judo", "golf", "foot", "boxe", "surf", "yoga", "but",
      "match", "gant", "vélo", "nage", "saut", "coup", "sport", "ballon",
      "filet", "raquette", "kayak", "rame", "piste", "course", "cible",
    ],
    kid: [
      "tennis", "basket", "football", "handball", "natation", "course",
      "slalom", "médaille", "arbitre", "défense", "attaque", "victoire",
      "défaite", "cyclisme", "escrime", "patinage", "hockey", "marathon",
      "volley", "gardien", "dribble", "sprint", "jogging", "équipe",
      "stade", "terrain", "maillot", "casque", "sifflet", "podium",
      "record", "finale", "penalty", "corner", "service", "smash",
      "plongée", "escalade", "aviron", "rugby", "karaté", "capoeira",
      "judo", "boxe", "lutte", "catch", "kendo", "taekwondo",
      "baseball", "cricket", "golf", "pétanque", "bowling",
      "paddle", "squash", "badminton", "ping-pong", "tennis",
      "skate", "roller", "trottinette", "bmx", "vtt",
      "canoë", "kayak", "rafting", "voile", "planche",
      "alpinisme", "randonnée", "orientation", "trail",
    ],
    ado: [
      "gymnastique", "équitation", "badminton", "triathlon", "parachute",
      "musculation", "entraînement", "compétition", "championnat",
      "olympique", "footballeur", "athlétisme", "biathlon", "javelot",
      "marathonien", "souplesse", "endurance", "stratégie", "haltères",
      "kayakiste", "handballeur", "surfiste", "décathlon",
      "pentathlon", "haltérophilie", "escrimeur", "patineur",
      "cycliste", "nageur", "sprinteur", "capitaine",
      "supporter", "vestiaire", "échauffement",
      "récupération", "hydratation", "étirement",
      "hors-jeu", "remplacement",
      "qualification", "demi-finale",
      "recordman", "préparation", "tactique",
      "collectif", "individuel", "amateur", "professionnel",
    ],
  },
  espace: {
    mini: [
      "lune", "mars", "ciel", "terre", "sol", "fusée", "nuage", "astre",
      "gaz", "orbe", "aube", "vide", "soleil", "venus", "halo",
      "lueur", "astre",
    ],
    kid: [
      "étoile", "planète", "orbite", "comète", "cratère", "galaxie",
      "saturne", "jupiter", "mercure", "vaisseau", "éclipse", "météore",
      "cosmos", "gravité", "espace", "solaire", "lunaire", "station",
      "module", "pilote", "neptune", "uranus",
      "capsule", "casque", "oxygène", "rayon", "nébuleuse",
      "astéroïde", "satellite", "navette", "télescope", "astronome",
      "fusée", "orbiteur", "atterrisseur", "sonde", "rover",
      "spationaute", "cosmonaute", "mission", "décollage",
      "amerrissage", "apesanteur", "pesanteur", "orbite",
      "constellation", "andromède", "anneau",
      "aurore", "magnétisme",
    ],
    ado: [
      "astronaute", "satellite", "télescope", "observatoire",
      "gravitation", "astéroïde", "supernova", "nébuleuse",
      "cosmologie", "atmosphère", "apesanteur", "navette",
      "explorateur", "planétaire", "équateur", "hémisphère",
      "cosmonaute", "lunaison", "solstice", "équinoxe",
      "trajectoire", "propulsion", "constellation", "interstellaire",
      "pulsar", "quasar", "exoplanète", "pesanteur", "planétarium",
      "astrophysique", "cosmodrome", "spationaute", "orbiteur",
      "alunissage", "amerrissage", "rentrée", "capsule",
      "combinaison", "laboratoire",
      "radiotélescope", "spectroscopie", "photosphère",
      "chromosphère", "magnétosphère", "ionosphère",
      "météorite", "bolide",
    ],
  },
  maison: {
    mini: [
      "lit", "mur", "toit", "porte", "salon", "vase", "table", "lampe",
      "four", "bol", "plat", "clé", "bain", "frigo", "radio", "tapis",
      "cadre", "banc", "nid", "coin", "drap", "seau", "clou", "vis",
    ],
    kid: [
      "canapé", "chaise", "rideau", "douche", "cuisine", "bureau",
      "armoire", "placard", "fenêtre", "escalier", "grenier", "jardin",
      "garage", "coussin", "oreiller", "casserole", "assiette",
      "cuillère", "tiroir", "plafond", "couloir", "balcon", "terrasse",
      "évier", "miroir", "horloge", "télévision", "téléphone",
      "couverture", "matelas", "commode", "étagère", "poubelle",
      "serviette", "robinet", "toilette", "cave", "entrée",
      "chambre", "fauteuil", "tabouret", "buffet", "vitrine", "chevet",
      "lampe", "ampoule", "interrupteur", "prise", "câble",
      "radiateur", "cheminée", "poêle", "plaque",
      "toaster", "bouilloire", "cafetière",
    ],
    ado: [
      "baignoire", "fourchette", "couverture", "aspirateur", "chauffage",
      "climatiseur", "radiateur", "architecture", "fondation",
      "charpente", "mezzanine", "véranda", "cheminée", "vaisselier",
      "argenterie", "penderie", "balustrade", "parquet", "carrelage",
      "faïence", "bibliothèque", "appartement",
      "demeure", "habitation", "résidence", "sous-sol", "lucarne",
      "moquette", "linoléum", "crépi", "plinthe", "moulure",
      "corniche", "colonne", "poutre", "solive", "chevron",
      "tuile", "ardoise", "gouttière", "descente", "terrasse",
      "pergola", "auvent", "marquise", "portail", "clôture",
      "allée", "pelouse", "haie", "massif", "potager",
      "dressing", "buanderie", "cellier", "débarras",
    ],
  },
  nature: {
    mini: [
      "mer", "lac", "bois", "eau", "parc", "dune", "vent", "pluie",
      "neige", "fleur", "arbre", "herbe", "rose", "sapin", "orage",
      "nuage", "île", "pré", "roc", "brume", "givre", "gel", "source",
      "berge", "crête", "cime",
    ],
    kid: [
      "rivière", "montagne", "forêt", "colline", "vallée", "glacier",
      "cascade", "désert", "prairie", "volcan", "caillou", "rocher",
      "tempête", "soleil", "trèfle", "papillon", "chenille", "roseau",
      "ruisseau", "horizon", "sentier", "clairière", "marais", "étang",
      "océan", "rivage", "plage", "falaise", "sommet", "vallon",
      "brouillard", "tonnerre", "éclair", "saison",
      "automne", "printemps", "hiver", "mousse", "lichen",
      "prairie", "champ", "verger", "bosquet", "taillis",
      "source", "torrent", "rapide", "méandre", "delta",
      "grotte", "caverne", "gouffre", "abîme", "ravin",
      "dune", "oasis", "steppe", "toundra", "jungle",
      "récif", "lagune", "atoll", "île", "archipel",
      "cratère", "lave", "magma", "cendre", "fumerolle",
    ],
    ado: [
      "coquelicot", "pissenlit", "précipice", "brouillard", "hirondelle",
      "tournesol", "écosystème", "biodiversité", "tectonique",
      "archipel", "péninsule", "hémisphère", "cataracte", "géologie",
      "avalanche", "continent", "atmosphère", "sédiment", "tourmente",
      "climatologie", "montagneux", "équateur", "biosphère",
      "mangrove", "toundra", "savane", "steppe", "geyser",
      "estuaire", "canyon", "plateau", "méandre",
      "précipitation", "évaporation", "condensation",
      "photosynthèse", "chlorophylle", "humus", "limon",
      "érosion", "sédimentation", "faille", "séisme",
      "typhon", "cyclone", "ouragan", "tornade", "blizzard",
      "mistral", "tramontane", "sirocco", "alizé",
      "équinoxe", "solstice", "tropique", "latitude",
      "longitude", "altitude", "relief", "vallée",
    ],
  },
  metiers: {
    mini: [
      "chef", "juge", "clown", "guide", "garde", "marin", "roi", "papa",
      "maman", "ami", "ange", "lutin", "mage", "ninja", "pirate", "acteur",
      "nurse", "pilote", "soldat", "poète",
    ],
    kid: [
      "fermier", "facteur", "peintre", "médecin", "dentiste", "plombier",
      "pompier", "avocat", "notaire", "chanteur", "danseur", "cuisinier",
      "pêcheur", "libraire", "caissier", "chauffeur", "serveur",
      "fleuriste", "coiffeur", "boulanger", "boucher", "musicien",
      "écolier", "instituteur", "vétérinaire", "jardinier", "maçon",
      "vitrier", "tailleur", "écrivain", "journaliste", "acteur",
      "réalisateur", "dessinateur", "informaticien", "pilote",
      "steward", "hôtesse", "capitaine", "soldat", "policier",
      "gendarme", "pompier", "secouriste", "infirmier",
      "pharmacien", "opticien", "banquier", "agent",
      "secrétaire", "comptable", "vendeur", "commerçant",
      "artisan", "ébéniste", "forgeron", "soudeur",
      "électricien", "mécanicien", "carrossier", "garagiste",
      "facteur", "livreur", "coursier", "postier",
    ],
    ado: [
      "journaliste", "architecte", "vétérinaire", "enseignant",
      "chirurgien", "pharmacien", "électricien", "développeur",
      "chercheur", "traducteur", "ambassadeur", "mécanicien",
      "menuisier", "horticulteur", "psychologue", "sociologue",
      "archéologue", "astronome", "biologiste", "océanographe",
      "cartographe", "photographe", "réalisateur", "scénariste",
      "ingénieur", "comptable", "secrétaire", "magistrat",
      "diplomate", "économiste", "géologue", "zoologiste",
      "orthophoniste", "kinésithérapeute", "sage-femme",
      "pédiatre", "cardiologue", "dermatologue", "ophtalmologue",
      "anesthésiste", "radiologue", "urgentiste",
      "avocat", "notaire", "huissier", "greffier",
      "professeur", "chercheur", "universitaire",
      "journaliste", "rédacteur", "éditeur", "imprimeur",
      "graphiste", "illustrateur", "compositeur",
    ],
  },
};

const TIERS: Tier[] = ["mini", "kid", "ado"];

function dedupePush(into: string[], seen: Set<string>, words: readonly string[]) {
  for (const w of words) {
    const key = w.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    into.push(w);
  }
}

/** Pool the old difficulty piles, then split by letter count. */
function bucket(src: SourceBanks, locale: Locale): LengthBanks {
  const bounds = LENGTH_BOUNDS[locale];
  const out = {} as LengthBanks;
  for (const cat of REAL_CATEGORY_IDS) {
    const seen = new Set<string>();
    const words: string[] = [];
    for (const tier of TIERS) {
      for (const raw of src[cat][tier]) {
        const clean = raw.trim();
        if (!clean || clean.includes(" ")) continue;
        const key = clean.toLowerCase();
        if (seen.has(key)) continue;
        const n = letterCount(clean);
        if (n < ABS_MIN || n > ABS_MAX) continue;
        seen.add(key);
        words.push(clean);
      }
    }
    const bands: Record<LengthId, string[]> = { short: [], medium: [], long: [] };
    for (const w of words) {
      const n = letterCount(w);
      for (const len of LENGTHS) {
        const b = bounds[len];
        if (n >= b.min && n <= b.max) {
          bands[len].push(w);
          break;
        }
      }
    }
    out[cat] = bands;
  }
  return out;
}

/**
 * If a band is thin, pull in the nearest lengths until there are `min` words.
 * Order: the requested length, then the neighbour, then whatever remains.
 */
export function widenPool(
  byLength: Record<LengthId, readonly string[]>,
  length: LengthId,
  min = MIN_POOL,
): string[] {
  if (byLength[length].length >= min) return [...byLength[length]];
  const order: LengthId[] =
    length === "short"
      ? ["short", "medium", "long"]
      : length === "long"
        ? ["long", "medium", "short"]
        : ["medium", "short", "long"];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const id of order) {
    dedupePush(out, seen, byLength[id]);
    if (out.length >= min) return out;
  }
  return out;
}

const FILTERED: Record<Locale, LengthBanks> = {
  fr: bucket(BANKS, "fr"),
  en: bucket(BANKS_EN, "en"),
};

function pack(locale: Locale): LengthBanks {
  return FILTERED[locale];
}

function exactPool(category: RealCategoryId, length: LengthId, locale: Locale): string[] {
  return pack(locale)[category][length];
}

function resolvedPool(category: RealCategoryId, length: LengthId, locale: Locale): string[] {
  return widenPool(pack(locale)[category], length);
}

export function lengthHint(locale: Locale, id: LengthId): string {
  const { min, max } = LENGTH_BOUNDS[locale][id];
  return locale === "en" ? `${min} to ${max} letters.` : `${min} à ${max} lettres.`;
}

export function wordsFor(category: CategoryId, length: LengthId, locale: Locale = "fr"): string[] {
  if (category === "hasard") {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const id of REAL_CATEGORY_IDS) {
      dedupePush(out, seen, resolvedPool(id, length, locale));
    }
    return out;
  }
  return resolvedPool(category, length, locale);
}

export function allWords(locale: Locale = "fr"): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const length of LENGTHS) dedupePush(out, seen, wordsFor("hasard", length, locale));
  return out;
}

export type WordPick = {
  word: string;
  category: RealCategoryId;
};

function pickFrom(pool: string[], used: Set<string>, rng: () => number): string {
  const fresh = pool.filter((w) => !used.has(w.toLowerCase()));
  const source = fresh.length > 0 ? fresh : pool;
  return source[Math.floor(rng() * source.length)]!;
}

/** Categories that can actually supply this length, richest bands first. */
function categoriesFor(length: LengthId, locale: Locale): RealCategoryId[] {
  const rich = REAL_CATEGORY_IDS.filter((id) => exactPool(id, length, locale).length >= MIN_POOL);
  if (rich.length > 0) return rich;
  const any = REAL_CATEGORY_IDS.filter((id) => resolvedPool(id, length, locale).length > 0);
  return any.length > 0 ? any : [...REAL_CATEGORY_IDS];
}

function categoryOf(word: string, locale: Locale): RealCategoryId {
  const key = word.toLowerCase();
  const banks = pack(locale);
  for (const id of REAL_CATEGORY_IDS) {
    for (const length of LENGTHS) {
      if (banks[id][length].some((w) => w.toLowerCase() === key)) return id;
    }
  }
  return "animaux";
}

export function pickWord(
  category: CategoryId,
  length: LengthId,
  used: Set<string>,
  locale: Locale = "fr",
  rng: () => number = Math.random,
  avoid: RealCategoryId | null = null,
): WordPick {
  let options = categoriesFor(length, locale);
  if (category === "hasard" && avoid) {
    const others = options.filter((id) => id !== avoid);
    if (others.length > 0) options = others;
  }
  let from: RealCategoryId =
    category === "hasard" ? options[Math.floor(rng() * options.length)]! : category;
  let pool = resolvedPool(from, length, locale);
  let widenedToUnion = false;
  if (pool.length === 0) {
    from = options[Math.floor(rng() * options.length)]!;
    pool = resolvedPool(from, length, locale);
  }
  if (pool.length === 0) {
    pool = wordsFor("hasard", length, locale);
    widenedToUnion = true;
  }
  const word = pickFrom(pool, used, rng);
  return { word, category: widenedToUnion ? categoryOf(word, locale) : from };
}

function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function todayKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function dailyWord(
  d = new Date(),
  length: LengthId = "medium",
  locale: Locale = "fr",
): WordPick {
  const pool = wordsFor("hasard", length, locale);
  if (pool.length === 0) return pickWord("hasard", length, new Set(), locale);
  const i = hashString(`${todayKey(d)}-${length}-${locale}`) % pool.length;
  const word = pool[i]!;
  return { word, category: categoryOf(word, locale) };
}

export function bankCounts(locale: Locale = "fr"): Record<string, number> {
  const banks = pack(locale);
  const out: Record<string, number> = {};
  for (const c of REAL_CATEGORY_IDS) {
    for (const m of LENGTHS) out[`${c}.${m}`] = banks[c][m].length;
  }
  return out;
}
