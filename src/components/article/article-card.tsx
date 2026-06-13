import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock, FileText, User } from "lucide-react";
import type { Article } from "@/lib/types";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group card-elevated flex flex-col overflow-hidden transition duration-300 hover:-translate-y-0.5"
    >
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-brand-700 to-brand-900">
        {article.featuredImg ? (
          <Image
            src={article.featuredImg}
            alt=""
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <FileText className="h-16 w-16 text-white" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/85 via-brand-900/20 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <span className="rounded-md bg-white/95 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-700 shadow-sm">
            Article
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold leading-snug text-stone-900 transition group-hover:text-brand-700">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
          {article.excerpt}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border pt-4 text-xs text-muted">
          <span className="inline-flex items-center gap-1">
            <User className="h-3.5 w-3.5" />
            {article.author}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {article.readMinutes} min read
          </span>
          <span className="ml-auto inline-flex items-center gap-1 font-semibold text-brand-600 transition group-hover:gap-2">
            Read article <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function ArticleHero({ article }: { article: Article }) {
  const hasImage = Boolean(article.featuredImg);

  return (
    <header className="relative overflow-hidden border-b border-border bg-brand-700 text-white">
      {hasImage ? (
        <>
          <Image
            src={article.featuredImg!}
            alt=""
            fill
            className="object-cover opacity-35"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-900/95 via-brand-800/90 to-brand-700/75" />
        </>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,162,39,0.15),_transparent_50%)]" />
      )}

      <div className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/articles"
            className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold-400 ring-1 ring-white/15 transition hover:bg-white/15"
          >
            Articles
          </Link>
          {article.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-stone-200 ring-1 ring-white/10"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="mt-5 font-display text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.65rem]">
          {article.title}
        </h1>

        <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-300">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-gold-400" />
            <dd>{article.author}</dd>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gold-400" />
            <dd>{article.readMinutes} min read</dd>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gold-400" />
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
    </header>
  );
}
