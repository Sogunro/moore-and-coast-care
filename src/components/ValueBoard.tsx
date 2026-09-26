import { Fragment } from "react";
import Image from "next/image";
import { values } from "@/lib/site";
import { ValueIcon, type ValueIconName } from "./ValueIcon";

/**
 * The six values as notes pinned to a board.
 *
 * A jigsaw was tried first and abandoned: it needed pieces of equal size,
 * which fought copy of uneven length, and even cut correctly it read as a
 * diagram rather than something human. A pinboard has no such constraint —
 * notes can be any length, sit at any angle, and the pin does the work of
 * saying "someone put this here".
 *
 * The board itself is a soft tinted surface with a fine grain, not a photo
 * texture of cork, which would pull the page toward novelty. The pins are
 * drawn: a head, a highlight and a small shadow beneath, enough to read as
 * three-dimensional without becoming a graphic in its own right.
 *
 * A photograph is pinned among the notes rather than centred, so the board
 * reads as something assembled over time rather than laid out.
 */

/* Deliberately uneven, and never beyond 2deg: past that the baseline reads as
   a mistake rather than as a hand placing something. */
const TILTS = [-1.6, 1.1, -0.7, 1.5, -1.2, 0.8];

/* Alternating note colours, both pale enough to keep ink well above 4.5:1. */
const NOTES = [
  "#fdf6e3",
  "#eef6fb",
  "#fdf6e3",
  "#eef6fb",
  "#fdf6e3",
  "#eef6fb",
];

function Pin() {
  return (
    <span
      aria-hidden
      className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
    >
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        {/* Shadow cast on the note below. */}
        <ellipse cx="13" cy="19" rx="5" ry="2" fill="#172b3a" opacity="0.16" />
        {/* The needle, just visible under the head. */}
        <path
          d="M13 12v6"
          stroke="#9aa6b2"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        {/* Head, with a highlight so it reads as domed rather than flat. */}
        <circle cx="13" cy="9" r="6.5" fill="var(--color-brand)" />
        <circle cx="13" cy="9" r="6.5" fill="url(#pin-shade)" />
        <ellipse cx="10.8" cy="6.6" rx="2.1" ry="1.5" fill="#fff" opacity="0.55" />
        <defs>
          <radialGradient id="pin-shade" cx="0.35" cy="0.3" r="0.8">
            <stop offset="0" stopColor="#fff" stopOpacity="0.28" />
            <stop offset="1" stopColor="#0b1a2a" stopOpacity="0.32" />
          </radialGradient>
        </defs>
      </svg>
    </span>
  );
}

export function ValueBoard({
  photo,
}: {
  photo?: { src: string; alt: string };
}) {
  return (
    <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-[#f6f2ea] px-5 py-12 sm:px-10 sm:py-16">
      {/* A fine grain across the board, so it is a surface rather than a
          flat panel. Kept very low contrast — it should be felt, not seen. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "radial-gradient(#c9bda6 0.5px, transparent 0.5px), radial-gradient(#c9bda6 0.5px, transparent 0.5px)",
          backgroundSize: "14px 14px",
          backgroundPosition: "0 0, 7px 7px",
        }}
      />
      {/* A soft inner shadow so the board has an edge and a little depth. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[var(--radius-card)]"
        style={{ boxShadow: "inset 0 0 40px rgba(23,43,58,0.07)" }}
      />

      <ul className="relative mx-auto grid max-w-[1120px] gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {values.map((value, i) => (
          <Fragment key={value.title}>
            {/* The photograph is pinned among the notes rather than after
                them, so the board reads as something assembled over time.
                It takes a grid slot of its own at the three-column
                breakpoint, where six notes plus one print make a tidy
                block; below that it would strand a row, so it is hidden. */}
            {photo && i === 3 && (
              <li className="reveal hidden lg:block" style={{ transitionDelay: "260ms" }}>
                <div className="relative pt-3">
                  <div
                    className="note-tilt bg-white p-3 pb-9 shadow-[0_6px_18px_rgba(23,43,58,0.12),0_1px_2px_rgba(23,43,58,0.08)]"
                    style={{ "--tilt": "1.3deg" } as React.CSSProperties}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="360px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <Pin />
                </div>
              </li>
            )}
          <li
            className="reveal"
            style={{ transitionDelay: `${Math.min(i * 70, 360)}ms` }}
          >
            {/* The pin sits on the wrapper and the tilt on the note, so the
                pin stays upright while the note hangs at an angle from it —
                which is how a pinned note actually behaves. */}
            <div className="relative pt-3">
              <div
                className="note-tilt rounded-[3px] px-6 pb-6 pt-8 shadow-[0_6px_18px_rgba(23,43,58,0.10),0_1px_2px_rgba(23,43,58,0.08)]"
                style={
                  {
                    background: NOTES[i],
                    "--tilt": `${TILTS[i]}deg`,
                  } as React.CSSProperties
                }
              >
                <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-brand">
                  <ValueIcon name={value.icon as ValueIconName} />
                </span>
                <h3 className="text-[20px] leading-snug">{value.title}</h3>
                <p className="mt-2.5 text-[15px] leading-[1.6] text-ink-body">
                  {value.body}
                </p>
              </div>
              <Pin />
            </div>
          </li>
          </Fragment>
        ))}

      </ul>
    </div>
  );
}
