/**
 * Publishes the Vedānta comparative-theology article under Religions & Cults.
 *
 * Run: npx tsx prisma/publish-vedanta-article.ts
 */
import { readFileSync } from "fs";
import { join } from "path";
import { PrismaClient, ContentStatus } from "@prisma/client";

const prisma = new PrismaClient();

const SLUG = "neither-identity-nor-infinite-distance";
const TITLE =
  "Neither Identity nor Infinite Distance: God, the Human Self, and Union with Christ in Christian Theology and the Three Major Schools of Vedānta";
const EXCERPT =
  "Christian salvation is neither the realization that the self has always been Brahman nor the absorption of the creature into divine substance. Comparing Advaita, Viśiṣṭādvaita, and Dvaita with classical Christian theology, this article argues for communion without ontological confusion.";
const TAGS = [
  "Advaita",
  "Viśiṣṭādvaita",
  "Dvaita",
  "Vedānta",
  "Comparative Theology",
  "Union with Christ",
  "Creator-Creature Distinction",
  "Hinduism",
  "Religions & Cults",
];

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  const body = readFileSync(
    join(
      process.cwd(),
      "content/articles/neither-identity-nor-infinite-distance.md",
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
      publishedAt: new Date("2026-09-03T00:00:00.000Z"),
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
      publishedAt: new Date("2026-09-03T00:00:00.000Z"),
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
