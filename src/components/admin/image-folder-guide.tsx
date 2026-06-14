import {
  articleFolderHint,
  articleHeroPath,
  questionFolderHint,
  questionHeroPath,
} from "@/lib/media-paths";

export function ImageFolderGuide({
  type,
  slug,
}: {
  type: "article" | "question";
  slug?: string;
}) {
  if (!slug) {
    return (
      <div className="rounded-lg border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-900">
        <p className="font-semibold">Photo folders (after you save once)</p>
        <p className="mt-1 text-brand-800/90">
          Each item gets its own folder under{" "}
          <code className="rounded bg-white/80 px-1 py-0.5 text-xs">
            public/images/{type === "article" ? "articles" : "questions"}/[slug]/
          </code>
          . Use the URL slug (e.g.{" "}
          <code className="rounded bg-white/80 px-1 py-0.5 text-xs">
            who-was-abraham-in-the-bible
          </code>
          ), not the full title.
        </p>
      </div>
    );
  }

  const folder =
    type === "article" ? articleFolderHint(slug) : questionFolderHint(slug);
  const hero =
    type === "article" ? articleHeroPath(slug) : questionHeroPath(slug);
  const heroSvg = hero.replace(/\.jpg$/, ".svg");
  const inlineExample =
    type === "article"
      ? `/images/articles/${slug}/01-intro.jpg`
      : null;

  return (
    <div className="rounded-lg border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-900">
      <p className="font-semibold">Photo folder for this {type}</p>
      <p className="mt-2 font-mono text-xs text-brand-800">{folder}</p>
      <ul className="mt-3 space-y-1.5 text-brand-800/95">
        <li>
          <span className="font-medium">hero.jpg</span> — featured banner →{" "}
          <code className="rounded bg-white/80 px-1 text-xs">{hero}</code>
        </li>
        {type === "article" && (
          <>
            <li>
              <span className="font-medium">01-intro.jpg</span>,{" "}
              <span className="font-medium">02-…</span> — inline photos
            </li>
            <li className="text-xs text-brand-700">
              In body:{" "}
              <code className="rounded bg-white/80 px-1">
                ![Caption]({inlineExample})
              </code>
            </li>
          </>
        )}
      </ul>
      <p className="mt-3 text-xs text-brand-700">
        Save files in that folder on your computer, then{" "}
        <code className="rounded bg-white/80 px-1">git push</code> so the live
        site can show them. (.jpg, .png, or .svg — if you use .svg for hero, path
        is{" "}
        <code className="rounded bg-white/80 px-1">{heroSvg}</code>)
      </p>
    </div>
  );
}
