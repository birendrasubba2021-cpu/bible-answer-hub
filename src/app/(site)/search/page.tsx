import type { Metadata } from "next";
import { Suspense } from "react";
import { QuestionsExplorer } from "@/components/questions-explorer";
import { getAllQuestions } from "@/lib/content";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Bible Answer Hub for biblical answers to your questions.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; department?: string }>;
}) {
  const { q = "", department = "" } = await searchParams;
  const items = await getAllQuestions();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">
          Search
        </p>
        <h1 className="mt-1 font-serif text-4xl font-bold text-stone-900">
          {q ? `Results for "${q}"` : "Search the Library"}
        </h1>
      </header>
      <Suspense>
        <QuestionsExplorer
          items={items}
          initialQuery={q}
          initialDepartment={department}
        />
      </Suspense>
    </div>
  );
}
