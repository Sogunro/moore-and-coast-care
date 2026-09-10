import type { Metadata } from "next";
import Image from "next/image";
import { services, specialisms } from "@/lib/site";
import { Section, SectionHeader } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { CTABanner } from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Care Services",
  description:
    "Personal care, dementia care, supported living and hospital discharge support across Whitby and North Yorkshire — every plan built around the individual.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Care services"
        title="Specialist care, delivered with heart"
        lead="Whatever level of support you need, our care is planned around the person — their routine, their preferences and their independence."
      />

      <Section>
        <div className="space-y-20">
          {services.map((service, index) => (
            <article
              key={service.slug}
              id={service.slug}
              className={`reveal scroll-mt-28 ${
                service.image
                  ? "grid gap-10 lg:grid-cols-2 lg:items-center"
                  : "max-w-2xl"
              }`}
            >
              {/* Only some services have commissioned photography; the rest
                  stand as a text block rather than borrowing a stock image. */}
              {service.image && (
                <div
                  className={`relative aspect-[4/3] overflow-hidden rounded-[var(--radius-image)] shadow-[var(--shadow-lift)] ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={service.image}
                    alt={service.imageAlt ?? ""}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <h2 className="text-3xl font-semibold">{service.title}</h2>
                <p className="mt-4 text-lg leading-relaxed text-ink-body">
                  {service.summary}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <div className="bg-surface">
        <Section>
          <SectionHeader
            eyebrow="Also supporting"
            title="A breadth of specialisms"
            lead="Alongside our core services, we provide experienced support across a range of needs."
          />
          <ul className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-3">
            {specialisms.map((item) => (
              <li
                key={item}
                className="rounded-full border border-line bg-white px-5 py-2.5 text-sm font-medium text-brand shadow-[var(--shadow-soft)]"
              >
                {item}
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <div className="mt-24">
        <CTABanner />
      </div>
    </>
  );
}
