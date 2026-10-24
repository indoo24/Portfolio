import Image from "next/image";
import type { Screenshot } from "@/content/types";

type ScreenshotStripProps = {
  images: Screenshot[];
  caption: string;
  /** Accessible name for the strip, e.g. "Bahaa Discover screenshots". */
  label: string;
  /** `sizes` for a single phone in the strip. */
  sizes: string;
  /** Show every image in a horizontally scrolling row (three and a bit visible at a time). */
  scrollable?: boolean;
};

/** A row of portrait phone screenshots inside a framed panel. */
export function ScreenshotStrip({
  images,
  caption,
  label,
  sizes,
  scrollable,
}: ScreenshotStripProps) {
  const list = scrollable
    ? "flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 sm:gap-5 [scrollbar-color:var(--color-line-strong)_transparent] [scrollbar-width:thin]"
    : "grid grid-cols-3 gap-3 sm:gap-5";
  // A partly visible fourth phone signals that the row scrolls.
  const item = scrollable ? "w-1/4 shrink-0 snap-start" : "";

  return (
    <figure>
      <div className="rounded-2xl border border-line bg-bg/60 p-4 sm:p-6">
        <ul
          aria-label={scrollable ? `${label} — scroll for more` : label}
          // A scrollable region must be reachable by keyboard.
          tabIndex={scrollable ? 0 : undefined}
          className={list}
        >
          {images.map((image) => (
            <li key={image.src} className={item}>
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes={sizes}
                className="h-auto w-full transition-transform duration-500 ease-out-quart group-hover:-translate-y-1"
              />
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="mt-3 text-xs text-subtle">{caption}</figcaption>
    </figure>
  );
}
