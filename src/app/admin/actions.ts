"use server";

import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ContentStatus, Difficulty } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  createSessionToken,
} from "@/lib/auth";

export interface ActionState {
  error?: string;
}

// ---------- helpers ----------
function safeEqual(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

function paragraphs(s: FormDataEntryValue | null): string[] {
  return String(s ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function lines(s: FormDataEntryValue | null): string[] {
  return String(s ?? "")
    .split(/\n/)
    .map((l) => l.trim())
    .filter(Boolean);
}

function csv(s: FormDataEntryValue | null): string[] {
  return String(s ?? "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}

function parseRefs(
  s: FormDataEntryValue | null,
): { reference: string; version?: string }[] {
  return lines(s).map((line) => {
    const [reference, version] = line.split("|").map((x) => x.trim());
    return version ? { reference, version } : { reference };
  });
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function uniqueSlug(base: string, excludeSlug?: string): Promise<string> {
  let candidate = base || "question";
  let n = 1;
  while (true) {
    const existing = await prisma.question.findUnique({
      where: { slug: candidate },
      select: { slug: true },
    });
    if (!existing || existing.slug === excludeSlug) return candidate;
    n += 1;
    candidate = `${base}-${n}`;
  }
}

const DIFFICULTY: Record<string, Difficulty> = {
  introductory: Difficulty.INTRODUCTORY,
  intermediate: Difficulty.INTERMEDIATE,
  advanced: Difficulty.ADVANCED,
};

const STATUS: Record<string, ContentStatus> = {
  DRAFT: ContentStatus.DRAFT,
  IN_REVIEW: ContentStatus.IN_REVIEW,
  PUBLISHED: ContentStatus.PUBLISHED,
  ARCHIVED: ContentStatus.ARCHIVED,
};

async function ensureAuthorId(): Promise<string> {
  const existing = await prisma.author.findFirst();
  if (existing) return existing.id;
  const created = await prisma.author.create({
    data: {
      slug: "birendra-subba",
      name: "Apologist Birendra Subba",
      title: "Apologist, Bible Teacher & Theological Educator",
    },
  });
  return created.id;
}

function revalidatePublic(slug?: string) {
  revalidatePath("/", "layout");
  if (slug) revalidatePath(`/questions/${slug}`);
}

function revalidateArticles(slug?: string) {
  revalidatePath("/articles");
  if (slug) revalidatePath(`/articles/${slug}`);
}

async function uniqueArticleSlug(
  base: string,
  excludeSlug?: string,
): Promise<string> {
  let candidate = base || "article";
  let n = 1;
  while (true) {
    const existing = await prisma.article.findUnique({
      where: { slug: candidate },
      select: { slug: true },
    });
    if (!existing || existing.slug === excludeSlug) return candidate;
    n += 1;
    candidate = `${base}-${n}`;
  }
}

async function upsertTags(names: string[]) {
  const tags = [];
  for (const name of names) {
    const slug = slugify(name);
    const tag = await prisma.tag.upsert({
      where: { slug },
      update: { name },
      create: { slug, name },
    });
    tags.push({ id: tag.id });
  }
  return tags;
}

// ---------- auth ----------
export async function login(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const password = String(formData.get("password") ?? "");
  const from = String(formData.get("from") ?? "/admin");
  const expected = process.env.ADMIN_PASSWORD ?? "";

  if (!expected) {
    return { error: "ADMIN_PASSWORD is not configured on the server." };
  }
  if (!password || !safeEqual(password, expected)) {
    return { error: "Incorrect password. Please try again." };
  }

  const token = await createSessionToken();
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  redirect(from.startsWith("/admin") ? from : "/admin");
}

export async function logout() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

// ---------- questions ----------
function readQuestionData(formData: FormData) {
  return {
    question: String(formData.get("question") ?? "").trim(),
    categoryId: String(formData.get("categoryId") ?? ""),
    shortAnswer: String(formData.get("shortAnswer") ?? "").trim(),
    detailedAnswer: paragraphs(formData.get("detailedAnswer")),
    theologicalExplanation: paragraphs(formData.get("theologicalExplanation")),
    commonMisunderstandings: lines(formData.get("commonMisunderstandings")),
    practicalApplication: lines(formData.get("practicalApplication")),
    biblicalBasis: parseRefs(formData.get("biblicalBasis")),
    references: lines(formData.get("references")),
    topics: csv(formData.get("topics")),
    difficulty:
      DIFFICULTY[String(formData.get("difficulty") ?? "introductory")] ??
      Difficulty.INTRODUCTORY,
    trending: formData.get("trending") === "on",
    views: Number(formData.get("views") ?? 0) || 0,
    status:
      STATUS[String(formData.get("status") ?? "DRAFT")] ?? ContentStatus.DRAFT,
    featuredImage: String(formData.get("featuredImage") ?? "").trim(),
  };
}

export async function createQuestion(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const d = readQuestionData(formData);
  if (!d.question) return { error: "Question text is required." };
  if (!d.categoryId) return { error: "Please choose a category." };
  if (!d.shortAnswer) return { error: "A short answer is required." };

  const category = await prisma.category.findUnique({
    where: { id: d.categoryId },
    select: { departmentId: true },
  });
  if (!category) return { error: "Selected category was not found." };

  const slugBase = slugify(String(formData.get("slug") || d.question));
  const slug = await uniqueSlug(slugBase);
  const authorId = await ensureAuthorId();

  await prisma.question.create({
    data: {
      slug,
      question: d.question,
      shortAnswer: d.shortAnswer,
      detailedAnswer: d.detailedAnswer,
      theologicalExplanation: d.theologicalExplanation,
      commonMisunderstandings: d.commonMisunderstandings,
      practicalApplication: d.practicalApplication,
      biblicalBasis: d.biblicalBasis,
      references: d.references,
      topics: d.topics,
      difficulty: d.difficulty,
      trending: d.trending,
      views: d.views,
      status: d.status,
      featuredImage: d.featuredImage || null,
      departmentId: category.departmentId,
      categoryId: d.categoryId,
      authorId,
    },
  });

  revalidatePublic(slug);
  redirect("/admin/questions");
}

export async function updateQuestion(
  slug: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const d = readQuestionData(formData);
  if (!d.question) return { error: "Question text is required." };
  if (!d.categoryId) return { error: "Please choose a category." };
  if (!d.shortAnswer) return { error: "A short answer is required." };

  const category = await prisma.category.findUnique({
    where: { id: d.categoryId },
    select: { departmentId: true },
  });
  if (!category) return { error: "Selected category was not found." };

  await prisma.question.update({
    where: { slug },
    data: {
      question: d.question,
      shortAnswer: d.shortAnswer,
      detailedAnswer: d.detailedAnswer,
      theologicalExplanation: d.theologicalExplanation,
      commonMisunderstandings: d.commonMisunderstandings,
      practicalApplication: d.practicalApplication,
      biblicalBasis: d.biblicalBasis,
      references: d.references,
      topics: d.topics,
      difficulty: d.difficulty,
      trending: d.trending,
      views: d.views,
      status: d.status,
      featuredImage: d.featuredImage || null,
      departmentId: category.departmentId,
      categoryId: d.categoryId,
    },
  });

  revalidatePublic(slug);
  redirect("/admin/questions");
}

export async function deleteQuestion(formData: FormData) {
  const slug = String(formData.get("slug") ?? "");
  if (slug) {
    await prisma.question.delete({ where: { slug } });
    revalidatePublic(slug);
  }
  redirect("/admin/questions");
}

export async function setStatus(formData: FormData) {
  const slug = String(formData.get("slug") ?? "");
  const status = STATUS[String(formData.get("status") ?? "")];
  if (slug && status) {
    await prisma.question.update({ where: { slug }, data: { status } });
    revalidatePublic(slug);
  }
  redirect("/admin/questions");
}

// ---------- articles ----------
function readArticleData(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    body: String(formData.get("body") ?? "").trim(),
    featuredImg: String(formData.get("featuredImg") ?? "").trim(),
    tags: csv(formData.get("tags")),
    status:
      STATUS[String(formData.get("status") ?? "DRAFT")] ?? ContentStatus.DRAFT,
  };
}

export async function createArticle(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const d = readArticleData(formData);
  if (!d.title) return { error: "Title is required." };
  if (!d.excerpt) return { error: "Excerpt is required." };
  if (!d.body) return { error: "Article body is required." };

  const slugBase = slugify(String(formData.get("slug") || d.title));
  const slug = await uniqueArticleSlug(slugBase);
  const authorId = await ensureAuthorId();
  const tagConnect = await upsertTags(d.tags);

  await prisma.article.create({
    data: {
      slug,
      title: d.title,
      excerpt: d.excerpt,
      body: d.body,
      featuredImg: d.featuredImg || null,
      status: d.status,
      authorId,
      tags: { connect: tagConnect },
    },
  });

  revalidateArticles(slug);
  redirect("/admin/articles");
}

export async function updateArticle(
  slug: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const d = readArticleData(formData);
  if (!d.title) return { error: "Title is required." };
  if (!d.excerpt) return { error: "Excerpt is required." };
  if (!d.body) return { error: "Article body is required." };

  const tagConnect = await upsertTags(d.tags);

  await prisma.article.update({
    where: { slug },
    data: {
      title: d.title,
      excerpt: d.excerpt,
      body: d.body,
      featuredImg: d.featuredImg || null,
      status: d.status,
      tags: { set: tagConnect },
    },
  });

  revalidateArticles(slug);
  redirect("/admin/articles");
}

export async function deleteArticle(formData: FormData) {
  const slug = String(formData.get("slug") ?? "");
  if (slug) {
    await prisma.article.delete({ where: { slug } });
    revalidateArticles(slug);
  }
  redirect("/admin/articles");
}

export async function setArticleStatus(formData: FormData) {
  const slug = String(formData.get("slug") ?? "");
  const status = STATUS[String(formData.get("status") ?? "")];
  if (slug && status) {
    await prisma.article.update({ where: { slug }, data: { status } });
    revalidateArticles(slug);
  }
  redirect("/admin/articles");
}
