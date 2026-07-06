import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-200 focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2";

const variants: Record<Variant, string> = {
  // Gold accent = the single primary action (10% accent, per 60-30-10).
  primary:
    "bg-gold text-white shadow-[var(--shadow-soft)] hover:bg-gold-600 hover:-translate-y-0.5",
  outline:
    "border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-warm-white",
  ghost: "text-navy hover:text-gold-600",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

type BaseProps = { variant?: Variant; size?: Size };

/** Link-styled-as-button (internal or external via href). */
export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  href,
  ...rest
}: BaseProps & ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    />
  );
}

/** Native button for form actions. */
export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}: BaseProps & ComponentProps<"button">) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    />
  );
}
