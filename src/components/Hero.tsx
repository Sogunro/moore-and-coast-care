import Image from "next/image";
import { business, heroImage } from "@/lib/site";
import { ButtonLink } from "./Button";

/**
 * Hero: text on white at the left, photograph bleeding off the right edge.
 *
 * The image runs full-height to the true edge of the viewport rather than
 * sitting in a boxed column. That gives it the scale of a full-bleed hero
 * while the headline stays on clean white — so there is no gradient scrim,
 * no contrast compromise, and the photograph can be as bright and busy as it
 * likes without threatening legibility.
 *
 * It also suits the source photography, which is wide: a tall boxed frame
 * discarded most of the image, and with it the second person in the shot.
 *
 * A single image, not a carousel. Rotation competed with the headline, forced
 * one crop to serve four compositions, and put four large images into the
 * largest paint on the page. This one drifts slowly instead.
 *
 * Layout: the section is full-width, but the text column is padded so it lines
 * up with the 1240px content width used everywhere else — the headline still
 * sits on the site's grid even though the section itself is not centred.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Below lg this is a normal stacked hero; the bleed only earns its
          keep once there is width to spare for a side-by-side. */}
      <div className="lg:grid lg:min-h-[calc(100vh-88px)] lg:grid-cols-[minmax(0,48fr)_minmax(0,52fr)] lg:items-center">
        <div className="px-5 pt-10 sm:px-8 lg:py-20 lg:pl-[max(2rem,calc((100vw-1240px)/2))] lg:pr-12">
          <div className="max-w-[520px]">
            <h1 className="text-[44px] leading-[0.98] sm:text-[56px] lg:text-[64px] xl:text-[72px]">
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

            {/* The handwritten signature — used twice on the whole site, so it
                reads as a human mark rather than as a typeface. Kept on white,
                never over the photograph, where sunlit grass made it
                unreadable and a scrim would have defeated the point. */}
            <p
              className="mt-10 font-[family-name:var(--font-hand)] text-[26px] leading-none text-brand sm:text-[30px]"
              aria-hidden
            >
              More life together
            </p>
          </div>
        </div>

        {/* Rounded on the left only: the right side runs off the screen, so
            rounding it there would imply an edge that is not there. */}
        <div className="relative mt-10 h-[380px] sm:h-[460px] lg:mt-0 lg:h-full lg:min-h-[calc(100vh-88px)]">
          <div className="absolute inset-0 overflow-hidden rounded-l-[var(--radius-image)] bg-surface">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 52vw"
              /* Both subjects sit right of centre in the source, so the crop
                 is pulled that way rather than centred. */
              style={{ objectPosition: heroImage.focus }}
              className="hero-drift object-cover"
            />
          </div>
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
