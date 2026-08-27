import Link from "next/link";
import { ArrowUpRight, Eye } from "lucide-react";
import type { QuestionAnswer } from "@/lib/types";
import { getDepartment } from "@/lib/departments";
import { BrandedThumbnail } from "@/components/ui/branded-thumbnail";

export function QuestionCard({ q }: { q: QuestionAnswer }) {
  const dept = getDepartment(q.department);

  return (
    <Link
      href={`/questions/${q.slug}`}
      className="group scholarly-card flex flex-col overflow-hidden transition duration-300"
    >
      <BrandedThumbnail
        departmentSlug={q.department}
        featuredImage={q.featuredImage}
        departmentName={dept?.name}
        label={q.trending ? "Frequently consulted" : undefined}
        caption={q.biblicalBasis?.[0]?.reference}
        captionMeta={q.biblicalBasis?.[0]?.version}
        title={q.question}
        category={q.category}
        topics={q.topics}
        size="card"
      />

      <div className="flex flex-1 flex-col border-x border-b border-border bg-white p-5 sm:p-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-600">
          {q.category}
        </p>
        <h3 className="mt-2 font-display text-lg font-bold leading-snug text-stone-900 transition group-hover:text-brand-700 sm:text-xl">
          {q.question}
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-stone-600">
          {q.shortAnswer}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs text-stone-500">
          <span className="inline-flex items-center gap-1.5">
            <Eye className="h-3.5 w-3.5" />
            {(q.views ?? 0).toLocaleString()} consultations
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-brand-700 transition group-hover:gap-2">
            Read full answer <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function QuestionRow({ q }: { q: QuestionAnswer }) {
  const dept = getDepartment(q.department);

  return (
    <Link
      href={`/questions/${q.slug}`}
      className="group flex items-center gap-4 rounded-xl border border-transparent px-2 py-3 transition hover:border-border hover:bg-stone-50/80 sm:gap-5 sm:px-3"
    >
      <BrandedThumbnail
        departmentSlug={q.department}
        featuredImage={q.featuredImage}
        title={q.question}
        category={q.category}
        topics={q.topics}
        size="row"
        showWatermark={false}
        className="rounded-lg"
      />
      <span className="min-w-0 flex-1">
        <span className="block font-display text-base font-semibold leading-snug text-stone-900 group-hover:text-brand-700">
          {q.question}
        </span>
        <span className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-500">
          <span>{dept?.name ?? q.department}</span>
          <span aria-hidden>·</span>
          <span>{q.category}</span>
        </span>
      </span>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-stone-300 transition group-hover:text-brand-600" />
    </Link>
  );
}
