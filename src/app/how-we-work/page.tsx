import type { Metadata } from "next";
import Image from "next/image";
import { howWeWork } from "@/lib/site";
import { HelpIcon, type HelpIconName } from "@/components/HelpIcon";
import { Section, SectionHeader } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { ClosingCTA } from "@/components/ClosingCTA";

export const metadata: Metadata = {
  title: "How We Work",
  description:
    "From first enquiry to your first visit: how Moor & Coast Care assesses, plans and begins your care package across Whitby and North Yorkshire.",
};

export default function HowWeWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="How we work"
        title="Outstanding, sensitive and friendly care professionals, ready to support you"
        lead="From your first enquiry to your first visit, here is exactly what happens — and what it costs — before anything is agreed."
        /* The client is talking and the assessor is listening, which is what
           step one actually describes. */
        image="/images/how-we-work-hero.png"
        imageAlt="A Moor & Coast assessor listening and taking notes while a client explains her needs at home"
        imageFocus="58% 50%"
      />

      <StepsSection />
      <HelpSection />

      <ClosingCTA
        title={howWeWork.assessment.title}
        body={howWeWork.assessment.body}
      />
    </>
  );
}

/**
 * The four steps, numbered.
 *
 * Numbering is usually decoration, but here it carries real information:
 * these happen in sequence, and someone deciding whether to enquire wants to
 * know how many stages stand between a phone call and care starting.
 *
 * The connecting rule is drawn behind the numbers on desktop so the four read
 * as one process rather than four separate cards.
 */
/**
 * The four steps, each with its own photograph.
 *
 * Previously four short text columns with a connecting rule, which left a
 * large empty band beneath them and gave the page's most important content
 * the least weight. Each step is now a full-width row, the photograph
 * alternating side to side so the eye moves down the page rather than
 * scanning across four equal columns.
 *
 * Numbering stays: these happen in sequence, and someone deciding whether to
 * ring wants to know how many stages stand between a phone call and care
 * beginning.
 */
function StepsSection() {
  return (
    <Section>
      <SectionHeader
        eyebrow="The process"
        title="Four steps from enquiry to care"
        lead="No obligation at any stage, and a fully costed package before you decide."
      />

      <ol className="mt-16 space-y-16 lg:space-y-24">
        {howWeWork.steps.map((step, i) => {
          const flip = i % 2 === 1;

          return (
            <li
              key={step.title}
              className="reveal grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
            >
              <div className={flip ? "lg:order-2" : ""}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-image)] shadow-[var(--shadow-lift)]">
                  <Image
                    src={step.image}
                    alt={step.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 560px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className={flip ? "lg:order-1" : ""}>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand font-[family-name:var(--font-display)] text-[20px] text-white">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-[26px] leading-snug sm:text-[30px]">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-[46ch] text-[16px] leading-[1.7] text-ink-body">
                  {step.body}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}

function HelpSection() {
  return (
    <div className="bg-surface">
      <Section>
        <SectionHeader
          eyebrow="We will help"
          title="Support that fits around your day"
          lead="Through a rigorous selection process, we are ready to provide the level of care you require, right when you need it."
        />

        {/* Rows rather than a grid of eight identical cards: the same-size
            card pattern flattens everything to one weight, and these are
            eight different kinds of help rather than eight of a kind. */}
        <ul className="mt-14 grid gap-x-14 sm:grid-cols-2">
          {howWeWork.help.map((item, i) => (
            <li
              key={item.title}
              className="reveal flex items-start gap-4 border-b border-line py-7 first:pt-0 sm:[&:nth-child(2)]:pt-0 last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0"
              style={{ transitionDelay: `${Math.min(i * 50, 320)}ms` }}
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                <HelpIcon name={item.icon as HelpIconName} />
              </span>
              <div className="min-w-0">
                <h3 className="text-[18px] leading-snug">{item.title}</h3>
                <p className="mt-2 text-[14.5px] leading-[1.6] text-ink-body">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
