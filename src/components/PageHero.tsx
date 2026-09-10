import Image from "next/image";

/**
 * Hero for interior pages.
 *
 * With an image, it is full-bleed on the same pattern as the homepage: the
 * photograph fills the whole band and the heading sits on top of it, rather
 * than the image being boxed into half the width. Without one, the plain
 * brand-blue band is unchanged, so pages with no photography yet still work.
 *
 * It is deliberately shorter than the homepage hero — around 60vh against a
 * full screen — so interior pages stay subordinate to it and the content
 * below starts sooner.
 *
 * The scrim follows the homepage logic: vertical on small screens, where the
 * text spans the full width and a horizontal ramp could not clear it, and
 * horizontal from lg so subjects on the right stay lit.
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
  if (!image) {
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
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 sm:py-20">
          <div className="max-w-3xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <Title>{title}</Title>
            <Lead className="max-w-2xl">{lead}</Lead>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative isolate min-h-[420px] w-full sm:min-h-[460px] lg:min-h-[60vh]">
      <div className="absolute inset-0 -z-10 overflow-hidden bg-surface">
        <Image
          src={image}
          alt={imageAlt ?? ""}
          fill
          priority
          sizes="100vw"
          style={{ objectPosition: imageFocus }}
          className="object-cover"
        />

        {/* Vertical on small screens, where the text spans the full width;
            horizontal from lg, so subjects on the right stay lit. */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#172b3a]/85 via-[#172b3a]/60 to-[#172b3a]/40 lg:bg-gradient-to-r lg:from-[#172b3a]/80 lg:via-[#172b3a]/30 lg:via-40% lg:to-[#172b3a]/10"
          aria-hidden
        />
        <div className="absolute inset-0 bg-[#172b3a]/12" aria-hidden />
      </div>

      <div className="mx-auto flex min-h-[420px] max-w-[1240px] flex-col justify-center px-5 py-14 sm:min-h-[460px] sm:px-8 lg:min-h-[60vh] lg:py-20">
        <div className="max-w-[620px]">
          <Eyebrow>{eyebrow}</Eyebrow>
          <Title>{title}</Title>
          <Lead className="max-w-[520px]">{lead}</Lead>
        </div>
      </div>
    </section>
  );
}

function Eyebrow({ children }: { children?: string }) {
  if (!children) return null;
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
      {children}
    </p>
  );
}

function Title({ children }: { children: string }) {
  return (
    <h1 className="text-[36px] leading-[1.05] text-white sm:text-[44px] lg:text-[52px]">
      {children}
    </h1>
  );
}

function Lead({
  children,
  className = "",
}: {
  children?: string;
  className?: string;
}) {
  if (!children) return null;
  return (
    <p
      className={`mt-5 text-[17px] leading-[1.6] text-white/90 sm:text-[19px] ${className}`}
    >
      {children}
    </p>
  );
}
