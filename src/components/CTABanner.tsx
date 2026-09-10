import { business } from "@/lib/site";
import { ButtonLink } from "./Button";

/** Closing call-to-action — repeated at the foot of every page. */
export function CTABanner() {
  return (
    <section className="mx-auto max-w-6xl px-5 sm:px-8">
      <div className="reveal relative overflow-hidden rounded-[var(--radius-card)] bg-brand px-6 py-16 text-center sm:px-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-teal/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-teal/15 blur-3xl"
        />
        <h2 className="relative text-3xl font-semibold text-white sm:text-4xl">
          Looking for care for yourself or a loved one?
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-lg text-white/80">
          Speak to our friendly Whitby team today. There is no obligation — just
          honest, helpful advice.
        </p>
        <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {/* On a brand-blue panel the standard primary (blue on blue) and
              outline (white background) variants both disappear. White-filled
              is the primary action here; onImage carries the secondary. */}
          <ButtonLink href="/contact" variant="onBrand" size="lg">
            Request a free consultation
          </ButtonLink>
          <ButtonLink href={business.phoneHref} variant="onImage" size="lg">
            Call {business.phone}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
