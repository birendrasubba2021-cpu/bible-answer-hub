import Link from "next/link";
import type { Department } from "@/lib/types";
import type { QuestionAnswer } from "@/lib/types";
import { Calendar, Eye, User } from "lucide-react";
import { BrandedThumbnail } from "@/components/ui/branded-thumbnail";

export function AnswerHero({
  q,
  dept,
}: {
  q: QuestionAnswer;
  dept?: Department;
}) {
  return (
    <header className="border-b border-border bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-8">
          <div className="py-10 sm:py-12 lg:py-14">
            <div className="flex flex-wrap items-center gap-2">
              {dept && (
                <Link
                  href={`/departments/${dept.slug}`}
                  className="rounded border border-brand-200 bg-brand-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-800 transition hover:bg-brand-100"
                >
                  {dept.name}
                </Link>
              )}
              <span className="rounded border border-border bg-stone-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-stone-600">
                {q.category}
              </span>
              {q.difficulty && (
                <span className="rounded border border-border px-2.5 py-1 text-[10px] font-medium capitalize text-stone-500">
                  {q.difficulty}
                </span>
              )}
            </div>

            <h1 className="mt-6 font-display text-3xl font-bold leading-[1.12] tracking-tight text-stone-900 sm:text-4xl lg:text-[2.65rem]">
              {q.question}
            </h1>

            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-6 text-sm text-stone-600">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-brand-600" />
                <dt className="sr-only">Author</dt>
                <dd>{q.author}</dd>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-brand-600" />
                <dt className="sr-only">Views</dt>
                <dd>{(q.views ?? 0).toLocaleString()} consultations</dd>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-brand-600" />
                <dt className="sr-only">Published</dt>
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

          <div className="border-t border-border lg:border-t-0 lg:border-l lg:py-8">
            <BrandedThumbnail
              departmentSlug={q.department}
              featuredImage={q.featuredImage}
              departmentName={dept?.name}
              caption={q.biblicalBasis?.[0]?.reference}
              captionMeta={q.biblicalBasis?.[0]?.version}
              title={q.question}
              category={q.category}
              topics={q.topics}
              size="answer"
              className="h-48 rounded-none sm:h-56 lg:mt-6 lg:h-full lg:min-h-[280px] lg:rounded-xl lg:ring-1 lg:ring-border"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
