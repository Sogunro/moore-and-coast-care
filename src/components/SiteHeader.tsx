"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { business, nav } from "@/lib/site";
import { ButtonLink } from "./Button";

/**
 * Fixed 88px header, white throughout.
 *
 * Navigation sits in ink, not blue — blue is reserved for the active page, the
 * CTA and hover. That restraint is what keeps the brand colour feeling valuable
 * rather than decorative (target ratio: 70% white / 10% ink / 5% brand).
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // The border only appears once content has scrolled beneath the header, so
  // the hero meets the header as one uninterrupted white field.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // The mobile menu is a full-height overlay; lock the page behind it.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-colors duration-200 ease-[var(--ease-out)] ${
        scrolled ? "border-b border-line-soft" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between gap-6 px-5 sm:px-8 lg:h-[88px]">
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label={`${business.name} — home`}
        >
          <Image
            src="/images/logo-moor.png"
            alt={business.legalName}
            width={752}
            height={332}
            priority
            /* Explicit max-width as well as height: with `w-auto` alone the
               image can lay out at its full 752px natural width before the
               file has decoded, which overflows a narrow screen. */
            className="h-10 w-auto max-w-[180px] object-contain lg:h-14 lg:max-w-[240px]"
          />
        </Link>

        <nav
          className="hidden items-center gap-7 lg:flex xl:gap-8"
          aria-label="Primary"
        >
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-1 text-sm font-semibold transition-colors duration-200 ease-[var(--ease-out)] ${
                  active ? "text-brand" : "text-ink hover:text-brand"
                }`}
              >
                {item.label}
                {/* Active page marker — the underline carries the state, so
                    meaning is never colour-only. */}
                {active && (
                  <span className="absolute -bottom-0.5 left-0 h-[2px] w-full rounded-full bg-brand" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 lg:block">
          {/* Feedback is a button rather than a nav item, matching the live
              site. It points at the testimonials page for now; if it should
              open a form instead, only this href changes. */}
          <ButtonLink href="/testimonials" variant="primary" size="md">
            <MailIcon />
            Feedback
          </ButtonLink>
        </div>

        <button
          type="button"
          className="-mr-2 flex h-11 w-11 items-center justify-center text-ink lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <MenuIcon open={open} />
        </button>
      </div>

      {/* Mobile menu — full-height sheet below the bar. */}
      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-[72px] z-50 overflow-y-auto border-t border-line-soft bg-white lg:hidden"
        >
          <nav
            className="mx-auto flex max-w-[1240px] flex-col px-5 py-2"
            aria-label="Primary"
          >
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center justify-between border-b border-line-soft py-4 text-base font-semibold ${
                    active ? "text-brand" : "text-ink"
                  }`}
                >
                  {item.label}
                  {active && <Dot />}
                </Link>
              );
            })}
            <ButtonLink
              href={business.phoneHref}
              variant="primary"
              size="lg"
              className="mt-6 w-full"
            >
              Call {business.phone}
            </ButtonLink>
            <ButtonLink
              href="/testimonials"
              variant="outline"
              size="lg"
              className="mb-8 mt-3 w-full"
            >
              Feedback
            </ButtonLink>
          </nav>
        </div>
      )}
    </header>
  );
}


/** Non-colour marker for the active row in the mobile menu. */
function Dot() {
  return <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />;
}

function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="5.5"
        width="18"
        height="13"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m4 7 8 6 8-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      {open ? (
        <path
          d="M6 6l12 12M18 6L6 18"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M4 7h16M4 12h16M4 17h16"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
