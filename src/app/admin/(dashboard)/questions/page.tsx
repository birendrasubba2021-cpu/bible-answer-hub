import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { getAdminQuestions } from "@/lib/admin";
import { setStatus } from "@/app/admin/actions";
import { StatusBadge } from "@/components/admin/status-badge";
import { DeleteButton } from "@/components/admin/delete-button";

export const dynamic = "force-dynamic";

export default async function AdminQuestionsPage() {
  const questions = await getAdminQuestions();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900">
            Questions
          </h1>
          <p className="mt-1 text-stone-500">
            {questions.length} question{questions.length === 1 ? "" : "s"} in the
            library.
          </p>
        </div>
        <Link
          href="/admin/questions/new"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          <Plus className="h-4 w-4" /> New Question
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-stone-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-stone-200 bg-stone-50 text-xs uppercase tracking-wide text-stone-500">
            <tr>
              <th className="px-4 py-3">Question</th>
              <th className="hidden px-4 py-3 md:table-cell">Department</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {questions.map((q) => (
              <tr key={q.slug} className="hover:bg-stone-50">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/questions/${q.slug}/edit`}
                    className="font-medium text-stone-800 hover:text-brand-700"
                  >
                    {q.question}
                  </Link>
                  <div className="text-xs text-stone-400">{q.categoryName}</div>
                </td>
                <td className="hidden px-4 py-3 text-stone-600 md:table-cell">
                  {q.departmentName}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={q.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    {q.status !== "PUBLISHED" ? (
                      <form action={setStatus}>
                        <input type="hidden" name="slug" value={q.slug} />
                        <input type="hidden" name="status" value="PUBLISHED" />
                        <button className="rounded-md px-2.5 py-1 text-xs font-medium text-green-700 hover:bg-green-50">
                          Publish
                        </button>
                      </form>
                    ) : (
                      <form action={setStatus}>
                        <input type="hidden" name="slug" value={q.slug} />
                        <input type="hidden" name="status" value="DRAFT" />
                        <button className="rounded-md px-2.5 py-1 text-xs font-medium text-stone-500 hover:bg-stone-100">
                          Unpublish
                        </button>
                      </form>
                    )}
                    <Link
                      href={`/admin/questions/${q.slug}/edit`}
                      title="Edit"
                      className="rounded-md p-2 text-stone-400 transition hover:bg-brand-50 hover:text-brand-600"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <DeleteButton slug={q.slug} label={q.question} />
                  </div>
                </td>
              </tr>
            ))}
            {questions.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-stone-500">
                  No questions yet.{" "}
                  <Link
                    href="/admin/questions/new"
                    className="text-brand-600 underline"
                  >
                    Create your first one
                  </Link>
                  .
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
