import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { getAdminArticles } from "@/lib/admin";
import { setArticleStatus, deleteArticle } from "@/app/admin/actions";
import { StatusBadge } from "@/components/admin/status-badge";
import { DeleteButton } from "@/components/admin/delete-button";

export const dynamic = "force-dynamic";

export default async function AdminArticlesPage() {
  const articles = await getAdminArticles();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900">
            Articles
          </h1>
          <p className="mt-1 text-stone-500">
            {articles.length} article{articles.length === 1 ? "" : "s"} in the
            library.
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          <Plus className="h-4 w-4" /> New Article
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-stone-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-stone-200 bg-stone-50 text-xs uppercase tracking-wide text-stone-500">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="hidden px-4 py-3 md:table-cell">Author</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {articles.map((a) => (
              <tr key={a.slug} className="hover:bg-stone-50">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/articles/${a.slug}/edit`}
                    className="font-medium text-stone-800 hover:text-brand-700"
                  >
                    {a.title}
                  </Link>
                </td>
                <td className="hidden px-4 py-3 text-stone-600 md:table-cell">
                  {a.authorName}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={a.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    {a.status !== "PUBLISHED" ? (
                      <form action={setArticleStatus}>
                        <input type="hidden" name="slug" value={a.slug} />
                        <input type="hidden" name="status" value="PUBLISHED" />
                        <button className="rounded-md px-2.5 py-1 text-xs font-medium text-green-700 hover:bg-green-50">
                          Publish
                        </button>
                      </form>
                    ) : (
                      <form action={setArticleStatus}>
                        <input type="hidden" name="slug" value={a.slug} />
                        <input type="hidden" name="status" value="DRAFT" />
                        <button className="rounded-md px-2.5 py-1 text-xs font-medium text-stone-500 hover:bg-stone-100">
                          Unpublish
                        </button>
                      </form>
                    )}
                    <Link
                      href={`/articles/${a.slug}`}
                      target="_blank"
                      className="rounded-md px-2.5 py-1 text-xs font-medium text-brand-600 hover:bg-brand-50"
                    >
                      View
                    </Link>
                    <Link
                      href={`/admin/articles/${a.slug}/edit`}
                      title="Edit"
                      className="rounded-md p-2 text-stone-400 transition hover:bg-brand-50 hover:text-brand-600"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <DeleteButton
                      slug={a.slug}
                      label={a.title}
                      deleteAction={deleteArticle}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {articles.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-stone-500">
                  No articles yet.{" "}
                  <Link
                    href="/admin/articles/new"
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
