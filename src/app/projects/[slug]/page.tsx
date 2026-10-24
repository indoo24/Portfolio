import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProjectLinks } from "@/components/project/project-card";
import { ArchitectureDiagram } from "@/components/project/architecture-diagram";
import { ScreenshotGallery } from "@/components/project/screenshot-gallery";
import { Container } from "@/components/ui/container";
import { StatusBadge, TagList } from "@/components/ui/tag-list";
import { profile } from "@/content/profile";
import { caseStudies, getProject, statusLabels } from "@/content/projects";
import { absoluteUrl } from "@/lib/site";
import { jsonLd } from "@/lib/json-ld";

export function generateStaticParams() {
  return caseStudies.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.caseStudy) return {};

  const title = `${project.title} case study`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      url: `/projects/${project.slug}`,
      title: `${title} — ${profile.name}`,
      description: project.summary,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${profile.name}`,
      description: project.summary,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.caseStudy) notFound();

  const { caseStudy } = project;
  const position = caseStudies.findIndex((item) => item.slug === project.slug);
  const next = caseStudies[(position + 1) % caseStudies.length];

  // Sections are numbered in render order; the diagram section is optional.
  let sectionCount = 0;
  const sectionIndex = () => String(++sectionCount).padStart(2, "0");

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.summary,
    url: absoluteUrl(`/projects/${project.slug}`),
    codeRepository: project.links.source,
    programmingLanguage: "Dart",
    runtimePlatform: "Flutter",
    author: { "@type": "Person", name: profile.name, url: absoluteUrl("/") },
  };

  return (
    <article aria-labelledby="case-title">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />

      <header className="relative isolate overflow-hidden border-b border-line">
        <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10" />
        <Container className="pt-10 pb-14 lg:pt-14 lg:pb-20">
          <Link
            href="/#work"
            className="inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
          >
            <ArrowLeft aria-hidden="true" size={16} />
            All work
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <p className="label">Case study {String(position + 1).padStart(2, "0")}</p>
                {project.status && <StatusBadge>{statusLabels[project.status]}</StatusBadge>}
              </div>
              <h1
                id="case-title"
                className="mt-5 font-serif text-display tracking-[-0.025em] text-balance"
              >
                {project.title}
              </h1>
              <p className="mt-6 max-w-2xl text-xl text-pretty sm:text-2xl">{project.tagline}</p>
              <p className="mt-4 max-w-2xl text-lg text-pretty text-muted">{project.summary}</p>
            </div>

            <dl className="grid content-start gap-5 text-sm sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1 lg:border-l lg:border-line lg:pl-8">
              <Meta term="Role" value={project.role} />
              <Meta term="Context" value={project.context} />
              <Meta term="Period" value={project.period} />
              <Meta term="Platforms" value={project.platforms.join(", ")} />
            </dl>
          </div>

          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <TagList items={project.stack} label={`${project.title} technology stack`} />
            <ProjectLinks project={project} />
          </div>
        </Container>
      </header>

      <Container className="py-16 lg:py-24">
        {project.screenshots && (
          <section aria-labelledby="screens-title">
            <h2 id="screens-title" className="sr-only">
              Screens
            </h2>
            <ScreenshotGallery screenshots={project.screenshots} title={project.title} />
          </section>
        )}

        <CaseSection index={sectionIndex()} title="Overview">
          <div className="space-y-5 text-lg text-pretty">
            {caseStudy.overview.map((paragraph) => (
              <p key={paragraph} className="first:text-fg [&:not(:first-child)]:text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </CaseSection>

        <CaseSection index={sectionIndex()} title="What I built">
          <ul className="space-y-4">
            {project.highlights.map((item) => (
              <li key={item} className="flex gap-3 text-pretty">
                <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CaseSection>

        {project.diagram && (
          <CaseSection index={sectionIndex()} title={project.diagram.title}>
            <ArchitectureDiagram diagram={project.diagram} title={project.title} />
          </CaseSection>
        )}

        <CaseSection index={sectionIndex()} title="Problems & decisions">
          <ol className="divide-y divide-line border-y border-line">
            {caseStudy.decisions.map((item, index) => (
              <li key={item.title} className="reveal grid gap-4 py-8 md:grid-cols-12 md:gap-6">
                <h3 className="flex gap-3 font-serif text-2xl md:col-span-4">
                  <span aria-hidden="true" className="pt-2 font-mono text-xs text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.title}
                </h3>
                <div className="space-y-4 text-pretty md:col-span-8">
                  <p>
                    <span className="label mr-2 block pb-1">Problem</span>
                    <span className="text-muted">{item.problem}</span>
                  </p>
                  <p>
                    <span className="label mr-2 block pb-1 text-accent">Decision</span>
                    {item.decision}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </CaseSection>

        <CaseSection index={sectionIndex()} title="Engineering practices">
          <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
            {caseStudy.practices.map((item) => (
              <li key={item} className="bg-bg p-5 text-sm text-pretty text-muted">
                {item}
              </li>
            ))}
          </ul>
        </CaseSection>

        <nav aria-label="More case studies" className="mt-24 border-t border-line pt-8">
          <Link
            href={`/projects/${next.slug}`}
            className="group flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
          >
            <span>
              <span className="label block">Next case study</span>
              <span className="mt-2 block font-serif text-title transition-colors group-hover:text-accent">
                {next.title}
              </span>
            </span>
            <ArrowRight
              aria-hidden="true"
              size={32}
              className="text-subtle transition-transform group-hover:translate-x-1 group-hover:text-accent"
            />
          </Link>
        </nav>
      </Container>
    </article>
  );
}

function Meta({ term, value }: { term: string; value: string }) {
  return (
    <div>
      <dt className="label">{term}</dt>
      <dd className="mt-1 text-base">{value}</dd>
    </div>
  );
}

function CaseSection({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  const id = `section-${index}`;
  return (
    <section aria-labelledby={id} className="mt-20 grid gap-6 md:grid-cols-12 md:gap-10 lg:mt-28">
      <h2 id={id} className="flex items-baseline gap-3 md:col-span-3">
        <span aria-hidden="true" className="font-mono text-xs text-accent">
          {index}
        </span>
        <span className="font-serif text-3xl">{title}</span>
      </h2>
      <div className="md:col-span-9">{children}</div>
    </section>
  );
}
