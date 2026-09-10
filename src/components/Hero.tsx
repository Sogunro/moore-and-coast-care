import { business } from "@/lib/site";
import { ButtonLink } from "./Button";
import { HeroSlides } from "./HeroSlides";

/**
 * Full-bleed hero: the photograph fills the entire screen, the headline sits
 * on top of it.
 *
 * Text over a photograph needs a scrim to stay readable, so the one here is
 * shaped to cost as little as possible: strong at the left edge where the
 * words are, fully transparent by 65% across, so the faces on the right stay
 * bright and untouched. It is a horizontal gradient rather than the usual
 * flat wash, and it is tinted with the brand ink rather than plain black.
 *
 * White on the darkest part of the scrim measures 14.55:1, so the headline
 * stays legible even over the brightest part of the photograph.
 *
 * A single image, not a carousel. Rotation competed with the headline, forced
 * one crop to serve four compositions, and put four large images into the
 * largest paint on the page. This one drifts slowly instead.
 */
export function Hero() {
  return (
    <section className="relative isolate min-h-[560px] w-full sm:min-h-[640px] lg:min-h-[calc(100vh-88px)]">
      {/* Photograph — fills the section, sits behind everything. */}
      <div className="absolute inset-0 -z-10 overflow-hidden bg-surface">
        <HeroSlides />

        {/* Scrim.

            Every slide is composed with its left third left open, so this only
            has to lift text off background — sky, grass, a sunlit window —
            rather than rescue it from a face. A short ramp clearing by 40%
            plus a light overall wash does that, and the subjects on the right
            stay fully lit. */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#172b3a]/80 via-[#172b3a]/30 via-40% to-transparent lg:from-[#172b3a]/75 lg:via-[#172b3a]/20 lg:via-35%"
          aria-hidden
        />
        <div className="absolute inset-0 bg-[#172b3a]/12" aria-hidden />
      </div>

      {/* Content — padded to line up with the 1240px grid used site-wide. */}
      <div className="mx-auto flex min-h-[560px] max-w-[1240px] flex-col justify-center px-5 py-16 sm:min-h-[640px] sm:px-8 lg:min-h-[calc(100vh-88px)] lg:py-24">
        <div className="max-w-[560px]">
          <h1 className="text-[44px] leading-[0.98] text-white sm:text-[56px] lg:text-[64px] xl:text-[72px]">
            Care that
            <br />
            {/* Not brand blue here: on a dark scrim it loses contrast, and the
                emphasis reads better as a lighter tone than a darker one. */}
            <span className="text-[#9ec2f0]">feels like life.</span>
          </h1>

          {/* Leads with what and where. The previous line opened on feeling
              ("Compassionate, professional care that helps people...") and a
              visitor had to read 22 words before learning this is home care in
              Whitby. The goal is that they know at a glance. */}
          <p className="mt-6 max-w-[500px] text-[17px] leading-[1.55] text-white/90 sm:text-[20px]">
            <span className="font-semibold text-white">
              Home care across Whitby &amp; North Yorkshire.
            </span>{" "}
            {business.heroLead}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" variant="primary" size="lg">
              Arrange a free assessment
              <Arrow />
            </ButtonLink>
            {/* onImage, not outline: the brand-blue outline would disappear
                against the darkened photograph. */}
            <ButtonLink href="/services" variant="onImage" size="lg">
              Explore our care
            </ButtonLink>
          </div>

          {/* The handwritten signature — used twice on the whole site, so it
              reads as a human mark rather than as a typeface. Centred within
              the text column so it sits under the middle of the block rather
              than hanging off its left edge. */}
          <p
            className="mt-10 text-center font-[family-name:var(--font-hand)] text-[26px] leading-none text-white/85 sm:text-[30px]"
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
