import type { SVGProps } from "react";

/**
 * The Flutter mark in its two brand blues, drawn on a 24×24 grid (outline
 * from Simple Icons, CC0). Decorative unless a `title` is given.
 */
export function FlutterLogo({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg
      viewBox="2 0 20 24"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...props}
    >
      {title && <title>{title}</title>}
      <path fill="#54C5F8" d="M14.314 0 2.3 12 6 15.7 21.684.013z" />
      <path fill="#54C5F8" d="M14.328 11.072H21.7l-6.46 6.46H7.857z" />
      <path fill="#01579B" d="M7.857 17.53h7.383L21.7 24h-7.373z" />
    </svg>
  );
}
