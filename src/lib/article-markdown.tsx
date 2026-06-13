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

/** Parse *italic* markers inside plain text. */
function renderInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

const IMAGE_RE = /^!\[(.*?)\]\((.*?)\)$/;

export function renderArticleMarkdown(body: string): React.ReactNode[] {
  const lines = body.split("\n");
  const nodes: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      const label = line.slice(3).trim();
      nodes.push(
        <h2
          key={key++}
          id={slugifyHeading(label)}
          className="answer-section mt-12 scroll-mt-28 font-display text-2xl font-bold text-stone-900 first:mt-0 sm:text-[1.75rem]"
        >
          {label}
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
          {label}
        </h3>,
      );
      i += 1;
      continue;
    }

    const imageMatch = line.match(IMAGE_RE);
    if (imageMatch) {
      const [, alt, src] = imageMatch;
      nodes.push(
        <figure key={key++} className="my-8 overflow-hidden rounded-2xl border border-border bg-paper shadow-sm">
          <div className="relative aspect-[16/9] w-full bg-brand-50">
            <Image
              src={src}
              alt={alt || ""}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>
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

    if (line.trim() === "") {
      i += 1;
      continue;
    }

    const paragraphLines: string[] = [];
    while (i < lines.length && lines[i].trim() !== "" && !lines[i].startsWith("#")) {
      if (lines[i].match(IMAGE_RE) || /^\d+\.\s/.test(lines[i])) break;
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
