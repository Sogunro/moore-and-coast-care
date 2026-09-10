import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/lib/site";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services#${service.slug}`}
      className="reveal group flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[var(--shadow-soft)] transition-shadow duration-300 hover:shadow-[var(--shadow-lift)]"
    >
      {service.image && (
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={service.image}
            alt={service.imageAlt ?? ""}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold">{service.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-body">
          {service.summary}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700">
          Learn more
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}
