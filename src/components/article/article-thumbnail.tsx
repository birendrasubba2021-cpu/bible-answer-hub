import Image from "next/image";
import {
  objectPosition,
  resolveArticleThumbnail,
  type ArticleThumbnailInput,
} from "@/lib/article-thumbnail";
import { ArticleThumbnailArt } from "@/components/article/article-thumbnail-art";

type SizeKey = "card" | "hero" | "panel";

function isRasterAsset(src: string): boolean {
  return /\.(jpe?g|png|webp|avif|gif)$/i.test(src.split("?")[0] ?? src);
}

const SIZES: Record<
  SizeKey,
  { frame: string; pad: string; title: string; eyebrow: string; sub: string }
> = {
  card: {
    frame: "aspect-[16/9]",
    pad: "p-4 sm:p-5",
    title: "text-[1.35rem] sm:text-[1.55rem]",
    eyebrow: "text-[9px]",
    sub: "text-[10px] sm:text-[11px]",
  },
  hero: {
    frame: "aspect-[16/9] min-h-[14rem] sm:min-h-[18rem]",
    pad: "p-6 sm:p-7",
    title: "text-2xl sm:text-3xl",
    eyebrow: "text-[10px]",
    sub: "text-xs sm:text-sm",
  },
  panel: {
    frame: "h-48 sm:h-56 lg:h-full lg:min-h-[280px]",
    pad: "p-5 sm:p-6",
    title: "text-xl sm:text-[1.65rem]",
    eyebrow: "text-[10px]",
    sub: "text-[11px] sm:text-xs",
  },
};

export function ArticleThumbnail({
  title,
  department,
  departmentName,
  category,
  tags,
  slug,
  featuredImage,
  thumbnailTitle,
  thumbnailSubtitle,
  thumbnailTheme,
  thumbnailPosition,
  thumbnail,
  size = "card",
  label,
  className = "",
}: ArticleThumbnailInput & {
  size?: SizeKey;
  label?: string;
  className?: string;
}) {
  const plate = resolveArticleThumbnail({
    title,
    department,
    departmentName,
    category,
    tags,
    slug,
    featuredImage,
    thumbnailTitle,
    thumbnailSubtitle,
    thumbnailTheme,
    thumbnailPosition,
    thumbnail,
  });
  const s = SIZES[size];
  const uid = `ath-${(slug || title).replace(/[^a-z0-9]+/gi, "").slice(0, 18)}`;
  const raster =
    plate.featuredImage ||
    (plate.editorialImage && isRasterAsset(plate.editorialImage)
      ? plate.editorialImage
      : null);

  return (
    <div
      className={`relative isolate overflow-hidden ${s.frame} ${className}`}
      style={{ backgroundColor: plate.palette.base }}
    >
      {raster ? (
        <Image
          src={raster}
          alt={title}
          fill
          className="object-cover"
          style={{ objectPosition: objectPosition(plate.position) }}
          sizes="(min-width: 1024px) 420px, 100vw"
        />
      ) : (
        <ArticleThumbnailArt
          theme={plate.theme}
          palette={plate.palette}
          uid={uid}
        />
      )}

      <div
        className="absolute inset-0"
        style={{
          background: raster
            ? `linear-gradient(to top, ${plate.palette.base}F2 0%, ${plate.palette.base}66 42%, transparent 70%)`
            : `linear-gradient(to top, ${plate.palette.base}E8 8%, ${plate.palette.base}55 42%, transparent 68%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(255,255,255,0.45) 0 1px, transparent 1px 7px)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-[10px] rounded-[2px] border sm:inset-[12px]"
        style={{ borderColor: `${plate.palette.accent}30` }}
        aria-hidden
      />

      <div className={`relative flex h-full flex-col justify-between ${s.pad}`}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p
              className={`${s.eyebrow} font-sans font-bold uppercase leading-none tracking-[0.22em]`}
              style={{ color: plate.palette.accent }}
            >
              {plate.eyebrow}
            </p>
            <span
              className="mt-2 block h-px w-8"
              style={{ backgroundColor: `${plate.palette.accent}99` }}
            />
          </div>
          {label ? (
            <span
              className="shrink-0 rounded-sm border px-2 py-1 text-[9px] font-bold uppercase leading-none tracking-[0.14em] text-white/90"
              style={{
                borderColor: `${plate.palette.accent}40`,
                backgroundColor: "rgba(0,0,0,0.28)",
              }}
            >
              {label}
            </span>
          ) : null}
        </div>

        <div className="min-w-0 pr-8">
          <p
            className={`line-clamp-3 font-display font-bold uppercase leading-[1.05] tracking-[0.04em] ${s.title}`}
            style={{ color: plate.palette.ink, whiteSpace: "pre-line" }}
          >
            {plate.shortTitle}
          </p>
          {plate.subtitle ? (
            <p
              className={`mt-2 line-clamp-1 font-sans font-medium uppercase tracking-[0.16em] ${s.sub}`}
              style={{ color: `${plate.palette.accent}` }}
            >
              {plate.subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
