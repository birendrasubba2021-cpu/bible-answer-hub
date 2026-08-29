import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { AnswerHero } from "@/components/answer/answer-hero";
import {
  AnswerSection,
  ShortAnswerCallout,
} from "@/components/answer/answer-section";
import { AnswerTableOfContents } from "@/components/answer/answer-toc";
import {
  BibliographyApparatus,
  NotesApparatus,
} from "@/components/answer/citation-apparatus";
import { ScriptureTable } from "@/components/answer/scripture-table";
import { renderWithFootnotes } from "@/lib/footnotes";
import type { Department, QuestionAnswer } from "@/lib/types";

/**
 * Encyclopedia entry layout for a single answer — continuous reading column,
 * contents rail, notes and bibliography at the end. Shared by the public page
 * and the admin draft preview.
 */
export function AnswerDocument({
  q,
  dept,
  related,
}: {
  q: QuestionAnswer;
  dept?: Department;
  related: QuestionAnswer[];
}) {
  return (
    <>
      <div className="border-b border-stone-200 bg-white">
        <nav className="mx-auto flex max-w-5xl flex-wrap items-center gap-1 px-4 py-2.5 text-[13px] text-stone-500 sm:px-6">
          <Link href="/" className="transition hover:text-brand-700">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-stone-300" />
          <Link href="/questions" className="transition hover:text-brand-700">
            Questions
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-stone-300" />
          {dept && (
            <>
              <Link
                href={`/departments/${dept.slug}`}
                className="transition hover:text-brand-700"
              >
                {dept.name}
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-stone-300" />
            </>
          )}
          <span className="truncate text-stone-700">{q.category}</span>
        </nav>
      </div>

      <AnswerHero q={q} dept={dept} />

      <div className="bg-white">
        <div className="mx-auto grid max-w-5xl gap-12 px-4 py-10 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16 lg:px-6 lg:py-14">
          <AnswerTableOfContents
            hasNotes={(q.footnotes ?? []).length > 0}
            hasBibliography={
              (q.bibliography ?? []).length > 0 || q.references.length > 0
            }
          />

          <article className="encyclopedia-article min-w-0">
            <ShortAnswerCallout text={q.shortAnswer} />

            <AnswerSection id="detailed-answer" title="Detailed answer">
              <div className="prose-answer">
                {q.detailedAnswer.map((p, i) => (
                  <p key={i}>{renderWithFootnotes(p, `da-${i}`)}</p>
                ))}
              </div>
            </AnswerSection>

            <AnswerSection id="biblical-basis" title="Biblical basis">
              <ScriptureTable refs={q.biblicalBasis} />
            </AnswerSection>

            <AnswerSection
              id="theological-explanation"
              title="Theological explanation"
            >
              <div className="prose-answer">
                {q.theologicalExplanation.map((p, i) => (
                  <p key={i}>{renderWithFootnotes(p, `te-${i}`)}</p>
                ))}
              </div>
            </AnswerSection>

            <AnswerSection id="misunderstandings" title="Common errors">
              <ol className="encyclopedia-list">
                {q.commonMisunderstandings.map((m, i) => (
                  <li key={i}>
                    <span className="encyclopedia-list-marker">{i + 1}.</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ol>
            </AnswerSection>

            <AnswerSection
              id="practical-application"
              title="Pastoral application"
            >
              <ol className="encyclopedia-list" style={{ listStyle: "none" }}>
                {q.practicalApplication.map((m, i) => (
                  <li key={i}>
                    <span className="encyclopedia-list-marker">
                      {String.fromCharCode(97 + i)}.
                    </span>
                    <span>{m}</span>
                  </li>
                ))}
              </ol>
            </AnswerSection>

            <NotesApparatus notes={q.footnotes ?? []} />

            <BibliographyApparatus
              entries={q.bibliography ?? []}
              fallback={q.references}
            />

            <footer className="mt-14 border-t border-stone-200 pt-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-stone-500">
                About the author
              </p>
              <p className="mt-2 font-display text-lg font-semibold text-stone-900">
                {q.author}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-stone-600">
                B.Th., M.Div., M.Th. (New Testament). Apologist and Bible
                teacher.
              </p>
            </footer>

            {related.length > 0 && (
              <section className="mt-12 border-t border-stone-200 pt-8">
                <h2 className="encyclopedia-heading">Related articles</h2>
                <ul className="mt-5 divide-y divide-stone-200 border-y border-stone-200">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/questions/${r.slug}`}
                        className="group flex flex-col gap-1 py-4 transition sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                      >
                        <span className="font-display text-base font-semibold text-stone-900 group-hover:text-brand-700">
                          {r.question}
                        </span>
                        <span className="shrink-0 text-xs uppercase tracking-[0.12em] text-stone-500">
                          {r.category}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </article>
        </div>
      </div>
    </>
  );
}
