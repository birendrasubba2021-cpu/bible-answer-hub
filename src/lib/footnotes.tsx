import type { ReactNode } from "react";
import type { BibliographyEntry, Footnote } from "./types";

const MARKER = /\[\^(\d+)\]/g;

/**
 * Replaces `[^n]` markers in body text with superscript links to the notes
 * apparatus. Text without markers passes through untouched, so existing
 * content keeps rendering exactly as before.
 */
export function renderWithFootnotes(text: string, key: string): ReactNode {
  MARKER.lastIndex = 0;
  if (!MARKER.test(text)) return text;

  MARKER.lastIndex = 0;
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = MARKER.exec(text)) !== null) {
    if (match.index > cursor) {
      nodes.push(text.slice(cursor, match.index));
    }
    const n = match[1];
    nodes.push(
      <sup key={`${key}-fn-${n}-${match.index}`} className="footnote-marker">
        <a
          href={`#note-${n}`}
          id={`noteref-${key}-${n}`}
          aria-label={`Footnote ${n}`}
        >
          {n}
        </a>
      </sup>,
    );
    cursor = match.index + match[0].length;
  }

  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

/** True when any paragraph in the collection carries a note marker. */
export function hasFootnoteMarkers(paragraphs: string[]): boolean {
  return paragraphs.some((p) => {
    MARKER.lastIndex = 0;
    return MARKER.test(p);
  });
}

/** Alphabetical by author surname, as a bibliography is always ordered. */
export function sortBibliography(
  entries: BibliographyEntry[],
): BibliographyEntry[] {
  return [...entries].sort((a, b) =>
    a.author.localeCompare(b.author, "en", { sensitivity: "base" }),
  );
}

export function sortFootnotes(notes: Footnote[]): Footnote[] {
  return [...notes].sort((a, b) => a.id - b.id);
}
