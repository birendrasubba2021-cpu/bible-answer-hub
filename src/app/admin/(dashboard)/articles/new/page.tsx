import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { createArticle } from "@/app/admin/actions";
import { ArticleForm } from "@/components/admin/article-form";

export const dynamic = "force-dynamic";

export default function NewArticlePage() {
  return (
    <div>
      <Link
        href="/admin/articles"
        className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-brand-700"
      >
        <ChevronLeft className="h-4 w-4" /> Back to articles
      </Link>
      <h1 className="mt-2 font-serif text-3xl font-bold text-stone-900">
        New Article
      </h1>
      <p className="mt-1 mb-6 text-stone-500">
        Write long-form teaching. Use ## for section headings. Save as draft
        first, then publish.
      </p>
      <ArticleForm action={createArticle} submitLabel="Create article" />
    </div>
  );
}
