/**
 * Loads a batch of drafted answers into the database with DRAFT status, so
 * they are visible in the admin panel but never served publicly until an
 * editor publishes them.
 *
 * Run with: npx tsx prisma/add-drafts.ts
 */
import { PrismaClient, Difficulty, Prisma } from "@prisma/client";
import { batchOneQuestions } from "../src/lib/questions-batch-01";

const prisma = new PrismaClient();

const DIFFICULTY: Record<string, Difficulty> = {
  introductory: Difficulty.INTRODUCTORY,
  intermediate: Difficulty.INTERMEDIATE,
  advanced: Difficulty.ADVANCED,
};

async function main() {
  const author = await prisma.author.findUnique({
    where: { slug: "birendra-subba" },
  });
  if (!author) throw new Error("Author birendra-subba not found. Seed first.");

  let created = 0;
  let updated = 0;

  for (const q of batchOneQuestions) {
    const dept = await prisma.department.findUnique({
      where: { slug: q.department },
    });
    if (!dept) {
      console.warn(`! ${q.slug}: department "${q.department}" not found`);
      continue;
    }

    const category = await prisma.category.findFirst({
      where: { departmentId: dept.id, name: q.category },
    });
    if (!category) {
      console.warn(
        `! ${q.slug}: category "${q.category}" not found in ${q.department}`,
      );
      continue;
    }

    const data = {
      question: q.question,
      status: "DRAFT" as const,
      difficulty: DIFFICULTY[q.difficulty ?? "introductory"],
      trending: false,
      views: 0,
      shortAnswer: q.shortAnswer,
      detailedAnswer: q.detailedAnswer,
      theologicalExplanation: q.theologicalExplanation,
      commonMisunderstandings: q.commonMisunderstandings,
      practicalApplication: q.practicalApplication,
      biblicalBasis: q.biblicalBasis as unknown as Prisma.InputJsonValue,
      references: q.references,
      footnotes: (q.footnotes ?? []) as unknown as Prisma.InputJsonValue,
      bibliography: (q.bibliography ?? []) as unknown as Prisma.InputJsonValue,
      topics: q.topics,
      publishedAt: new Date(q.publishedAt),
      departmentId: dept.id,
      categoryId: category.id,
      authorId: author.id,
    };

    const existing = await prisma.question.findUnique({
      where: { slug: q.slug },
      select: { id: true, status: true },
    });

    if (existing) {
      // Never quietly revert something an editor has already published.
      if (existing.status === "PUBLISHED") {
        console.log(`= ${q.slug} (already published, skipped)`);
        continue;
      }
      await prisma.question.update({ where: { slug: q.slug }, data });
      updated++;
      console.log(`~ ${q.slug} (draft updated)`);
    } else {
      await prisma.question.create({ data: { slug: q.slug, ...data } });
      created++;
      console.log(`+ ${q.slug} (draft created)`);
    }
  }

  // Related questions are connected only where the target already exists.
  for (const q of batchOneQuestions) {
    if (!q.relatedSlugs.length) continue;
    const targets = await prisma.question.findMany({
      where: { slug: { in: q.relatedSlugs } },
      select: { slug: true },
    });
    if (!targets.length) continue;
    await prisma.question.update({
      where: { slug: q.slug },
      data: { relatedTo: { set: targets.map((t) => ({ slug: t.slug })) } },
    });
  }

  const drafts = await prisma.question.count({ where: { status: "DRAFT" } });
  console.log(
    `\nDone. created=${created} updated=${updated} — ${drafts} draft(s) awaiting review.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
