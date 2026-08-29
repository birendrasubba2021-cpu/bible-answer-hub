import type { ReactNode } from "react";

/**
 * Encyclopedia-style section: a plain typographic heading and continuous
 * body text. No cards, icons, or colored chrome — the document itself is
 * the interface.
 */
export function AnswerSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="encyclopedia-section">
      <h2 className="encyclopedia-heading">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

/** Britannica-style lead / dek — the article opens with the summary. */
export function ShortAnswerCallout({ text }: { text: string }) {
  return (
    <section id="short-answer" className="encyclopedia-section">
      <p className="encyclopedia-lead">{text}</p>
    </section>
  );
}
