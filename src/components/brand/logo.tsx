import Image from "next/image";
import Link from "next/link";

function LogoMark({
  size,
  variant,
}: {
  size: number;
  variant: "default" | "light";
}) {
  const isLight = variant === "light";

  return (
    <span
      className={`relative flex shrink-0 items-center justify-center rounded-xl ${
        isLight
          ? "bg-white shadow-md ring-1 ring-white/20"
          : "bg-white shadow-sm ring-1 ring-brand-100"
      }`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/logo-icon.svg"
        alt=""
        width={size}
        height={size}
        unoptimized
        className="object-contain p-1.5"
        style={{ width: size - 4, height: size - 4 }}
        priority
      />
    </span>
  );
}

function LogoWordmark({
  variant,
  showTagline = true,
  align = "left",
  hideTaglineOnMobile = false,
}: {
  variant: "default" | "light";
  showTagline?: boolean;
  align?: "left" | "center";
  hideTaglineOnMobile?: boolean;
}) {
  const isLight = variant === "light";
  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <span className={`leading-tight ${alignClass}`}>
      <span
        className={`block whitespace-nowrap font-display text-[0.9375rem] font-bold tracking-tight sm:text-[1.125rem] ${
          isLight ? "text-white" : "text-brand-700"
        }`}
      >
        Bible Answer Hub
      </span>
      {showTagline && (
        <span
          className={`mt-0.5 block whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.14em] sm:mt-1 sm:text-[11px] ${
            hideTaglineOnMobile ? "hidden sm:block" : ""
          } ${isLight ? "text-gold-400" : "text-gold-600"}`}
        >
          Biblical Q&amp;A
        </span>
      )}
    </span>
  );
}

/** Navbar — icon + title side by side */
export function BrandLogo({
  variant = "default",
}: {
  variant?: "default" | "light";
}) {
  return (
    <Link
      href="/"
      className="group flex shrink-0 items-center gap-2.5 sm:gap-3"
      aria-label="Bible Answer Hub — home"
    >
      <LogoMark size={44} variant={variant} />
      <LogoWordmark
        variant={variant}
        showTagline
        hideTaglineOnMobile
      />
    </Link>
  );
}

/** Footer — stacked, larger, always shows tagline */
export function BrandLogoFooter() {
  return (
    <Link
      href="/"
      className="group inline-flex flex-col items-start gap-3"
      aria-label="Bible Answer Hub — home"
    >
      <LogoMark size={56} variant="light" />
      <LogoWordmark variant="light" showTagline align="left" />
    </Link>
  );
}

/** Hero / about — centered stacked logo */
export function BrandLogoStacked({
  variant = "default",
}: {
  variant?: "default" | "light";
}) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <LogoMark size={72} variant={variant} />
      <LogoWordmark variant={variant} showTagline align="center" />
    </div>
  );
}
