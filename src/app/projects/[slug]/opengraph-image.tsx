import { profile } from "@/content/profile";
import { caseStudies, getProject } from "@/content/projects";
import { ogSize, renderOgImage } from "@/lib/og-image";

export const alt = "Case study by Yousef Mohamed Kandeel";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return caseStudies.map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);

  return renderOgImage({
    eyebrow: `Case study · ${profile.shortName}`,
    title: project?.title ?? profile.name,
    subtitle: project?.tagline ?? profile.title,
  });
}
