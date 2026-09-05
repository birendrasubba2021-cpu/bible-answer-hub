import Link from "next/link";
import { ArrowUpRight, Calendar, Clock, User } from "lucide-react";
import type { Article } from "@/lib/types";
import { ArticleThumbnail } from "@/components/article/article-thumbnail";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group scholarly-card flex h-full flex-col overflow-hidden bg-white transition duration-300"
    >
      <ArticleThumbnail
        title={article.title}
        department={article.department}
        departmentName={article.departmentName}
        tags={article.tags}
        slug={article.slug}
        featuredImage={article.featuredImg}
        thumbnail={article.thumbnail}
        size="card"
        label="Article"
      />

      <div className="flex flex-1 flex-col border-x border-b border-border px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
        <h3 className="line-clamp-3 font-display text-[1.05rem] font-bold leading-snug text-stone-900 transition group-hover:text-brand-700 sm:text-lg">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-stone-600">
          {article.excerpt}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-border pt-3.5 text-xs text-stone-500">
          <span className="inline-flex items-center gap-1">
            <User className="h-3.5 w-3.5" />
            {article.author}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {article.readMinutes} min read
          </span>
          <span className="ml-auto inline-flex items-center gap-1 font-semibold text-brand-700 transition group-hover:gap-1.5">
            Read article <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function ArticleHero({ article }: { article: Article }) {
  return (
    <header className="border-b border-border bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-8">
          <div className="py-10 sm:py-12 lg:py-14">
            <div className="flex flex-wrap items-center gap-2">
              {article.department && article.departmentName ? (
                <Link
                  href={`/departments/${article.department}`}
                  className="rounded border border-brand-200 bg-brand-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-800"
                >
                  {article.departmentName}
                </Link>
              ) : (
                <Link
                  href="/articles"
                  className="rounded border border-brand-200 bg-brand-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-800"
                >
                  Articles
                </Link>
              )}
              {article.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-border bg-stone-50 px-2.5 py-1 text-[10px] font-medium text-stone-600"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="mt-6 font-display text-3xl font-bold leading-[1.12] tracking-tight text-stone-900 sm:text-4xl lg:text-[2.65rem]">
              {article.title}
            </h1>

            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-6 text-sm text-stone-600">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-brand-600" />
                <dd>{article.author}</dd>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-brand-600" />
                <dd>{article.readMinutes} min read</dd>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-brand-600" />
                <dd>
                  {new Date(article.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </dd>
              </div>
            </dl>
          </div>

          <div className="border-t border-border lg:border-t-0 lg:border-l lg:py-8">
            <ArticleThumbnail
              title={article.title}
              department={article.department}
              departmentName={article.departmentName}
              tags={article.tags}
              slug={article.slug}
              featuredImage={article.featuredImg}
              thumbnail={article.thumbnail}
              size="panel"
              className="lg:mt-6 lg:rounded-xl lg:ring-1 lg:ring-border"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
