import type { ScriptureRef } from "@/lib/types";

/** Compact reference list — encyclopedia style, not a marketing table. */
export function ScriptureTable({ refs }: { refs: ScriptureRef[] }) {
  if (!refs.length) return null;

  return (
    <ul className="divide-y divide-stone-200 border-y border-stone-200">
      {refs.map((ref) => (
        <li
          key={ref.reference}
          className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3"
        >
          <span className="font-display text-base font-semibold text-stone-900">
            {ref.reference}
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">
            {ref.version ?? "—"}
          </span>
        </li>
      ))}
    </ul>
  );
}
