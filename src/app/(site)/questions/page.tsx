import type { Metadata } from "next";
import { QuestionsExplorer } from "@/components/questions-explorer";
import { PageHeader } from "@/components/ui/page-header";
import { getAllQuestions } from "@/lib/content";

export const metadata: Metadata = {
  title: "Question Index",
  description:
    "Browse the full index of biblical and theological answers across nine departments of study.",
};

export default async function QuestionsPage() {
  const items = await getAllQuestions();
  return (
    <div className="bg-stone-50/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <PageHeader
          eyebrow="Reference"
          title="Question Index"
          subtitle="Search and browse published answers. Filter by department or sort by consultation frequency and publication date."
        />
        <QuestionsExplorer items={items} />
      </div>
    </div>
  );
}
