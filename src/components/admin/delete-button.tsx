"use client";

import { Trash2 } from "lucide-react";
import { deleteQuestion } from "@/app/admin/actions";

export function DeleteButton({
  slug,
  label,
  deleteAction = deleteQuestion,
}: {
  slug: string;
  label: string;
  deleteAction?: (formData: FormData) => Promise<void>;
}) {
  return (
    <form
      action={deleteAction}
      onSubmit={(e) => {
        if (!confirm(`Delete "${label}"? This cannot be undone.`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="slug" value={slug} />
      <button
        type="submit"
        title="Delete"
        className="rounded-md p-2 text-stone-400 transition hover:bg-red-50 hover:text-red-600"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </form>
  );
}
