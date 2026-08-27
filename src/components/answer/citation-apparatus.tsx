import type { BibliographyEntry, Footnote } from "@/lib/types";
import { sortBibliography, sortFootnotes } from "@/lib/footnotes";

/**
 * Numbered notes, rendered in the order they are cited in the body.
 * Each note links back to its marker so readers can return to their place.
 */
export function NotesApparatus({ notes }: { notes: Footnote[] }) {
  if (!notes.length) return null;

  return (
    <section id="notes" className="answer-section scroll-mt-28">
      <article className="scholarly-card overflow-hidden bg-white">
        <header className="border-b border-border px-6 py-5 sm:px-8 sm:py-6">
          <h2 className="font-display text-xl font-bold text-stone-900 sm:text-2xl">
            Notes
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-stone-500">
            Sources cited in the text above, with pagination where the edition
            is fixed.
          </p>
        </header>
        <ol className="citation-list px-6 py-6 sm:px-8 sm:py-7">
          {sortFootnotes(notes).map((note) => (
            <li key={note.id} id={`note-${note.id}`} value={note.id}>
              <span className="citation-number">{note.id}.</span>
              <span className="citation-body">{note.text}</span>
            </li>
          ))}
        </ol>
      </article>
    </section>
  );
}

/**
 * Full bibliography in hanging indent, alphabetised by author surname.
 * Falls back to the legacy flat `references` list when no structured
 * entries have been authored yet.
 */
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
    <section id="bibliography" className="answer-section scroll-mt-28">
      <article className="scholarly-card overflow-hidden bg-white">
        <header className="border-b border-border px-6 py-5 sm:px-8 sm:py-6">
          <h2 className="font-display text-xl font-bold text-stone-900 sm:text-2xl">
            Bibliography
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-stone-500">
            Works consulted, listed alphabetically by author.
          </p>
        </header>

        <div className="px-6 py-6 sm:px-8 sm:py-7">
          {hasStructured ? (
            <ul className="bibliography-list">
              {sortBibliography(entries).map((e, i) => (
                <li key={`${e.author}-${i}`}>
                  <span className="font-semibold text-stone-900">
                    {e.author}.
                  </span>{" "}
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
      </article>
    </section>
  );
}
