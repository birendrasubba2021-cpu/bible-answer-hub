import { PrismaClient, Difficulty, Prisma } from "@prisma/client";
import { departments } from "../src/lib/departments";
import { questions } from "../src/lib/questions";
import { abrahamArticle } from "../src/lib/articles/abraham";
import { abrahamFamilyTreeArticle } from "../src/lib/articles/abraham-family-tree";
import { jacobTwelveTribesArticle } from "../src/lib/articles/jacob-twelve-tribes";
import { abrahamBeyondArticle } from "../src/lib/articles/abraham-beyond";

const seedArticles = [
  abrahamArticle,
  abrahamFamilyTreeArticle,
  jacobTwelveTribesArticle,
  abrahamBeyondArticle,
];

const prisma = new PrismaClient();

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const DIFFICULTY: Record<string, Difficulty> = {
  introductory: Difficulty.INTRODUCTORY,
  intermediate: Difficulty.INTERMEDIATE,
  advanced: Difficulty.ADVANCED,
};

async function main() {
  console.log("Seeding Bible Answer Hub...");

  // Author
  const author = await prisma.author.upsert({
    where: { slug: "birendra-subba" },
    update: {},
    create: {
      slug: "birendra-subba",
      name: "Apologist Birendra Subba",
      title: "Apologist, Bible Teacher & Theological Educator",
      bio: "Founder of Bible Answer Hub. B.Th., M.Div., M.Th. (New Testament).",
    },
  });

  // Departments + categories
  const categoryIdByKey = new Map<string, string>();
  for (let i = 0; i < departments.length; i++) {
    const d = departments[i];
    const dept = await prisma.department.upsert({
      where: { slug: d.slug },
      update: { name: d.name, description: d.description, icon: d.icon, order: i },
      create: {
        slug: d.slug,
        name: d.name,
        description: d.description,
        icon: d.icon,
        order: i,
      },
    });

    for (const catName of d.categories) {
      const catSlug = `${d.slug}-${slugify(catName)}`;
      const cat = await prisma.category.upsert({
        where: { slug: catSlug },
        update: { name: catName, departmentId: dept.id },
        create: { slug: catSlug, name: catName, departmentId: dept.id },
      });
      categoryIdByKey.set(`${d.slug}::${catName}`, cat.id);
    }
  }

  // Questions
  for (const q of questions) {
    const dept = await prisma.department.findUnique({
      where: { slug: q.department },
    });
    if (!dept) {
      console.warn(`Skipping ${q.slug}: department ${q.department} not found`);
      continue;
    }
    const categoryId = categoryIdByKey.get(`${q.department}::${q.category}`);
    if (!categoryId) {
      console.warn(`Skipping ${q.slug}: category ${q.category} not found`);
      continue;
    }

    await prisma.question.upsert({
      where: { slug: q.slug },
      update: {},
      create: {
        slug: q.slug,
        question: q.question,
        difficulty: DIFFICULTY[q.difficulty ?? "introductory"],
        trending: q.trending ?? false,
        views: q.views ?? 0,
        shortAnswer: q.shortAnswer,
        detailedAnswer: q.detailedAnswer,
        theologicalExplanation: q.theologicalExplanation,
        commonMisunderstandings: q.commonMisunderstandings,
        practicalApplication: q.practicalApplication,
        biblicalBasis: q.biblicalBasis as unknown as Prisma.InputJsonValue,
        references: q.references,
        topics: q.topics,
        publishedAt: new Date(q.publishedAt),
        departmentId: dept.id,
        categoryId,
        authorId: author.id,
      },
    });
  }

  // Second pass: related questions (self-relation)
  for (const q of questions) {
    if (!q.relatedSlugs.length) continue;
    await prisma.question.update({
      where: { slug: q.slug },
      data: {
        relatedTo: {
          connect: q.relatedSlugs
            .filter((s) => questions.some((x) => x.slug === s))
            .map((s) => ({ slug: s })),
        },
      },
    });
  }

  // Published articles
  for (const article of seedArticles) {
    const articleTags = [];
    for (const name of article.tags) {
      const tagSlug = slugify(name);
      const tag = await prisma.tag.upsert({
        where: { slug: tagSlug },
        update: { name },
        create: { slug: tagSlug, name },
      });
      articleTags.push({ id: tag.id });
    }

    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {
        title: article.title,
        excerpt: article.excerpt,
        body: article.body,
        featuredImg: article.featuredImg,
        status: "PUBLISHED",
        tags: { set: articleTags },
      },
      create: {
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        body: article.body,
        featuredImg: article.featuredImg,
        status: "PUBLISHED",
        authorId: author.id,
        tags: { connect: articleTags },
      },
    });
  }

  const counts = {
    departments: await prisma.department.count(),
    categories: await prisma.category.count(),
    questions: await prisma.question.count(),
    articles: await prisma.article.count(),
  };
  console.log("Seed complete:", counts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
