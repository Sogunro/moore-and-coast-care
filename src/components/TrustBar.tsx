import { trustSignals } from "@/lib/site";

/** Reassurance strip — the six trust signals families look for first. */
export function TrustBar() {
  return (
    <div className="border-y border-sand bg-sand-200">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-4 px-5 py-6 sm:px-8">
        {trustSignals.map((signal) => (
          <span
            key={signal}
            className="inline-flex items-center gap-2 text-sm font-medium text-navy"
          >
            <CheckIcon />
            {signal}
          </span>
        ))}
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="shrink-0 text-gold"
    >
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.14" />
      <path
        d="M8 12.5l2.5 2.5L16 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
