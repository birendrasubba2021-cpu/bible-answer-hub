import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock, User } from "lucide-react";
import type { Article } from "@/lib/types";
import { BrandedThumbnail } from "@/components/ui/branded-thumbnail";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group scholarly-card flex flex-col overflow-hidden bg-white transition duration-300"
    >
      {article.featuredImg ? (
        <div className="relative h-44 overflow-hidden">
          <Image
            src={article.featuredImg}
            alt=""
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-900/75 to-transparent" />
          <span className="absolute left-3 top-3 rounded border border-white/25 bg-black/25 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
            Article
          </span>
        </div>
      ) : (
        <BrandedThumbnail
          departmentSlug="biblical-studies"
          label="Article"
          caption={article.title}
          title={article.title}
          topics={article.tags}
          size="article"
        />
      )}

      <div className="flex flex-1 flex-col border-x border-b border-border p-5 sm:p-6">
        <h3 className="font-display text-lg font-bold leading-snug text-stone-900 transition group-hover:text-brand-700">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-stone-600">
          {article.excerpt}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border pt-4 text-xs text-stone-500">
          <span className="inline-flex items-center gap-1">
            <User className="h-3.5 w-3.5" />
            {article.author}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {article.readMinutes} min read
          </span>
          <span className="ml-auto inline-flex items-center gap-1 font-semibold text-brand-700 transition group-hover:gap-2">
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
              <Link
                href="/articles"
                className="rounded border border-brand-200 bg-brand-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-800"
              >
                Articles
              </Link>
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
            {article.featuredImg ? (
              <div className="relative h-48 sm:h-56 lg:mt-6 lg:h-full lg:min-h-[280px] lg:rounded-xl lg:ring-1 lg:ring-border">
                <Image
                  src={article.featuredImg}
                  alt=""
                  fill
                  priority
                  className="object-cover lg:rounded-xl"
                />
              </div>
            ) : (
              <BrandedThumbnail
                departmentSlug="biblical-studies"
                label="Article"
                caption={article.title}
                title={article.title}
                topics={article.tags}
                size="answer"
                className="h-48 rounded-none sm:h-56 lg:mt-6 lg:h-full lg:min-h-[280px] lg:rounded-xl lg:ring-1 lg:ring-border"
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
