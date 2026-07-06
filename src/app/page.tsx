import Image from "next/image";
import {
  business,
  heroSlides,
  services,
  testimonials,
  whyChooseUs,
} from "@/lib/site";
import { ButtonLink } from "@/components/Button";
import { HeroCarousel } from "@/components/HeroCarousel";
import { Section, SectionHeader } from "@/components/Section";
import { TrustBar } from "@/components/TrustBar";
import { ServiceCard } from "@/components/ServiceCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { CTABanner } from "@/components/CTABanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesSection />
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

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Full-bleed photography that gently crossfades between hero images. */}
      <HeroCarousel slides={[...heroSlides]} />

      <div className="mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-center px-5 py-24 sm:px-8">
        <div className="max-w-2xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-warm-white backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Home care across Whitby & North Yorkshire
          </p>
          <h1 className="text-4xl font-semibold leading-[1.08] text-warm-white sm:text-6xl">
            Exceptional home care, delivered with warmth.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-warm-white/85 sm:text-xl">
            {business.intro}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" variant="primary" size="lg">
              Book a free care consultation
            </ButtonLink>
            <ButtonLink
              href={business.phoneHref}
              variant="outline"
              size="lg"
              className="border-white/40 text-warm-white hover:bg-warm-white hover:text-navy"
            >
              Call {business.phone}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <Section>
      <SectionHeader
        eyebrow="What we do"
        title="Care shaped around each person"
        lead="From a little help at home to specialist, round-the-clock support — every care plan is built around the individual."
      />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </Section>
  );
}

function WhyUsSection() {
  return (
    <div className="bg-sand-200">
      <Section>
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div className="reveal">
            <SectionHeader
              eyebrow="Why families choose us"
              title="The difference is in how we care"
              align="left"
            />
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">
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
                className="reveal rounded-2xl bg-white p-6 shadow-[var(--shadow-soft)]"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
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
        <div className="reveal relative aspect-[3/2] overflow-hidden rounded-3xl shadow-[var(--shadow-lift)]">
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
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
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
    <div className="bg-sand-200">
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
      <div className="reveal mx-auto max-w-3xl rounded-3xl border border-sand bg-white p-10 text-center shadow-[var(--shadow-soft)]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
          Regulated & accountable
        </p>
        <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
          A CQC-registered home care provider
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink-muted">
          We are regulated by the Care Quality Commission and hold ourselves to
          the highest standards of safety, dignity and person-centred care.
        </p>
      </div>
    </Section>
  );
}
