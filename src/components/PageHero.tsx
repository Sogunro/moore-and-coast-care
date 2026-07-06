/** Compact hero for interior pages — navy band, display heading, optional lead. */
export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-sage/15 blur-3xl"
      />
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-3xl text-4xl font-semibold text-warm-white sm:text-5xl">
          {title}
        </h1>
        {lead && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-warm-white/80">
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}
