import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import { ArticleHero } from "@/components/article/article-card";
import { ArticleBody } from "@/components/article/article-body";
import { ArticleTableOfContents } from "@/components/article/article-toc";
import { extractArticleHeadings } from "@/lib/article-markdown";
import { getArticleBySlug } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Article not found" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      ...(article.featuredImg ? { images: [article.featuredImg] } : {}),
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const headings = extractArticleHeadings(article.body);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    author: { "@type": "Person", name: article.author },
    datePublished: article.publishedAt,
    ...(article.featuredImg ? { image: article.featuredImg } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ArticleHero article={article} />

      <div className="bg-paper-texture">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-1 text-sm text-muted"
          >
            <Link href="/" className="hover:text-brand-700">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/articles" className="hover:text-brand-700">
              Articles
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="line-clamp-1 font-medium text-stone-700">
              {article.title}
            </span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12">
            <ArticleTableOfContents headings={headings} />

            <article className="min-w-0">
              <p className="mb-8 rounded-2xl border border-gold-500/20 bg-gold-light/50 px-6 py-5 font-display text-lg leading-relaxed text-stone-800">
                {article.excerpt}
              </p>
              <ArticleBody body={article.body} />
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
