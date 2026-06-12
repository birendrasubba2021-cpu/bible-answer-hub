import Link from "next/link";
import { ArrowUpRight, Eye, TrendingUp } from "lucide-react";
import type { QuestionAnswer } from "@/lib/types";
import { getDepartment } from "@/lib/departments";

export function QuestionCard({ q }: { q: QuestionAnswer }) {
  const dept = getDepartment(q.department);
  return (
    <Link
      href={`/questions/${q.slug}`}
      className="group flex flex-col rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition hover:border-brand-300 hover:shadow-md"
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
          {dept?.name ?? q.department}
        </span>
        {q.trending && (
          <span className="inline-flex items-center gap-1 rounded-full bg-gold-500/10 px-2.5 py-1 text-xs font-medium text-gold-600">
            <TrendingUp className="h-3 w-3" /> Trending
          </span>
        )}
      </div>
      <h3 className="font-serif text-lg font-semibold leading-snug text-stone-900 group-hover:text-brand-700">
        {q.question}
      </h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-stone-600">
        {q.shortAnswer}
      </p>
      <div className="mt-4 flex items-center justify-between text-xs text-stone-400">
        <span className="inline-flex items-center gap-1">
          <Eye className="h-3.5 w-3.5" />
          {(q.views ?? 0).toLocaleString()} views
        </span>
        <span className="inline-flex items-center gap-1 font-medium text-brand-600 group-hover:gap-2">
          Read answer <ArrowUpRight className="h-3.5 w-3.5 transition-all" />
        </span>
      </div>
    </Link>
  );
}
