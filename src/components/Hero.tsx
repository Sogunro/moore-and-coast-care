import Image from "next/image";
import { business, heroImage } from "@/lib/site";
import { ButtonLink } from "./Button";

/**
 * Editorial split hero: text left on white, one photograph right.
 *
 * A single image rather than the old four-slide crossfade. Rotation competed
 * with the headline every few seconds, forced one crop to suit four different
 * compositions, and loaded four large images into the largest paint on the
 * page. One image drifts slowly instead — alive, but never asking to be read.
 *
 * Because the headline sits on white and never over the photograph, there is
 * no scrim and no contrast compromise.
 */
export function Hero() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 pb-16 pt-10 sm:px-8 sm:pb-20 lg:pb-[120px] lg:pt-16">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] lg:gap-16">
        {/* Text — first in source order, so it is also first on mobile. */}
        <div className="max-w-[520px]">
          <h1 className="text-[44px] leading-[0.98] sm:text-[56px] lg:text-[72px]">
            Care that
            <br />
            <span className="text-brand">feels like life.</span>
          </h1>

          <p className="mt-6 max-w-[480px] text-[17px] leading-[1.55] text-ink-body sm:text-[20px]">
            {business.intro}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" variant="primary" size="lg">
              Arrange a free assessment
              <Arrow />
            </ButtonLink>
            <ButtonLink href="/services" variant="outline" size="lg">
              Explore our care
            </ButtonLink>
          </div>
        </div>

        {/* Photograph — the drift lives on the inner element so the rounded
            frame stays perfectly still while the image moves inside it. */}
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-image)] bg-surface sm:aspect-[3/2] lg:aspect-[4/5]">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="hero-drift object-cover"
            />
          </div>

          {/* The handwritten signature — used twice on the whole site, so it
              reads as a human mark rather than as a typeface. */}
          <p
            className="pointer-events-none absolute -bottom-3 -left-2 font-[family-name:var(--font-hand)] text-[26px] leading-none text-brand sm:-left-6 sm:text-[32px]"
            aria-hidden
          >
            More life together
          </p>
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
