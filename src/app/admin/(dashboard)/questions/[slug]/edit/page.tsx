import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { getCategoryOptions, getQuestionEditData } from "@/lib/admin";
import { updateQuestion } from "@/app/admin/actions";
import { QuestionForm } from "@/components/admin/question-form";

export const dynamic = "force-dynamic";

export default async function EditQuestionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [categories, initial] = await Promise.all([
    getCategoryOptions(),
    getQuestionEditData(slug),
  ]);
  if (!initial) notFound();

  const action = updateQuestion.bind(null, slug);

  return (
    <div>
      <Link
        href="/admin/questions"
        className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-brand-700"
      >
        <ChevronLeft className="h-4 w-4" /> Back to questions
      </Link>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-3xl font-bold text-stone-900">
          Edit Question
        </h1>
        <Link
          href={`/questions/${slug}`}
          target="_blank"
          className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:gap-2"
        >
          View live <ExternalLink className="h-4 w-4" />
        </Link>
      </div>
      <p className="mt-1 mb-6 text-stone-500">
        Editing <span className="font-mono text-stone-700">/{slug}</span>
      </p>
      <QuestionForm
        action={action}
        categories={categories}
        initial={initial}
        contentSlug={slug}
        submitLabel="Save changes"
      />
    </div>
  );
}
