import Image from "next/image";
import type { ScreenshotMedia } from "@/content/types";

export function ScreenshotStrip({ media, sizes }: { media: ScreenshotMedia; sizes: string }) {
  return (
    <figure>
      <ul className="grid grid-cols-3 gap-3 rounded-lg border border-line bg-surface p-4 sm:gap-5 sm:p-6">
        {media.images.map((image) => (
          <li key={image.src}>
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
      <figcaption className="mt-3 text-xs text-subtle">{media.caption}</figcaption>
    </figure>
  );
}
