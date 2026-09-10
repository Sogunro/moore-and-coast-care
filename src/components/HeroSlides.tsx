"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { heroSlides } from "@/lib/site";

/**
 * The rotating background for the hero.
 *
 * The rotation carries a message rather than decorating: three people of three
 * different generations say "adults of every age" in the time it takes to
 * glance, which a single photograph of an elderly man actively contradicted.
 *
 * Because the message only lands if a visitor sees more than one slide, the
 * interval is 4.5s rather than the calm 7-8s a purely decorative carousel
 * would use — brisk enough that a short visit still shows two people, slow
 * enough not to feel like an advert.
 *
 * No dots, no arrows: controls would turn a background into a widget.
 *
 * Under prefers-reduced-motion the first slide is held still. That viewer sees
 * one image rather than three, so the alt text on the first slide has to carry
 * its weight alone.
 */
export function HeroSlides({ intervalMs = 4500 }: { intervalMs?: number }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (heroSlides.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(
      () => setActive((i) => (i + 1) % heroSlides.length),
      intervalMs
    );
    return () => window.clearInterval(id);
  }, [intervalMs]);

  return (
    <>
      {heroSlides.map((slide, i) => (
        <div
          key={slide.src}
          className="absolute inset-0 transition-opacity duration-[900ms] ease-[var(--ease-in-out)] motion-reduce:transition-none"
          style={{ opacity: i === active ? 1 : 0 }}
          aria-hidden={i !== active}
        >
          <Image
            src={slide.src}
            // Only the first slide is described. The others repeat the same
            // idea to a screen reader, and a rotating background announcing
            // itself every few seconds is noise, not information.
            alt={i === 0 ? slide.alt : ""}
            fill
            // The first slide is the LCP and must not be lazy; the rest load
            // after paint so the hero costs one image, not three.
            priority={i === 0}
            loading={i === 0 ? undefined : "lazy"}
            sizes="100vw"
            style={{ objectPosition: slide.focus }}
            className="hero-drift object-cover"
          />
        </div>
      ))}
    </>
  );
}
