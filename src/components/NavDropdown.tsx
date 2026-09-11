"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { services } from "@/lib/site";

/**
 * The Care Services nav item, with the ten services beneath it.
 *
 * Opens on hover and on focus, so it works with a mouse and with a keyboard.
 * The trigger is a real link to the services index as well as a menu opener —
 * someone who clicks it rather than hovering still gets the full page, which
 * is what a nav item labelled "Care Services" ought to do.
 *
 * A short close delay stops the menu vanishing as the pointer crosses the gap
 * between the trigger and the panel.
 */
export function NavDropdown({ active }: { active: boolean }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const wrapRef = useRef<HTMLDivElement>(null);

  const cancelClose = () => window.clearTimeout(closeTimer.current);
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpen(false), 140);
  };

  useEffect(() => () => cancelClose(), []);

  // Escape closes, and focus leaving the group closes.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onFocus = (e: FocusEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("focusin", onFocus);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("focusin", onFocus);
    };
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <Link
        href="/services"
        aria-current={active ? "page" : undefined}
        aria-expanded={open}
        onFocus={() => setOpen(true)}
        className={`relative flex items-center gap-1.5 py-1 text-sm font-semibold transition-colors duration-200 ease-[var(--ease-out)] ${
          active ? "text-brand" : "text-ink hover:text-brand"
        }`}
      >
        Care Services
        <Chevron open={open} />
        {active && (
          <span className="absolute -bottom-0.5 left-0 h-[2px] w-[calc(100%-18px)] rounded-full bg-brand" />
        )}
      </Link>

      {open && (
        <div
          // A small bridge above the panel, so the pointer can travel from the
          // trigger without passing over a gap that would close the menu.
          className="absolute left-1/2 top-full z-50 w-[520px] -translate-x-1/2 pt-4"
        >
          <div className="rounded-[var(--radius-card)] border border-line bg-white p-3 shadow-[var(--shadow-lift)]">
            <ul className="grid grid-cols-2 gap-0.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-[14px] font-semibold leading-snug text-ink transition-colors duration-150 ease-[var(--ease-out)] hover:bg-brand-50 hover:text-brand"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/services"
              onClick={() => setOpen(false)}
              className="mt-1 flex items-center gap-1.5 border-t border-line px-3 py-2.5 text-[13px] font-semibold text-brand"
            >
              View all care services
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M5 12h14m-6-6 6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={`shrink-0 transition-transform duration-200 ease-[var(--ease-out)] ${
        open ? "rotate-180" : ""
      }`}
    >
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
