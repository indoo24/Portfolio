import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/projects";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    ...caseStudies.map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
