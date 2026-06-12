"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Save } from "lucide-react";
import type { ActionState } from "@/app/admin/actions";
import type { CategoryOption, QuestionEditData } from "@/lib/admin";

type FormAction = (
  state: ActionState,
  formData: FormData,
) => Promise<ActionState>;

export function QuestionForm({
  action,
  categories,
  initial,
  submitLabel = "Save question",
}: {
  action: FormAction;
  categories: CategoryOption[];
  initial?: QuestionEditData;
  submitLabel?: string;
}) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    action,
    {},
  );

  // Group categories by department for the dropdown.
  const grouped = categories.reduce<Record<string, CategoryOption[]>>(
    (acc, c) => {
      (acc[c.departmentName] ??= []).push(c);
      return acc;
    },
    {},
  );

  const refsText = (initial?.biblicalBasis ?? [])
    .map((r) => (r.version ? `${r.reference} | ${r.version}` : r.reference))
    .join("\n");

  return (
    <form action={formAction} className="max-w-3xl space-y-6">
      {state.error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <Group title="Basics">
        <Field label="Question" required>
          <input
            name="question"
            required
            defaultValue={initial?.question}
            placeholder="e.g. What is the Trinity?"
            className={inputCls}
          />
        </Field>

        {!initial && (
          <Field label="URL slug (optional)" hint="Leave blank to auto-generate from the question.">
            <input
              name="slug"
              placeholder="what-is-the-trinity"
              className={inputCls}
            />
          </Field>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Category" required>
            <select
              name="categoryId"
              required
              defaultValue={initial?.categoryId ?? ""}
              className={inputCls}
            >
              <option value="" disabled>
                Choose a category...
              </option>
              {Object.entries(grouped).map(([dept, cats]) => (
                <optgroup key={dept} label={dept}>
                  {cats.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </Field>

          <Field label="Difficulty">
            <select
              name="difficulty"
              defaultValue={(initial?.difficulty ?? "INTRODUCTORY").toLowerCase()}
              className={inputCls}
            >
              <option value="introductory">Introductory</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </Field>
        </div>
      </Group>

      <Group title="Answer">
        <Field label="Short answer" required hint="One concise paragraph shown in the highlighted box.">
          <textarea
            name="shortAnswer"
            required
            rows={3}
            defaultValue={initial?.shortAnswer}
            className={inputCls}
          />
        </Field>

        <Field label="Detailed answer" hint="Separate paragraphs with a blank line.">
          <textarea
            name="detailedAnswer"
            rows={7}
            defaultValue={initial?.detailedAnswer.join("\n\n")}
            className={inputCls}
          />
        </Field>

        <Field label="Theological explanation" hint="Separate paragraphs with a blank line.">
          <textarea
            name="theologicalExplanation"
            rows={5}
            defaultValue={initial?.theologicalExplanation.join("\n\n")}
            className={inputCls}
          />
        </Field>
      </Group>

      <Group title="Scripture & supporting points">
        <Field
          label="Biblical basis"
          hint="One reference per line. Optionally add a version after a | e.g. John 1:1 | ESV"
        >
          <textarea
            name="biblicalBasis"
            rows={4}
            defaultValue={refsText}
            placeholder={"John 1:1-14 | ESV\nMatthew 28:19 | ESV"}
            className={inputCls}
          />
        </Field>

        <Field label="Common misunderstandings" hint="One per line.">
          <textarea
            name="commonMisunderstandings"
            rows={4}
            defaultValue={initial?.commonMisunderstandings.join("\n")}
            className={inputCls}
          />
        </Field>

        <Field label="Practical application" hint="One per line.">
          <textarea
            name="practicalApplication"
            rows={4}
            defaultValue={initial?.practicalApplication.join("\n")}
            className={inputCls}
          />
        </Field>

        <Field label="References" hint="One per line (books, creeds, articles).">
          <textarea
            name="references"
            rows={3}
            defaultValue={initial?.references.join("\n")}
            className={inputCls}
          />
        </Field>

        <Field label="Topics / tags" hint="Comma-separated, e.g. trinity, god, doctrine">
          <input
            name="topics"
            defaultValue={initial?.topics.join(", ")}
            className={inputCls}
          />
        </Field>
      </Group>

      <Group title="Publishing">
        <div className="grid gap-4 sm:grid-cols-2">
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

          <Field label="Views">
            <input
              name="views"
              type="number"
              min={0}
              defaultValue={initial?.views ?? 0}
              className={inputCls}
            />
          </Field>
        </div>

        <label className="mt-1 flex items-center gap-2 text-sm font-medium text-stone-700">
          <input
            type="checkbox"
            name="trending"
            defaultChecked={initial?.trending}
            className="h-4 w-4 rounded border-stone-300"
          />
          Mark as trending
        </label>
      </Group>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
        >
          <Save className="h-4 w-4" />
          {pending ? "Saving..." : submitLabel}
        </button>
        <Link
          href="/admin/questions"
          className="rounded-lg px-4 py-2.5 text-sm font-medium text-stone-600 hover:bg-stone-100"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

const inputCls =
  "w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200";

function Group({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="rounded-xl border border-stone-200 bg-white p-5">
      <legend className="px-1 font-serif text-base font-bold text-stone-900">
        {title}
      </legend>
      <div className="space-y-4">{children}</div>
    </fieldset>
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
      <span className="mb-1.5 block text-sm font-medium text-stone-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-stone-400">{hint}</span>}
    </label>
  );
}
