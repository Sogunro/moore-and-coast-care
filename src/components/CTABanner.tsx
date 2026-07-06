import { business } from "@/lib/site";
import { ButtonLink } from "./Button";

/** Closing call-to-action — repeated at the foot of every page. */
export function CTABanner() {
  return (
    <section className="mx-auto max-w-6xl px-5 sm:px-8">
      <div className="reveal relative overflow-hidden rounded-3xl bg-navy px-6 py-16 text-center sm:px-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-sage/15 blur-3xl"
        />
        <h2 className="relative text-3xl font-semibold text-warm-white sm:text-4xl">
          Looking for care for yourself or a loved one?
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-lg text-warm-white/80">
          Speak to our friendly Whitby team today. There is no obligation — just
          honest, helpful advice.
        </p>
        <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/contact" variant="primary" size="lg">
            Request a free consultation
          </ButtonLink>
          <ButtonLink
            href={business.phoneHref}
            variant="outline"
            size="lg"
            className="border-white/30 text-warm-white hover:bg-warm-white hover:text-navy"
          >
            Call {business.phone}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
