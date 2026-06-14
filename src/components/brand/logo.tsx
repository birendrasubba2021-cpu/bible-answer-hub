import Image from "next/image";
import Link from "next/link";

const LOGO_FULL = "/logo.svg";
const LOGO_ASPECT = 915.55 / 697.32;

function LogoImage({
  height,
  className = "",
}: {
  height: number;
  className?: string;
}) {
  const width = Math.round(height * LOGO_ASPECT);

  return (
    <Image
      src={LOGO_FULL}
      alt="Bible Answer Hub"
      width={width}
      height={height}
      unoptimized
      priority
      className={`block object-contain ${className}`}
      style={{ height, width: "auto", maxWidth: width }}
    />
  );
}

/** Navbar — full logo artwork (yellow ?, Bible, BIBLE ANSWER HUB text) */
export function BrandLogo({
  variant = "default",
}: {
  variant?: "default" | "light";
}) {
  const onDark = variant === "light";

  return (
    <Link
      href="/"
      className="group inline-flex shrink-0 items-center transition-opacity hover:opacity-90"
      aria-label="Bible Answer Hub — home"
    >
      <span
        className={
          onDark
            ? "inline-flex rounded-xl bg-white px-2.5 py-1.5 shadow-md ring-1 ring-white/20"
            : "inline-flex"
        }
      >
        <LogoImage height={onDark ? 46 : 52} />
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
        <LogoImage height={100} />
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
        <LogoImage height={128} />
      </span>
    </div>
  );
}
