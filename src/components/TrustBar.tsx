import { trustSignals } from "@/lib/site";

/**
 * Reassurance strip — the six signals a family looks for first.
 *
 * Each item carries its own full-colour emoji, sitting directly on the strip
 * with no container behind it. The white circles that were here read as six
 * buttons rather than six reassurances, and put a hard edge around artwork
 * that already has its own silhouette.
 *
 * Emoji render from the viewer's own platform font, so this strip will look
 * slightly different on Apple, Windows and Android — the accepted cost of the
 * pictorial weight they carry over a line-drawn set.
 *
 * Motion: the items rise and fade in one after another as the strip scrolls
 * into view, then stop. A permanently scrolling marquee was the alternative
 * and is the wrong choice directly beneath the hero — constant peripheral
 * movement competes for attention on a page people read while anxious.
 */
export function TrustBar() {
  return (
    <div className="border-y border-line bg-surface">
      {/* A grid rather than a wrapping flex row: flex-wrap broke 5 + 1 at
          common widths, orphaning the last item on its own line. The grid
          steps 2 -> 3 -> 6 so every row is always full.

          Vertical padding is deliberately tight. This strip is a glance, not
          a section: it should register on the way past the hero without
          costing the page much height. */}
      <ul className="mx-auto grid max-w-[1240px] grid-cols-2 items-center gap-x-5 gap-y-4 px-5 py-4 sm:grid-cols-3 sm:px-8 lg:grid-cols-6 lg:gap-x-3 lg:py-5 xl:gap-x-5">
        {trustSignals.map((signal, i) => (
          <li
            key={signal.label}
            className="reveal flex items-center justify-center gap-2 lg:justify-start"
            // Staggered so the row assembles left to right rather than
            // appearing all at once. Capped so the last item is never left
            // waiting noticeably behind the first.
            style={{ transitionDelay: `${Math.min(i * 70, 420)}ms` }}
          >
            {/* Decorative: the label beside it already carries the meaning, so
                a screen reader announcing "shield" would only add noise. */}
            <span className="shrink-0 text-[18px] leading-none" aria-hidden>
              {signal.emoji}
            </span>
            {/* 13px at the six-across breakpoint, where each column has only
                ~150px for a label as long as "Fully Trained Carers". It steps
                back up once there is room. */}
            <span className="text-[13.5px] font-semibold leading-[1.35] text-ink lg:text-[13px] xl:text-[14px]">
              {signal.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
