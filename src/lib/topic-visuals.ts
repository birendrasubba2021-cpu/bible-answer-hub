/**
 * Topic-aware visual identity for generated thumbnails.
 *
 * Every entry in the library receives a plate whose palette and emblem are
 * derived from its subject matter rather than assigned at random, so the same
 * doctrine always carries the same visual signature across the site.
 *
 * Palette construction follows a single rule: a deep, desaturated base hue
 * carries the topic, while a shared brass accent carries the brand. Hue varies;
 * the metal stays constant — the convention used by scholarly series bindings.
 */

export type MotifName =
  | "triquetra"
  | "dove"
  | "flame"
  | "crown"
  | "cross"
  | "scroll"
  | "tablets"
  | "rings"
  | "scales"
  | "shield"
  | "globe"
  | "chalice"
  | "lamp"
  | "temple"
  | "coin"
  | "compass"
  | "star"
  | "water"
  | "sword"
  | "heart"
  | "book";

export interface Palette {
  /** Darkest corner of the gradient. */
  base: string;
  /** Mid stop — carries the topic hue. */
  mid: string;
  /** Lightest corner, opposite the base. */
  edge: string;
  /** Brass accent: rules, eyebrow text, emblem stroke. */
  accent: string;
  /** Cool light source used for the radial highlight. */
  glow: string;
}

export const PALETTES = {
  midnight: {
    base: "#0B1220",
    mid: "#16233C",
    edge: "#1E3358",
    accent: "#D8B45A",
    glow: "#4B7BC8",
  },
  ink: {
    base: "#0A0F1A",
    mid: "#131C2E",
    edge: "#1C2A45",
    accent: "#C9A227",
    glow: "#3E6BAF",
  },
  slate: {
    base: "#101820",
    mid: "#1B2836",
    edge: "#27394C",
    accent: "#CBB273",
    glow: "#5B8AB8",
  },
  plum: {
    base: "#16101F",
    mid: "#241A33",
    edge: "#33244A",
    accent: "#D6B27E",
    glow: "#8A6BC0",
  },
  ember: {
    base: "#180F0C",
    mid: "#2B1810",
    edge: "#3E2317",
    accent: "#E0A24A",
    glow: "#C4622A",
  },
  oxblood: {
    base: "#170B0E",
    mid: "#2A1218",
    edge: "#3D1A22",
    accent: "#D19A5C",
    glow: "#A63D4A",
  },
  wine: {
    base: "#14101C",
    mid: "#241830",
    edge: "#341F42",
    accent: "#C9A227",
    glow: "#7A4E9E",
  },
  forest: {
    base: "#0A1512",
    mid: "#12241D",
    edge: "#1B362B",
    accent: "#C6A95E",
    glow: "#3E8A63",
  },
  teal: {
    base: "#071417",
    mid: "#0F2429",
    edge: "#17363D",
    accent: "#CBAE63",
    glow: "#2E8497",
  },
  sepia: {
    base: "#14100B",
    mid: "#241C12",
    edge: "#34291B",
    accent: "#C9A45C",
    glow: "#9A7434",
  },
} satisfies Record<string, Palette>;

export type PaletteName = keyof typeof PALETTES;

interface Rule {
  test: RegExp;
  motif: MotifName;
  palette: PaletteName;
}

/**
 * Ordered most-specific first; the first match wins. Keyed on the combined
 * question text, category, and topic tags.
 */
const RULES: Rule[] = [
  { test: /trinit|triune|godhead|theology proper/, motif: "triquetra", palette: "midnight" },
  { test: /tongue|glossolal|slain in the spirit|laughing spirit|revival/, motif: "flame", palette: "ember" },
  { test: /holy spirit|pneumatolog|spirit baptism|spiritual gift|pentecost/, motif: "dove", palette: "ember" },
  { test: /prosperity|wealth|money|tithe|seed faith|giving|financ/, motif: "coin", palette: "oxblood" },
  { test: /false prophet|false teach|heres|cult|occult|deceiv/, motif: "sword", palette: "oxblood" },
  { test: /homosexual|transgender|gender|sexualit|lgbt|marriage|divorce|family|singleness|celibac/, motif: "rings", palette: "plum" },
  { test: /baptism|immersion/, motif: "water", palette: "teal" },
  { test: /communion|lord'?s supper|eucharist|sacrament/, motif: "chalice", palette: "wine" },
  { test: /jesus|christ|christolog|incarnation|messiah|deity of/, motif: "crown", palette: "midnight" },
  { test: /gospel|salvation|soteriolog|justificat|atonement|redempt|born again|repent|grace/, motif: "cross", palette: "ink" },
  { test: /scripture|bible|canon|inerran|inspiration|manuscript|translation|bibliolog|hermeneut/, motif: "scroll", palette: "ink" },
  { test: /law|commandment|torah|sabbath|old covenant|mosaic/, motif: "tablets", palette: "sepia" },
  { test: /calvinis|arminian|predestinat|election|free will|sovereignt/, motif: "scales", palette: "slate" },
  { test: /apologet|exist|atheis|skeptic|evidence|science|philosoph|worldview|problem of evil/, motif: "shield", palette: "slate" },
  { test: /islam|muslim|hindu|buddh|sikh|jain|judaism|world religion|jehovah|mormon|comparative/, motif: "globe", palette: "teal" },
  { test: /church history|reformation|church father|council|creed|nicaea|denomination|medieval|patristic/, motif: "temple", palette: "sepia" },
  { test: /eschatolog|end times|second coming|rapture|millenni|heaven|hell|judgment|resurrection|prophec/, motif: "star", palette: "wine" },
  { test: /angel|demon|satan|spiritual warfare|deliverance|exorcis/, motif: "sword", palette: "wine" },
  { test: /mission|evangelis|great commission|church plant|witness|unreached/, motif: "compass", palette: "teal" },
  { test: /counsel|depress|anxiet|grief|suffering|pastoral care|addiction|forgive/, motif: "heart", palette: "forest" },
  { test: /pray|fasting|devotion|discipline|discipleship|christian living|holiness|sanctif|obedience/, motif: "lamp", palette: "forest" },
  { test: /church|ecclesiolog|elder|deacon|worship|congregation|membership/, motif: "temple", palette: "forest" },
  { test: /greek|hebrew|aramaic|exegesis|word study|language|syntax/, motif: "scroll", palette: "slate" },
  { test: /creation|genesis|abraham|patriarch|israel|covenant|old testament/, motif: "tablets", palette: "sepia" },
];

/** Fallback palette per department, used when no topical rule matches. */
const DEPARTMENT_FALLBACK: Record<string, PaletteName> = {
  "biblical-studies": "ink",
  theology: "midnight",
  "biblical-languages": "slate",
  "apologetics-philosophy": "slate",
  "religions-cults": "teal",
  "church-history": "sepia",
  "practical-theology": "forest",
  "mission-ministry": "teal",
  "contemporary-issues": "plum",
};

export interface TopicVisual {
  motif: MotifName;
  palette: Palette;
  paletteName: PaletteName;
}

export function getTopicVisual({
  title,
  category,
  topics = [],
  departmentSlug,
}: {
  title?: string;
  category?: string;
  topics?: string[];
  departmentSlug?: string;
}): TopicVisual {
  const haystack = [title, category, topics.join(" ")]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const rule = RULES.find((r) => r.test.test(haystack));
  if (rule) {
    return {
      motif: rule.motif,
      palette: PALETTES[rule.palette],
      paletteName: rule.palette,
    };
  }

  const fallback =
    (departmentSlug && DEPARTMENT_FALLBACK[departmentSlug]) || "midnight";
  return {
    motif: "book",
    palette: PALETTES[fallback],
    paletteName: fallback,
  };
}
