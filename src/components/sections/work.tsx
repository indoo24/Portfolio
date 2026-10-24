import { caseStudies, otherProjects } from "@/content/projects";
import { ProjectCard } from "@/components/project/project-card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          id="work-title"
          index="01"
          label="Selected work"
          title="Apps built against real backends."
          intro="Three projects where most of the work happened between the screen and the server. Each one has a case study with the decisions behind it."
        />

        <div className="mt-12">
          {caseStudies.map((project, index) => (
            <ProjectCard key={project.slug} project={project} variant="feature" index={index} />
          ))}
        </div>

        <div className="border-t border-line pt-10">
          <h3 className="label">More projects</h3>
          <ul className="mt-6 grid gap-5 md:grid-cols-2">
            {otherProjects.map((project) => (
              <li key={project.slug} className={project.media ? "md:row-span-2" : undefined}>
                <ProjectCard project={project} variant="compact" />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
