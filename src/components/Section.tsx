import type { ReactNode } from "react";

/** Consistent page section: max width, generous vertical rhythm, side padding. */
export function Section({
  children,
  className = "",
  as: Tag = "section",
  id,
}: {
  children: ReactNode;
  className?: string;
  as?: "section" | "div";
  id?: string;
}) {
  return (
    <Tag id={id} className={`py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">{children}</div>
    </Tag>
  );
}

/** Eyebrow + heading + optional lead — the standard section intro block. */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "center" | "left";
}) {
  const alignment = align === "center" ? "mx-auto text-center" : "text-left";
  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-semibold sm:text-4xl">{title}</h2>
      {lead && (
        <p className="mt-5 text-lg leading-relaxed text-ink-body">{lead}</p>
      )}
    </div>
  );
}
