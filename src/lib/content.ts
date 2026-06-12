import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import { departments, getDepartment } from "./departments";
import type { Department, QuestionAnswer, ScriptureRef } from "./types";

export { departments, getDepartment };
export type { Department, QuestionAnswer };

export const SITE = {
  name: "Bible Answer Hub",
  tagline: "Biblical Answers for Every Question of Faith, Theology, and Life.",
  founder: "Apologist Birendra Subba",
  totalQuestionsGoal: "50,000+",
};

// Shared include so every query returns the relations the mapper needs.
const questionInclude = {
  department: { select: { slug: true } },
  category: { select: { name: true } },
  author: { select: { name: true } },
  relatedTo: { select: { slug: true } },
} satisfies Prisma.QuestionInclude;

type QuestionRow = Prisma.QuestionGetPayload<{ include: typeof questionInclude }>;

function toQuestionAnswer(row: QuestionRow): QuestionAnswer {
  return {
    slug: row.slug,
    question: row.question,
    department: row.department.slug,
    category: row.category.name,
    topics: row.topics,
    trending: row.trending,
    difficulty: row.difficulty.toLowerCase() as QuestionAnswer["difficulty"],
    views: row.views,
    publishedAt: row.publishedAt.toISOString(),
    shortAnswer: row.shortAnswer,
    detailedAnswer: (row.detailedAnswer as string[]) ?? [],
    theologicalExplanation: (row.theologicalExplanation as string[]) ?? [],
    commonMisunderstandings: (row.commonMisunderstandings as string[]) ?? [],
    practicalApplication: (row.practicalApplication as string[]) ?? [],
    biblicalBasis: (row.biblicalBasis as unknown as ScriptureRef[]) ?? [],
    references: (row.references as string[]) ?? [],
    relatedSlugs: row.relatedTo.map((r) => r.slug),
    author: row.author.name,
    featuredImage: row.featuredImage,
  };
}

export async function getAllQuestions(): Promise<QuestionAnswer[]> {
  const rows = await prisma.question.findMany({
    where: { status: "PUBLISHED" },
    include: questionInclude,
    orderBy: { views: "desc" },
  });
  return rows.map(toQuestionAnswer);
}

export async function getQuestionBySlug(
  slug: string,
): Promise<QuestionAnswer | null> {
  const row = await prisma.question.findUnique({
    where: { slug },
    include: questionInclude,
  });
  return row ? toQuestionAnswer(row) : null;
}

export async function getTrendingQuestions(limit = 6): Promise<QuestionAnswer[]> {
  const rows = await prisma.question.findMany({
    where: { status: "PUBLISHED", trending: true },
    include: questionInclude,
    orderBy: { views: "desc" },
    take: limit,
  });
  return rows.map(toQuestionAnswer);
}

export async function getPopularQuestions(limit = 6): Promise<QuestionAnswer[]> {
  const rows = await prisma.question.findMany({
    where: { status: "PUBLISHED" },
    include: questionInclude,
    orderBy: { views: "desc" },
    take: limit,
  });
  return rows.map(toQuestionAnswer);
}

export async function getRecentQuestions(limit = 6): Promise<QuestionAnswer[]> {
  const rows = await prisma.question.findMany({
    where: { status: "PUBLISHED" },
    include: questionInclude,
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
  return rows.map(toQuestionAnswer);
}

export async function getQuestionsByDepartment(
  deptSlug: string,
): Promise<QuestionAnswer[]> {
  const rows = await prisma.question.findMany({
    where: { status: "PUBLISHED", department: { slug: deptSlug } },
    include: questionInclude,
    orderBy: { views: "desc" },
  });
  return rows.map(toQuestionAnswer);
}

export async function getRelatedQuestions(
  q: QuestionAnswer,
): Promise<QuestionAnswer[]> {
  if (!q.relatedSlugs.length) return [];
  const rows = await prisma.question.findMany({
    where: { slug: { in: q.relatedSlugs } },
    include: questionInclude,
  });
  return rows.map(toQuestionAnswer);
}

export async function getAllQuestionSlugs(): Promise<string[]> {
  const rows = await prisma.question.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true },
  });
  return rows.map((r) => r.slug);
}

export async function getQuestionCount(): Promise<number> {
  return prisma.question.count({ where: { status: "PUBLISHED" } });
}

// Map of department slug -> number of published questions.
export async function getDepartmentCounts(): Promise<Record<string, number>> {
  const grouped = await prisma.question.groupBy({
    by: ["departmentId"],
    where: { status: "PUBLISHED" },
    _count: { _all: true },
  });
  const depts = await prisma.department.findMany({
    select: { id: true, slug: true },
  });
  const slugById = new Map(depts.map((d) => [d.id, d.slug]));
  const counts: Record<string, number> = {};
  for (const g of grouped) {
    const slug = slugById.get(g.departmentId);
    if (slug) counts[slug] = g._count._all;
  }
  return counts;
}
