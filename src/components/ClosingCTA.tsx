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
      {/* The panel is a tinted gradient, not white. An earlier version used
          --color-surface, which measures 1.05 against white — effectively
          invisible, which is what made this the blankest part of the page.
          #e8f1f8 to #dfeaf4 reads clearly as a panel while keeping ink on it
          at 12:1 and the brand blue at 6.5:1. */}
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-4 rounded-[30px] bg-brand/[0.10] blur-2xl"
        />
        <div className="reveal relative overflow-hidden rounded-[var(--radius-card)] border border-brand-100 bg-gradient-to-b from-[#e8f1f8] to-[#dfeaf4] px-6 py-10 text-center shadow-[var(--shadow-lift)] sm:px-12 sm:py-12">
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand via-teal to-brand"
          />
          {/* A soft teal bloom in one corner, so the panel is not a flat
              rectangle of a single tone. */}
          <span
            aria-hidden
            className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-teal/15 blur-2xl"
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
