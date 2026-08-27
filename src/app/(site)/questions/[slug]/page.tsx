import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnswerDocument } from "@/components/answer/answer-document";
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
      <AnswerDocument q={q} dept={dept} related={related} />
    </>
  );
}
