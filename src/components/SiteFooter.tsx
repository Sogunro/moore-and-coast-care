import Link from "next/link";
import { business, nav } from "@/lib/site";

export function SiteFooter() {
  const { address } = business;
  return (
    /* No top margin: pages that end with a ClosingCTA overlap this edge, and
     the extra top padding below leaves room for that panel to sit over the
     blue. Pages without one still get generous spacing from the padding. */
    <footer className="bg-brand text-white/80">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 pb-16 pt-32 sm:px-8 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-semibold text-white">
            Moore <span className="text-teal">&amp;</span> Coast Care
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Compassionate home care helping people across Whitby & North
            Yorkshire live safely and independently at home.
          </p>
        </div>

        <div>
          <h2 className="font-body text-sm font-semibold uppercase tracking-widest text-teal">
            Explore
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-body text-sm font-semibold uppercase tracking-widest text-teal">
            Get in touch
          </h2>
          <address className="mt-4 space-y-2.5 text-sm not-italic leading-relaxed">
            <p>
              <a
                href={business.phoneHref}
                className="transition-colors hover:text-white"
              >
                {business.phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${business.email}`}
                className="transition-colors hover:text-white"
              >
                {business.email}
              </a>
            </p>
            <p>
              {address.line1}
              <br />
              {address.line2}, {address.city}
              <br />
              {address.region}, {address.postcode}
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-6 text-xs text-white/60 sm:flex-row sm:px-8">
          <p>
            &copy; {business.legalName}. All rights reserved.
          </p>
          <p>Registered in England. CQC-regulated home care provider.</p>
        </div>
      </div>
    </footer>
  );
}
