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
    <section className="relative z-10 mx-auto -mb-20 max-w-[1240px] px-5 pt-16 sm:px-8 sm:pt-20">
      <div className="reveal rounded-[var(--radius-card)] bg-white px-6 py-12 text-center shadow-[var(--shadow-lift)] sm:px-12 sm:py-14">
        <h2 className="text-[30px] leading-tight sm:text-[38px]">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-[17px] leading-[1.6] text-ink-body sm:text-[19px]">
          {body}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href={business.phoneHref} variant="primary" size="lg">
            Call {business.phone}
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline" size="lg">
            Contact us today
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
