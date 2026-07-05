import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  href,
  linkLabel,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";

  return (
    <div
      className={`flex flex-wrap gap-4 ${
        centered
          ? "flex-col items-center text-center"
          : "items-end justify-between"
      }`}
    >
      <div className={centered ? "max-w-2xl" : undefined}>
        <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold-600">
          <span className="h-px w-6 bg-gold-400" aria-hidden />
          {eyebrow}
          {centered && <span className="h-px w-6 bg-gold-400" aria-hidden />}
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-[2rem]">
          {title}
        </h2>
        {subtitle && (
          <p className={`mt-3 text-base leading-relaxed text-stone-600 ${centered ? "" : "max-w-2xl"}`}>
            {subtitle}
          </p>
        )}
      </div>
      {href && linkLabel && (
        <Link
          href={href}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 transition hover:border-brand-300 hover:bg-brand-100 hover:gap-2.5"
        >
          {linkLabel} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
