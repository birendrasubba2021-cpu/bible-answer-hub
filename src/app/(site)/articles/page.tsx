import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { ArticleCard } from "@/components/article/article-card";
import { PageHeader } from "@/components/ui/page-header";
import { getAllArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Scholarly Articles",
  description:
    "Extended biblical and theological studies for careful reading — Scripture, doctrine, apologetics, and Christian life.",
};

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <div className="bg-stone-50/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <PageHeader
          eyebrow="Articles"
          title="Scholarly Articles"
          subtitle="Long-form biblical and theological studies for pastors, students, and serious readers."
        />

        {articles.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <div className="scholarly-card mx-auto max-w-lg border-dashed bg-white px-8 py-16 text-center">
            <FileText className="mx-auto h-12 w-12 text-brand-300" />
            <h2 className="mt-4 font-display text-xl font-bold text-stone-900">
              Articles forthcoming
            </h2>
            <p className="mt-2 text-sm text-stone-500">
              The first scholarly articles are in preparation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
