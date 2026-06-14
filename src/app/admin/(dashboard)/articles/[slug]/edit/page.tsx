import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getArticleEditData } from "@/lib/admin";
import { updateArticle } from "@/app/admin/actions";
import { ArticleForm } from "@/components/admin/article-form";

export const dynamic = "force-dynamic";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const initial = await getArticleEditData(slug);
  if (!initial) notFound();

  const boundUpdate = updateArticle.bind(null, slug);

  return (
    <div>
      <Link
        href="/admin/articles"
        className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-brand-700"
      >
        <ChevronLeft className="h-4 w-4" /> Back to articles
      </Link>
      <h1 className="mt-2 font-serif text-3xl font-bold text-stone-900">
        Edit Article
      </h1>
      <p className="mt-1 mb-6 text-stone-500">{initial.title}</p>
      <ArticleForm
        action={boundUpdate}
        initial={initial}
        contentSlug={slug}
        submitLabel="Save changes"
      />
    </div>
  );
}
