import Link from "next/link";
import { BlobImage } from "./BlobImage";
import { services } from "@/lib/site";

/**
 * The homepage services section: a sticky text column on the left, the full
 * list of ten services on the right.
 *
 * Deliberately typographic rather than photographic. Ten photo cards would
 * force us to pick four winners and bury six — someone searching for live-in
 * care must find it as fast as personal care. A dense, scannable list does that
 * in a way a grid of images cannot, and it costs no photography.
 */
export function ServicesSplit() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-24 lg:py-[120px]">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-20">
        {/* Left — anchors the section while the list scrolls past it. */}
        <div className="lg:sticky lg:top-[128px] lg:self-start">
          <h2 className="text-[38px] leading-[1.05] sm:text-[44px]">
            Care shaped around
            <br className="hidden sm:block" /> each person
          </h2>
          <p className="mt-5 max-w-[420px] text-[17px] leading-[1.6] text-ink-body">
            From a little help at home to round-the-clock support, we care for
            adults of every age across Whitby and North Yorkshire. Every plan
            starts with a conversation, never a template.
          </p>

          {/* Shown at every width. It was hidden below lg, which left the
              services section as an unbroken wall of text on a phone — the
              screen where that is hardest to read.

              A 16:9 source in a square frame keeps only its middle, so the
              crop is pulled right to hold both people rather than centring on
              the man alone. */}
          <BlobImage
            src="/images/services-cooking.png"
            alt="A man preparing vegetables in his own kitchen, laughing with his support worker beside him"
            focus="85% 50%"
            className="mt-10 w-full max-w-[340px] sm:max-w-[400px]"
          />
        </div>

        {/* Right — all ten, two columns on desktop, one on mobile. */}
        <ul className="grid gap-x-12 sm:grid-cols-2">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services#${service.slug}`}
                className="group flex items-start gap-4 border-b border-line py-5 transition-colors duration-200 ease-[var(--ease-out)] hover:border-brand-100"
              >
                <Leaf />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="text-[17px] font-bold leading-snug text-ink transition-colors duration-200 ease-[var(--ease-out)] group-hover:text-brand">
                      {service.title}
                    </span>
                    <Arrow className="shrink-0 text-brand opacity-0 transition-all duration-200 ease-[var(--ease-out)] group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </span>
                  <span className="mt-1 block text-[15px] leading-[1.5] text-ink-muted">
                    {service.summary}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * Teal marker on every row — the accent doing its one job (small decorative
 * strokes), never a heading colour. Drawn, not an emoji.
 */
function Leaf() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="mt-0.5 shrink-0 text-teal-700"
    >
      <path
        d="M12 21c0-5 2-8 6-10-1 5-2.5 7.5-6 10Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 21C9 16 6 14 3 13c1 4 4 7 9 8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 21v-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
    >
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
