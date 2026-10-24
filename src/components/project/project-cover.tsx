import Image from "next/image";
import type { Project } from "@/content/types";
import { ArchitectureDiagram } from "./architecture-diagram";
import { ScreenshotStrip } from "./screenshot-strip";

/**
 * The visual on a project card: the lead slide, a strip of phone screenshots,
 * or — when there are no screenshots yet — the architecture diagram.
 */
export function ProjectCover({
  project,
  variant,
}: {
  project: Project;
  variant: "feature" | "compact";
}) {
  const { screenshots, diagram, title } = project;

  if (screenshots?.format === "slides") {
    const [lead] = screenshots.images;
    return (
      <figure>
        <div className="overflow-hidden rounded-2xl border border-line shadow-[0_30px_80px_-30px_rgb(61_139_255/0.45)] transition-colors duration-300 group-hover:border-line-strong">
          <Image
            src={lead.src}
            alt={lead.alt}
            width={lead.width}
            height={lead.height}
            sizes="(min-width: 1240px) 680px, (min-width: 1024px) 55vw, calc(100vw - 2rem)"
            className="h-auto w-full transition-transform duration-700 ease-out-quart group-hover:scale-[1.015]"
          />
        </div>
        <figcaption className="mt-3 text-xs text-subtle">
          {screenshots.caption} {screenshots.images.length} screens in the case study.
        </figcaption>
      </figure>
    );
  }

  if (screenshots?.format === "phones") {
    const compact = variant === "compact";
    return (
      <ScreenshotStrip
        images={compact ? screenshots.images : screenshots.images.slice(0, 3)}
        caption={screenshots.caption}
        label={`${title} screenshots`}
        scrollable={compact && screenshots.images.length > 3}
        sizes={
          compact
            ? "(min-width: 1024px) 170px, (min-width: 768px) 25vw, 28vw"
            : "(min-width: 1024px) 210px, 30vw"
        }
      />
    );
  }

  return diagram ? <ArchitectureDiagram diagram={diagram} title={title} /> : null;
}
