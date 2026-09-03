import type React from "react";
import Image from "next/image";

export interface ArticleHeading {
  id: string;
  label: string;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function extractArticleHeadings(body: string): ArticleHeading[] {
  return body
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => {
      const label = line.slice(3).trim();
      return { id: slugifyHeading(label), label };
    });
}

export function estimateReadMinutes(body: string): number {
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

/** Parse **bold** and *italic* markers inside plain text. */
function renderInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

function parseTableRow(line: string): string[] {
  const trimmed = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  return trimmed.split("|").map((cell) => cell.trim());
}

function isTableSeparator(line: string): boolean {
  return /^\|?[\s:-|]+\|?$/.test(line.trim()) && line.includes("-");
}

const IMAGE_RE = /^!\[(.*?)\]\((.*?)\)$/;

export function renderArticleMarkdown(body: string): React.ReactNode[] {
  const lines = body.split("\n");
  const nodes: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (/^---+$/.test(line.trim())) {
      i += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      const label = line.slice(3).trim();
      nodes.push(
        <h2
          key={key++}
          id={slugifyHeading(label)}
          className="answer-section mt-12 scroll-mt-28 font-display text-2xl font-bold text-stone-900 first:mt-0 sm:text-[1.75rem]"
        >
          {renderInline(label)}
        </h2>,
      );
      i += 1;
      continue;
    }

    if (line.startsWith("### ")) {
      const label = line.slice(4).trim();
      nodes.push(
        <h3
          key={key++}
          id={slugifyHeading(label)}
          className="answer-section mt-8 scroll-mt-28 font-display text-xl font-bold text-stone-900"
        >
          {renderInline(label)}
        </h3>,
      );
      i += 1;
      continue;
    }

    if (line.startsWith(">")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith(">")) {
        quoteLines.push(lines[i].replace(/^>\s?/, ""));
        i += 1;
      }
      nodes.push(
        <blockquote
          key={key++}
          className="my-6 border-l-4 border-brand-600 bg-brand-50/40 px-5 py-4 font-display text-lg leading-relaxed text-stone-800"
        >
          {renderInline(quoteLines.join(" "))}
        </blockquote>,
      );
      continue;
    }

    if (
      line.includes("|") &&
      i + 1 < lines.length &&
      isTableSeparator(lines[i + 1])
    ) {
      const headers = parseTableRow(line);
      i += 2; // skip header + separator
      const rows: string[][] = [];
      while (i < lines.length && lines[i].includes("|") && lines[i].trim() !== "") {
        rows.push(parseTableRow(lines[i]));
        i += 1;
      }
      nodes.push(
        <div key={key++} className="my-8 overflow-x-auto rounded-xl border border-border bg-white shadow-sm">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-brand-50/60">
                {headers.map((h, hi) => (
                  <th
                    key={hi}
                    className="px-3 py-3 font-display text-xs font-bold uppercase tracking-wide text-brand-900 sm:px-4"
                  >
                    {renderInline(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className="border-b border-border last:border-0">
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={`px-3 py-3 align-top leading-relaxed text-stone-700 sm:px-4 ${
                        ci === 0 ? "font-semibold text-stone-900" : ""
                      }`}
                    >
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    const imageMatch = line.match(IMAGE_RE);
    if (imageMatch) {
      const [, alt, src] = imageMatch;
      const isChart = /chart|family-tree|diagram|timeline/i.test(src);

      nodes.push(
        <figure key={key++} className="my-8 overflow-hidden rounded-2xl border border-border bg-paper shadow-sm">
          {isChart ? (
            <div className="w-full bg-brand-50 p-2 sm:p-4">
              <Image
                src={src}
                alt={alt || ""}
                width={1920}
                height={1080}
                unoptimized
                className="h-auto w-full object-contain"
                sizes="(max-width: 768px) 100vw, 720px"
              />
            </div>
          ) : (
            <div className="relative aspect-[16/9] w-full bg-brand-50">
              <Image
                src={src}
                alt={alt || ""}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 720px"
              />
            </div>
          )}
          {alt ? (
            <figcaption className="border-t border-border px-4 py-3 text-center text-sm text-muted">
              {alt}
            </figcaption>
          ) : null}
        </figure>,
      );
      i += 1;
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ""));
        i += 1;
      }
      nodes.push(
        <ol key={key++} className="my-6 list-decimal space-y-3 pl-6 marker:font-semibold marker:text-brand-700">
          {items.map((item, idx) => (
            <li key={idx} className="pl-1 leading-relaxed">
              {renderInline(item)}
            </li>
          ))}
        </ol>,
      );
      continue;
    }

    if (/^[-*]\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s/, ""));
        i += 1;
      }
      nodes.push(
        <ul key={key++} className="my-6 list-disc space-y-3 pl-6 marker:text-brand-700">
          {items.map((item, idx) => (
            <li key={idx} className="pl-1 leading-relaxed">
              {renderInline(item)}
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    if (line.trim() === "") {
      i += 1;
      continue;
    }

    const paragraphLines: string[] = [];
    while (i < lines.length && lines[i].trim() !== "" && !lines[i].startsWith("#")) {
      if (
        lines[i].match(IMAGE_RE) ||
        /^\d+\.\s/.test(lines[i]) ||
        /^[-*]\s/.test(lines[i]) ||
        lines[i].startsWith(">") ||
        /^---+$/.test(lines[i].trim()) ||
        (lines[i].includes("|") &&
          i + 1 < lines.length &&
          isTableSeparator(lines[i + 1]))
      )
        break;
      paragraphLines.push(lines[i]);
      i += 1;
    }
    if (paragraphLines.length > 0) {
      nodes.push(
        <p key={key++} className="leading-[1.85]">
          {renderInline(paragraphLines.join(" "))}
        </p>,
      );
    }
  }

  return nodes;
}
