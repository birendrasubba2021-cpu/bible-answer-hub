import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { ArticleCard } from "@/components/article/article-card";
import { getAllArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "In-depth biblical and theological articles on Scripture, theology, apologetics, and Christian living.",
};

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <div className="bg-paper-texture">
      <section className="border-b border-border bg-brand-700 text-white">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16">
          <p className="text-xs font-bold uppercase tracking-widest text-gold-400">
            Articles
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            In-Depth Biblical Teaching
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-stone-300">
            Long-form articles on theology, biblical studies, apologetics, and
            the great themes of Scripture — written for pastors, students, and
            serious readers.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {articles.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <div className="card-elevated mx-auto max-w-lg px-8 py-16 text-center">
            <FileText className="mx-auto h-12 w-12 text-brand-300" />
            <h2 className="mt-4 font-display text-xl font-bold text-stone-900">
              Articles coming soon
            </h2>
            <p className="mt-2 text-sm text-muted">
              The first articles are being prepared. Check back shortly.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
