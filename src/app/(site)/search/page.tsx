import type { Metadata } from "next";
import { Suspense } from "react";
import { QuestionsExplorer } from "@/components/questions-explorer";
import { PageHeader } from "@/components/ui/page-header";
import { getAllQuestions } from "@/lib/content";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the theological reference library for biblical answers.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; department?: string }>;
}) {
  const { q = "", department = "" } = await searchParams;
  const items = await getAllQuestions();

  return (
    <div className="bg-stone-50/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <PageHeader
          eyebrow="Search"
          title={q ? `Results for “${q}”` : "Search the Library"}
          subtitle={
            q
              ? "Refine results by department or sort order below."
              : "Enter a biblical or theological question to search the reference index."
          }
        />
        <Suspense>
          <QuestionsExplorer
            items={items}
            initialQuery={q}
            initialDepartment={department}
          />
        </Suspense>
      </div>
    </div>
  );
}
