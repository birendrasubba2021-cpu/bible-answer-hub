"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { QuestionCard } from "./question-card";
import { departments } from "@/lib/departments";
import type { QuestionAnswer } from "@/lib/types";

export function QuestionsExplorer({
  items,
  initialQuery = "",
  initialDepartment = "",
}: {
  items: QuestionAnswer[];
  initialQuery?: string;
  initialDepartment?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [department, setDepartment] = useState(initialDepartment);
  const [sort, setSort] = useState<"popular" | "recent">("popular");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = items.filter((item) => {
      if (department && item.department !== department) return false;
      if (!q) return true;
      const haystack = [
        item.question,
        item.shortAnswer,
        item.category,
        item.topics.join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
    return list.sort((a, b) =>
      sort === "popular"
        ? (b.views ?? 0) - (a.views ?? 0)
        : new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
  }, [query, department, sort, items]);

  return (
    <div>
      <div className="scholarly-card bg-white p-4 sm:p-5">
        <div className="relative flex items-center">
          <Search className="pointer-events-none absolute left-4 h-5 w-5 text-stone-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions, topics, and categories..."
            aria-label="Search questions"
            className="w-full rounded-xl border border-border bg-white py-3 pl-11 pr-4 text-base outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border pt-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-stone-500">
            <SlidersHorizontal className="h-4 w-4" /> Refine
          </span>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            aria-label="Filter by department"
            className="rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-brand-500"
          >
            <option value="">All departments</option>
            {departments.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.name}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as "popular" | "recent")}
            aria-label="Sort results"
            className="rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-brand-500"
          >
            <option value="popular">Most consulted</option>
            <option value="recent">Most recent</option>
          </select>
          <span className="ml-auto text-sm text-stone-500">
            {results.length} result{results.length === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      {results.length > 0 ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((q) => (
            <QuestionCard key={q.slug} q={q} />
          ))}
        </div>
      ) : (
        <div className="scholarly-card mt-10 border-dashed bg-white p-12 text-center">
          <p className="font-display text-xl font-semibold text-stone-800">
            No matching entries{query ? ` for “${query}”` : ""}.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-stone-500">
            Adjust your search terms or select a department. New reference
            entries are added regularly.
          </p>
        </div>
      )}
    </div>
  );
}
