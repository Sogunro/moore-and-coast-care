import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/lib/site";
import Image from "next/image";
import { Section } from "@/components/Section";
import { HelpIcon, type HelpIconName } from "@/components/HelpIcon";
import { PageHero } from "@/components/PageHero";
import { ClosingCTA } from "@/components/ClosingCTA";

/**
 * One page per care service, generated from the `services` data rather than
 * written ten times over. Adding or editing a service means touching site.ts
 * and nothing else.
 *
 * `generateStaticParams` prerenders all ten at build time, and
 * `dynamicParams = false` makes any other slug a 404 rather than an attempt
 * to render a service that does not exist.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.lead ?? service.summary,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== slug);

  /* The photographs are distributed through the page rather than sat in one
     row: the first under the intro, the second partway down the detail, the
     third as a full-width band before the page turns to other services.
     Three in a line is the least each one can do. */
  const gallery = service.gallery ?? [];

  return (
    <>
      <PageHero
        eyebrow="Care services"
        title={service.title}
        lead={service.lead ?? service.summary}
        image={service.image}
        imageAlt={service.imageAlt}
        scrim={service.heroScrim}
      />

      {/* Intro, with the "is this me?" list beside it. Someone arriving from
          a search needs to recognise their own situation before they read
          anything else; four short lines do that faster than two paragraphs
          of description. */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:gap-16">
          <div className="reveal max-w-[640px]">
            {(service.detail ?? [service.summary]).map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="mb-5 text-[17px] leading-[1.7] text-ink-body last:mb-0"
              >
                {paragraph}
              </p>
            ))}

            {/* The first photograph sits under the intro rather than in a row
                of three: it belongs to the words above it. */}
            {gallery[0] && (
              <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-[var(--radius-image)]">
                <Image
                  src={gallery[0].src}
                  alt={gallery[0].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 640px"
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {(service.forYouIf ?? service.includes) && (
            <div className="reveal rounded-[var(--radius-card)] border border-line bg-surface p-7 lg:sticky lg:top-[128px] lg:self-start">
              <h2 className="text-[20px] leading-snug">
                {service.forYouIf ? "This may be for you if" : "What this usually includes"}
              </h2>
              <ul className="mt-5 space-y-3">
                {(service.forYouIf ?? service.includes ?? []).map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[15px] leading-[1.5] text-ink-body"
                  >
                    <Tick />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[14px] leading-[1.6] text-ink-muted">
                Every care plan is built around the individual, so yours may
                look different. We will talk it through before anything is
                agreed.
              </p>
            </div>
          )}
        </div>
      </Section>

      {service.helpWith && (
        <HelpWith items={service.helpWith} centre={gallery[1]} />
      )}

      {gallery[2] && <FullBleedImage item={gallery[2]} />}

      <OtherServices services={others} />

      <ClosingCTA
        title={`Thinking about ${service.title.toLowerCase()}?`}
        body="Give us a call and we will talk it through — no obligation, and a fully costed package before you decide anything."
      />
    </>
  );
}

/**
 * The detailed breakdown of what a service covers.
 *
 * Two columns of headed paragraphs rather than a tick list: these are the
 * specifics someone weighs up before ringing, and each needs a sentence or
 * two of explanation that a list item cannot carry. The tick list stays for
 * the shorter "is this me?" panel above.
 */
function HelpWith({
  items,
  centre,
}: {
  items: { title: string; icon: string; body: string }[];
  /** The photograph at the centre of the ring. */
  centre?: { src: string; alt: string };
}) {
  /* Split evenly, left column first. With 6 or 7 blocks that gives 3 either
     side, or 4 and 3 — close enough that the ring reads as balanced. */
  const half = Math.ceil(items.length / 2);
  const left = items.slice(0, half);
  const right = items.slice(half);

  return (
    <div className="bg-surface">
      <Section>
        <h2 className="max-w-2xl text-[28px] leading-tight sm:text-[34px]">
          What we can help with
        </h2>

        {/* Three columns on desktop, with the photograph in the middle and the
            blocks ringed around it. Below lg it collapses to a single column
            with the image after the first half, because a circle flanked by
            text needs width to work and a narrow screen has none. */}
        <div className="mt-12 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center lg:gap-x-12 xl:gap-x-16">
          <ul className="space-y-9">
            {left.map((item, i) => (
              <HelpBlock key={item.title} item={item} index={i} align="right" />
            ))}
          </ul>

          {centre && (
            <div className="reveal my-12 flex justify-center lg:my-0">
              <div className="relative">
                {/* A soft teal ring, so the photograph sits in something
                    rather than floating between two columns. */}
                <div
                  aria-hidden
                  className="absolute -inset-3 rounded-full border border-teal/25"
                />
                <div
                  aria-hidden
                  className="absolute -inset-8 rounded-full bg-teal/[0.06] blur-xl"
                />
                <div className="relative h-[240px] w-[240px] overflow-hidden rounded-full shadow-[var(--shadow-lift)] sm:h-[300px] sm:w-[300px] lg:h-[320px] lg:w-[320px] xl:h-[360px] xl:w-[360px]">
                  <Image
                    src={centre.src}
                    alt={centre.alt}
                    fill
                    sizes="(max-width: 1024px) 300px, 360px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          )}

          <ul className="space-y-9">
            {right.map((item, i) => (
              <HelpBlock
                key={item.title}
                item={item}
                index={i + half}
                align="left"
              />
            ))}
          </ul>
        </div>
      </Section>
    </div>
  );
}

/**
 * One block in the ring.
 *
 * The left column is right-aligned and the right column left-aligned, so both
 * read as pointing inward at the photograph between them. Below lg everything
 * goes left-aligned: mirrored text is harder to read and there is no centre to
 * point at.
 */
function HelpBlock({
  item,
  index,
  align,
}: {
  item: { title: string; icon: string; body: string };
  index: number;
  align: "left" | "right";
}) {
  const inward = align === "right" ? "lg:text-right lg:items-end" : "";

  return (
    <li
      className={`reveal flex flex-col items-start ${inward}`}
      style={{ transitionDelay: `${Math.min(index * 60, 320)}ms` }}
    >
      <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-teal-50 text-teal-700">
        <HelpIcon name={item.icon as HelpIconName} />
      </span>
      <h3 className="text-[19px] leading-snug">{item.title}</h3>
      <p className="mt-2 max-w-[42ch] text-[15px] leading-[1.65] text-ink-body">
        {item.body}
      </p>
    </li>
  );
}

/**
 * The third photograph, full width, where the page turns from this service to
 * the others. It gives the eye somewhere to rest before a wall of links.
 */
function FullBleedImage({ item }: { item: { src: string; alt: string } }) {
  return (
    <div className="relative mt-4 h-[280px] w-full overflow-hidden sm:h-[360px] lg:h-[420px]">
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: "50% 40%" }}
      />
    </div>
  );
}

/**
 * The remaining services, so a visitor who has landed on the wrong one can
 * move sideways rather than going back to the index.
 */
function OtherServices({ services: others }: { services: typeof services }) {
  return (
    <div className="bg-surface">
      <Section>
        <h2 className="text-[28px] leading-tight sm:text-[32px]">
          Other ways we can help
        </h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/services/${item.slug}`}
                className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-white p-6 transition-colors duration-200 ease-[var(--ease-out)] hover:border-brand-100"
              >
                <span
                  aria-hidden
                  className="mb-4 block h-1 w-8 rounded-full bg-teal"
                />
                <span className="font-[family-name:var(--font-display)] text-[19px] leading-snug text-ink transition-colors duration-200 ease-[var(--ease-out)] group-hover:text-brand">
                  {item.title}
                </span>
                <span className="mt-2 text-[14px] leading-[1.55] text-ink-muted">
                  {item.summary}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

function Tick() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="mt-0.5 shrink-0 text-teal-700"
    >
      <path
        d="m5 12.5 4.5 4.5L19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
