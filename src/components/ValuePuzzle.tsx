import { values } from "@/lib/site";
import { ValueIcon, type ValueIconName } from "./ValueIcon";

/**
 * The six values as jigsaw pieces cut from one board.
 *
 * The important part is how the pieces are built. An earlier attempt drew each
 * piece as its own clipped HTML element, which cannot truly interlock: every
 * piece is clipped inside its own box, so a tab either gets cut off at the
 * boundary or overhangs into empty space. It always looked nearly right and
 * never actually fitted.
 *
 * This version cuts all six from a single SVG. Each internal seam is defined
 * once as a curve, and the two pieces either side of it use that same curve —
 * one forwards, one reversed. Two pieces sharing a seam are therefore
 * guaranteed to mate exactly, because they are literally the same path.
 *
 * Text sits in foreignObject so the copy stays real text: selectable,
 * searchable, and readable by a screen reader.
 */

/* The board is a 3x3 grid of 100-unit cells. */
const CELL_W = 340;
const CELL_H = 250;
const COLS = 3;
const ROWS = 3;

/* Tab radius and how far it bulges, in board units. */
const R = 40;
const BULGE = 46;

/* Which cells hold a value, clockwise from the top left. The centre holds the
   photograph, and two cells are deliberately empty so the block reads as a
   stepped shape rather than a ring with a corner missing. */
const CELLS: [number, number][] = [
  [0, 0],
  [1, 0],
  [2, 0],
  [0, 1],
  [2, 1],
  [1, 2],
];

/**
 * A seam between two cells, as a path fragment.
 *
 * `dir` is +1 for a tab bulging toward increasing x or y, -1 for the other
 * way. The same call with the same arguments always returns the same curve,
 * which is what makes the pieces fit: the neighbour reverses it rather than
 * drawing its own.
 */
function seam(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  dir: number
): string {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const vertical = x1 === x2;

  if (vertical) {
    const a = my - R;
    const b = my + R;
    const out = x1 + dir * BULGE;
    return [
      `L ${x1} ${a}`,
      `C ${out} ${a} ${out} ${b} ${x1} ${b}`,
      `L ${x2} ${y2}`,
    ].join(" ");
  }

  const a = mx - R;
  const b = mx + R;
  const out = y1 + dir * BULGE;
  return [
    `L ${a} ${y1}`,
    `C ${a} ${out} ${b} ${out} ${b} ${y1}`,
    `L ${x2} ${y2}`,
  ].join(" ");
}

/** The same seam traversed the other way, for the piece on the far side. */
function seamReverse(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  dir: number
): string {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const vertical = x1 === x2;

  if (vertical) {
    const a = my + R;
    const b = my - R;
    const out = x1 + dir * BULGE;
    return [
      `L ${x1} ${a}`,
      `C ${out} ${a} ${out} ${b} ${x1} ${b}`,
      `L ${x2} ${y2}`,
    ].join(" ");
  }

  const a = mx + R;
  const b = mx - R;
  const out = y1 + dir * BULGE;
  return [
    `L ${a} ${y1}`,
    `C ${a} ${out} ${b} ${out} ${b} ${y1}`,
    `L ${x2} ${y2}`,
  ].join(" ");
}

/**
 * Whether the seam between two neighbouring cells bulges one way or the other.
 *
 * Fixed per seam rather than random, so the same seam always resolves the same
 * way whichever piece asks about it.
 */
function seamDir(col: number, row: number, side: "right" | "bottom"): number {
  return (col + row + (side === "right" ? 0 : 1)) % 2 === 0 ? 1 : -1;
}

/** Does this cell have a neighbour on the given side? */
function filled(col: number, row: number): boolean {
  if (col < 0 || row < 0 || col >= COLS || row >= ROWS) return false;
  /* The centre counts as filled: pieces interlock with the photograph too. */
  if (col === 1 && row === 1) return true;
  return CELLS.some(([c, r]) => c === col && r === row);
}

/** The outline of one piece, walking its four sides clockwise from top left. */
function piece(col: number, row: number): string {
  const x0 = col * CELL_W;
  const y0 = row * CELL_H;
  const x1 = x0 + CELL_W;
  const y1 = y0 + CELL_H;

  const d: string[] = [`M ${x0} ${y0}`];

  // Top: shared with the cell above.
  if (filled(col, row - 1)) {
    d.push(seam(x0, y0, x1, y0, seamDir(col, row - 1, "bottom")));
  } else {
    d.push(`L ${x1} ${y0}`);
  }

  // Right: shared with the cell to the right.
  if (filled(col + 1, row)) {
    d.push(seam(x1, y0, x1, y1, seamDir(col, row, "right")));
  } else {
    d.push(`L ${x1} ${y1}`);
  }

  // Bottom: shared with the cell below, walked right to left.
  if (filled(col, row + 1)) {
    d.push(seamReverse(x1, y1, x0, y1, seamDir(col, row, "bottom")));
  } else {
    d.push(`L ${x0} ${y1}`);
  }

  // Left: shared with the cell to the left, walked bottom to top.
  if (filled(col - 1, row)) {
    d.push(seamReverse(x0, y1, x0, y0, seamDir(col - 1, row, "right")));
  } else {
    d.push(`L ${x0} ${y0}`);
  }

  d.push("Z");
  return d.join(" ");
}

const TINTS = ["#eaf1fb", "#e2f4ee", "#eaf1fb", "#e2f4ee", "#eaf1fb", "#e2f4ee"];

export function ValuePuzzle({
  centre,
}: {
  centre?: { src: string; alt: string };
}) {
  /* The board extends past the grid so tabs on the outer seams are not
     clipped by the viewBox. */
  const pad = BULGE + 2;
  const viewBox = `${-pad} ${-pad} ${COLS * CELL_W + pad * 2} ${ROWS * CELL_H + pad * 2}`;

  return (
    <>
      <div className="hidden lg:block">
        <svg
          viewBox={viewBox}
          className="mx-auto w-full max-w-[1080px]"
          role="presentation"
        >
          <defs>
            {centre && (
              <clipPath id="value-centre-clip">
                <circle cx={510} cy={375} r={150} />
              </clipPath>
            )}
          </defs>

          {CELLS.map(([col, row], i) => {
            const value = values[i];
            const x = col * CELL_W;
            const y = row * CELL_H;

            return (
              <g key={value.title} className="reveal">
                <path
                  d={piece(col, row)}
                  fill={TINTS[i]}
                  stroke="var(--color-brand)"
                  strokeOpacity="0.35"
                  strokeWidth="2"
                />

                {/* Text as real text, inset from the piece edges so it never
                    runs into a tab. */}
                {/* Inset well clear of the seams, so text never runs into a
                    tab or socket on any side. */}
                <foreignObject
                  x={x + 54}
                  y={y + 40}
                  width={CELL_W - 108}
                  height={CELL_H - 84}
                >
                  <div className="flex h-full flex-col justify-center">
                    <span className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-brand">
                      <ValueIcon name={value.icon as ValueIconName} />
                    </span>
                    <h3 className="font-[family-name:var(--font-display)] text-[17px] leading-tight text-ink">
                      {value.title}
                    </h3>
                    <p className="mt-1.5 text-[12.5px] leading-[1.45] text-ink-body">
                      {value.body}
                    </p>
                  </div>
                </foreignObject>
              </g>
            );
          })}

          {/* The photograph sits in the centre cell, clipped to a circle that
              overlaps the seams around it. */}
          {centre && (
            <g className="reveal">
              <circle cx={510} cy={375} r={160} fill="white" />
              <image
                href={centre.src}
                x={360}
                y={225}
                width={300}
                height={300}
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#value-centre-clip)"
              />
              <circle
                cx={510}
                cy={375}
                r={150}
                fill="none"
                stroke="var(--color-brand)"
                strokeOpacity="0.25"
                strokeWidth="2"
              />
            </g>
          )}
        </svg>

        {/* The photograph is decorative inside the SVG, so its description
            lives here for anyone using a screen reader. */}
        {centre && <span className="sr-only">{centre.alt}</span>}
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
