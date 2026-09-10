"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Adds `is-visible` to every `.reveal` element as it scrolls into view,
 * driving the gentle fade-in defined in globals.css.
 *
 * Two things this has to get right, because `.reveal` starts at opacity 0 and
 * anything missed stays permanently invisible:
 *
 *  - This component is rendered above {children} in the layout, so on first
 *    paint the document contains no `.reveal` elements yet. A one-shot query on
 *    mount finds nothing and silently leaves the whole page hidden. A
 *    MutationObserver picks up nodes as they arrive instead.
 *  - Client-side navigation swaps the page content without remounting the
 *    layout, so the effect re-runs on pathname change to catch the new page.
 */
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // No animation wanted: reveal everything immediately, now and as it arrives.
    if (reduce) {
      const showAll = () =>
        document
          .querySelectorAll<HTMLElement>(".reveal:not(.is-visible)")
          .forEach((el) => el.classList.add("is-visible"));
      showAll();
      const mo = new MutationObserver(showAll);
      mo.observe(document.body, { childList: true, subtree: true });
      return () => mo.disconnect();
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const observeNew = () =>
      document
        .querySelectorAll<HTMLElement>(".reveal:not(.is-visible)")
        .forEach((el) => io.observe(el));

    observeNew();

    // Catch elements mounted after this effect runs.
    const mo = new MutationObserver(observeNew);
    mo.observe(document.body, { childList: true, subtree: true });

    // Safety net: if anything is still hidden after the page settles, show it.
    // An element that never animates is a bad transition; one that never
    // appears at all is lost content.
    const failsafe = window.setTimeout(() => {
      document
        .querySelectorAll<HTMLElement>(".reveal:not(.is-visible)")
        .forEach((el) => {
          const box = el.getBoundingClientRect();
          if (box.top < window.innerHeight) el.classList.add("is-visible");
        });
    }, 1200);

    return () => {
      io.disconnect();
      mo.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [pathname]);

  return null;
}
