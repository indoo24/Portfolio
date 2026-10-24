import { profile } from "@/content/profile";
import { ogSize, renderOgImage } from "@/lib/og-image";

export const alt = `${profile.name} — ${profile.title}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: "Portfolio",
    title: profile.name,
    subtitle: profile.title,
  });
}
