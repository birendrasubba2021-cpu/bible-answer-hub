/** Standard paths for content images — one folder per article or question slug. */

export function articleImageDir(slug: string): string {
  return `/images/articles/${slug}`;
}

export function questionImageDir(slug: string): string {
  return `/images/questions/${slug}`;
}

export function articleImagePath(slug: string, filename: string): string {
  return `${articleImageDir(slug)}/${filename}`;
}

export function questionImagePath(slug: string, filename: string): string {
  return `${questionImageDir(slug)}/${filename}`;
}

/** Featured / hero image — use hero.jpg (or .png, .webp) */
export function articleHeroPath(slug: string): string {
  return articleImagePath(slug, "hero.jpg");
}

export function questionHeroPath(slug: string): string {
  return questionImagePath(slug, "hero.jpg");
}

export const IMAGE_NAMING = {
  hero: "hero.jpg — top banner (featured image)",
  inline: "01-intro.jpg, 02-map.jpg — photos inside the text (use in order)",
} as const;

export function articleFolderHint(slug: string): string {
  return `public/images/articles/${slug}/`;
}

export function questionFolderHint(slug: string): string {
  return `public/images/questions/${slug}/`;
}
