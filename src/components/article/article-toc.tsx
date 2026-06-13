"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";
import type { ArticleHeading } from "@/lib/article-markdown";

export function ArticleTableOfContents({
  headings,
}: {
  headings: ArticleHeading[];
}) {
  const [active, setActive] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    if (headings.length === 0) return;
    const observers: IntersectionObserver[] = [];
    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="On this page" className="sticky top-24 hidden lg:block">
      <div className="card-elevated p-5">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted">
          <List className="h-3.5 w-3.5" />
          On this page
        </p>
        <ul className="mt-4 max-h-[70vh] space-y-1 overflow-y-auto border-l-2 border-border pl-0">
          {headings.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`block border-l-2 -ml-[2px] py-1.5 pl-4 text-sm transition ${
                  active === id
                    ? "border-brand-600 font-semibold text-brand-700"
                    : "border-transparent text-muted hover:border-stone-300 hover:text-stone-700"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
