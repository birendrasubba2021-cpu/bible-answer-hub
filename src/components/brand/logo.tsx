import Image from "next/image";
import Link from "next/link";

const LOGO_FULL = "/logo.svg";
const LOGO_ICON = "/logo-icon.svg";
const LOGO_BLUE = "#112248";

const FULL_ASPECT = 902.66 / 689.98;
const ICON_ASPECT = 580 / 485;

function LogoImage({
  src,
  height,
  className = "",
}: {
  src: string;
  height: number;
  className?: string;
}) {
  const aspect = src === LOGO_ICON ? ICON_ASPECT : FULL_ASPECT;
  const width = Math.round(height * aspect);

  return (
    <Image
      src={src}
      alt=""
      width={width}
      height={height}
      unoptimized
      priority
      className={`block object-contain ${className}`}
      style={{ height, width: "auto", maxWidth: width }}
    />
  );
}

/** Navbar — icon + title (icon is transparent; text matches logo blue) */
export function BrandLogo({
  variant = "default",
}: {
  variant?: "default" | "light";
}) {
  const onDark = variant === "light";

  return (
    <Link
      href="/"
      className="group flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-90 sm:gap-3"
      aria-label="Bible Answer Hub — home"
    >
      <span
        className={
          onDark
            ? "inline-flex shrink-0 items-center justify-center rounded-xl bg-white px-1.5 py-1 shadow-md ring-1 ring-white/20"
            : "inline-flex shrink-0 items-center justify-center"
        }
      >
        <LogoImage src={LOGO_ICON} height={onDark ? 38 : 46} />
      </span>
      <span
        className={`leading-tight ${onDark ? "text-white" : ""}`}
        style={onDark ? undefined : { color: LOGO_BLUE }}
      >
        <span className="block whitespace-nowrap font-display text-[0.9375rem] font-bold tracking-tight sm:text-[1.0625rem]">
          Bible Answer Hub
        </span>
      </span>
    </Link>
  );
}

/** Footer — full lockup on a light panel so dark-blue artwork stays visible */
export function BrandLogoFooter() {
  return (
    <Link
      href="/"
      className="group inline-block transition-opacity hover:opacity-90"
      aria-label="Bible Answer Hub — home"
    >
      <span className="inline-flex rounded-2xl bg-white px-4 py-3 shadow-lg ring-1 ring-white/10">
        <LogoImage src={LOGO_FULL} height={96} />
      </span>
    </Link>
  );
}

/** Hero / about — centered full logo */
export function BrandLogoStacked({
  variant = "default",
}: {
  variant?: "default" | "light";
}) {
  const onDark = variant === "light";

  return (
    <div className="flex flex-col items-center">
      <span
        className={
          onDark
            ? "inline-flex rounded-2xl bg-white px-5 py-4 shadow-lg"
            : "inline-flex"
        }
      >
        <LogoImage src={LOGO_FULL} height={120} />
      </span>
    </div>
  );
}
