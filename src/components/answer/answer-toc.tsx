"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "short-answer", label: "Summary" },
  { id: "detailed-answer", label: "Detailed answer" },
  { id: "biblical-basis", label: "Biblical basis" },
  { id: "theological-explanation", label: "Theological explanation" },
  { id: "misunderstandings", label: "Common errors" },
  { id: "practical-application", label: "Pastoral application" },
  { id: "notes", label: "Notes" },
  { id: "bibliography", label: "Bibliography" },
] as const;

/**
 * Britannica-style contents rail — a quiet list of jumps, not a card widget.
 */
export function AnswerTableOfContents({
  hasNotes = false,
  hasBibliography = false,
}: {
  hasNotes?: boolean;
  hasBibliography?: boolean;
}) {
  const [active, setActive] = useState<string>("short-answer");

  const sections = SECTIONS.filter(({ id }) => {
    if (id === "notes") return hasNotes;
    if (id === "bibliography") return hasBibliography;
    return true;
  });

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const ids = sections.map((s) => s.id);
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-18% 0px -65% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
    // eslint-disable-next-line react-hooks/exhaustive-deps -- re-run when note/bib presence changes
  }, [hasNotes, hasBibliography]);

  return (
    <nav aria-label="Contents" className="sticky top-24 hidden lg:block">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-stone-500">
        Contents
      </p>
      <ul className="mt-3 border-l border-stone-200">
        {sections.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`block border-l-2 py-1.5 pl-3 -ml-px text-[13px] leading-snug transition ${
                active === id
                  ? "border-brand-700 font-semibold text-stone-900"
                  : "border-transparent text-stone-500 hover:border-stone-300 hover:text-stone-800"
              }`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
