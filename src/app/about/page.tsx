import type { Metadata } from "next";
import Image from "next/image";
import { about, whyChooseUs } from "@/lib/site";
import { ClosingCTA } from "@/components/ClosingCTA";
import { Section, SectionHeader } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { ValuePuzzle } from "@/components/ValuePuzzle";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Moor & Coast Care is a local, CQC-registered home care provider delivering compassionate, person-centred support across Whitby and North Yorkshire.",
};

/**
 * The page previously ran as a single centred column of the same width the
 * whole way down, with one photograph on it. Every section now sits on its
 * own axis — mission to the left of its picture, why-us to the right of
 * another, the team across the full width — so the eye moves rather than
 * tracking straight down the middle.
 */
export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Care that helps people flourish at home"
        lead={about.privacy.body}
        /* She holds the secateurs and does the work; the support worker
           stands back with a mug, watching rather than helping. That is the
           mission stated in a picture: independence, not intervention. */
        image="/images/about-garden.png"
        imageAlt="A woman pruning shrubs in her own garden, laughing with her support worker who stands nearby with a mug of tea"
        imageFocus="62% 50%"
      />

      <MissionSection />
      <ValuesSection />
      <TeamSection />
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
 * The mission, set beside a photograph rather than on a centred panel.
 *
 * A sticky-note treatment was considered and rejected: at ~250 words the paper
 * metaphor breaks down, and a jotted note reads as provisional, which is the
 * wrong register for the company's central promise. The note idea lives on in
 * the values below, where the copy is short enough to earn it.
 */
function MissionSection() {
  return (
    <Section>
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-16">
        <div className="reveal">
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

        <div className="reveal relative aspect-[4/5] overflow-hidden rounded-[var(--radius-image)] shadow-[var(--shadow-lift)]">
          <Image
            src="/images/about-mission.png"
            alt="A carer crouching beside an armchair at eye level with an older woman, both laughing"
            fill
            sizes="(max-width: 1024px) 100vw, 440px"
            className="object-cover"
          />
        </div>
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
          <ValuePuzzle
            centre={{
              src: "/images/about-team-3.png",
              alt: "A Moor & Coast carer with a mug of tea in a client's living room",
            }}
          />
        </div>
      </Section>
    </div>
  );
}

/**
 * Three carers across the full width.
 *
 * The page had nothing on it showing the people who actually do the work,
 * which is an odd gap on an About page. Portraits rather than a group shot:
 * three individuals read as a team of people, a line-up reads as a stock
 * photograph.
 */
function TeamSection() {
  const team = [
    {
      src: "/images/about-team-1.png",
      alt: "A Moor & Coast carer in a white polo shirt in a client's hallway",
    },
    {
      src: "/images/about-team-2.png",
      alt: "A Moor & Coast carer holding a folder of care notes in a kitchen doorway",
    },
    {
      src: "/images/about-team-3.png",
      alt: "A Moor & Coast carer with a mug of tea in a client's living room",
    },
  ];

  return (
    <div className="bg-surface">
      <Section>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <div className="reveal">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
              Our people
            </p>
            <h2 className="mt-3 text-[30px] leading-tight sm:text-[36px]">
              The team behind the care
            </h2>
            <p className="mt-5 text-[16px] leading-[1.7] text-ink-body">
              Every carer is screened, background checked and trained before
              they visit a single home. What we recruit for beyond that is
              patience, and a genuine interest in the people they support.
            </p>
          </div>

          <ul className="grid grid-cols-3 gap-3 sm:gap-5">
            {team.map((member, i) => (
              <li
                key={member.src}
                className="reveal"
                style={{ transitionDelay: `${Math.min(i * 90, 280)}ms` }}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-image)]">
                  <Image
                    src={member.src}
                    alt={member.alt}
                    fill
                    sizes="(max-width: 640px) 33vw, 260px"
                    className="object-cover"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </div>
  );
}

/**
 * Why choose us: the photograph on the left this time, so the page alternates
 * rather than settling into one arrangement.
 */
function WhyUsSection() {
  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] lg:gap-16">
        <div className="reveal relative aspect-[4/3] overflow-hidden rounded-[var(--radius-image)] shadow-[var(--shadow-lift)] lg:sticky lg:top-[120px] lg:self-start">
          <Image
            src="/images/about-why-1.png"
            alt="A carer going through a care plan at the kitchen table with a client and her daughter"
            fill
            sizes="(max-width: 1024px) 100vw, 520px"
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
            Why choose us
          </p>
          <h2 className="mt-3 text-[30px] leading-tight sm:text-[36px]">
            Quality home care, carefully matched
          </h2>
          <p className="mt-5 text-[16px] leading-[1.7] text-ink-body">
            We specialise in providing quality home care to adults in need,
            carefully matching carers to the needs of each client.
          </p>

          <ul className="mt-10">
            {whyChooseUs.map((item, i) => (
              <li
                key={item.title}
                className="reveal border-b border-line py-6 first:pt-0 last:border-b-0 last:pb-0"
                style={{ transitionDelay: `${Math.min(i * 70, 280)}ms` }}
              >
                <h3 className="text-[20px] leading-snug">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.65] text-ink-body">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
