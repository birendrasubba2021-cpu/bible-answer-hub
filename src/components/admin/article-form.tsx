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
  departments = [],
  submitLabel = "Save article",
}: {
  action: FormAction;
  initial?: ArticleEditData;
  /** URL slug — used to show the correct image folder */
  contentSlug?: string;
  departments?: { id: string; slug: string; name: string }[];
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
          hint="Optional photo. If empty, a scholarly cover is generated from the title, tags, and department."
        >
          <input
            name="featuredImg"
            defaultValue={initial?.featuredImg}
            placeholder={heroPlaceholder}
            className={inputCls}
          />
        </Field>

        <Field
          label="Thumbnail title override"
          hint="Leave blank to auto-generate a short cover title (not the full article title)."
        >
          <input
            name="thumbnailTitle"
            defaultValue={initial?.thumbnailTitle}
            placeholder="HINDUISM"
            className={inputCls}
          />
        </Field>

        <Field
          label="Thumbnail subtitle override"
          hint="Leave blank to auto-generate, e.g. Origins • Scriptures • Worldview"
        >
          <input
            name="thumbnailSubtitle"
            defaultValue={initial?.thumbnailSubtitle}
            placeholder="Origins • Scriptures • Worldview"
            className={inputCls}
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Thumbnail theme" hint="Automatic if unset.">
            <select
              name="thumbnailTheme"
              defaultValue={initial?.thumbnailTheme ?? ""}
              className={inputCls}
            >
              <option value="">Automatic from content</option>
              <option value="hinduism">Hinduism</option>
              <option value="vedanta">Vedānta / Indian philosophy</option>
              <option value="world-religions">World religions</option>
              <option value="islam">Islam</option>
              <option value="buddhism">Buddhism</option>
              <option value="judaism">Judaism</option>
              <option value="sikhism">Sikhism</option>
              <option value="cults">Cults / false teaching</option>
              <option value="christian-comparative">Christian comparative</option>
              <option value="christianity">Christianity</option>
              <option value="biblical-studies">Biblical studies</option>
              <option value="theology">Theology</option>
              <option value="church-history">Church history</option>
              <option value="biblical-languages">Biblical languages</option>
              <option value="apologetics">Apologetics</option>
              <option value="ethics">Ethics / ministry</option>
              <option value="ministry">Mission / ministry</option>
              <option value="default">Default scholarly</option>
            </select>
          </Field>
          <Field label="Image position" hint="Used when a featured photo is set.">
            <select
              name="thumbnailPosition"
              defaultValue={initial?.thumbnailPosition ?? "center"}
              className={inputCls}
            >
              <option value="center">Center</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </Field>
        </div>

        <Field label="Tags" hint="Comma-separated, e.g. Abraham, Genesis, Covenant">
          <input
            name="tags"
            defaultValue={initial?.tags}
            placeholder="Abraham, Genesis, Covenant"
            className={inputCls}
          />
        </Field>

        <Field
          label="Department"
          hint="Assign the article to a field of study (e.g. Religions & Cults)."
        >
          <select
            name="departmentId"
            defaultValue={initial?.departmentId ?? ""}
            className={inputCls}
          >
            <option value="">— None —</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
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
