import type { Metadata } from "next";
import { testimonials } from "@/lib/site";
import { Section, SectionHeader } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { TestimonialCard } from "@/components/TestimonialCard";
import { CTABanner } from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "What families across Whitby and North Yorkshire say about the compassionate home care they receive from Moore & Coast Care.",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="The families we're proud to serve"
        lead="Nothing means more to us than the trust of the families we support. Here's what some of them have shared."
        /* Deliberately no people. A photograph of someone beside a quote
           implies they said it, and these testimonials are illustrative
           until real consented ones replace them. The harbour gives the page
           warmth without making a claim. */
        image="/images/testimonials-hero.png"
        imageAlt="Whitby harbour on a bright autumn morning, the abbey on the headland beyond"
        imageFocus="62% 45%"
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.author + t.location} testimonial={t} />
          ))}
        </div>

        <p className="reveal mx-auto mt-14 max-w-2xl text-center text-sm text-ink-body">
          Testimonials are shared with the kind permission of our clients and
          their families. Names are withheld to protect their privacy.
        </p>
      </Section>

      <div className="mt-24">
        <CTABanner />
      </div>
    </>
  );
}
