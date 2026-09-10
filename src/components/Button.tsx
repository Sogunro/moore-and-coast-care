import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] font-semibold " +
  "transition-[background-color,border-color,color,box-shadow,transform] duration-200 " +
  "ease-[var(--ease-out)] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  // Brand blue is the single primary action colour — the 5% accent that makes
  // the logo feel valuable rather than decorative.
  primary: "bg-brand text-white shadow-[var(--shadow-soft)] hover:bg-brand-600",
  // 1.5px border, per the brief — a 1px outline goes weedy next to a 54px pill.
  outline:
    "border-[1.5px] border-brand bg-white text-brand hover:bg-brand-50",
  ghost: "text-brand hover:text-brand-600",
};

// Fixed heights so a primary and an outline button always line up on a row,
// regardless of their label length or border width.
const sizes: Record<Size, string> = {
  md: "h-[52px] px-6 text-[15px]",
  lg: "h-[54px] px-7 text-[15px]",
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
