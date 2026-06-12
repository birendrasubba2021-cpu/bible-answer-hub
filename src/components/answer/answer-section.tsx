import type { ReactNode } from "react";

const VARIANTS = {
  default: {
    bar: "bg-brand-600",
    icon: "text-brand-600 bg-brand-50",
  },
  gold: {
    bar: "bg-gold-500",
    icon: "text-gold-600 bg-gold-500/10",
  },
  alert: {
    bar: "bg-amber-500",
    icon: "text-amber-700 bg-amber-50",
  },
  success: {
    bar: "bg-emerald-600",
    icon: "text-emerald-700 bg-emerald-50",
  },
} as const;

export function AnswerSection({
  id,
  icon,
  title,
  subtitle,
  variant = "default",
  children,
}: {
  id: string;
  icon: ReactNode;
  title: string;
  subtitle?: string;
  variant?: keyof typeof VARIANTS;
  children: ReactNode;
}) {
  const v = VARIANTS[variant];

  return (
    <section id={id} className="answer-section scroll-mt-28">
      <div className="card-elevated overflow-hidden">
        <div className={`h-1 ${v.bar}`} />
        <div className="p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${v.icon}`}
            >
              {icon}
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="font-display text-xl font-bold text-stone-900 sm:text-2xl">
                {title}
              </h2>
              {subtitle && (
                <p className="mt-1 text-sm text-muted">{subtitle}</p>
              )}
              <div className="mt-5">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ShortAnswerCallout({ text }: { text: string }) {
  return (
    <section
      id="short-answer"
      className="answer-section scroll-mt-28"
    >
      <div className="relative overflow-hidden rounded-2xl border border-gold-500/25 bg-gradient-to-br from-gold-500/10 via-gold-500/5 to-transparent p-6 sm:p-8">
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-gold-500/10 blur-2xl" />
        <p className="relative text-xs font-bold uppercase tracking-[0.2em] text-gold-600">
          Short Answer
        </p>
        <p className="relative mt-3 font-display text-xl font-medium leading-relaxed text-stone-900 sm:text-[1.35rem] sm:leading-snug">
          {text}
        </p>
        <p className="relative mt-4 text-sm text-muted">
          Read the full explanation below for Scripture, theology, and
          practical application.
        </p>
      </div>
    </section>
  );
}
