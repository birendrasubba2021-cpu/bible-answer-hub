import type { ScriptureRef } from "@/lib/types";
import { BookOpen } from "lucide-react";

export function ScriptureTable({ refs }: { refs: ScriptureRef[] }) {
  if (!refs.length) return null;

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="scripture-table">
        <thead>
          <tr>
            <th scope="col">Scripture Reference</th>
            <th scope="col">Translation</th>
          </tr>
        </thead>
        <tbody>
          {refs.map((ref) => (
            <tr key={ref.reference}>
              <td className="ref">{ref.reference}</td>
              <td className="text-muted">{ref.version ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="flex items-center gap-1.5 border-t border-border bg-stone-50 px-4 py-2.5 text-xs text-muted">
        <BookOpen className="h-3.5 w-3.5" />
        Key passages supporting this answer
      </p>
    </div>
  );
}
