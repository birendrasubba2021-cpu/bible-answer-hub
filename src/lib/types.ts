// Core content types for Bible Answer Hub.
// During Phase 1 these power a TypeScript content layer; the same shape maps
// directly onto the Prisma/PostgreSQL schema in prisma/schema.prisma.

export interface Department {
  slug: string;
  name: string;
  shortName?: string;
  description: string;
  icon: string; // emoji or icon key used by the UI
  categories: string[];
}

export interface ScriptureRef {
  reference: string; // e.g. "John 1:1-14"
  version?: string; // e.g. "ESV"
}

/**
 * A numbered note in the Turabian/SBL notes-bibliography apparatus. Referenced
 * from body text with a `[^n]` marker and rendered as a superscript.
 *
 * Modern works are cited with exact pagination; classical and confessional
 * sources are cited by their own internal divisions (e.g. Institutes 1.13.2),
 * which are stable across editions and printings.
 */
export interface Footnote {
  id: number;
  text: string;
}

/** A bibliography entry, alphabetised by author surname and hanging-indented. */
export interface BibliographyEntry {
  /** Surname-first, as it sorts: "Grudem, Wayne". */
  author: string;
  title: string;
  /** Imprint: "Grand Rapids: Zondervan Academic, 2020". */
  publication?: string;
  /** Edition, series, translator, or a note on the text used. */
  detail?: string;
}

export interface QuestionAnswer {
  slug: string;
  question: string;
  department: string; // Department slug
  category: string; // Category name within the department
  topics: string[]; // tags, e.g. ["trinity", "trending"]
  trending?: boolean;
  difficulty?: "introductory" | "intermediate" | "advanced";
  views?: number;
  publishedAt: string; // ISO date

  shortAnswer: string;
  detailedAnswer: string[]; // paragraphs
  biblicalBasis: ScriptureRef[];
  theologicalExplanation: string[]; // paragraphs
  commonMisunderstandings: string[];
  practicalApplication: string[];
  references: string[];
  /** Numbered notes keyed to `[^n]` markers in the answer body. */
  footnotes?: Footnote[];
  /** Structured bibliography; falls back to `references` when absent. */
  bibliography?: BibliographyEntry[];
  relatedSlugs: string[];
  author: string;
  /** Optional hero image URL — add via admin later (e.g. /images/questions/trinity.jpg) */
  featuredImage?: string | null;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  featuredImg?: string | null;
  status?: string;
  footnotes?: Footnote[];
  bibliography?: BibliographyEntry[];
  author: string;
  tags: string[];
  /** Department slug when the article belongs to a field of study. */
  department?: string | null;
  departmentName?: string | null;
  /**
   * Optional editorial thumbnail overrides. When omitted, the plate is
   * derived automatically from title, tags, category, and department.
   */
  thumbnail?: {
    title?: string | null;
    subtitle?: string | null;
    theme?: string | null;
    position?: string | null;
  } | null;
  publishedAt: string;
  readMinutes: number;
}
