import type { Metadata } from "next";
import { about, whyChooseUs } from "@/lib/site";
import { ClosingCTA } from "@/components/ClosingCTA";
import { Section, SectionHeader } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { ValueCards } from "@/components/ValueCards";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Moor & Coast Care is a local, CQC-registered home care provider delivering compassionate, person-centred support across Whitby and North Yorkshire.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Care that helps people flourish at home"
        lead={about.privacy.body}
        /* She holds the secateurs and does the work; the support worker
           stands back with a mug, watching rather than helping. That is the
           mission stated in a picture: independence, not intervention.
           A 16:9 source in a 5:4 slot loses width, so the crop is pulled
           right to keep both women and the garden in frame. */
        image="/images/about-garden.png"
        imageAlt="A woman pruning shrubs in her own garden, laughing with her support worker who stands nearby with a mug of tea"
        imageFocus="62% 50%"
      />

      <MissionSection />
      <ValuesSection />
      <WhyUsSection />
      {/* The free care assessment is offered here and nowhere else on the
          site: it is the company's own wording on this page. */}
      <ClosingCTA
        title="Ready to get started?"
        body="We are ready to help. Give us a call to arrange a free care assessment for you or your loved one."
      />
    </>
  );
}

/**
 * The mission, set apart on a tinted panel with its opening line pulled out
 * as a serif lead and the handwritten mark beneath, as if signed.
 *
 * A sticky-note treatment was considered and rejected here: at ~250 words the
 * paper metaphor breaks down, and a jotted note reads as provisional, which is
 * the wrong register for the company's central promise. The panel gives it
 * weight instead. The note idea lives on in the values below, where the copy
 * is short enough to earn it.
 */
function MissionSection() {
  return (
    <Section>
      <div className="reveal mx-auto max-w-3xl rounded-[var(--radius-card)] bg-surface px-7 py-12 sm:px-12 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
          Our mission
        </p>

        <p className="mt-5 font-[family-name:var(--font-display)] text-[26px] leading-[1.25] text-ink sm:text-[32px]">
          {about.mission.lead}
        </p>

        <div className="mt-7 space-y-5">
          {about.mission.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="text-[16px] leading-[1.7] text-ink-body"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* The second and final use of the handwritten mark on the site. */}
        <p
          className="mt-9 font-[family-name:var(--font-hand)] text-[28px] leading-none text-brand"
          aria-hidden
        >
          More life together
        </p>
      </div>
    </Section>
  );
}

function ValuesSection() {
  return (
    <div className="bg-white">
      <Section>
        <SectionHeader
          eyebrow="What we believe"
          title="The principles behind every visit"
          lead="Our mission statement and aims are the foundation of everything we do, with these values underpinning every act of care our staff provide."
        />
        <div className="mt-14">
          <ValueCards />
        </div>
      </Section>
    </div>
  );
}

function WhyUsSection() {
  return (
    <div className="bg-surface">
      <Section>
        <SectionHeader
          eyebrow="Why choose us"
          title="Quality home care, carefully matched"
          lead="We specialise in providing quality home care to adults in need, carefully matching carers to the needs of each client."
        />
        <ul className="mt-14 grid gap-6 sm:grid-cols-2">
          {whyChooseUs.map((item, i) => (
            <li
              key={item.title}
              className="reveal rounded-[var(--radius-card)] bg-white p-7 shadow-[var(--shadow-soft)]"
              style={{ transitionDelay: `${Math.min(i * 70, 280)}ms` }}
            >
              <h3 className="text-[21px] leading-snug">{item.title}</h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-ink-body">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
