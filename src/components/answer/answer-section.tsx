import type { ReactNode } from "react";

export function AnswerSection({
  id,
  icon,
  title,
  subtitle,
  children,
}: {
  id: string;
  icon: ReactNode;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="answer-section scroll-mt-28">
      <article className="scholarly-card overflow-hidden bg-white">
        <header className="flex items-start gap-4 border-b border-border px-6 py-5 sm:px-8 sm:py-6">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-brand-100 bg-brand-50 text-brand-700">
            {icon}
          </span>
          <div className="min-w-0">
            <h2 className="font-display text-xl font-bold text-stone-900 sm:text-2xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1 text-sm leading-relaxed text-stone-500">
                {subtitle}
              </p>
            )}
          </div>
        </header>
        <div className="px-6 py-6 sm:px-8 sm:py-7">{children}</div>
      </article>
    </section>
  );
}

export function ShortAnswerCallout({ text }: { text: string }) {
  return (
    <section id="short-answer" className="answer-section scroll-mt-28">
      <div className="scholarly-card border-l-4 border-l-gold-500 bg-white px-6 py-7 sm:px-8 sm:py-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-700">
          Summary
        </p>
        <p className="mt-4 font-display text-xl font-medium leading-relaxed text-stone-900 sm:text-2xl sm:leading-snug">
          {text}
        </p>
        <p className="mt-5 text-sm leading-relaxed text-stone-500">
          The sections below provide Scripture, theological exposition, common
          errors, pastoral application, and recommended reading.
        </p>
      </div>
    </section>
  );
}
