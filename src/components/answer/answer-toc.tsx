"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "short-answer", label: "Summary" },
  { id: "detailed-answer", label: "Detailed Answer" },
  { id: "biblical-basis", label: "Biblical Basis" },
  { id: "theological-explanation", label: "Theological Explanation" },
  { id: "misunderstandings", label: "Common Errors" },
  { id: "practical-application", label: "Pastoral Application" },
  { id: "references", label: "Further Reading" },
] as const;

export function AnswerTableOfContents() {
  const [active, setActive] = useState<string>("short-answer");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach(({ id }) => {
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
  }, []);

  return (
    <nav aria-label="Table of contents" className="sticky top-24 hidden lg:block">
      <div className="scholarly-card bg-white p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-stone-500">
          Contents
        </p>
        <ul className="mt-4 space-y-0.5">
          {SECTIONS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`block border-l-2 py-2 pl-4 text-sm transition ${
                  active === id
                    ? "border-brand-700 font-semibold text-brand-800"
                    : "border-transparent text-stone-500 hover:border-stone-300 hover:text-stone-800"
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
