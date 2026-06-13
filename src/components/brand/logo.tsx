import Image from "next/image";
import Link from "next/link";

const LOGO_WIDTH = 904;
const LOGO_HEIGHT = 691;

/** Brand lockup lives at /public/logo.png (primary) or /public/logo.svg */
export function BrandLogo({
  height = 44,
  showWordmark = false,
  variant = "default",
}: {
  /** Display height in pixels — width scales from the image aspect ratio */
  height?: number;
  /** Off by default: logo.png already includes the Bible Answer Hub wordmark */
  showWordmark?: boolean;
  variant?: "default" | "light";
}) {
  const textClass =
    variant === "light" ? "text-white" : "text-brand-700";

  return (
    <Link href="/" className="flex items-center gap-3 shrink-0 group">
      <Image
        src="/logo.png"
        alt="Bible Answer Hub"
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        className="w-auto object-contain transition group-hover:opacity-90"
        style={{ height: `${height}px` }}
        priority
      />
      {showWordmark && (
        <div className="leading-tight">
          <span
            className={`block font-display text-lg font-bold tracking-tight ${textClass}`}
          >
            Bible Answer Hub
          </span>
          <span
            className={`hidden text-[10px] font-medium uppercase tracking-widest sm:block ${
              variant === "light" ? "text-stone-300" : "text-muted"
            }`}
          >
            Biblical Q&amp;A
          </span>
        </div>
      )}
    </Link>
  );
}
