import Image from "next/image";
import Link from "next/link";

const LOGO_ICON = "/logo-icon.svg";
const LOGO_FULL = "/logo.svg";
const LOGO_BLUE = "#112248";
const LOGO_GOLD = "#f7bf2d";

const ICON_ASPECT = 690 / 545;
const FULL_ASPECT = 915.55 / 697.32;

function LogoMark({ height }: { height: number }) {
  const width = Math.round(height * ICON_ASPECT);

  return (
    <Image
      src={LOGO_ICON}
      alt=""
      width={width}
      height={height}
      unoptimized
      priority
      className="block object-contain"
      style={{ height, width: "auto", maxWidth: width }}
    />
  );
}

function LogoWordmark({
  variant,
  size = "default",
}: {
  variant: "default" | "light";
  size?: "default" | "footer";
}) {
  const onDark = variant === "light";
  const titleSize =
    size === "footer"
      ? "text-[1.05rem] leading-snug sm:text-lg"
      : "text-base sm:text-lg md:text-xl";

  return (
    <span className="min-w-0">
      <span
        className={`block font-sans font-extrabold uppercase tracking-[0.06em] ${titleSize} ${
          onDark ? "text-white" : ""
        }`}
        style={onDark ? undefined : { color: LOGO_BLUE }}
      >
        Bible Answer Hub
      </span>
      <span
        className={`mt-1.5 block font-sans text-[10px] font-semibold uppercase tracking-[0.18em] sm:text-[11px] ${
          onDark ? "text-gold-400" : ""
        }`}
        style={onDark ? undefined : { color: LOGO_GOLD }}
      >
        Biblical Q&amp;A
      </span>
    </span>
  );
}

function FullLogoImage({ height }: { height: number }) {
  const width = Math.round(height * FULL_ASPECT);

  return (
    <Image
      src={LOGO_FULL}
      alt="Bible Answer Hub"
      width={width}
      height={height}
      unoptimized
      priority
      className="block object-contain"
      style={{ height, width: "auto", maxWidth: width }}
    />
  );
}

/** Navbar — icon + large readable title */
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
            ? "inline-flex shrink-0 items-center justify-center rounded-xl bg-white px-1.5 pb-1 pt-2 shadow-md ring-1 ring-white/20"
            : "inline-flex shrink-0 items-center justify-center pb-0.5 pt-1.5"
        }
      >
        <LogoMark height={onDark ? 40 : 44} />
      </span>
      <LogoWordmark variant={variant} />
    </Link>
  );
}

/** Footer — stacked brand block, stays inside its column */
export function BrandLogoFooter() {
  return (
    <Link
      href="/"
      className="group inline-flex max-w-[17rem] flex-col items-start gap-3.5 transition-opacity hover:opacity-90"
      aria-label="Bible Answer Hub — home"
    >
      <span className="inline-flex shrink-0 rounded-xl bg-white px-2.5 pb-1.5 pt-2.5 shadow-md ring-1 ring-white/10">
        <LogoMark height={46} />
      </span>
      <LogoWordmark variant="light" size="footer" />
    </Link>
  );
}

/** Hero / about — full artwork logo */
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
        <FullLogoImage height={128} />
      </span>
    </div>
  );
}
