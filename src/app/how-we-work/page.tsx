import type { Metadata } from "next";
import { howWeWork } from "@/lib/site";
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
function StepsSection() {
  return (
    <Section>
      <SectionHeader
        eyebrow="The process"
        title="Four steps from enquiry to care"
        lead="No obligation at any stage, and a fully costed package before you decide."
      />

      <ol className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {/* The line linking the steps. Sits behind the numbers, and only on
            the widest layout where all four are on one row. */}
        <span
          aria-hidden
          className="absolute left-0 right-0 top-6 hidden h-px bg-line lg:block"
        />

        {howWeWork.steps.map((step, i) => (
          <li
            key={step.title}
            className="reveal relative"
            style={{ transitionDelay: `${Math.min(i * 90, 360)}ms` }}
          >
            <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-brand font-[family-name:var(--font-display)] text-[20px] text-white">
              {i + 1}
            </span>
            <h3 className="mt-5 text-[21px] leading-snug">{step.title}</h3>
            <p className="mt-3 text-[15px] leading-[1.65] text-ink-body">
              {step.body}
            </p>
          </li>
        ))}
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

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howWeWork.help.map((item, i) => (
            <li
              key={item.title}
              className="reveal rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-soft)]"
              style={{ transitionDelay: `${Math.min(i * 50, 320)}ms` }}
            >
              <span
                aria-hidden
                className="mb-4 block h-1 w-8 rounded-full bg-teal"
              />
              <h3 className="text-[18px] leading-snug">{item.title}</h3>
              <p className="mt-2.5 text-[14px] leading-[1.6] text-ink-body">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
