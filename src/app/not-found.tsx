import { ButtonLink } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-5 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
        Page not found
      </p>
      <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-4 text-lg text-ink-muted">
        The page may have moved. Let&apos;s get you back on track.
      </p>
      <div className="mt-8">
        <ButtonLink href="/" size="lg">
          Return home
        </ButtonLink>
      </div>
    </section>
  );
}
