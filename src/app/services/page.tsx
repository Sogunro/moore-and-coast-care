import type { Metadata } from "next";
import { services, servicesIntro } from "@/lib/site";
import Link from "next/link";
import { Section } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { ClosingCTA } from "@/components/ClosingCTA";

export const metadata: Metadata = {
  title: "Care Services",
  description:
    "Personal care, dementia care, supported living, live-in care and hospital discharge support across Whitby and North Yorkshire — every plan built around the individual.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Care services"
        title="A tailor-made healthcare package built around you"
        lead={servicesIntro}
        /* Cropped right of centre: the group at the table is the subject, and
           a centred crop gives too much of the frame to the corner of the room
           on the left. */
        image="/images/services-hero.png"
        imageAlt="A support worker and clients doing a jigsaw together in a bright lounge"
        imageFocus="62% 50%"
      />

      <ServicesGrid />

      <ClosingCTA
        title="Not sure which service you need?"
        body="Give us a call and we will talk it through — no obligation, just honest advice about the support that would help most."
      />
    </>
  );
}

/**
 * All services as a card grid.
 *
 * Previously each service was a full-width alternating image/text row, which
 * gave ten services the length of ten sections and buried the last of them.
 * A grid lets someone see everything offered without scrolling past nine
 * things to reach the tenth.
 *
 * No photographs here, deliberately. Only four of the ten have commissioned
 * images, and a grid where some cards carry a picture and others do not reads
 * as unfinished: the illustrated ones dominate and the rest look like they are
 * missing something. A uniform typographic card treats all ten equally, and
 * the photography stays where it can be chosen for the page rather than
 * scraped together — the hero above. A short teal rule gives each card a
 * visual anchor in place of an image.
 */
function ServicesGrid() {
  return (
    <Section>
      {/* Two columns from the narrowest screen up.

          One card per row put the grid at 2757px on a small phone and the
          page at over six screens, which is a lot of scrolling to find a
          service by name. Two columns halves that, and ten short names are
          still scannable at this size \u2014 someone looking for "dementia"
          finds it in a glance rather than a scroll.

          The summary is hidden below sm: at two-up on a phone there is not
          room for both a readable name and three lines of description, and
          the name is what someone is scanning for. It returns as soon as
          there is width for it. */}
      <ul className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
        {services.map((service, i) => (
          <li
            key={service.slug}
            id={service.slug}
            className="reveal scroll-mt-28"
            style={{ transitionDelay: `${Math.min(i * 50, 300)}ms` }}
          >
            <Link
              href={`/services/${service.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white p-5 shadow-[var(--shadow-soft)] transition-all duration-200 ease-[var(--ease-out)] hover:border-brand-100 hover:shadow-[var(--shadow-lift)] sm:p-7"
            >
              <span
                aria-hidden
                className="mb-3 block h-1 w-8 rounded-full bg-teal sm:mb-5 sm:w-10"
              />
              <h2 className="text-[16px] leading-snug transition-colors duration-200 ease-[var(--ease-out)] group-hover:text-brand sm:text-[22px]">
                {service.title}
              </h2>
              <p className="mt-2 hidden flex-1 text-[15px] leading-[1.6] text-ink-body sm:mt-3 sm:block">
                {service.summary}
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand sm:mt-5 sm:text-[14px]">
                Read more
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M5 12h14m-6-6 6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-0.5"
                  />
                </svg>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

