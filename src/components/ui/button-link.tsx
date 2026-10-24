import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "sm";

// Sizing lives in its own map so callers never need to override conflicting
// utilities (Tailwind does not resolve conflicts by class order).
const base =
  "group inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors duration-200";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-ink hover:bg-fg",
  secondary: "border border-line-strong text-fg hover:border-fg hover:bg-raised",
  ghost: "text-muted underline-offset-4 hover:text-fg hover:underline",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5",
  sm: "min-h-10 px-4",
};

type ButtonLinkProps = Omit<ComponentProps<"a">, "href"> & {
  href: string;
  variant?: Variant;
  size?: Size;
  /** Opens in a new tab and appends a visually hidden notice for screen readers. */
  external?: boolean;
  children: ReactNode;
};

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  external = false,
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  // Ghost links are inline text: keep the touch height, drop the padding.
  const sizing = variant === "ghost" ? "min-h-11" : sizes[size];
  const classes = `${base} ${variants[variant]} ${sizing} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  // mailto: and other non-route links should not go through next/link.
  if (!href.startsWith("/")) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
