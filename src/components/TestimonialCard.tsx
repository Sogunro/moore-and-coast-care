type Testimonial = {
  quote: string;
  author: string;
  location: string;
};

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="reveal flex h-full flex-col rounded-2xl bg-white p-8 shadow-[var(--shadow-soft)]">
      <Stars />
      <blockquote className="mt-5 flex-1 font-display text-xl leading-relaxed text-navy">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-6 text-sm text-ink-muted">
        <span className="font-semibold text-ink">{testimonial.author}</span>
        {" · "}
        {testimonial.location}
      </figcaption>
    </figure>
  );
}

function Stars() {
  return (
    <div className="flex gap-0.5 text-gold" aria-label="Five out of five stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2l2.9 6.2 6.8.8-5 4.6 1.3 6.7L12 17.8 5.9 20.3l1.3-6.7-5-4.6 6.8-.8L12 2z" />
        </svg>
      ))}
    </div>
  );
}
