/**
 * Publishes the World Religions article under Religions & Cults.
 *
 * Run: npx tsx prisma/publish-world-religions-article.ts
 */
import { readFileSync } from "fs";
import { join } from "path";
import { PrismaClient, ContentStatus } from "@prisma/client";

const prisma = new PrismaClient();

const SLUG = "why-should-christians-study-world-religions";
const TITLE =
  "Why Should Christians Study World Religions? A Biblical, Missional, and Apologetic Guide";
const EXCERPT =
  "Christians study world religions neither to compromise the gospel nor to mock their neighbors, but to understand people truthfully, evaluate religious claims biblically, and bear witness to Jesus Christ with clarity, humility, and love.";
const TAGS = [
  "World Religions",
  "Religious Pluralism",
  "Apologetics",
  "Mission",
  "Evangelism",
  "Worldview",
  "Religions & Cults",
];

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  const body = readFileSync(
    join(
      process.cwd(),
      "content/articles/why-should-christians-study-world-religions.md",
    ),
    "utf8",
  );

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

  const department = await prisma.department.findUnique({
    where: { slug: "religions-cults" },
  });
  if (!department) {
    throw new Error(
      'Department "religions-cults" not found. Run the seed first.',
    );
  }

  const tagConnect = [];
  for (const name of TAGS) {
    const tagSlug = slugify(name);
    const tag = await prisma.tag.upsert({
      where: { slug: tagSlug },
      update: { name },
      create: { slug: tagSlug, name },
    });
    tagConnect.push({ id: tag.id });
  }

  await prisma.article.upsert({
    where: { slug: SLUG },
    update: {
      title: TITLE,
      excerpt: EXCERPT,
      body,
      status: ContentStatus.PUBLISHED,
      departmentId: department.id,
      publishedAt: new Date("2026-08-27T00:00:00.000Z"),
      tags: { set: tagConnect },
      authorId: author.id,
    },
    create: {
      slug: SLUG,
      title: TITLE,
      excerpt: EXCERPT,
      body,
      status: ContentStatus.PUBLISHED,
      departmentId: department.id,
      publishedAt: new Date("2026-08-27T00:00:00.000Z"),
      authorId: author.id,
      tags: { connect: tagConnect },
    },
  });

  console.log(`Published: /articles/${SLUG}`);
  console.log(`Department: ${department.name} (${department.slug})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
