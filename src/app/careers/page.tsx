import type { Metadata } from "next";
import { business } from "@/lib/site";
import { Section, SectionHeader } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { ButtonLink } from "@/components/Button";
import { CTABanner } from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join a warm, professional home care team in Whitby. We offer full training, DBS checks and genuinely rewarding work supporting people in their own homes.",
};

const reasons = [
  {
    title: "Full training provided",
    body: "No experience? No problem. We give you the training, mentoring and confidence to thrive.",
  },
  {
    title: "Local, flexible hours",
    body: "Work close to home with rotas built around real life — because your wellbeing matters too.",
  },
  {
    title: "Genuinely rewarding",
    body: "Make a real difference every single day to people in your own community.",
  },
  {
    title: "A supportive team",
    body: "Join a close-knit team that looks out for one another and celebrates great care.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Do work that truly matters"
        lead="We're always looking for kind, dependable people to join our Whitby team. If you care, we'd love to hear from you."
      />

      <Section>
        <SectionHeader
          eyebrow="Why join us"
          title="A career you can feel proud of"
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="reveal rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-soft)]"
            >
              <h3 className="text-lg font-semibold">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-body">
                {r.body}
              </p>
            </div>
          ))}
        </div>

        <div className="reveal mt-16 rounded-[var(--radius-card)] bg-brand px-6 py-14 text-center sm:px-16">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            Ready to apply?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            Send us a message or give us a call — we&apos;d be glad to tell you
            more about life at Moore &amp; Coast Care.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact" variant="primary" size="lg">
              Get in touch
            </ButtonLink>
            <ButtonLink
              href={`mailto:${business.email}?subject=Careers%20enquiry`}
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white hover:text-brand"
            >
              Email {business.email}
            </ButtonLink>
          </div>
        </div>
      </Section>

      <div className="mt-24">
        <CTABanner />
      </div>
    </>
  );
}
