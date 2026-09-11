import { values } from "@/lib/site";
import { ValueIcon, type ValueIconName } from "./ValueIcon";

/**
 * The six values, as softly tinted cards set at slight angles.
 *
 * The angles are the point: a grid of perfectly aligned rectangles reads as a
 * corporate values slide, while a small, uneven tilt reads as something placed
 * by hand. It is the sticky-note idea without the costume — no paper texture,
 * no curled corners, no tape, all of which would pull a premium editorial page
 * toward craft-fair.
 *
 * Each card straightens on hover, which gives the tilt a reason to exist
 * beyond decoration.
 */

/* Deliberately uneven, and never more than 1.4deg. Beyond about 2deg the text
   baseline reads as a mistake rather than as a choice. */
const TILTS = [-1.4, 0.9, -0.6, 1.2, -1.1, 0.7];

/* Alternating tints keep the group from reading as one flat block. Both are
   pale enough that the ink on them stays well above 4.5:1. */
const TINTS = [
  "bg-brand-50",
  "bg-teal-50",
  "bg-brand-50",
  "bg-teal-50",
  "bg-brand-50",
  "bg-teal-50",
];

export function ValueCards() {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {values.map((value, i) => (
        /* reveal and tilt live on separate elements: .reveal animates
           transform and ends at `transform: none`, which would wipe the
           rotation off a single combined element. */
        <li
          key={value.title}
          className="reveal"
          style={{ transitionDelay: `${Math.min(i * 60, 300)}ms` }}
        >
          <div
            /* Inline transform; hover straightening and reduced-motion live
               in .tilt-card, since a utility class cannot override an inline
               style. */
            className={`tilt-card h-full rounded-[var(--radius-card)] p-7 shadow-[var(--shadow-soft)] ${TINTS[i]}`}
            style={{ transform: `rotate(${TILTS[i]}deg)` }}
          >
            <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/70 text-brand">
              <ValueIcon name={value.icon as ValueIconName} />
            </span>
            <h3 className="text-[21px] leading-snug">{value.title}</h3>
            <p className="mt-3 text-[15px] leading-[1.6] text-ink-body">
              {value.body}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
