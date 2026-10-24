import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-colors duration-200";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-ink hover:bg-fg",
  secondary: "border border-line-strong text-fg hover:border-fg hover:bg-raised",
  ghost: "px-0 text-muted underline-offset-4 hover:text-fg hover:underline",
};

type ButtonLinkProps = Omit<ComponentProps<"a">, "href"> & {
  href: string;
  variant?: Variant;
  /** Opens in a new tab and appends a visually hidden notice for screen readers. */
  external?: boolean;
  children: ReactNode;
};

export function ButtonLink({
  href,
  variant = "primary",
  external = false,
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

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
