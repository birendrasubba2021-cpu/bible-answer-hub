import Link from "next/link";
import type { Department, QuestionAnswer } from "@/lib/types";
import { BrandedThumbnail } from "@/components/ui/branded-thumbnail";

/**
 * Encyclopedia masthead: topic path, title, byline, and a compact media plate.
 * Modeled on the Britannica article header — typography first, chrome last.
 */
export function AnswerHero({
  q,
  dept,
}: {
  q: QuestionAnswer;
  dept?: Department;
}) {
  const published = new Date(q.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 pt-8 pb-10 sm:px-6 sm:pt-10 sm:pb-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">
          {dept ? (
            <>
              <Link
                href={`/departments/${dept.slug}`}
                className="transition hover:text-brand-700"
              >
                {dept.name}
              </Link>
              <span className="mx-2 text-stone-300" aria-hidden>
                /
              </span>
            </>
          ) : null}
          <span className="text-stone-700">{q.category}</span>
        </p>

        <div className="mt-5 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-12">
          <div className="min-w-0">
            <h1 className="font-display text-[2rem] font-bold leading-[1.15] tracking-tight text-stone-950 sm:text-4xl lg:text-[2.75rem]">
              {q.question}
            </h1>

            <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm leading-relaxed text-stone-600">
              <span>
                Written by{" "}
                <span className="font-medium text-stone-800">{q.author}</span>
              </span>
              <span className="text-stone-300" aria-hidden>
                ·
              </span>
              <time dateTime={q.publishedAt}>{published}</time>
              {q.difficulty ? (
                <>
                  <span className="text-stone-300" aria-hidden>
                    ·
                  </span>
                  <span className="capitalize">{q.difficulty}</span>
                </>
              ) : null}
            </p>
          </div>

          <BrandedThumbnail
            departmentSlug={q.department}
            featuredImage={q.featuredImage}
            departmentName={dept?.name}
            caption={q.biblicalBasis?.[0]?.reference}
            captionMeta={q.biblicalBasis?.[0]?.version}
            title={q.question}
            category={q.category}
            topics={q.topics}
            size="card"
            className="h-40 w-full rounded-sm ring-1 ring-stone-200 sm:h-44 lg:mt-1 lg:h-[11.5rem]"
          />
        </div>
      </div>
    </header>
  );
}
