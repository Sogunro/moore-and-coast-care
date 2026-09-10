import { trustSignals } from "@/lib/site";

/**
 * Reassurance strip — the six signals a family looks for first.
 *
 * Each item carries its own full-colour emoji. A repeated checkmark made six
 * distinct assurances read as one generic list of claims, and the drawn
 * single-colour outline set that replaced it read as blank at this size.
 *
 * Emoji render from the viewer's own platform font, so this strip will look
 * slightly different on Apple, Windows and Android. That is the accepted cost
 * of the pictorial weight they carry.
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
          steps 2 -> 3 -> 6 so every row is always full. */}
      <ul className="mx-auto grid max-w-[1240px] grid-cols-2 items-center gap-x-6 gap-y-5 px-5 py-7 sm:grid-cols-3 sm:px-8 lg:grid-cols-6 lg:gap-x-4 xl:gap-x-6">
        {trustSignals.map((signal, i) => (
          <li
            key={signal.label}
            className="reveal flex items-center justify-center gap-2.5 lg:justify-start"
            // Staggered so the row assembles left to right rather than
            // appearing all at once. Capped so the last item is never left
            // waiting noticeably behind the first.
            style={{ transitionDelay: `${Math.min(i * 70, 420)}ms` }}
          >
            {/* The emoji is decorative: the label beside it already carries
                the meaning, so screen readers should skip it rather than
                announce "shield". */}
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[19px] leading-none shadow-[0_1px_3px_rgba(23,43,58,0.10)]"
              aria-hidden
            >
              {signal.emoji}
            </span>
            <span className="text-[14px] font-semibold leading-tight text-ink xl:text-[15px]">
              {signal.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
