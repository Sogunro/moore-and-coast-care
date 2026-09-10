/**
 * Icons for the "We will help" items.
 *
 * Drawn here rather than pulled from a library: eight shapes do not justify a
 * dependency, and drawing them keeps one spec across the set — 22px in a 24
 * viewBox, 1.7 stroke, round caps and joins. A mixed set reads as clip art.
 *
 * Outline rather than filled, and a single colour, because these sit beside
 * short headings where a two-tone icon would out-shout the words.
 */
export type HelpIconName =
  | "pill"
  | "walk"
  | "basket"
  | "car"
  | "broom"
  | "bath"
  | "people"
  | "calendar";

export function HelpIcon({ name }: { name: HelpIconName }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    // Medication: a capsule, split as a real one is.
    case "pill":
      return (
        <svg {...common}>
          <rect x="2.6" y="8.4" width="18.8" height="7.2" rx="3.6" />
          <path d="M12 8.4v7.2" />
          <path d="M6.4 11.2h1.4" />
        </svg>
      );
    // Staying active: a figure mid-stride.
    case "walk":
      return (
        <svg {...common}>
          <circle cx="13" cy="4.4" r="1.8" />
          <path d="M11.4 21l1.2-5.2-2.4-2.2.9-4.4 3.1 1.4 1.9 2.6" />
          <path d="M10.2 9.2 7.4 11l-.8 3.2" />
          <path d="m14.4 15.8 1.6 5.2" />
        </svg>
      );
    // Food shopping: a basket.
    case "basket":
      return (
        <svg {...common}>
          <path d="M3.2 9.4h17.6l-1.5 9.1a2 2 0 0 1-2 1.7H6.7a2 2 0 0 1-2-1.7L3.2 9.4Z" />
          <path d="m8 9.4 2.4-5.2M16 9.4l-2.4-5.2" />
          <path d="M9.6 13.2v3M14.4 13.2v3" />
        </svg>
      );
    case "car":
      return (
        <svg {...common}>
          <path d="M4 16.4v2a1 1 0 0 1-1 1H2.6" />
          <path d="M20 16.4v2a1 1 0 0 0 1 1h.4" />
          <path d="M3.4 16.4h17.2v-4l-1.8-4.2a1.6 1.6 0 0 0-1.5-1H6.7a1.6 1.6 0 0 0-1.5 1L3.4 12.4v4Z" />
          <path d="M3.6 12.4h16.8" />
          <circle cx="7.4" cy="14.4" r="0.9" />
          <circle cx="16.6" cy="14.4" r="0.9" />
        </svg>
      );
    // Housekeeping: a brush.
    case "broom":
      return (
        <svg {...common}>
          <path d="m14.6 4.4 5 5" />
          <path d="m13 6 5 5-5.6 5.6a2.4 2.4 0 0 1-1.7.7H6.2l-1.6-1.6v-4.5c0-.6.3-1.2.7-1.7L13 6Z" />
          <path d="m8.4 14.2 1.4 1.4M11 11.6l1.4 1.4" />
        </svg>
      );
    // Personal care: a bath.
    case "bath":
      return (
        <svg {...common}>
          <path d="M3 12.6h18v2.2a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-2.2Z" />
          <path d="M6 12.6V6.2a2 2 0 0 1 3.5-1.3" />
          <path d="M8.6 6.6h2.6" />
          <path d="m6.6 19.4-.8 1.4M17.4 19.4l.8 1.4" />
        </svg>
      );
    // Companionship: two people together.
    case "people":
      return (
        <svg {...common}>
          <circle cx="9.2" cy="8.4" r="2.8" />
          <path d="M4 19.4a5.2 5.2 0 0 1 10.4 0" />
          <path d="M16.2 6.6a2.6 2.6 0 0 1 0 4.9" />
          <path d="M17.6 13.8a4.6 4.6 0 0 1 2.8 4.2" />
        </svg>
      );
    // Check-in visits: a scheduled date.
    case "calendar":
      return (
        <svg {...common}>
          <rect x="3.2" y="5.2" width="17.6" height="15.2" rx="2.2" />
          <path d="M3.2 9.6h17.6M8 3.4v3.4M16 3.4v3.4" />
          <path d="m9.4 14.4 1.8 1.8 3.4-3.6" />
        </svg>
      );
  }
}
