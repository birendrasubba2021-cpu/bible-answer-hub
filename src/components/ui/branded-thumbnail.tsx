import Image from "next/image";
import { getDepartment } from "@/lib/departments";
import { getTopicVisual } from "@/lib/topic-visuals";
import { TopicMotif } from "@/components/ui/topic-motif";

type SizeKey = "card" | "article" | "hero" | "answer" | "row";

const SIZES: Record<
  SizeKey,
  {
    box: string;
    pad: string;
    motif: string;
    caption: string;
    eyebrow: string;
    logo: number;
    frame: string;
  }
> = {
  card: {
    box: "h-44 sm:h-48",
    pad: "p-4 sm:p-5",
    motif: "h-[74%]",
    caption: "text-[15px] sm:text-base",
    eyebrow: "text-[9px]",
    logo: 28,
    frame: "inset-[9px]",
  },
  article: {
    box: "h-44 sm:h-48",
    pad: "p-4 sm:p-5",
    motif: "h-[74%]",
    caption: "text-[15px] sm:text-base",
    eyebrow: "text-[9px]",
    logo: 28,
    frame: "inset-[9px]",
  },
  hero: {
    box: "h-52 sm:h-64 lg:h-72",
    pad: "p-6 sm:p-7",
    motif: "h-[72%]",
    caption: "text-xl sm:text-2xl",
    eyebrow: "text-[10px]",
    logo: 38,
    frame: "inset-[12px]",
  },
  answer: {
    box: "h-52 sm:h-64 lg:h-72",
    pad: "p-6 sm:p-7",
    motif: "h-[72%]",
    caption: "text-xl sm:text-2xl",
    eyebrow: "text-[10px]",
    logo: 38,
    frame: "inset-[12px]",
  },
  row: {
    box: "h-16 w-24 shrink-0",
    pad: "p-0",
    motif: "h-[68%]",
    caption: "",
    eyebrow: "",
    logo: 0,
    frame: "inset-[4px]",
  },
};

const HATCH =
  "repeating-linear-gradient(135deg, rgba(255,255,255,0.038) 0px, rgba(255,255,255,0.038) 1px, transparent 1px, transparent 6px)";

export function BrandedThumbnail({
  departmentSlug,
  featuredImage,
  size = "card",
  departmentName,
  label,
  caption,
  captionMeta,
  title,
  category,
  topics,
  showWatermark = true,
  className = "",
}: {
  departmentSlug: string;
  featuredImage?: string | null;
  size?: SizeKey;
  departmentName?: string;
  /** Small chip in the upper-right, e.g. "Featured answer". */
  label?: string;
  /** Typographic focus of the plate — normally the key Scripture reference. */
  caption?: string;
  /** Secondary line under the caption, e.g. the translation. */
  captionMeta?: string;
  title?: string;
  category?: string;
  topics?: string[];
  showWatermark?: boolean;
  className?: string;
}) {
  const dept = getDepartment(departmentSlug);
  const name = departmentName ?? dept?.name ?? "Theology";
  const s = SIZES[size];
  const isRow = size === "row";

  const { motif, palette } = getTopicVisual({
    title,
    category,
    topics,
    departmentSlug,
  });

  return (
    <div
      className={`relative isolate overflow-hidden ${s.box} ${className}`}
      style={{
        backgroundColor: palette.base,
        backgroundImage: `linear-gradient(140deg, ${palette.base} 0%, ${palette.mid} 52%, ${palette.edge} 100%)`,
      }}
    >
      {featuredImage ? (
        <Image
          src={featuredImage}
          alt=""
          fill
          className="object-cover"
          sizes={
            size === "hero" || size === "answer"
              ? "(min-width: 1024px) 800px, 100vw"
              : "(min-width: 640px) 420px, 100vw"
          }
        />
      ) : (
        <>
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(120% 90% at 82% 12%, ${palette.glow}2E 0%, transparent 62%)`,
            }}
          />
          <div className="absolute inset-0" style={{ backgroundImage: HATCH }} />
          <div
            aria-hidden
            className={`pointer-events-none absolute top-1/2 -translate-y-1/2 ${
              isRow ? "right-[-10%]" : "right-[-6%]"
            } ${s.motif} aspect-square`}
            style={{ color: palette.accent, opacity: isRow ? 0.32 : 0.2 }}
          >
            <TopicMotif
              name={motif}
              className="h-full w-full"
              strokeWidth={isRow ? 3.2 : 2.2}
            />
          </div>
        </>
      )}

      {/* Legibility scrim — keeps the caption readable over art or gradient. */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, ${palette.base}E6 0%, ${palette.base}66 34%, transparent 62%)`,
        }}
      />

      <div
        className={`pointer-events-none absolute ${s.frame} rounded-[3px] border`}
        style={{ borderColor: `${palette.accent}26` }}
      />

      {!isRow && (
        <div className={`relative flex h-full flex-col justify-between ${s.pad}`}>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p
                className={`${s.eyebrow} font-sans font-bold uppercase leading-none tracking-[0.22em]`}
                style={{ color: palette.accent }}
              >
                {name}
              </p>
              <span
                className="mt-2 block h-px w-8"
                style={{ backgroundColor: `${palette.accent}80` }}
              />
            </div>

            {label && (
              <span
                className="shrink-0 rounded-sm border px-2 py-1 text-[9px] font-bold uppercase leading-none tracking-[0.14em] text-white/90 backdrop-blur-sm"
                style={{
                  borderColor: `${palette.accent}40`,
                  backgroundColor: "rgba(0,0,0,0.28)",
                }}
              >
                {label}
              </span>
            )}
          </div>

          <div className="flex items-end justify-between gap-4">
            <div className="min-w-0">
              {(caption || category) && (
                <p
                  className={`line-clamp-2 font-display font-semibold leading-tight text-white ${s.caption}`}
                >
                  {caption || category}
                </p>
              )}
              {captionMeta && (
                <p className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  {captionMeta}
                </p>
              )}
            </div>

            {showWatermark && (
              /* Imprint mark — the logo needs a light ground or its navy
                 bookplate disappears and only the gold glyph reads. */
              <span
                className="flex shrink-0 items-center justify-center rounded-md bg-white/90 ring-1 ring-white/25"
                style={{ width: s.logo, height: s.logo }}
              >
                <Image
                  src="/logo-icon.svg"
                  alt=""
                  width={s.logo - 7}
                  height={s.logo - 7}
                  unoptimized
                />
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
