import type { MetadataRoute } from "next";
import { departments } from "@/lib/departments";
import { getAllQuestions, getAllArticles } from "@/lib/content";

const BASE = "https://bibleanswerhub.org";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [questions, articles] = await Promise.all([
    getAllQuestions(),
    getAllArticles(),
  ]);
  const staticRoutes = [
    "",
    "/questions",
    "/departments",
    "/articles",
    "/videos",
    "/resources",
    "/about",
    "/contact",
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const deptRoutes = departments.map((d) => ({
    url: `${BASE}/departments/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const questionRoutes = questions.map((q) => ({
    url: `${BASE}/questions/${q.slug}`,
    lastModified: new Date(q.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const articleRoutes = articles.map((a) => ({
    url: `${BASE}/articles/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...deptRoutes, ...questionRoutes, ...articleRoutes];
}
