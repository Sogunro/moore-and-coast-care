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
  | "calendar"
  // Added for the service pages, same spec as the eight above.
  | "shirt"
  | "bed"
  | "plate"
  | "shield"
  | "home"
  | "heart"
  | "chat"
  | "hands"
  | "book"
  | "ear"
  | "eye"
  | "wheelchair"
  | "clipboard"
  | "key"
  | "sun"
  | "phone";

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
    // Dressing.
    case "shirt":
      return (
        <svg {...common}>
          <path d="M9 3.6 5 5.4a1.6 1.6 0 0 0-1 1.5v3.3h2.6v9a1.2 1.2 0 0 0 1.2 1.2h8.4a1.2 1.2 0 0 0 1.2-1.2v-9H20V6.9a1.6 1.6 0 0 0-1-1.5l-4-1.8" />
          <path d="M9 3.6a3 3 0 0 0 6 0" />
        </svg>
      );
    // Bed routine, night support.
    case "bed":
      return (
        <svg {...common}>
          <path d="M3 18.6v-11" />
          <path d="M3 12.4h18v6.2" />
          <path d="M3 15.6h18" />
          <path d="M7.4 12.4V9.8a1.6 1.6 0 0 1 1.6-1.6h8.4a3.6 3.6 0 0 1 3.6 3.6v.6" />
          <circle cx="7.6" cy="10.2" r="1.6" />
        </svg>
      );
    // Meals.
    case "plate":
      return (
        <svg {...common}>
          <circle cx="11" cy="12.6" r="7.4" />
          <circle cx="11" cy="12.6" r="3.4" />
          <path d="M19.6 4.2v16.4M22 4.2v4.4a2.4 2.4 0 0 1-2.4 2.4" />
        </svg>
      );
    // Safety, regulation, reassurance.
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3.4 5.4 6v5.5c0 4.1 2.8 7.4 6.6 8.8 3.8-1.4 6.6-4.7 6.6-8.8V6L12 3.4Z" />
          <path d="m9.2 12.2 1.9 1.9 3.7-3.9" />
        </svg>
      );
    // Household, staying at home.
    case "home":
      return (
        <svg {...common}>
          <path d="M3.6 10.4 12 3.8l8.4 6.6" />
          <path d="M5.6 12v7.4a1.2 1.2 0 0 0 1.2 1.2h10.4a1.2 1.2 0 0 0 1.2-1.2V12" />
          <path d="M9.8 20.6v-5.4h4.4v5.4" />
        </svg>
      );
    // Dignity, compassion, wellbeing.
    case "heart":
      return (
        <svg {...common}>
          <path d="M12 20.4C7.4 17.2 3.6 14.4 3.6 10.6a4.4 4.4 0 0 1 8.4-1.8 4.4 4.4 0 0 1 8.4 1.8c0 3.8-3.8 6.6-8.4 9.8Z" />
        </svg>
      );
    // Companionship, conversation.
    case "chat":
      return (
        <svg {...common}>
          <path d="M20.4 14a2.4 2.4 0 0 1-2.4 2.4H9.2L4.6 20v-4.6a2.4 2.4 0 0 1-1-2V6.4A2.4 2.4 0 0 1 6 4h12a2.4 2.4 0 0 1 2.4 2.4V14Z" />
          <path d="M8.4 10.2h7.2M8.4 13h4.4" />
        </svg>
      );
    // Practical help, transfers, being supported.
    case "hands":
      return (
        <svg {...common}>
          <path d="M6.6 11.4V5.8a1.6 1.6 0 0 1 3.2 0v4.6" />
          <path d="M9.8 10.4V4.6a1.6 1.6 0 0 1 3.2 0v5.8" />
          <path d="M13 10.6V6.4a1.6 1.6 0 0 1 3.2 0v6" />
          <path d="M16.2 12.4v-1a1.6 1.6 0 0 1 3.2 0v4a6.2 6.2 0 0 1-6.2 6.2h-1.8a6 6 0 0 1-4.4-2l-3.2-3.6a1.6 1.6 0 0 1 2.3-2.2l2.5 2.2" />
        </svg>
      );
    // Memories, life history, dementia support.
    case "book":
      return (
        <svg {...common}>
          <path d="M3.6 5.4A1.8 1.8 0 0 1 5.4 3.6H10a2.6 2.6 0 0 1 2 1v13a2.6 2.6 0 0 0-2-1H5.4a1.8 1.8 0 0 1-1.8-1.8V5.4Z" />
          <path d="M20.4 5.4a1.8 1.8 0 0 0-1.8-1.8H14a2.6 2.6 0 0 0-2 1v13a2.6 2.6 0 0 1 2-1h4.6a1.8 1.8 0 0 0 1.8-1.8V5.4Z" />
        </svg>
      );
    // Hearing support.
    case "ear":
      return (
        <svg {...common}>
          <path d="M7.4 9a4.6 4.6 0 0 1 9.2 0c0 2.6-2 3.4-3 4.6-.8 1-.6 2-.6 2.8a2.6 2.6 0 0 1-5 1" />
          <path d="M10.6 9a1.4 1.4 0 0 1 2.8 0" />
        </svg>
      );
    // Sight support.
    case "eye":
      return (
        <svg {...common}>
          <path d="M2.4 12.4S6 6.4 12 6.4s9.6 6 9.6 6-3.6 6-9.6 6-9.6-6-9.6-6Z" />
          <circle cx="12" cy="12.4" r="2.8" />
        </svg>
      );
    // Mobility support.
    case "wheelchair":
      return (
        <svg {...common}>
          <circle cx="11" cy="16.4" r="4.4" />
          <circle cx="8.4" cy="4.6" r="1.7" />
          <path d="M8.8 8v5h4.6l3 5.4h3" />
          <path d="M8.8 10.4h3.6" />
        </svg>
      );
    // Care plans, assessment, reviews.
    case "clipboard":
      return (
        <svg {...common}>
          <path d="M9 4.6H7a1.6 1.6 0 0 0-1.6 1.6v13a1.6 1.6 0 0 0 1.6 1.6h10a1.6 1.6 0 0 0 1.6-1.6v-13A1.6 1.6 0 0 0 17 4.6h-2" />
          <rect x="9" y="2.8" width="6" height="3.6" rx="1.2" />
          <path d="m9.6 13.4 1.6 1.6 3.2-3.4" />
        </svg>
      );
    // Independence, own front door, own tenancy.
    case "key":
      return (
        <svg {...common}>
          <circle cx="7.6" cy="15.8" r="3.8" />
          <path d="m10.4 13.2 8.2-8.2M16.4 7.2l2 2M14 9.6l2 2" />
        </svg>
      );
    // Getting out, activity, brighter days.
    case "sun":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2.8v2.4M12 18.8v2.4M4.5 4.5l1.7 1.7M17.8 17.8l1.7 1.7M2.8 12h2.4M18.8 12h2.4M4.5 19.5l1.7-1.7M17.8 6.2l1.7-1.7" />
        </svg>
      );
    // Contact, keeping family informed.
    case "phone":
      return (
        <svg {...common}>
          <path d="M21 16.4v2.6a1.8 1.8 0 0 1-2 1.8 17.8 17.8 0 0 1-7.8-2.8 17.5 17.5 0 0 1-5.4-5.4A17.8 17.8 0 0 1 3 4.8 1.8 1.8 0 0 1 4.8 3h2.6a1.8 1.8 0 0 1 1.8 1.5c.1.9.3 1.7.6 2.5a1.8 1.8 0 0 1-.4 1.9l-1.1 1.1a14 14 0 0 0 5.4 5.4l1.1-1.1a1.8 1.8 0 0 1 1.9-.4c.8.3 1.6.5 2.5.6a1.8 1.8 0 0 1 1.5 1.8Z" />
        </svg>
      );
  }
}
