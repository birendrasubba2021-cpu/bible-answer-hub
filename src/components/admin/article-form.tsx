"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Save } from "lucide-react";
import type { ActionState } from "@/app/admin/actions";
import type { ArticleEditData } from "@/lib/admin";
import { articleHeroPath } from "@/lib/media-paths";
import { ImageFolderGuide } from "@/components/admin/image-folder-guide";

type FormAction = (
  state: ActionState,
  formData: FormData,
) => Promise<ActionState>;

const inputCls =
  "w-full rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20";

export function ArticleForm({
  action,
  initial,
  contentSlug,
  submitLabel = "Save article",
}: {
  action: FormAction;
  initial?: ArticleEditData;
  /** URL slug — used to show the correct image folder */
  contentSlug?: string;
  submitLabel?: string;
}) {
  const slug = contentSlug ?? initial?.slug;
  const heroPlaceholder = slug ? articleHeroPath(slug) : "/images/articles/your-slug/hero.jpg";
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    action,
    {},
  );

  return (
    <form action={formAction} className="max-w-3xl space-y-6">
      {state.error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <ImageFolderGuide type="article" slug={slug} />

      <Group title="Basics">
        <Field label="Title" required>
          <input
            name="title"
            required
            defaultValue={initial?.title}
            placeholder="Who Was Abraham in the Bible?"
            className={inputCls}
          />
        </Field>

        {!initial && (
          <Field
            label="URL slug (optional)"
            hint="Leave blank to auto-generate from the title."
          >
            <input
              name="slug"
              placeholder="who-was-abraham-in-the-bible"
              className={inputCls}
            />
          </Field>
        )}

        <Field label="Excerpt" required hint="1–2 sentences for cards and SEO.">
          <textarea
            name="excerpt"
            required
            rows={3}
            defaultValue={initial?.excerpt}
            className={inputCls}
          />
        </Field>

        <Field
          label="Featured image path"
          hint="Put hero.jpg in this article's folder (see guide above)."
        >
          <input
            name="featuredImg"
            defaultValue={initial?.featuredImg}
            placeholder={heroPlaceholder}
            className={inputCls}
          />
        </Field>

        <Field label="Tags" hint="Comma-separated, e.g. Abraham, Genesis, Covenant">
          <input
            name="tags"
            defaultValue={initial?.tags}
            placeholder="Abraham, Genesis, Covenant"
            className={inputCls}
          />
        </Field>

        <Field label="Status">
          <select
            name="status"
            defaultValue={initial?.status ?? "DRAFT"}
            className={inputCls}
          >
            <option value="DRAFT">Draft</option>
            <option value="IN_REVIEW">In review</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </Field>
      </Group>

      <Group title="Article body">
        <Field
          label="Content (Markdown-lite)"
          required
          hint={`Use ## for headings. Inline photo example: ![Caption](/images/articles/${slug ?? "your-slug"}/01-intro.jpg)`}
        >
          <textarea
            name="body"
            required
            rows={24}
            defaultValue={initial?.body}
            className={`${inputCls} font-mono text-[13px] leading-relaxed`}
          />
        </Field>
      </Group>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
        >
          <Save className="h-4 w-4" />
          {pending ? "Saving…" : submitLabel}
        </button>
        <Link
          href="/admin/articles"
          className="text-sm font-medium text-stone-500 hover:text-brand-700"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

function Group({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6">
      <h2 className="font-serif text-lg font-bold text-stone-900">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-stone-700">
        {label}
        {required ? " *" : ""}
      </span>
      {hint ? <span className="mt-0.5 block text-xs text-stone-400">{hint}</span> : null}
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
