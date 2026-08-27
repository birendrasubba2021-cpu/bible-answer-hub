export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="mb-10 border-b border-border pb-8">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-700">
        {eyebrow}
      </p>
      <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-stone-600">
          {subtitle}
        </p>
      )}
    </header>
  );
}
