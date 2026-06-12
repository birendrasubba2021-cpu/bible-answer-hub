import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getCategoryOptions } from "@/lib/admin";
import { createQuestion } from "@/app/admin/actions";
import { QuestionForm } from "@/components/admin/question-form";

export const dynamic = "force-dynamic";

export default async function NewQuestionPage() {
  const categories = await getCategoryOptions();

  return (
    <div>
      <Link
        href="/admin/questions"
        className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-brand-700"
      >
        <ChevronLeft className="h-4 w-4" /> Back to questions
      </Link>
      <h1 className="mt-2 font-serif text-3xl font-bold text-stone-900">
        New Question
      </h1>
      <p className="mt-1 mb-6 text-stone-500">
        Fill in the answer. Save as a draft first, then publish when ready.
      </p>
      <QuestionForm
        action={createQuestion}
        categories={categories}
        submitLabel="Create question"
      />
    </div>
  );
}
