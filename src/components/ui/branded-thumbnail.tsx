import Image from "next/image";
import { getDepartment } from "@/lib/departments";
import { getDepartmentTheme } from "@/lib/department-theme";
import { DepartmentIcon } from "@/components/department-icon";

const SIZES = {
  card: "h-40 sm:h-44",
  hero: "h-48 sm:h-56 lg:h-64",
  row: "h-16 w-24 shrink-0 rounded-lg",
  answer: "h-52 sm:h-64 lg:h-72",
  article: "h-44 sm:h-48",
} as const;

export function BrandedThumbnail({
  departmentSlug,
  featuredImage,
  size = "card",
  departmentName,
  label,
  showWatermark = true,
  className = "",
}: {
  departmentSlug: string;
  featuredImage?: string | null;
  size?: keyof typeof SIZES;
  departmentName?: string;
  label?: string;
  showWatermark?: boolean;
  className?: string;
}) {
  const dept = getDepartment(departmentSlug);
  const theme = getDepartmentTheme(departmentSlug);
  const name = departmentName ?? dept?.name ?? "Theology";
  const isRow = size === "row";

  if (featuredImage) {
    return (
      <div className={`relative overflow-hidden ${SIZES[size]} ${className}`}>
        <Image
          src={featuredImage}
          alt=""
          fill
          className="object-cover"
          sizes={
            size === "hero" || size === "answer"
              ? "(min-width: 1024px) 800px, 100vw"
              : "(min-width: 640px) 400px, 100vw"
          }
        />
        <ThumbnailOverlay name={name} label={label} compact={isRow} />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${SIZES[size]} ${className}`}
      style={{
        background: `linear-gradient(145deg, ${theme.from} 0%, ${theme.via} 45%, ${theme.to} 100%)`,
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: isRow ? "16px 16px" : "32px 32px",
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 80% 20%, ${theme.accent}33, transparent 55%)`,
        }}
      />

      {showWatermark && (
        <div
          className={`absolute ${isRow ? "right-1 bottom-1" : "right-3 bottom-3 sm:right-4 sm:bottom-4"} opacity-[0.18]`}
        >
          <Image
            src="/logo-icon.svg"
            alt=""
            width={isRow ? 28 : 56}
            height={isRow ? 28 : 56}
            unoptimized
            className="object-contain"
          />
        </div>
      )}

      {!isRow && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="flex items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15 backdrop-blur-[2px]"
            style={{
              width: size === "hero" || size === "answer" ? "4.5rem" : "3.5rem",
              height: size === "hero" || size === "answer" ? "4.5rem" : "3.5rem",
            }}
          >
            <DepartmentIcon
              name={dept?.icon ?? "book"}
              className={
                size === "hero" || size === "answer"
                  ? "h-8 w-8 text-white/90"
                  : "h-7 w-7 text-white/90"
              }
            />
          </span>
        </div>
      )}

      {!isRow && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent px-4 pb-3 pt-10">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/95">
              {name}
            </span>
            {showWatermark && (
              <span className="hidden text-[9px] font-semibold uppercase tracking-[0.12em] text-white/50 sm:inline">
                Bible Answer Hub
              </span>
            )}
          </div>
        </div>
      )}

      {label && !isRow && (
        <span className="absolute left-3 top-3 rounded border border-white/20 bg-black/25 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-white/90 backdrop-blur-sm">
          {label}
        </span>
      )}
    </div>
  );
}

function ThumbnailOverlay({
  name,
  label,
  compact,
}: {
  name: string;
  label?: string;
  compact?: boolean;
}) {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-t from-brand-900/85 via-brand-900/20 to-transparent" />
      {label && !compact && (
        <span className="absolute left-3 top-3 rounded border border-white/20 bg-black/30 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
          {label}
        </span>
      )}
      {!compact && (
        <div className="absolute inset-x-0 bottom-0 px-4 pb-3 pt-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/95">
            {name}
          </span>
        </div>
      )}
    </>
  );
}
