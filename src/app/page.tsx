import Image from "next/image";
import { testimonials, whyChooseUs } from "@/lib/site";
import { ButtonLink } from "@/components/Button";
import { Hero } from "@/components/Hero";
import { ServicesSplit } from "@/components/ServicesSplit";
import { Section, SectionHeader } from "@/components/Section";
import { TrustBar } from "@/components/TrustBar";
import { TestimonialCard } from "@/components/TestimonialCard";
import { CTABanner } from "@/components/CTABanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesSplit />
      <WhyUsSection />
      <TeamSection />
      <TestimonialsSection />
      <AccreditationSection />
      <div className="mt-24">
        <CTABanner />
      </div>
    </>
  );
}

function WhyUsSection() {
  return (
    <div className="bg-surface">
      <Section>
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div className="reveal">
            <SectionHeader
              eyebrow="Why families choose us"
              title="The difference is in how we care"
              align="left"
            />
            <p className="mt-5 text-lg leading-relaxed text-ink-body">
              We are a local, close-knit team. That means consistency, familiar
              faces, and care that feels personal — because to us, it is.
            </p>
            <div className="mt-8">
              <ButtonLink href="/about" variant="outline" size="md">
                More about our approach
              </ButtonLink>
            </div>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2">
            {whyChooseUs.map((item) => (
              <li
                key={item.title}
                className="reveal rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-soft)]"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-body">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </div>
  );
}

function TeamSection() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="reveal relative aspect-[3/2] overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-lift)]">
          <Image
            src="/images/team.png"
            alt="The friendly Moore & Coast Care team outside their Whitby office"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="reveal">
          <SectionHeader
            eyebrow="Meet the team"
            title="Kind, professional, genuinely local"
            align="left"
          />
          <p className="mt-5 text-lg leading-relaxed text-ink-body">
            Every member of our team is carefully chosen, fully trained,
            DBS-checked and medication-competent. But what really sets them apart
            is their compassion — the small kindnesses that turn a visit into a
            highlight of someone&apos;s day.
          </p>
          <div className="mt-8">
            <ButtonLink href="/careers" variant="outline" size="md">
              Join our team
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}

function TestimonialsSection() {
  return (
    <div className="bg-surface">
      <Section>
        <SectionHeader
          eyebrow="In their words"
          title="Trusted by families across the coast"
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.author + t.location} testimonial={t} />
          ))}
        </div>
      </Section>
    </div>
  );
}

function AccreditationSection() {
  return (
    <Section>
      <div className="reveal mx-auto max-w-3xl rounded-[var(--radius-card)] border border-line bg-white p-10 text-center shadow-[var(--shadow-soft)]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
          Regulated & accountable
        </p>
        <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
          A CQC-registered home care provider
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink-body">
          We are regulated by the Care Quality Commission and hold ourselves to
          the highest standards of safety, dignity and person-centred care.
        </p>
      </div>
    </Section>
  );
}
