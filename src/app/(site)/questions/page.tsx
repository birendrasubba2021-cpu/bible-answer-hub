import type { Metadata } from "next";
import { QuestionsExplorer } from "@/components/questions-explorer";
import { getAllQuestions } from "@/lib/content";

export const metadata: Metadata = {
  title: "All Questions",
  description:
    "Browse and search trustworthy, biblical answers across theology, apologetics, church history, biblical studies, and contemporary issues.",
};

export default async function QuestionsPage() {
  const items = await getAllQuestions();
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">
          Question Library
        </p>
        <h1 className="mt-1 font-serif text-4xl font-bold text-stone-900">
          All Questions &amp; Answers
        </h1>
        <p className="mt-2 max-w-2xl text-stone-600">
          Search the growing library of biblical answers. Filter by department
          and sort by popularity or date.
        </p>
      </header>
      <QuestionsExplorer items={items} />
    </div>
  );
}
