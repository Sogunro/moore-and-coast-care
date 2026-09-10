import type { TrustIcon } from "@/lib/site";
import { trustSignals } from "@/lib/site";

/**
 * Reassurance strip — the six signals a family looks for first.
 *
 * Each item has its own icon. A repeated checkmark was clean but made six
 * distinct assurances read as one generic list of claims; a shield, an ID
 * card and a map pin each carry meaning the word alone does not.
 *
 * Motion: the items rise and fade in one after another as the strip scrolls
 * into view, then stop. A permanently scrolling marquee was the alternative
 * and is the wrong choice here — this sits directly beneath the hero on a
 * page people read while anxious, and constant peripheral movement competes
 * with the content rather than supporting it. Motion that plays once earns
 * its place; motion that never stops has to keep earning it.
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
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
              <TrustIconGlyph name={signal.icon} />
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

/**
 * One outline set, drawn to a single spec: 20x20 in a 24 viewBox, 1.8 stroke,
 * round caps and joins. Consistency across the six matters more than any one
 * of them being clever — a mixed set reads as clip art.
 */
function TrustIconGlyph({ name }: { name: TrustIcon }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    // Regulation and safety.
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3.5 5.5 6v5.4c0 4 2.7 7.2 6.5 8.6 3.8-1.4 6.5-4.6 6.5-8.6V6L12 3.5Z" />
          <path d="m9.3 12.2 1.9 1.9 3.6-3.8" />
        </svg>
      );
    // Trained people, not a certificate.
    case "people":
      return (
        <svg {...common}>
          <circle cx="9.5" cy="9" r="2.8" />
          <path d="M4 19.2a5.5 5.5 0 0 1 11 0" />
          <path d="M16.2 7.2a2.6 2.6 0 0 1 0 4.9" />
          <path d="M17.6 14.4a4.8 4.8 0 0 1 2.9 4.4" />
        </svg>
      );
    // Specific to a background check, rather than a generic tick.
    case "id":
      return (
        <svg {...common}>
          <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
          <circle cx="8.8" cy="11" r="1.9" />
          <path d="M5.8 16a3.2 3.2 0 0 1 6 0" />
          <path d="M14.5 10.3h4M14.5 13.6h2.6" />
        </svg>
      );
    // Capsule with a check — immediately recognisable at 18px.
    case "medication":
      return (
        <svg {...common}>
          <path d="M13.4 4.9a3.9 3.9 0 0 1 5.5 5.5l-2.2 2.2" />
          <path d="M10.6 19.1a3.9 3.9 0 0 1-5.5-5.5l4.6-4.6a3.9 3.9 0 0 1 5.5 5.5" />
          <path d="m13.1 17.4 1.6 1.6 3.2-3.3" />
        </svg>
      );
    // Compassion and the individual: a heart held in an open hand.
    case "heart":
      return (
        <svg {...common}>
          <path d="M12 8.4a2.6 2.6 0 0 0-4.4 1.8c0 2.2 2.9 3.9 4.4 4.8 1.5-.9 4.4-2.6 4.4-4.8A2.6 2.6 0 0 0 12 8.4Z" />
          <path d="M4.5 13.5v2.2a4.6 4.6 0 0 0 4.6 4.6h5.8a4.6 4.6 0 0 0 4.6-4.6v-2.2" />
        </svg>
      );
    // Genuinely local.
    case "pin":
      return (
        <svg {...common}>
          <path d="M12 21c3.8-4.2 5.8-7.3 5.8-9.9A5.8 5.8 0 0 0 6.2 11.1C6.2 13.7 8.2 16.8 12 21Z" />
          <circle cx="12" cy="10.9" r="2.3" />
        </svg>
      );
  }
}
