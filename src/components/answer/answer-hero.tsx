import Image from "next/image";
import Link from "next/link";
import { Calendar, Eye, User } from "lucide-react";
import type { Department } from "@/lib/types";
import type { QuestionAnswer } from "@/lib/types";

export function AnswerHero({
  q,
  dept,
}: {
  q: QuestionAnswer;
  dept?: Department;
}) {
  const hasImage = Boolean(q.featuredImage);

  return (
    <header className="relative overflow-hidden border-b border-border bg-brand-700 text-white">
      {hasImage ? (
        <>
          <Image
            src={q.featuredImage!}
            alt=""
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-900/95 via-brand-800/90 to-brand-700/80" />
        </>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,162,39,0.15),_transparent_50%)]" />
      )}

      <div className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="flex flex-wrap items-center gap-2">
          {dept && (
            <Link
              href={`/departments/${dept.slug}`}
              className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold-400 ring-1 ring-white/15 transition hover:bg-white/15"
            >
              {dept.name}
            </Link>
          )}
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-stone-200 ring-1 ring-white/10">
            {q.category}
          </span>
          {q.difficulty && (
            <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium capitalize text-stone-300">
              {q.difficulty}
            </span>
          )}
          {q.trending && (
            <span className="rounded-full bg-gold-500/20 px-3 py-1 text-xs font-semibold text-gold-300">
              Trending
            </span>
          )}
        </div>

        <h1 className="mt-5 font-display text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.75rem]">
          {q.question}
        </h1>

        <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-300">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-gold-400" />
            <dd>{q.author}</dd>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-gold-400" />
            <dd>{(q.views ?? 0).toLocaleString()} views</dd>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gold-400" />
            <dd>
              {new Date(q.publishedAt).toLocaleDateString("en-US", {
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
