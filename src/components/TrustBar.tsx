import { trustSignals } from "@/lib/site";

/**
 * Reassurance strip — the six signals a family looks for first.
 *
 * All six sit on a single line, always. Wrapping them into a 2x3 grid broke
 * the row into stacked pairs and lost the sense of a single continuous list of
 * assurances, so below the width where six fit (about 1150px) the line scrolls
 * instead of wrapping.
 *
 * This is the one place on the site where continuous motion is right: it is
 * not decoration, it is what keeps six items readable on one line when the
 * screen cannot hold them. On a wide desktop there is room for all six, the
 * animation stops and the row sits still.
 *
 * The list is rendered twice, back to back, and the track is translated by
 * exactly half its width. At the moment the first copy scrolls out, the second
 * is in precisely the position the first started from, so the loop has no
 * visible seam. The duplicate is aria-hidden so a screen reader hears the six
 * items once.
 */
export function TrustBar() {
  return (
    <div className="border-y border-line bg-surface py-4 lg:py-5">
      {/* Fades at both edges so items enter and leave rather than being
          chopped off at a hard border. */}
      <div className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[var(--color-surface)] to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[var(--color-surface)] to-transparent"
        />

        {/* The track scrolls at every width, so the duplicate is always
            rendered — it is what makes the loop seamless. */}
        <div className="trust-track flex w-max flex-nowrap items-center">
          <TrustList />
          {/* The second copy. Hidden from assistive tech so a screen reader
              hears the six items once, not twelve. */}
          <div aria-hidden className="flex shrink-0 items-center">
            <TrustList />
          </div>
        </div>
      </div>
    </div>
  );
}

function TrustList() {
  return (
    <ul className="flex shrink-0 items-center">
      {trustSignals.map((signal) => (
        <li
          key={signal.label}
          className="flex shrink-0 items-center gap-2 px-5 lg:px-6"
        >
          {/* Decorative: the label beside it already carries the meaning. */}
          <span className="shrink-0 text-[18px] leading-none" aria-hidden>
            {signal.emoji}
          </span>
          <span className="whitespace-nowrap text-[14px] font-semibold text-ink xl:text-[15px]">
            {signal.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
