"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";

const SECTIONS = [
  { id: "short-answer", label: "Short Answer" },
  { id: "detailed-answer", label: "Detailed Answer" },
  { id: "biblical-basis", label: "Biblical Basis" },
  { id: "theological-explanation", label: "Theology" },
  { id: "misunderstandings", label: "Misunderstandings" },
  { id: "practical-application", label: "Application" },
  { id: "references", label: "References" },
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
    <nav
      aria-label="On this page"
      className="sticky top-24 hidden lg:block"
    >
      <div className="card-elevated p-5">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted">
          <List className="h-3.5 w-3.5" />
          On this page
        </p>
        <ul className="mt-4 space-y-1 border-l-2 border-border pl-0">
          {SECTIONS.map(({ id, label }) => (
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
