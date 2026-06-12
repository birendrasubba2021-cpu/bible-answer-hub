import Link from "next/link";
import { ArrowRight, FileText, Plus } from "lucide-react";
import { getAdminStats, getAdminQuestions } from "@/lib/admin";
import { StatusBadge } from "@/components/admin/status-badge";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [stats, questions] = await Promise.all([
    getAdminStats(),
    getAdminQuestions(),
  ]);
  const recent = questions.slice(0, 5);

  const cards = [
    { label: "Total questions", value: stats.total },
    { label: "Published", value: stats.published },
    { label: "Drafts", value: stats.draft },
    { label: "In review", value: stats.inReview },
    { label: "Departments", value: stats.departments },
    { label: "Categories", value: stats.categories },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900">
            Dashboard
          </h1>
          <p className="mt-1 text-stone-500">
            Welcome back, Apologist Birendra Subba.
          </p>
        </div>
        <Link
          href="/admin/questions/new"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          <Plus className="h-4 w-4" /> New Question
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-xl border border-stone-200 bg-white p-4"
          >
            <div className="font-serif text-3xl font-bold text-brand-700">
              {c.value}
            </div>
            <div className="mt-1 text-xs text-stone-500">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-stone-200 bg-white">
        <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
          <h2 className="font-serif text-lg font-bold text-stone-900">
            Recently updated
          </h2>
          <Link
            href="/admin/questions"
            className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:gap-2"
          >
            All questions <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {recent.length > 0 ? (
          <ul className="divide-y divide-stone-100">
            {recent.map((q) => (
              <li key={q.slug}>
                <Link
                  href={`/admin/questions/${q.slug}/edit`}
                  className="flex items-center gap-3 px-5 py-3 transition hover:bg-stone-50"
                >
                  <FileText className="h-4 w-4 shrink-0 text-stone-400" />
                  <span className="flex-1 truncate text-sm font-medium text-stone-800">
                    {q.question}
                  </span>
                  <StatusBadge status={q.status} />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-5 py-8 text-center text-sm text-stone-500">
            No questions yet.{" "}
            <Link href="/admin/questions/new" className="text-brand-600 underline">
              Create your first one
            </Link>
            .
          </p>
        )}
      </div>
    </div>
  );
}
