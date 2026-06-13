import { renderArticleMarkdown } from "@/lib/article-markdown";

export function ArticleBody({ body }: { body: string }) {
  return (
    <div className="prose-answer prose-article space-y-0">{renderArticleMarkdown(body)}</div>
  );
}
