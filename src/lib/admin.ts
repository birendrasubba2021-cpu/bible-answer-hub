import { prisma } from "./prisma";

export interface AdminQuestionRow {
  slug: string;
  question: string;
  status: string;
  trending: boolean;
  views: number;
  departmentName: string;
  categoryName: string;
  updatedAt: string;
}

export async function getAdminQuestions(): Promise<AdminQuestionRow[]> {
  const rows = await prisma.question.findMany({
    include: {
      department: { select: { name: true } },
      category: { select: { name: true } },
    },
    orderBy: { updatedAt: "desc" },
  });
  return rows.map((r) => ({
    slug: r.slug,
    question: r.question,
    status: r.status,
    trending: r.trending,
    views: r.views,
    departmentName: r.department.name,
    categoryName: r.category.name,
    updatedAt: r.updatedAt.toISOString(),
  }));
}

export interface CategoryOption {
  id: string;
  name: string;
  departmentSlug: string;
  departmentName: string;
}

export async function getCategoryOptions(): Promise<CategoryOption[]> {
  const rows = await prisma.category.findMany({
    include: { department: { select: { slug: true, name: true, order: true } } },
    orderBy: { name: "asc" },
  });
  return rows
    .map((c) => ({
      id: c.id,
      name: c.name,
      departmentSlug: c.department.slug,
      departmentName: c.department.name,
    }))
    .sort((a, b) =>
      a.departmentName.localeCompare(b.departmentName) ||
      a.name.localeCompare(b.name),
    );
}

export interface QuestionEditData {
  slug: string;
  question: string;
  categoryId: string;
  shortAnswer: string;
  detailedAnswer: string[];
  theologicalExplanation: string[];
  commonMisunderstandings: string[];
  practicalApplication: string[];
  biblicalBasis: { reference: string; version?: string }[];
  references: string[];
  topics: string[];
  difficulty: string;
  trending: boolean;
    views: number;
    status: string;
    featuredImage: string;
}

export async function getQuestionEditData(
  slug: string,
): Promise<QuestionEditData | null> {
  const r = await prisma.question.findUnique({ where: { slug } });
  if (!r) return null;
  return {
    slug: r.slug,
    question: r.question,
    categoryId: r.categoryId,
    shortAnswer: r.shortAnswer,
    detailedAnswer: (r.detailedAnswer as string[]) ?? [],
    theologicalExplanation: (r.theologicalExplanation as string[]) ?? [],
    commonMisunderstandings: (r.commonMisunderstandings as string[]) ?? [],
    practicalApplication: (r.practicalApplication as string[]) ?? [],
    biblicalBasis:
      (r.biblicalBasis as unknown as { reference: string; version?: string }[]) ??
      [],
    references: (r.references as string[]) ?? [],
    topics: r.topics,
    difficulty: r.difficulty,
    trending: r.trending,
    views: r.views,
    status: r.status,
    featuredImage: r.featuredImage ?? "",
  };
}

export async function getAdminStats() {
  const [total, published, draft, inReview, departments, categories, articles, articlesPublished] =
    await Promise.all([
      prisma.question.count(),
      prisma.question.count({ where: { status: "PUBLISHED" } }),
      prisma.question.count({ where: { status: "DRAFT" } }),
      prisma.question.count({ where: { status: "IN_REVIEW" } }),
      prisma.department.count(),
      prisma.category.count(),
      prisma.article.count(),
      prisma.article.count({ where: { status: "PUBLISHED" } }),
    ]);
  return {
    total,
    published,
    draft,
    inReview,
    departments,
    categories,
    articles,
    articlesPublished,
  };
}

export interface AdminArticleRow {
  slug: string;
  title: string;
  status: string;
  authorName: string;
  updatedAt: string;
}

export async function getAdminArticles(): Promise<AdminArticleRow[]> {
  const rows = await prisma.article.findMany({
    include: { author: { select: { name: true } } },
    orderBy: { updatedAt: "desc" },
  });
  return rows.map((r) => ({
    slug: r.slug,
    title: r.title,
    status: r.status,
    authorName: r.author.name,
    updatedAt: r.updatedAt.toISOString(),
  }));
}

export interface ArticleEditData {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  featuredImg: string;
  tags: string;
  status: string;
}

export async function getArticleEditData(
  slug: string,
): Promise<ArticleEditData | null> {
  const r = await prisma.article.findUnique({
    where: { slug },
    include: { tags: { select: { name: true } } },
  });
  if (!r) return null;
  return {
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    body: r.body,
    featuredImg: r.featuredImg ?? "",
    tags: r.tags.map((t) => t.name).join(", "),
    status: r.status,
  };
}
