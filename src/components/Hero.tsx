import Image from "next/image";
import { business, heroImage } from "@/lib/site";
import { ButtonLink } from "./Button";

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
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          sizes="100vw"
          /* Focal point is set in CSS (.hero-focus) rather than inline,
             because how far right the crop must sit depends on viewport
             width: a phone keeps far less of this wide image than a desktop. */
          className="hero-drift hero-focus object-cover"
        />

        {/* Scrim: dark where the text is, clear where the faces are.
            On narrow screens the text sits over the middle of the image, so
            the gradient runs further across before clearing. */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#172b3a]/90 via-[#172b3a]/70 to-transparent sm:via-[#172b3a]/55 lg:from-[#172b3a]/85 lg:via-[#172b3a]/45 lg:to-transparent"
          aria-hidden
        />
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

          <p className="mt-6 max-w-[480px] text-[17px] leading-[1.55] text-white/90 sm:text-[20px]">
            {business.intro}
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
              reads as a human mark rather than as a typeface. */}
          <p
            className="mt-10 font-[family-name:var(--font-hand)] text-[26px] leading-none text-white/85 sm:text-[30px]"
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
