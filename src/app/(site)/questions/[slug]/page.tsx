import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BookOpenCheck,
  ChevronRight,
  CircleHelp,
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
import { ScriptureTable } from "@/components/answer/scripture-table";
import { QuestionCard } from "@/components/question-card";
import { getDepartment } from "@/lib/departments";
import { getQuestionBySlug, getRelatedQuestions } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const q = await getQuestionBySlug(slug);
  if (!q) return { title: "Question not found" };
  return {
    title: q.question,
    description: q.shortAnswer,
    openGraph: {
      title: q.question,
      description: q.shortAnswer,
      type: "article",
      ...(q.featuredImage ? { images: [q.featuredImage] } : {}),
    },
  };
}

export default async function QuestionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const q = await getQuestionBySlug(slug);
  if (!q) notFound();

  const dept = getDepartment(q.department);
  const related = await getRelatedQuestions(q);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: q.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: [q.shortAnswer, ...q.detailedAnswer].join(" "),
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <AnswerHero q={q} dept={dept} />

      {/* Breadcrumb bar */}
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

      <div className="bg-paper-texture">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14 lg:px-6 lg:py-14">
          <AnswerTableOfContents />

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
                  <p key={i}>{p}</p>
                ))}
              </div>
            </AnswerSection>

            <AnswerSection
              id="biblical-basis"
              icon={<Quote className="h-5 w-5" />}
              title="Biblical Basis"
              subtitle="Primary Scripture references"
              variant="gold"
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
                  <p key={i}>{p}</p>
                ))}
              </div>
            </AnswerSection>

            <AnswerSection
              id="misunderstandings"
              icon={<TriangleAlert className="h-5 w-5" />}
              title="Common Misunderstandings"
              subtitle="Errors to avoid when teaching or discussing this topic"
              variant="alert"
            >
              <ol className="space-y-3">
                {q.commonMisunderstandings.map((m, i) => (
                  <li
                    key={i}
                    className="flex gap-4 rounded-lg border border-amber-100 bg-amber-50/50 px-4 py-3 text-stone-700"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-200/80 text-xs font-bold text-amber-900">
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
              title="Practical Application"
              subtitle="How to live this out in faith and ministry"
              variant="success"
            >
              <ul className="space-y-3">
                {q.practicalApplication.map((m, i) => (
                  <li
                    key={i}
                    className="flex gap-3 rounded-lg border border-emerald-100 bg-emerald-50/40 px-4 py-3"
                  >
                    <span className="mt-0.5 text-emerald-600">✓</span>
                    <span className="leading-relaxed text-stone-700">{m}</span>
                  </li>
                ))}
              </ul>
            </AnswerSection>

            <AnswerSection
              id="references"
              icon={<CircleHelp className="h-5 w-5" />}
              title="Further Reading"
              subtitle="Books, creeds, and scholarly sources"
            >
              <ul className="divide-y divide-border rounded-lg border border-border bg-stone-50/50">
                {q.references.map((r, i) => (
                  <li
                    key={i}
                    className="px-4 py-3 text-sm leading-relaxed text-stone-700"
                  >
                    {r}
                  </li>
                ))}
              </ul>
            </AnswerSection>

            {/* Author */}
            <div className="card-elevated flex items-center gap-5 p-6">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-md">
                <User className="h-7 w-7" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted">
                  Answered by
                </p>
                <p className="mt-0.5 font-display text-lg font-bold text-stone-900">
                  {q.author}
                </p>
                <p className="text-sm text-muted">
                  Apologist, Bible Teacher &amp; Theological Educator
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
