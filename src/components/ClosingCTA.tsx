import { business } from "@/lib/site";
import { ButtonLink } from "./Button";

/**
 * The closing call to action, shared by every page that ends with one.
 *
 * It sits on a white panel that overlaps the top edge of the footer, which
 * does two things: it closes the gap that opened between a centred CTA and the
 * footer below it, and it ties the two together so the page ends deliberately
 * rather than trailing off into empty white.
 *
 * The overlap is achieved with a negative bottom margin on the panel plus
 * matching top padding on the footer, so the footer's blue runs up behind it.
 * `relative z-10` keeps the panel above that blue.
 */
export function ClosingCTA({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <section className="relative z-10 mx-auto -mb-20 max-w-[960px] px-5 pt-16 sm:px-8 sm:pt-20">
      {/* Not flat white: a pale tinted panel with a teal top edge and a soft
          brand-blue glow behind it. A large white rectangle on white was the
          emptiest thing on the page — the tint gives it an edge to sit on
          without adding a border. */}
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-3 rounded-[28px] bg-brand/[0.06] blur-xl"
        />
        <div className="reveal relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface px-6 py-10 text-center shadow-[var(--shadow-lift)] sm:px-12 sm:py-12">
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand via-teal to-brand"
          />
          <h2 className="text-[28px] leading-tight sm:text-[34px]">{title}</h2>
          <p className="mx-auto mt-4 max-w-lg text-[16px] leading-[1.6] text-ink-body sm:text-[18px]">
            {body}
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href={business.phoneHref} variant="primary" size="lg">
              Call {business.phone}
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline" size="lg">
              Contact us today
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
