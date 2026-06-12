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
  relatedSlugs: string[];
  author: string;
}
