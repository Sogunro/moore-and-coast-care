import { business, social } from "@/lib/site";

/**
 * Utility bar above the header: phone, address, social.
 *
 * Both details are the two things a local care enquiry most often wants and
 * would otherwise have to scroll to the footer to find. Keeping them at the
 * very top costs 40px and removes that trip.
 *
 * Hidden below lg. On a phone the address alone would take two lines and push
 * the logo down the screen, and the same details are one tap away in the
 * mobile menu.
 */
export function TopBar() {
  const { address } = business;
  const activeSocial = social.filter((s) => s.href);

  return (
    <div className="hidden bg-brand text-white lg:block">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-5 py-2.5 sm:px-8">
        <div className="flex items-center gap-7 text-[13px] font-medium">
          <a
            href={business.phoneHref}
            className="inline-flex items-center gap-2 transition-colors hover:text-teal"
          >
            <PhoneIcon />
            {business.phone}
          </a>
          <span className="inline-flex items-center gap-2 text-white/85">
            <PinIcon />
            {address.line1}, {address.line2}, {address.city}, {address.postcode}
          </span>
        </div>

        {activeSocial.length > 0 && (
          <div className="flex items-center gap-4">
            {activeSocial.map((item) => (
              <a
                key={item.label}
                href={item.href}
                aria-label={item.label}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/85 transition-colors hover:text-teal"
              >
                {item.icon === "facebook" ? <FacebookIcon /> : <InstagramIcon />}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 16.4v2.6a1.8 1.8 0 0 1-2 1.8 17.8 17.8 0 0 1-7.8-2.8 17.5 17.5 0 0 1-5.4-5.4A17.8 17.8 0 0 1 3 4.8 1.8 1.8 0 0 1 4.8 3h2.6a1.8 1.8 0 0 1 1.8 1.5c.1.9.3 1.7.6 2.5a1.8 1.8 0 0 1-.4 1.9l-1.1 1.1a14 14 0 0 0 5.4 5.4l1.1-1.1a1.8 1.8 0 0 1 1.9-.4c.8.3 1.6.5 2.5.6a1.8 1.8 0 0 1 1.5 1.8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21c3.8-4.2 5.8-7.3 5.8-9.9A5.8 5.8 0 0 0 6.2 11.1C6.2 13.7 8.2 16.8 12 21Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10.9" r="2.2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14 8.5V7a1.2 1.2 0 0 1 1.3-1.3h1.4V3h-2.3c-2.4 0-3.6 1.5-3.6 3.7v1.8H9v2.9h1.8V21h3.2v-9.6h2.3l.4-2.9H14Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="4.5"
        stroke="currentColor"
        strokeWidth="1.9"
      />
      <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.9" />
      <circle cx="16.8" cy="7.2" r="1.1" fill="currentColor" />
    </svg>
  );
}
