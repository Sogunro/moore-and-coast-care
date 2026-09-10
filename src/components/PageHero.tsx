import Image from "next/image";

/**
 * Hero for interior pages.
 *
 * Two shapes, chosen by whether an image is supplied:
 *  - With one, a split — text left, photograph right, filling what was
 *    otherwise a large empty field of brand blue.
 *  - Without, the original full-width band, so the pages that have no
 *    photography yet are unaffected.
 *
 * The image sits inside the blue band rather than bleeding off the page, so
 * these pages stay visually subordinate to the homepage hero, which is the
 * one full-bleed moment on the site.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
  imageFocus = "50% 50%",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  image?: string;
  imageAlt?: string;
  imageFocus?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-brand">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-teal/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-teal/15 blur-3xl"
      />

      <div
        className={`mx-auto max-w-[1240px] px-5 py-16 sm:px-8 sm:py-20 ${
          image
            ? "lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-14 lg:py-20"
            : ""
        }`}
      >
        <div className={image ? "" : "max-w-3xl"}>
          {eyebrow && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
              {eyebrow}
            </p>
          )}
          <h1 className="text-[36px] leading-[1.05] text-white sm:text-[44px] lg:text-[48px]">
            {title}
          </h1>
          {lead && (
            <p
              className={`mt-5 text-[17px] leading-[1.6] text-white/85 sm:text-[19px] ${
                image ? "" : "max-w-2xl"
              }`}
            >
              {lead}
            </p>
          )}
        </div>

        {image && (
          <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[var(--radius-image)] lg:mt-0 lg:aspect-[5/4]">
            <Image
              src={image}
              alt={imageAlt ?? ""}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 560px"
              style={{ objectPosition: imageFocus }}
              className="object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
