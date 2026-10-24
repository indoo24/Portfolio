import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { statusLabels } from "@/content/projects";
import type { Project } from "@/content/types";
import { StatusBadge, TagList } from "@/components/ui/tag-list";
import { ProjectCover } from "./project-cover";

type ProjectCardProps = {
  project: Project;
  /** "feature" is the large case-study row; "compact" is the smaller grid card. */
  variant: "feature" | "compact";
  index?: number;
};

export function ProjectCard({ project, variant, index }: ProjectCardProps) {
  const headingId = `project-${project.slug}`;
  const caseStudyHref = project.caseStudy ? `/projects/${project.slug}` : undefined;

  if (variant === "compact") {
    return (
      <article
        aria-labelledby={headingId}
        className="group reveal flex h-full flex-col gap-5 rounded-lg border border-line p-5 transition-colors duration-300 hover:border-line-strong sm:p-6"
      >
        {project.status && <StatusBadge>{statusLabels[project.status]}</StatusBadge>}
        <div>
          <h3 id={headingId} className="font-serif text-3xl">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-muted">{project.tagline}</p>
        </div>
        <ProjectCover project={project} variant="compact" />
        <p className="text-sm text-pretty text-muted">{project.summary}</p>
        <div className="mt-auto space-y-5">
          <TagList items={project.stack} label={`${project.title} technology stack`} />
          <ProjectLinks project={project} />
        </div>
      </article>
    );
  }

  return (
    <article
      aria-labelledby={headingId}
      className="group reveal grid gap-8 border-t border-line py-10 lg:grid-cols-12 lg:gap-10 lg:py-14"
    >
      <div className="flex flex-col gap-6 lg:col-span-5">
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-xs text-subtle">
            {index !== undefined && String(index + 1).padStart(2, "0")}
          </span>
          {project.status && <StatusBadge>{statusLabels[project.status]}</StatusBadge>}
        </div>

        <div>
          <h3 id={headingId} className="font-serif text-4xl tracking-[-0.01em] sm:text-5xl">
            {caseStudyHref ? (
              <Link href={caseStudyHref} className="transition-colors hover:text-accent">
                {project.title}
              </Link>
            ) : (
              project.title
            )}
          </h3>
          <p className="mt-2 text-muted">{project.tagline}</p>
        </div>

        <p className="text-pretty">{project.summary}</p>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-y border-line py-5 text-sm">
          <MetaItem term="Role" value={project.role} />
          <MetaItem term="Context" value={project.context} />
          <MetaItem term="Period" value={project.period} />
          <MetaItem term="Platforms" value={project.platforms.join(", ")} />
        </dl>

        <TagList items={project.stack} label={`${project.title} technology stack`} />

        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
          {caseStudyHref && (
            <Link
              href={caseStudyHref}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-accent-ink transition-colors hover:bg-fg"
            >
              Read the case study
              <span className="sr-only">: {project.title}</span>
              <ArrowRight
                aria-hidden="true"
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          )}
          <ProjectLinks project={project} />
        </div>
      </div>

      {(project.screenshots || project.diagram) && (
        <div className="lg:col-span-7">
          <ProjectCover project={project} variant="feature" />
        </div>
      )}
    </article>
  );
}

function MetaItem({ term, value }: { term: string; value: string }) {
  return (
    <div>
      <dt className="label">{term}</dt>
      <dd className="mt-1">{value}</dd>
    </div>
  );
}

export function ProjectLinks({ project }: { project: Project }) {
  const links = [
    project.links.googlePlay && { label: "Google Play", href: project.links.googlePlay },
    project.links.source && { label: "Source code", href: project.links.source },
  ].filter((link): link is { label: string; href: string } => Boolean(link));

  if (links.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 text-muted underline-offset-4 transition-colors hover:text-fg hover:underline"
          >
            {link.label}
            <ArrowUpRight aria-hidden="true" size={15} />
            <span className="sr-only"> for {project.title} (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
