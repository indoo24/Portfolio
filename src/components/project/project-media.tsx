import type { ProjectMedia as Media } from "@/content/types";
import { ArchitectureDiagram } from "./architecture-diagram";
import { ScreenshotStrip } from "./screenshot-strip";

export function ProjectMedia({
  media,
  title,
  sizes,
}: {
  media: Media;
  title: string;
  /** `sizes` for one screenshot in the strip; ignored for diagrams. */
  sizes: string;
}) {
  return media.kind === "diagram" ? (
    <ArchitectureDiagram media={media} title={title} />
  ) : (
    <ScreenshotStrip media={media} sizes={sizes} />
  );
}
