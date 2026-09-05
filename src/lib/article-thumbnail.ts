/**
 * Automatic editorial thumbnails for scholarly articles.
 *
 * Resolution order:
 *   1. Manual thumbnail overrides on the article
 *   2. Category / tags / title keywords
 *   3. Department fallback
 *
 * The plate never reprints the full article title. It carries a short
 * subject line and a subtitle; the card below keeps the scholarly title.
 */

import { getDepartment } from "@/lib/departments";

export type ArticleThumbnailThemeId =
  | "hinduism"
  | "vedanta"
  | "world-religions"
  | "islam"
  | "buddhism"
  | "judaism"
  | "sikhism"
  | "cults"
  | "christian-comparative"
  | "christianity"
  | "biblical-studies"
  | "theology"
  | "church-history"
  | "biblical-languages"
  | "apologetics"
  | "ethics"
  | "ministry"
  | "default";

export type ThumbnailPosition = "center" | "left" | "right";

export interface ArticleThumbnailOverride {
  title?: string | null;
  subtitle?: string | null;
  theme?: ArticleThumbnailThemeId | string | null;
  position?: ThumbnailPosition | string | null;
}

export interface ArticleThumbnailInput {
  title: string;
  department?: string | null;
  departmentName?: string | null;
  category?: string | null;
  tags?: string[];
  slug?: string;
  featuredImage?: string | null;
  thumbnailTitle?: string | null;
  thumbnailSubtitle?: string | null;
  thumbnailTheme?: ArticleThumbnailThemeId | string | null;
  thumbnailPosition?: ThumbnailPosition | string | null;
  thumbnail?: ArticleThumbnailOverride | null;
}

export interface ThumbnailPalette {
  base: string;
  mid: string;
  edge: string;
  accent: string;
  glow: string;
  ink: string;
}

export interface ResolvedArticleThumbnail {
  theme: ArticleThumbnailThemeId;
  eyebrow: string;
  shortTitle: string;
  subtitle: string;
  palette: ThumbnailPalette;
  visualType: ArticleThumbnailThemeId;
  position: ThumbnailPosition;
  featuredImage: string | null;
  editorialImage: string | null;
}

const PALETTES: Record<ArticleThumbnailThemeId, ThumbnailPalette> = {
  hinduism: {
    base: "#2A120C",
    mid: "#5A2414",
    edge: "#8A3A18",
    accent: "#E0A24A",
    glow: "#C45A1E",
    ink: "#F6E7C8",
  },
  vedanta: {
    base: "#24160E",
    mid: "#3D2616",
    edge: "#5A3820",
    accent: "#D4B07A",
    glow: "#A56B32",
    ink: "#F3E6D0",
  },
  "world-religions": {
    base: "#101820",
    mid: "#1B2C3A",
    edge: "#2A4454",
    accent: "#C9B07A",
    glow: "#4A7A92",
    ink: "#EAF0F4",
  },
  islam: {
    base: "#071614",
    mid: "#0F2C28",
    edge: "#18443C",
    accent: "#C6B07A",
    glow: "#2E8A6A",
    ink: "#E7F3EE",
  },
  buddhism: {
    base: "#2A1410",
    mid: "#4A2418",
    edge: "#6A3420",
    accent: "#E0B070",
    glow: "#C46A3A",
    ink: "#F6E8D4",
  },
  judaism: {
    base: "#0C1424",
    mid: "#162844",
    edge: "#1E3C64",
    accent: "#D4B45A",
    glow: "#3A6AB0",
    ink: "#E8EEF8",
  },
  sikhism: {
    base: "#1A1410",
    mid: "#2E2418",
    edge: "#44301C",
    accent: "#D8B05A",
    glow: "#8A5A20",
    ink: "#F4EAD4",
  },
  cults: {
    base: "#0E1014",
    mid: "#1A1E26",
    edge: "#2A3140",
    accent: "#C4A882",
    glow: "#5A6478",
    ink: "#E6E2DA",
  },
  "christian-comparative": {
    base: "#12101C",
    mid: "#241C34",
    edge: "#342850",
    accent: "#D4B45A",
    glow: "#6A4E9E",
    ink: "#F0E8D8",
  },
  christianity: {
    base: "#0B1220",
    mid: "#16233C",
    edge: "#1E3358",
    accent: "#D8B45A",
    glow: "#4B7BC8",
    ink: "#EEF2F8",
  },
  "biblical-studies": {
    base: "#0A0F1A",
    mid: "#141C2E",
    edge: "#1C2A45",
    accent: "#C9A227",
    glow: "#3E6BAF",
    ink: "#EEF2F8",
  },
  theology: {
    base: "#10141C",
    mid: "#1C2434",
    edge: "#2A3448",
    accent: "#C9A227",
    glow: "#4A6A98",
    ink: "#EEF2F8",
  },
  "church-history": {
    base: "#18140E",
    mid: "#2A2218",
    edge: "#3C3224",
    accent: "#C4A05A",
    glow: "#8A6A3A",
    ink: "#F3EAD8",
  },
  "biblical-languages": {
    base: "#12161E",
    mid: "#222A38",
    edge: "#323E50",
    accent: "#C4B48A",
    glow: "#5A6A88",
    ink: "#EEF0F4",
  },
  apologetics: {
    base: "#0C161C",
    mid: "#162830",
    edge: "#203C48",
    accent: "#D4B04A",
    glow: "#3A6A80",
    ink: "#E8F0F4",
  },
  ethics: {
    base: "#121018",
    mid: "#221C2C",
    edge: "#32283E",
    accent: "#D0B070",
    glow: "#6A4A88",
    ink: "#F0EAE0",
  },
  ministry: {
    base: "#0C1814",
    mid: "#162820",
    edge: "#203C30",
    accent: "#D4B04A",
    glow: "#3E8A63",
    ink: "#E8F4EC",
  },
  default: {
    base: "#12141A",
    mid: "#1E2430",
    edge: "#2C3444",
    accent: "#C9A227",
    glow: "#4A5A78",
    ink: "#EEF0F4",
  },
};

const DEPARTMENT_THEME: Record<string, ArticleThumbnailThemeId> = {
  "biblical-studies": "biblical-studies",
  theology: "theology",
  "biblical-languages": "biblical-languages",
  "apologetics-philosophy": "apologetics",
  "religions-cults": "world-religions",
  "church-history": "church-history",
  "practical-theology": "ethics",
  "mission-ministry": "ministry",
  "contemporary-issues": "cults",
};

const EDITORIAL_IMAGES: Partial<Record<ArticleThumbnailThemeId, string>> = {
  hinduism: "/images/article-thumbnails/hinduism.svg",
  vedanta: "/images/article-thumbnails/vedanta.svg",
  "world-religions": "/images/article-thumbnails/world-religions.svg",
  islam: "/images/article-thumbnails/islam.svg",
  buddhism: "/images/article-thumbnails/buddhism.svg",
  judaism: "/images/article-thumbnails/judaism.svg",
  christianity: "/images/article-thumbnails/christianity.svg",
  cults: "/images/article-thumbnails/cults.svg",
  "biblical-studies": "/images/article-thumbnails/biblical-studies.svg",
  default: "/images/article-thumbnails/default.svg",
};

interface ThemeRule {
  theme: ArticleThumbnailThemeId;
  test: RegExp;
}

/** Most specific first. Matched against a diacritic-folded haystack. */
const THEME_RULES: ThemeRule[] = [
  {
    theme: "cults",
    // Do not treat the department name "Religions & Cults" as a cults article.
    test: /heresy|heretical|false teach|new religious movement|\bnrm\b|occult|jehovah.?s witness|mormon|latter.?day|(?<!religions\s(?:and|&)\s)\bcults?\b/,
  },
  {
    theme: "islam",
    test: /\bislam\b|\bmuslim\b|\bqur.?an\b|\bquran\b|\bhadith\b|\ballah\b|\bmuhammad\b/,
  },
  {
    theme: "buddhism",
    test: /\bbuddh|\bnirvana\b|\bbuddha\b|theravada|mahayana|vajrayana/,
  },
  {
    theme: "judaism",
    test: /\bjudaism\b|\bjewish\b|\btorah\b|\brabbinic\b|\btalmud\b|\bsynagogue\b/,
  },
  {
    theme: "sikhism",
    test: /\bsikh|\bgurdwara\b|\bguru nanak\b/,
  },
  {
    theme: "christian-comparative",
    test: /why should christians study|christians? study world religion|biblical, missional, and apologetic/,
  },
  {
    theme: "vedanta",
    test: /neither identity|three major schools of vedant|\badvaita\b|vishishtadvaita|visistadvaita|\bdvaita\b/,
  },
  {
    theme: "hinduism",
    test: /\bhindu|\bveda\b|\bvedas\b|upanishad|upani.?ad|bhagavad|gita\b|puja\b|samsara|moksha|moksa/,
  },
  {
    theme: "world-religions",
    test: /glossary|key concepts|philosophy of religion|language of world religion|comparative religion|interreligious|religious studies|world religions/,
  },
  {
    theme: "christianity",
    test: /\bchristianity\b|\btrinity\b|\bjesus\b|\bchrist\b|\bgospel\b|incarnation|theosis|union with christ/,
  },
  {
    theme: "biblical-studies",
    test: /\bbible\b|\bscripture\b|old testament|new testament|pauline|pentateuch|gospel according|genesis|exodus/,
  },
  {
    theme: "church-history",
    test: /church history|reformation|church father|patristic|nicaea|creed|council of/,
  },
  {
    theme: "biblical-languages",
    test: /\bgreek\b|\bhebrew\b|\baramaic\b|exegesis|word study|septuagint/,
  },
  {
    theme: "apologetics",
    test: /apologet|atheis|skepti|worldview|philosophy/,
  },
  {
    theme: "ethics",
    test: /\bethics?\b|moral theology|christian living/,
  },
  {
    theme: "ministry",
    test: /\bmission\b|evangelis|pastoral|discipleship|ministry/,
  },
  {
    theme: "theology",
    test: /systematic theology|doctrine of|theology proper|soteriolog|christolog/,
  },
];

const THEME_SHORT_TITLE: Partial<Record<ArticleThumbnailThemeId, string>> = {
  hinduism: "HINDUISM",
  islam: "ISLAM",
  buddhism: "BUDDHISM",
  judaism: "JUDAISM",
  sikhism: "SIKHISM",
  cults: "CULTS &\nFALSE TEACHING",
};

function fold(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function isDepartmentLabel(tag: string, input: ArticleThumbnailInput): boolean {
  const folded = fold(tag);
  if (folded === "religions & cults" || folded === "religions and cults") {
    return true;
  }
  if (input.departmentName && folded === fold(input.departmentName)) {
    return true;
  }
  return false;
}

function haystackOf(input: ArticleThumbnailInput): string {
  const topicalTags = (input.tags ?? []).filter(
    (tag) => !isDepartmentLabel(tag, input),
  );
  return fold(
    [input.category, ...topicalTags, input.title, input.slug]
      .filter(Boolean)
      .join(" "),
  );
}

function isThemeId(value: string | null | undefined): value is ArticleThumbnailThemeId {
  return Boolean(value && value in PALETTES);
}

function detectTheme(input: ArticleThumbnailInput): ArticleThumbnailThemeId {
  const manual =
    input.thumbnailTheme ?? input.thumbnail?.theme ?? null;
  if (isThemeId(manual)) return manual;

  const hay = haystackOf(input);
  const rule = THEME_RULES.find((r) => r.test.test(hay));
  if (rule) return rule.theme;

  if (input.department && DEPARTMENT_THEME[input.department]) {
    return DEPARTMENT_THEME[input.department];
  }
  return "default";
}

function titleCaseWords(words: string[]): string {
  return words
    .map((w) => w.trim())
    .filter(Boolean)
    .slice(0, 4)
    .join(" • ");
}

function commaSeries(source: string): string | null {
  const cleaned = source
    .replace(/\s+and\s+/gi, ", ")
    .replace(/[—–]/g, ",")
    .replace(/\s+/g, " ")
    .trim();
  const parts = cleaned
    .split(",")
    .map((p) => p.replace(/^(the|its|a|an)\s+/i, "").trim())
    .filter((p) => p.length > 1 && p.length < 28);
  if (parts.length < 2) return null;
  const short = parts.slice(0, 3).map((p) => {
    const word = p.split(/\s+/)[0] ?? p;
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return titleCaseWords(short);
}

function deriveSubtitle(
  title: string,
  theme: ArticleThumbnailThemeId,
): string {
  const afterQuestion = title.split("?").slice(1).join("?");
  const afterColon = title.includes(":") ? title.split(":").slice(1).join(":") : "";

  if (/glossary|key concepts|philosophy of religion/i.test(title)) {
    return "Key Terms • Concepts • Philosophy";
  }

  const guide = title.match(
    /(?:a|an)\s+([^:?]+?)\s+guide(?:\s|$)/i,
  );
  if (guide) {
    const series = commaSeries(guide[1]);
    if (series) return series;
  }

  const intro = title.match(
    /introduction to (?:its\s+)?([^.?]+)/i,
  );
  if (intro) {
    const series = commaSeries(intro[1]);
    if (series) return series;
  }

  const godSelf = title.match(
    /god,\s*the human self,\s*and union/i,
  );
  if (godSelf) return "God • Self • Union";

  const fromColon = commaSeries(afterColon.replace(/in christian[\s\S]*/i, ""));
  if (fromColon && afterColon.length < 90) return fromColon;

  const fromRest = commaSeries(afterQuestion);
  if (fromRest) return fromRest;

  const defaults: Partial<Record<ArticleThumbnailThemeId, string>> = {
    hinduism: "Origins • Scriptures • Worldview",
    vedanta: "God • Self • Union",
    "world-religions": "Key Terms • Concepts • Philosophy",
    "christian-comparative": "Biblical • Missional • Apologetic",
    islam: "Scripture • Practice • Worldview",
    buddhism: "Teaching • Practice • Liberation",
    judaism: "Covenant • Scripture • Tradition",
    cults: "Discernment • Doctrine • History",
    christianity: "Faith • Doctrine • Scripture",
    "biblical-studies": "Text • Context • Theology",
    theology: "Doctrine • Scripture • Church",
    apologetics: "Reason • Evidence • Faith",
  };
  return defaults[theme] ?? "A Scholarly Study";
}

function deriveShortTitle(
  title: string,
  theme: ArticleThumbnailThemeId,
): string {
  if (THEME_SHORT_TITLE[theme] && theme !== "vedanta") {
    return THEME_SHORT_TITLE[theme]!;
  }

  const whyStudy = title.match(
    /why should (?:christians? )?study\s+(.+?)\?/i,
  );
  if (whyStudy) {
    const subject = whyStudy[1].replace(/^the\s+/i, "").trim().toUpperCase();
    return `WHY STUDY\n${subject}?`;
  }

  const whatIs = title.match(/^what is(?: the)?\s+([^?:]+)\??/i);
  if (whatIs) {
    return whatIs[1].trim().toUpperCase();
  }

  const languageOf = title.match(/^the language of\s+([^:]+)/i);
  if (languageOf) {
    return languageOf[1].trim().toUpperCase();
  }

  const folded = fold(title);
  if (
    (folded.includes("christian") || folded.includes("christ")) &&
    folded.includes("vedant")
  ) {
    return "CHRISTIANITY &\nVEDĀNTA";
  }

  if (theme === "vedanta") return "VEDĀNTA";
  if (theme === "world-religions") return "WORLD RELIGIONS";
  if (theme === "christian-comparative") return "WHY STUDY\nWORLD RELIGIONS?";

  const beforeColon = title.split(":")[0]?.trim() ?? title;
  if (beforeColon.length > 0 && beforeColon.length <= 36 && !beforeColon.includes("?")) {
    return beforeColon.toUpperCase();
  }

  const words = beforeColon
    .replace(/[?!.,]/g, "")
    .split(/\s+/)
    .filter((w) => !/^(a|an|the|of|and|in|to|for|on)$/i.test(w));
  if (words.length <= 4) return words.join(" ").toUpperCase();
  return words.slice(0, 3).join(" ").toUpperCase();
}

function eyebrowOf(input: ArticleThumbnailInput): string {
  if (input.departmentName) return input.departmentName.toUpperCase();
  if (input.department) {
    return (getDepartment(input.department)?.name ?? "Articles").toUpperCase();
  }
  return "ARTICLES";
}

function positionOf(input: ArticleThumbnailInput): ThumbnailPosition {
  const raw = input.thumbnailPosition ?? input.thumbnail?.position ?? "center";
  if (raw === "left" || raw === "right" || raw === "center") return raw;
  return "center";
}

export function resolveArticleThumbnail(
  input: ArticleThumbnailInput,
): ResolvedArticleThumbnail {
  const theme = detectTheme(input);
  const shortTitle = (
    input.thumbnailTitle ??
    input.thumbnail?.title ??
    deriveShortTitle(input.title, theme)
  ).trim();
  const subtitle = (
    input.thumbnailSubtitle ??
    input.thumbnail?.subtitle ??
    deriveSubtitle(input.title, theme)
  ).trim();

  return {
    theme,
    visualType: theme,
    eyebrow: eyebrowOf(input),
    shortTitle,
    subtitle,
    palette: PALETTES[theme],
    position: positionOf(input),
    featuredImage: input.featuredImage?.trim() || null,
    editorialImage: EDITORIAL_IMAGES[theme] ?? EDITORIAL_IMAGES.default ?? null,
  };
}

/** Alias used by docs and callers that want the resolved plate. */
export const getArticleThumbnailTheme = resolveArticleThumbnail;

export function objectPosition(position: ThumbnailPosition): string {
  if (position === "left") return "left center";
  if (position === "right") return "right center";
  return "center";
}
