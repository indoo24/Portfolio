import Image from "next/image";
import type { ScreenshotSet } from "@/content/types";

/**
 * Every screenshot of a project, for its case-study page. Each image links to
 * the full-size file so details stay readable on small screens.
 */
export function ScreenshotGallery({
  screenshots,
  title,
}: {
  screenshots: ScreenshotSet;
  title: string;
}) {
  const slides = screenshots.format === "slides";

  return (
    <figure>
      <ul
        aria-label={`${title} screenshots`}
        className={
          slides
            ? "grid gap-4 md:grid-cols-2 md:gap-6"
            : "glass grid grid-cols-2 gap-4 rounded-3xl p-4 sm:grid-cols-3 sm:gap-6 sm:p-8 lg:grid-cols-4"
        }
      >
        {screenshots.images.map((image, index) => (
          <li key={image.src}>
            <a
              href={image.src}
              target="_blank"
              rel="noopener noreferrer"
              className={`group block ${slides ? "overflow-hidden rounded-2xl border border-line transition-colors hover:border-accent/50" : ""}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes={
                  slides
                    ? "(min-width: 1240px) 580px, (min-width: 768px) 46vw, calc(100vw - 2rem)"
                    : "(min-width: 1024px) 260px, (min-width: 640px) 30vw, 45vw"
                }
                // The first image sits just below the header: fetch it early.
                {...(index === 0 ? { loading: "eager", fetchPriority: "high" } : {})}
                className={`h-auto w-full transition-transform duration-500 ease-out-quart ${slides ? "group-hover:scale-[1.015]" : "group-hover:-translate-y-1"}`}
              />
              <span className="sr-only"> — open full size (opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
      <figcaption className="mt-3 text-xs text-subtle">
        {screenshots.caption} Select any screen to view it full size.
      </figcaption>
    </figure>
  );
}
