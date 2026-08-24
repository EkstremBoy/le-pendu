import type { CategoryId, ModeId } from "./types";
import { letterCount } from "./letters";
import type { Locale } from "@/lib/i18n";
import { BANKS_EN } from "./words-en";

type Banks = Record<Exclude<CategoryId, "hasard">, Record<ModeId, string[]>>;

const BANKS: Banks = {
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

function uniqueKeep(words: string[], mode: ModeId): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  const min = mode === "mini" ? 3 : mode === "kid" ? 5 : 7;
  const max = mode === "mini" ? 5 : mode === "kid" ? 9 : 14;
  for (const w of words) {
    const clean = w.trim();
    if (!clean || clean.includes(" ")) continue;
    const key = clean.toLowerCase();
    if (seen.has(key)) continue;
    const n = letterCount(clean);
    if (n < min || n > max) continue;
    seen.add(key);
    out.push(clean);
  }
  return out;
}

function bankOf(src: Banks): Banks {
  return {
    animaux: {
      mini: uniqueKeep(src.animaux.mini, "mini"),
      kid: uniqueKeep(src.animaux.kid, "kid"),
      ado: uniqueKeep(src.animaux.ado, "ado"),
    },
    nourriture: {
      mini: uniqueKeep(src.nourriture.mini, "mini"),
      kid: uniqueKeep(src.nourriture.kid, "kid"),
      ado: uniqueKeep(src.nourriture.ado, "ado"),
    },
    ecole: {
      mini: uniqueKeep(src.ecole.mini, "mini"),
      kid: uniqueKeep(src.ecole.kid, "kid"),
      ado: uniqueKeep(src.ecole.ado, "ado"),
    },
    sports: {
      mini: uniqueKeep(src.sports.mini, "mini"),
      kid: uniqueKeep(src.sports.kid, "kid"),
      ado: uniqueKeep(src.sports.ado, "ado"),
    },
    espace: {
      mini: uniqueKeep(src.espace.mini, "mini"),
      kid: uniqueKeep(src.espace.kid, "kid"),
      ado: uniqueKeep(src.espace.ado, "ado"),
    },
    maison: {
      mini: uniqueKeep(src.maison.mini, "mini"),
      kid: uniqueKeep(src.maison.kid, "kid"),
      ado: uniqueKeep(src.maison.ado, "ado"),
    },
    nature: {
      mini: uniqueKeep(src.nature.mini, "mini"),
      kid: uniqueKeep(src.nature.kid, "kid"),
      ado: uniqueKeep(src.nature.ado, "ado"),
    },
    metiers: {
      mini: uniqueKeep(src.metiers.mini, "mini"),
      kid: uniqueKeep(src.metiers.kid, "kid"),
      ado: uniqueKeep(src.metiers.ado, "ado"),
    },
  };
}

const FILTERED = bankOf(BANKS);
const FILTERED_EN = bankOf(BANKS_EN);

function pack(locale: Locale): Banks {
  return locale === "en" ? FILTERED_EN : FILTERED;
}

export function wordsFor(category: CategoryId, mode: ModeId, locale: Locale = "fr"): string[] {
  const banks = pack(locale);
  if (category === "hasard") {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const id of Object.keys(banks) as Array<Exclude<CategoryId, "hasard">>) {
      for (const w of banks[id][mode]) {
        const k = w.toLowerCase();
        if (seen.has(k)) continue;
        seen.add(k);
        out.push(w);
      }
    }
    return out;
  }
  return banks[category][mode];
}

export function allWords(locale: Locale = "fr"): string[] {
  return (["mini", "kid", "ado"] as ModeId[]).flatMap((m) => wordsFor("hasard", m, locale));
}

export function pickWord(
  category: CategoryId,
  mode: ModeId,
  used: Set<string>,
  locale: Locale = "fr",
): string {
  let pool = wordsFor(category, mode, locale);
  if (pool.length === 0) pool = wordsFor("hasard", mode, locale);
  const fresh = pool.filter((w) => !used.has(w.toLowerCase()));
  const source = fresh.length > 0 ? fresh : pool;
  return source[Math.floor(Math.random() * source.length)]!;
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

export function dailyWord(d = new Date(), mode: ModeId = "kid", locale: Locale = "fr"): string {
  const pool = wordsFor("hasard", mode, locale);
  if (pool.length === 0) return pickWord("hasard", mode, new Set(), locale);
  const i = hashString(`${todayKey(d)}-${mode}-${locale}`) % pool.length;
  return pool[i]!;
}

export function bankCounts(locale: Locale = "fr"): Record<string, number> {
  const banks = pack(locale);
  const out: Record<string, number> = {};
  (Object.keys(banks) as Array<Exclude<CategoryId, "hasard">>).forEach((c) => {
    (["mini", "kid", "ado"] as ModeId[]).forEach((m) => {
      out[`${c}.${m}`] = banks[c][m].length;
    });
  });
  return out;
}