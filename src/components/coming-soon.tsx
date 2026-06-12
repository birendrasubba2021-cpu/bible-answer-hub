import Link from "next/link";
import { Construction } from "lucide-react";

export function ComingSoon({
  title,
  eyebrow,
  description,
}: {
  title: string;
  eyebrow: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
        <Construction className="h-8 w-8" />
      </span>
      <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-gold-600">
        {eyebrow}
      </p>
      <h1 className="mt-1 font-serif text-4xl font-bold text-stone-900">
        {title}
      </h1>
      <p className="mt-3 text-stone-600">{description}</p>
      <Link
        href="/questions"
        className="mt-6 inline-flex items-center rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
      >
        Browse Questions instead
      </Link>
    </div>
  );
}
