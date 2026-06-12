import Image from "next/image";
import Link from "next/link";

/** Drop your logo at /public/logo.png or /public/logo.svg to replace the default. */
export function BrandLogo({
  size = 40,
  showWordmark = true,
  variant = "default",
}: {
  size?: number;
  showWordmark?: boolean;
  variant?: "default" | "light";
}) {
  const textClass =
    variant === "light"
      ? "text-white"
      : "text-brand-700";

  return (
    <Link href="/" className="flex items-center gap-3 shrink-0 group">
      <Image
        src="/logo.svg"
        alt=""
        width={size}
        height={size}
        className="rounded-xl transition group-hover:opacity-90"
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
