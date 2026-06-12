import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BookOpenCheck,
  ChevronRight,
  CircleHelp,
  Eye,
  Lightbulb,
  ListChecks,
  Quote,
  TriangleAlert,
  User,
} from "lucide-react";
import { getDepartment } from "@/lib/departments";
import {
  getQuestionBySlug,
  getRelatedQuestions,
} from "@/lib/content";
import { QuestionCard } from "@/components/question-card";
import type { QuestionAnswer } from "@/lib/types";

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
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-stone-500">
        <Link href="/" className="hover:text-brand-700">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/questions" className="hover:text-brand-700">
          Questions
        </Link>
        <ChevronRight className="h-4 w-4" />
        {dept && (
          <>
            <Link
              href={`/departments/${dept.slug}`}
              className="hover:text-brand-700"
            >
              {dept.name}
            </Link>
            <ChevronRight className="h-4 w-4" />
          </>
        )}
        <span className="line-clamp-1 text-stone-700">{q.category}</span>
      </nav>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        {dept && (
          <Link
            href={`/departments/${dept.slug}`}
            className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700"
          >
            {dept.name}
          </Link>
        )}
        <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
          {q.category}
        </span>
        {q.difficulty && (
          <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium capitalize text-stone-600">
            {q.difficulty}
          </span>
        )}
      </div>

      <h1 className="font-serif text-3xl font-bold leading-tight text-stone-900 sm:text-4xl">
        {q.question}
      </h1>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-stone-500">
        <span className="inline-flex items-center gap-1.5">
          <User className="h-4 w-4" /> {q.author}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Eye className="h-4 w-4" /> {(q.views ?? 0).toLocaleString()} views
        </span>
        <span>
          {new Date(q.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>

      {/* Short answer callout */}
      <div className="mt-8 rounded-2xl border border-brand-100 bg-brand-50 p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
          Short Answer
        </p>
        <p className="mt-2 text-lg leading-relaxed text-stone-800">
          {q.shortAnswer}
        </p>
      </div>

      <Section icon={<BookOpenCheck className="h-5 w-5" />} title="Detailed Answer">
        <div className="prose-answer">
          {q.detailedAnswer.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Section>

      <Section icon={<Quote className="h-5 w-5" />} title="Biblical Basis">
        <ul className="flex flex-wrap gap-2">
          {q.biblicalBasis.map((ref) => (
            <li
              key={ref.reference}
              className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm font-medium text-brand-700"
            >
              {ref.reference}
              {ref.version ? (
                <span className="ml-1 text-stone-400">({ref.version})</span>
              ) : null}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        icon={<Lightbulb className="h-5 w-5" />}
        title="Theological Explanation"
      >
        <div className="prose-answer">
          {q.theologicalExplanation.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Section>

      <Section
        icon={<TriangleAlert className="h-5 w-5" />}
        title="Common Misunderstandings"
      >
        <ul className="space-y-2">
          {q.commonMisunderstandings.map((m, i) => (
            <li key={i} className="flex gap-3 text-stone-700">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
              <span className="leading-relaxed">{m}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        icon={<ListChecks className="h-5 w-5" />}
        title="Practical Application"
      >
        <ul className="space-y-2">
          {q.practicalApplication.map((m, i) => (
            <li key={i} className="flex gap-3 text-stone-700">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
              <span className="leading-relaxed">{m}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section icon={<CircleHelp className="h-5 w-5" />} title="References">
        <ul className="space-y-1.5 text-sm text-stone-600">
          {q.references.map((r, i) => (
            <li key={i}>• {r}</li>
          ))}
        </ul>
      </Section>

      {/* Author card */}
      <div className="mt-12 flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-5">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white">
          <User className="h-6 w-6" />
        </span>
        <div>
          <p className="font-semibold text-stone-900">{q.author}</p>
          <p className="text-sm text-stone-500">
            Apologist, Bible Teacher &amp; Theological Educator
          </p>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="font-serif text-2xl font-bold text-stone-900">
            Related Questions
          </h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {related.map((r: QuestionAnswer) => (
              <QuestionCard key={r.slug} q={r} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="flex items-center gap-2 font-serif text-2xl font-bold text-stone-900">
        <span className="text-brand-600">{icon}</span>
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
