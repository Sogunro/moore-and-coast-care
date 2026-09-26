import Image from "next/image";
import { values } from "@/lib/site";
import { ValueIcon, type ValueIconName } from "./ValueIcon";

/**
 * The six values as jigsaw pieces interlocking around a photograph.
 *
 * Six values that fit together around one centre is what a jigsaw says without
 * needing a caption, so the metaphor is doing work rather than decorating.
 *
 * Only the edges that actually meet a neighbour carry a tab or a socket; the
 * outer edges of the block stay straight, as a real edge piece does. Each tab
 * on one card is matched by a socket on the card it touches, so the two read
 * as a pair rather than as the same shape repeated.
 *
 * Layout is a 3x3 grid with the image occupying the centre cell. Grid rows are
 * equal height by default, which is what makes the tabs line up: neighbours in
 * a row are always the same height whatever their text length.
 *
 * Below lg there is no ring to interlock with, so the pieces fall back to
 * plain cards. A jigsaw needs neighbours on more than one side.
 */

/* Tab size as a percentage of the card, and how far along the edge it sits. */
const TAB = 7;
const MID = 50;

/* A clip-path cannot paint outside its own element, so a protruding tab needs
   room to protrude into. Each piece is given this much overflow on every side
   and the shape is drawn inset within it; negative margins pull the pieces
   back together so the visible edges still meet. */
const PAD = 9;

type Edges = { top?: Dir; right?: Dir; bottom?: Dir; left?: Dir };
type Dir = "out" | "in";

/*
 * Six pieces ringing a 3x3 grid, clockwise from the top left:
 *
 *   0   1   2
 *   -  img  3
 *   -   5   4
 *
 * Every shared edge is one "out" and one "in", so each tab has a socket to
 * sit in. Edges with no neighbour are left straight, as a real edge piece is.
 */
const EDGES: Edges[] = [
  // 0 top-left: meets 1 right, 3 below.
  { right: "out", bottom: "out" },
  // 1 top-centre: meets 0 left, 2 right, the image below.
  { left: "in", right: "out", bottom: "out" },
  // 2 top-right: meets 1 left, 4 below.
  { left: "in", bottom: "out" },
  // 3 middle-left: meets 0 above, the image to its right.
  { top: "in", right: "out" },
  // 4 middle-right: meets 2 above, the image to its left.
  { top: "in", left: "out" },
  // 5 bottom-centre: meets the image above.
  { top: "in" },
];

/*
 * Six pieces cannot fill the eight cells around a 3x3 centre, so the two gaps
 * are placed at the left of the middle and bottom rows — the block then reads
 * as a deliberate stepped shape rather than as a ring with a hole knocked in
 * one corner.
 */
const PLACEMENT = [
  "col-start-1 row-start-1",
  "col-start-2 row-start-1",
  "col-start-3 row-start-1",
  "col-start-1 row-start-2",
  "col-start-3 row-start-2",
  "col-start-2 row-start-3",
];

/* Alternating tints keep the group from reading as one flat block. */
const TINTS = ["#eef4fc", "#e6f6f1", "#eef4fc", "#e6f6f1", "#eef4fc", "#e6f6f1"];

/**
 * Builds a jigsaw outline as an SVG path in a 0-100 box.
 *
 * Each side runs from one corner to the next, interrupted at its midpoint by a
 * semicircular tab pushing outward ("out") or a socket cut inward ("in"). A
 * side with neither runs straight, which is what gives the block its clean
 * outer edge.
 */
function piecePath(edges: Edges) {
  const t = TAB;
  const m = MID;
  /* The shape is inset by PAD on every side of a 100-unit box, leaving that
     margin free for tabs to reach into. */
  const a = PAD;
  const z = 100 - PAD;
  const span = z - a;
  const at = (frac: number) => a + span * (frac / 100);

  const d: string[] = [`M ${a} ${a}`];

  // Top edge, left to right.
  if (edges.top) {
    const out = edges.top === "out" ? -1 : 1;
    d.push(`L ${at(m - t)} ${a}`);
    d.push(
      `C ${at(m - t)} ${a + out * t * 1.6} ${at(m + t)} ${a + out * t * 1.6} ${at(m + t)} ${a}`
    );
  }
  d.push(`L ${z} ${a}`);

  // Right edge, top to bottom.
  if (edges.right) {
    const out = edges.right === "out" ? 1 : -1;
    d.push(`L ${z} ${at(m - t)}`);
    d.push(
      `C ${z + out * t * 1.6} ${at(m - t)} ${z + out * t * 1.6} ${at(m + t)} ${z} ${at(m + t)}`
    );
  }
  d.push(`L ${z} ${z}`);

  // Bottom edge, right to left.
  if (edges.bottom) {
    const out = edges.bottom === "out" ? 1 : -1;
    d.push(`L ${at(m + t)} ${z}`);
    d.push(
      `C ${at(m + t)} ${z + out * t * 1.6} ${at(m - t)} ${z + out * t * 1.6} ${at(m - t)} ${z}`
    );
  }
  d.push(`L ${a} ${z}`);

  // Left edge, bottom to top.
  if (edges.left) {
    const out = edges.left === "out" ? -1 : 1;
    d.push(`L ${a} ${at(m + t)}`);
    d.push(
      `C ${a + out * t * 1.6} ${at(m + t)} ${a + out * t * 1.6} ${at(m - t)} ${a} ${at(m - t)}`
    );
  }
  d.push(`Z`);

  return d.join(" ");
}

export function ValuePuzzle({
  centre,
}: {
  centre?: { src: string; alt: string };
}) {
  return (
    <>
      {/* Desktop: the ring. */}
      <div className="hidden lg:block">
        <svg width="0" height="0" aria-hidden className="absolute">
          <defs>
            {EDGES.map((edges, i) => (
              <clipPath
                key={i}
                id={`puzzle-${i}`}
                clipPathUnits="objectBoundingBox"
              >
                <path
                  d={piecePath(edges)}
                  transform="scale(0.01 0.01)"
                />
              </clipPath>
            ))}
          </defs>
        </svg>

        <div className="mx-auto grid max-w-[1120px] grid-cols-3 grid-rows-3 gap-0">
          {values.slice(0, 6).map((value, i) => (
            <div
              key={value.title}
              className={`reveal ${PLACEMENT[i]}`}
              style={{ transitionDelay: `${Math.min(i * 80, 400)}ms` }}
            >
              <div
                className="flex h-full flex-col justify-center px-12 py-12"
                style={{
                  background: TINTS[i],
                  clipPath: `url(#puzzle-${i})`,
                }}
              >
                <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-brand">
                  <ValueIcon name={value.icon as ValueIconName} />
                </span>
                <h3 className="text-[19px] leading-snug">{value.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.55] text-ink-body">
                  {value.body}
                </p>
              </div>
            </div>
          ))}

          {/* The photograph in the middle cell, the thing all six fit around.
              Round, not square: a square photograph in a square hole reads as
              a seventh piece, while a circle reads as the thing the pieces
              gather around. */}
          {centre && (
            <div className="col-start-2 row-start-2 flex items-center justify-center p-4">
              <div className="relative aspect-square w-full max-w-[280px] overflow-hidden rounded-full shadow-[var(--shadow-lift)] ring-8 ring-white">
                <Image
                  src={centre.src}
                  alt={centre.alt}
                  fill
                  sizes="340px"
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Below lg: plain cards. A jigsaw needs neighbours on more than one
          side, and a single column has none. */}
      <ul className="grid gap-5 sm:grid-cols-2 lg:hidden">
        {values.map((value, i) => (
          <li
            key={value.title}
            className="reveal rounded-[var(--radius-card)] p-7"
            style={{
              background: TINTS[i % TINTS.length],
              transitionDelay: `${Math.min(i * 60, 300)}ms`,
            }}
          >
            <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/70 text-brand">
              <ValueIcon name={value.icon as ValueIconName} />
            </span>
            <h3 className="text-[21px] leading-snug">{value.title}</h3>
            <p className="mt-3 text-[15px] leading-[1.6] text-ink-body">
              {value.body}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
