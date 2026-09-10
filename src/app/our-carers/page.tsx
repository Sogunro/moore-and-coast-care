import type { Metadata } from "next";
import Image from "next/image";
import { business, carers } from "@/lib/site";
import { ButtonLink } from "@/components/Button";
import { BlobImage } from "@/components/BlobImage";
import { Section, SectionHeader } from "@/components/Section";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Our Carers",
  description:
    "Every Moor & Coast carer is screened, background checked and trained. Meet the standards behind the team supporting people across Whitby and North Yorkshire.",
};

export default function OurCarersPage() {
  return (
    <>
      <PageHero
        eyebrow="Our carers"
        title="A compassionate care team"
        lead="The best care team in the industry, ready when you need them."
        /* Composed with the hands right of centre and soft window light
           filling the left third, so the heading sits on the calm side. */
        image="/images/carers-hands.png"
        imageAlt="A carer's hands gently holding an older person's hands"
        imageFocus="60% 50%"
      />

      <IntroSection />
      <PromisesSection />
      <ChecksSection />
      <SkillsSection />
      <ClosingSection />
    </>
  );
}

function IntroSection() {
  return (
    <Section>
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:gap-16">
        <BlobImage
          src="/images/carer-hallway.png"
          alt="A Moor & Coast carer arriving at a client's home, care notes under her arm"
          focus="55% 40%"
          className="mx-auto w-full max-w-[320px] sm:max-w-[380px] lg:mx-0"
        />
        <div className="reveal">
          <h2 className="text-[32px] leading-[1.1] sm:text-[40px]">
            {carers.intro.title}
          </h2>
          <p className="mt-6 text-[17px] leading-[1.65] text-ink-body sm:text-[19px]">
            {carers.intro.body}
          </p>
        </div>
      </div>
    </Section>
  );
}

function PromisesSection() {
  return (
    <div className="bg-surface">
      <Section>
        <SectionHeader
          eyebrow="What sets our carers apart"
          title="Chosen for skill, and for kindness"
          lead="Every carer is selected against the same standards, whatever the level of support they provide."
        />
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {carers.promises.map((item, i) => (
            <li
              key={item.title}
              className="reveal rounded-[var(--radius-card)] bg-white p-7 shadow-[var(--shadow-soft)]"
              style={{ transitionDelay: `${Math.min(i * 60, 300)}ms` }}
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

/**
 * The vetting checks. Set as a two-column list beside a sticky intro rather
 * than as twelve cards: they are single phrases, and a card apiece would give
 * each one more visual weight than it carries.
 */
function ChecksSection() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-16">
        <div className="lg:sticky lg:top-[128px] lg:self-start">
          <h2 className="text-[32px] leading-[1.1] sm:text-[38px]">
            Ensuring your peace of mind
          </h2>
          <p className="mt-5 text-[17px] leading-[1.6] text-ink-body">
            With a rigorous application process, you can rest assured that you
            or your loved one is in educated, compassionate and sensitive
            hands. Every carer completes:
          </p>
        </div>

        <div>
          {/* Two carers reviewing a care plan — the process behind the list,
              rather than another photograph of a client. */}
          <div className="reveal relative mb-10 aspect-[16/9] overflow-hidden rounded-[var(--radius-image)]">
            <Image
              src="/images/carers-office.png"
              alt="Two Moor & Coast carers reviewing a care plan together on a tablet"
              fill
              sizes="(max-width: 1024px) 100vw, 720px"
              className="object-cover"
            />
          </div>

          <ul className="grid gap-x-10 sm:grid-cols-2">
          {carers.checks.map((check) => (
            <li
              key={check}
              className="flex items-start gap-3 border-b border-line py-4 text-[16px] font-medium text-ink"
            >
              <Tick />
              {check}
            </li>
          ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/**
 * Conditions the team is experienced with. Deliberately unillustrated: a
 * photograph here would have to depict a specific condition, which is both
 * hard to do well and uncomfortable to look at.
 */
function SkillsSection() {
  return (
    <div className="bg-surface">
      <Section>
        <SectionHeader
          eyebrow="Diverse skills"
          title="Experience across a wide range of needs"
          lead="Our care team's experience includes, but is not limited to:"
        />
        <ul className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-3">
          {carers.skills.map((skill) => (
            <li
              key={skill}
              className="rounded-[var(--radius-pill)] border border-line bg-white px-5 py-2.5 text-[15px] font-semibold text-ink"
            >
              {skill}
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

function ClosingSection() {
  return (
    <Section>
      <div className="reveal mx-auto max-w-2xl text-center">
        <h2 className="text-[32px] leading-tight sm:text-[40px]">
          Let&apos;s get started
        </h2>
        <p className="mt-5 text-[17px] leading-[1.6] text-ink-body sm:text-[19px]">
          We are ready to help. Call us to arrange a free care assessment for
          you or a loved one.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href={business.phoneHref} variant="primary" size="lg">
            Call {business.phone}
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline" size="lg">
            Contact us today
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}

function Tick() {
  return (
    <svg
      width="18"
      height="18"
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
