import Link from "next/link";
import {
  BookOpenCheck,
  ChevronRight,
  Lightbulb,
  ListChecks,
  Quote,
  TriangleAlert,
  User,
} from "lucide-react";
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
import { QuestionCard } from "@/components/question-card";
import { renderWithFootnotes } from "@/lib/footnotes";
import type { Department, QuestionAnswer } from "@/lib/types";

/**
 * The full monograph layout for a single answer. Shared by the public question
 * page and the admin draft preview so that reviewers see exactly what readers
 * will see.
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
      <AnswerHero q={q} dept={dept} />

      <div className="border-b border-border bg-paper">
        <nav className="mx-auto flex max-w-5xl flex-wrap items-center gap-1 px-4 py-3 text-sm text-muted sm:px-6">
          <Link href="/" className="transition hover:text-brand-700">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/questions" className="transition hover:text-brand-700">
            Questions
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          {dept && (
            <>
              <Link
                href={`/departments/${dept.slug}`}
                className="transition hover:text-brand-700"
              >
                {dept.name}
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
            </>
          )}
          <span className="truncate text-stone-700">{q.category}</span>
        </nav>
      </div>

      <div className="bg-stone-50/80">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12 lg:px-6 lg:py-14">
          <AnswerTableOfContents
            hasNotes={(q.footnotes ?? []).length > 0}
            hasBibliography={
              (q.bibliography ?? []).length > 0 || q.references.length > 0
            }
          />

          <div className="min-w-0 space-y-8">
            <ShortAnswerCallout text={q.shortAnswer} />

            <AnswerSection
              id="detailed-answer"
              icon={<BookOpenCheck className="h-5 w-5" />}
              title="Detailed Answer"
              subtitle="A thorough biblical explanation"
            >
              <div className="prose-answer">
                {q.detailedAnswer.map((p, i) => (
                  <p key={i}>{renderWithFootnotes(p, `da-${i}`)}</p>
                ))}
              </div>
            </AnswerSection>

            <AnswerSection
              id="biblical-basis"
              icon={<Quote className="h-5 w-5" />}
              title="Biblical Basis"
              subtitle="Primary Scripture references cited in this answer"
            >
              <ScriptureTable refs={q.biblicalBasis} />
            </AnswerSection>

            <AnswerSection
              id="theological-explanation"
              icon={<Lightbulb className="h-5 w-5" />}
              title="Theological Explanation"
              subtitle="How this fits into Christian doctrine"
            >
              <div className="prose-answer">
                {q.theologicalExplanation.map((p, i) => (
                  <p key={i}>{renderWithFootnotes(p, `te-${i}`)}</p>
                ))}
              </div>
            </AnswerSection>

            <AnswerSection
              id="misunderstandings"
              icon={<TriangleAlert className="h-5 w-5" />}
              title="Common Errors"
              subtitle="Misunderstandings to avoid in teaching and public discussion"
            >
              <ol className="space-y-0 divide-y divide-border rounded-lg border border-border">
                {q.commonMisunderstandings.map((m, i) => (
                  <li
                    key={i}
                    className="flex gap-4 px-4 py-4 text-stone-700 sm:px-5"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-stone-50 font-display text-xs font-bold text-brand-800">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{m}</span>
                  </li>
                ))}
              </ol>
            </AnswerSection>

            <AnswerSection
              id="practical-application"
              icon={<ListChecks className="h-5 w-5" />}
              title="Pastoral Application"
              subtitle="Faithful response in personal life, church ministry, and public witness"
            >
              <ul className="space-y-0 divide-y divide-border rounded-lg border border-border">
                {q.practicalApplication.map((m, i) => (
                  <li key={i} className="flex gap-3 px-4 py-4 sm:px-5">
                    <span className="mt-1 font-display text-sm font-bold text-brand-700">
                      {String.fromCharCode(97 + i)}.
                    </span>
                    <span className="leading-relaxed text-stone-700">{m}</span>
                  </li>
                ))}
              </ul>
            </AnswerSection>

            <NotesApparatus notes={q.footnotes ?? []} />

            <BibliographyApparatus
              entries={q.bibliography ?? []}
              fallback={q.references}
            />

            <div className="scholarly-card flex flex-col gap-5 bg-white p-6 sm:flex-row sm:items-center sm:p-8">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-brand-50">
                <User className="h-8 w-8 text-brand-700" />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-stone-500">
                  Author
                </p>
                <p className="mt-1 font-display text-xl font-bold text-stone-900">
                  {q.author}
                </p>
                <p className="mt-1 text-sm text-stone-600">
                  B.Th., M.Div., M.Th. (New Testament) — Apologist and Bible
                  teacher
                </p>
              </div>
            </div>

            {related.length > 0 && (
              <section className="pt-4">
                <h2 className="font-display text-2xl font-bold text-stone-900">
                  Related Questions
                </h2>
                <p className="mt-1 text-sm text-muted">
                  Continue exploring this topic
                </p>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {related.map((r) => (
                    <QuestionCard key={r.slug} q={r} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
