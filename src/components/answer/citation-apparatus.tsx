import type { BibliographyEntry, Footnote } from "@/lib/types";
import { sortBibliography, sortFootnotes } from "@/lib/footnotes";

export function NotesApparatus({ notes }: { notes: Footnote[] }) {
  if (!notes.length) return null;

  return (
    <section id="notes" className="encyclopedia-section">
      <h2 className="encyclopedia-heading">Notes</h2>
      <ol className="citation-list mt-5">
        {sortFootnotes(notes).map((note) => (
          <li key={note.id} id={`note-${note.id}`} value={note.id}>
            <span className="citation-number">{note.id}.</span>
            <span className="citation-body">{note.text}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function BibliographyApparatus({
  entries,
  fallback = [],
}: {
  entries: BibliographyEntry[];
  fallback?: string[];
}) {
  const hasStructured = entries.length > 0;
  if (!hasStructured && !fallback.length) return null;

  return (
    <section id="bibliography" className="encyclopedia-section">
      <h2 className="encyclopedia-heading">Bibliography</h2>
      <div className="mt-5">
        {hasStructured ? (
          <ul className="bibliography-list">
            {sortBibliography(entries).map((e, i) => (
              <li key={`${e.author}-${i}`}>
                <span className="font-semibold text-stone-900">{e.author}.</span>{" "}
                <cite className="font-display italic text-stone-800">
                  {e.title}
                </cite>
                {e.detail ? <>. {e.detail}</> : null}
                {e.publication ? <>. {e.publication}</> : null}.
              </li>
            ))}
          </ul>
        ) : (
          <ul className="bibliography-list">
            {fallback.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
