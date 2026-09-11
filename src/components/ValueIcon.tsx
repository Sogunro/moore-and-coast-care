/**
 * Icons for the six values on the About page.
 *
 * Drawn to the same spec as the rest of the site's icon work — 22px in a 24
 * viewBox, 1.7 stroke, round caps and joins — so the About page, the trust
 * strip and the How We Work cards read as one set rather than three.
 *
 * Each is specific to its value. The company logo was considered for this slot
 * and rejected: six identical marks would say the same thing six times, make
 * the logo the most repeated element on the page, and add nothing a reader can
 * use. A mark works because it is scarce.
 */
export type ValueIconName =
  | "kindness"
  | "respect"
  | "quality"
  | "reliability"
  | "culture"
  | "extra";

export function ValueIcon({ name }: { name: ValueIconName }) {
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
    // Kindness and compassion: a heart held in an open hand.
    case "kindness":
      return (
        <svg {...common}>
          <path d="M12 8.2a2.7 2.7 0 0 0-4.6 1.9c0 2.3 3 4 4.6 5 1.6-1 4.6-2.7 4.6-5A2.7 2.7 0 0 0 12 8.2Z" />
          <path d="M4.4 13.6v2.2a4.7 4.7 0 0 0 4.7 4.7h5.8a4.7 4.7 0 0 0 4.7-4.7v-2.2" />
        </svg>
      );
    // Respect: a person, upright, with a mark of regard above.
    case "respect":
      return (
        <svg {...common}>
          <circle cx="12" cy="11.4" r="2.9" />
          <path d="M6.4 20.4a5.8 5.8 0 0 1 11.2 0" />
          <path d="m9.6 5.2 1.2 1.6 1.2-1.6M14.4 3.6l.6 1.4" />
        </svg>
      );
    // Highest quality of care: a rosette.
    case "quality":
      return (
        <svg {...common}>
          <circle cx="12" cy="9.4" r="5.4" />
          <path d="m9.6 7.9 1.6 1.6 3.2-3.2" />
          <path d="m8.6 14.2-1.4 6 4.8-2.4 4.8 2.4-1.4-6" />
        </svg>
      );
    // Reliability and punctuality: a clock.
    case "reliability":
      return (
        <svg {...common}>
          <circle cx="12" cy="12.4" r="8.2" />
          <path d="M12 7.8v4.6l3 1.8" />
        </svg>
      );
    // Embracing cultural differences: a globe.
    case "culture":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.4" />
          <path d="M3.6 12h16.8" />
          <path d="M12 3.6c2.1 2.3 3.3 5.3 3.3 8.4s-1.2 6.1-3.3 8.4c-2.1-2.3-3.3-5.3-3.3-8.4S9.9 5.9 12 3.6Z" />
        </svg>
      );
    // That something extra: a spark.
    case "extra":
      return (
        <svg {...common}>
          <path d="M12 3.6 13.9 9l5.5 1.9-5.5 1.9L12 18.3l-1.9-5.5-5.5-1.9L10.1 9 12 3.6Z" />
          <path d="M18.6 16.6l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7.7-1.9Z" />
        </svg>
      );
  }
}
