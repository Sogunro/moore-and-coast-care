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
        imageFocus={service.heroFocus}
      />

      {/* Intro, with the "is this me?" list beside it. Someone arriving from
          a search needs to recognise their own situation before they read
          anything else; four short lines do that faster than two paragraphs
          of description. */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:gap-16">
          <div className="reveal max-w-[640px]">
            {/* The service named again above its own write-up, in the brand
                teal. Set as a heading rather than a small-caps eyebrow: by
                the time someone reaches this text the hero title is a long
                way up the page, and this has to stand in for it. */}
            <p className="mb-5 font-[family-name:var(--font-display)] text-[30px] leading-tight text-teal-700 sm:text-[36px]">
              {service.title}
            </p>
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
  /** The photograph at the hub. */
  centre?: { src: string; alt: string };
}) {
  return (
    <div className="bg-surface">
      <Section>
        <h2 className="mx-auto max-w-2xl text-center text-[28px] leading-tight sm:text-[34px]">
          What we can help with
        </h2>

        {centre ? (
          <>
            <div className="hidden lg:block">
              <HelpRadial items={items} centre={centre} />
            </div>
            {/* Below lg the ring cannot hold: the items stack, with the
                photograph at the head of the list rather than lost inside
                it. */}
            <div className="lg:hidden">
              <HelpStack items={items} centre={centre} />
            </div>
          </>
        ) : (
          <HelpStack items={items} />
        )}
      </Section>
    </div>
  );
}

/**
 * The hub and its spokes.
 *
 * Items are placed at even angles around the photograph — the first at twelve
 * o'clock, the rest clockwise — so they sit above, beside and below it rather
 * than stacking in two columns. A thin line runs from the hub to each one, so
 * the arrangement reads as connected rather than merely scattered.
 *
 * Absolute positioning inside a square: every item is placed by the cosine and
 * sine of its angle, and the whole thing is sized in vw so the ring scales
 * with the viewport instead of colliding at narrower widths.
 */
function HelpRadial({
  items,
  centre,
}: {
  items: { title: string; icon: string; body: string }[];
  centre: { src: string; alt: string };
}) {
  const n = items.length;
  /* Fraction of the square's half-width at which labels sit. */
  const ORBIT = 0.84;

  return (
    <div className="relative mx-auto mt-10 aspect-square w-full max-w-[980px]">
      {/* The spokes, drawn under everything else. */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        {items.map((item, i) => {
          const a = (-90 + (360 / n) * i) * (Math.PI / 180);
          /* From the edge of the circle to just short of the label. */
          const from = 19;
          const to = ORBIT * 50 - 9;
          return (
            <line
              key={item.title}
              x1={50 + Math.cos(a) * from}
              y1={50 + Math.sin(a) * from}
              x2={50 + Math.cos(a) * to}
              y2={50 + Math.sin(a) * to}
              stroke="var(--color-teal)"
              strokeWidth="0.18"
              strokeOpacity="0.45"
              strokeDasharray="1.2 1.2"
            />
          );
        })}
      </svg>

      {/* The hub. */}
      <div className="absolute left-1/2 top-1/2 h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2">
        <div
          aria-hidden
          className="absolute -inset-4 rounded-full border border-teal/30"
        />
        <div
          aria-hidden
          className="absolute -inset-10 rounded-full bg-teal/[0.07] blur-2xl"
        />
        <div className="relative h-full w-full overflow-hidden rounded-full shadow-[var(--shadow-lift)]">
          <Image
            src={centre.src}
            alt={centre.alt}
            fill
            sizes="400px"
            className="object-cover"
          />
        </div>
      </div>

      {/* The spokes' labels. */}
      {items.map((item, i) => {
        const a = (-90 + (360 / n) * i) * (Math.PI / 180);
        const x = 50 + Math.cos(a) * ORBIT * 50;
        const y = 50 + Math.sin(a) * ORBIT * 50;

        return (
          <div
            key={item.title}
            className="reveal absolute w-[24%] -translate-x-1/2 -translate-y-1/2 text-center"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transitionDelay: `${Math.min(i * 70, 420)}ms`,
            }}
          >
            <span className="mx-auto mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-teal-700 shadow-[var(--shadow-soft)] ring-1 ring-teal/20">
              <HelpIcon name={item.icon as HelpIconName} />
            </span>
            <h3 className="text-[17px] leading-snug">{item.title}</h3>
            <p className="mt-1.5 text-[13.5px] leading-[1.5] text-ink-body">
              {item.body}
            </p>
          </div>
        );
      })}
    </div>
  );
}

/** The same content as a plain list, for narrow screens and for services with
    no second photograph. */
function HelpStack({
  items,
  centre,
}: {
  items: { title: string; icon: string; body: string }[];
  centre?: { src: string; alt: string };
}) {
  return (
    <>
      {centre && (
        <div className="reveal mx-auto mt-10 flex justify-center">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-3 rounded-full border border-teal/25"
            />
            <div className="relative h-[260px] w-[260px] overflow-hidden rounded-full shadow-[var(--shadow-lift)] sm:h-[320px] sm:w-[320px]">
              <Image
                src={centre.src}
                alt={centre.alt}
                fill
                sizes="320px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      )}

      <ul className="mt-12 grid gap-x-12 gap-y-9 sm:grid-cols-2">
        {items.map((item, i) => (
          <li
            key={item.title}
            className="reveal"
            style={{ transitionDelay: `${Math.min(i * 60, 320)}ms` }}
          >
            <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-teal-50 text-teal-700">
              <HelpIcon name={item.icon as HelpIconName} />
            </span>
            <h3 className="text-[19px] leading-snug">{item.title}</h3>
            <p className="mt-2.5 text-[15px] leading-[1.65] text-ink-body">
              {item.body}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

/**
 * The third photograph, full width, where the page turns from this service to
 * the others. It gives the eye somewhere to rest before a wall of links.
 */
function FullBleedImage({ item }: { item: { src: string; alt: string } }) {
  return (
    <Section className="py-0">
      {/* Inside the content width, not edge to edge: a full-bleed band was
          wider than anything else on the page and broke its rhythm. */}
      <div className="reveal relative aspect-[21/9] w-full overflow-hidden rounded-[var(--radius-image)]">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 1240px) 100vw, 1180px"
          className="object-cover"
          style={{ objectPosition: "50% 35%" }}
        />
      </div>
    </Section>
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
