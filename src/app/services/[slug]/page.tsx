import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/lib/site";
import { Section } from "@/components/Section";
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

  return (
    <>
      <PageHero
        eyebrow="Care services"
        title={service.title}
        lead={service.lead ?? service.summary}
        image={service.image}
        imageAlt={service.imageAlt}
      />

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
          </div>

          {service.includes && (
            <div className="reveal rounded-[var(--radius-card)] border border-line bg-surface p-7">
              <h2 className="text-[20px] leading-snug">
                What this usually includes
              </h2>
              <ul className="mt-5 space-y-3">
                {service.includes.map((item) => (
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

      <OtherServices services={others} />

      <ClosingCTA
        title={`Thinking about ${service.title.toLowerCase()}?`}
        body="Give us a call and we will talk it through — no obligation, and a fully costed package before you decide anything."
      />
    </>
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
