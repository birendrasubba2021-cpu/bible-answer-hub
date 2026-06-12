import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, BookOpen, Eye, TrendingUp } from "lucide-react";
import type { QuestionAnswer } from "@/lib/types";
import { getDepartment } from "@/lib/departments";

export function QuestionCard({ q }: { q: QuestionAnswer }) {
  const dept = getDepartment(q.department);

  return (
    <Link
      href={`/questions/${q.slug}`}
      className="group card-elevated flex flex-col overflow-hidden transition duration-300 hover:-translate-y-0.5"
    >
      {/* Image area — shows featured image or themed placeholder */}
      <div className="relative h-36 overflow-hidden bg-gradient-to-br from-brand-700 to-brand-900">
        {q.featuredImage ? (
          <Image
            src={q.featuredImage}
            alt=""
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <BookOpen className="h-16 w-16 text-white" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
          <span className="rounded-md bg-white/95 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-700 shadow-sm">
            {dept?.name ?? q.department}
          </span>
          {q.trending && (
            <span className="inline-flex items-center gap-0.5 rounded-md bg-gold-500 px-2 py-0.5 text-[10px] font-bold uppercase text-brand-900">
              <TrendingUp className="h-3 w-3" /> Hot
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold leading-snug text-stone-900 transition group-hover:text-brand-700">
          {q.question}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
          {q.shortAnswer}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-xs">
          <span className="inline-flex items-center gap-1 text-muted">
            <Eye className="h-3.5 w-3.5" />
            {(q.views ?? 0).toLocaleString()}
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-brand-600 transition group-hover:gap-2">
            Read answer <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
