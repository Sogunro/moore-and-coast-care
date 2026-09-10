import { testimonials } from "@/lib/site";
import { Hero } from "@/components/Hero";
import { ServicesSplit } from "@/components/ServicesSplit";
import { Section, SectionHeader } from "@/components/Section";
import { TrustBar } from "@/components/TrustBar";
import { TestimonialCard } from "@/components/TestimonialCard";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesSplit />
      <TestimonialsSection />
    </>
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
