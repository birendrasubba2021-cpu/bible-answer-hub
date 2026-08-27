import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Eye, PencilLine } from "lucide-react";
import { AnswerDocument } from "@/components/answer/answer-document";
import { getDepartment } from "@/lib/departments";
import {
  getQuestionBySlugUnfiltered,
  getRelatedQuestions,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Preview",
  robots: { index: false, follow: false },
};

const STATUS_STYLE: Record<string, string> = {
  DRAFT: "bg-amber-100 text-amber-900 ring-amber-300",
  IN_REVIEW: "bg-sky-100 text-sky-900 ring-sky-300",
  PUBLISHED: "bg-emerald-100 text-emerald-900 ring-emerald-300",
  ARCHIVED: "bg-stone-200 text-stone-700 ring-stone-300",
};

export default async function QuestionPreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getQuestionBySlugUnfiltered(slug);
  if (!result) notFound();

  const { question: q, status } = result;
  const dept = getDepartment(q.department);
  const related = await getRelatedQuestions(q);

  return (
    <>
      <div className="sticky top-0 z-50 border-b border-stone-700 bg-stone-900 text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 sm:px-6">
          <Link
            href="/admin/questions"
            className="inline-flex items-center gap-1.5 text-sm text-stone-300 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Admin
          </Link>

          <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
            <Eye className="h-4 w-4" />
            Preview
          </span>

          <span
            className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ring-1 ring-inset ${
              STATUS_STYLE[status] ?? STATUS_STYLE.ARCHIVED
            }`}
          >
            {status.replace("_", " ")}
          </span>

          <p className="hidden text-sm text-stone-400 sm:block">
            {status === "PUBLISHED"
              ? "This answer is live on the public site."
              : "Not visible to readers until published."}
          </p>

          <Link
            href={`/admin/questions/${q.slug}/edit`}
            className="ml-auto inline-flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-1.5 text-sm font-medium transition hover:bg-white/20"
          >
            <PencilLine className="h-4 w-4" />
            Edit
          </Link>
        </div>
      </div>

      <AnswerDocument q={q} dept={dept} related={related} />
    </>
  );
}
