import type { Metadata } from "next";
import Image from "next/image";
import { whyChooseUs } from "@/lib/site";
import { Section, SectionHeader } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { CTABanner } from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Moore & Coast Care is a local, CQC-registered home care provider delivering compassionate, person-centred support across Whitby and North Yorkshire.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Care that helps people flourish at home"
        lead="We deliver outstanding, personalised support to clients and vulnerable adults, enabling them to maintain their independence within the community they love."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="reveal relative aspect-[3/2] overflow-hidden rounded-3xl shadow-[var(--shadow-lift)]">
            <Image
              src="/images/whitby.png"
              alt="Whitby harbour and the North Yorkshire coast at golden hour"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="reveal">
            <SectionHeader eyebrow="Our promise" title="Dignity in every detail" align="left" />
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-muted">
              <p>
                At Moore &amp; Coast Care we are committed to fostering an
                environment where individuals can flourish — knowing they are
                cared for by professionals dedicated to their happiness, health
                and holistic well-being.
              </p>
              <p>
                We are proud to be genuinely local. Our team knows Whitby, the
                surrounding villages and the coast, and we build lasting
                relationships with the families we support.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <div className="bg-sand-200">
        <Section>
          <SectionHeader
            eyebrow="Our values"
            title="What guides everything we do"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item) => (
              <div
                key={item.title}
                className="reveal rounded-2xl bg-white p-6 shadow-[var(--shadow-soft)]"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <div className="mt-24">
        <CTABanner />
      </div>
    </>
  );
}
