import { caseStudies, otherProjects } from "@/content/projects";
import { ProjectCard } from "@/components/project/project-card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="relative isolate overflow-x-clip py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute top-40 -left-60 -z-10 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgb(1_87_155/0.35),transparent)]"
      />
      <Container>
        <SectionHeading
          id="work-title"
          index="01"
          label="Selected work"
          title={
            <>
              Apps built against <span className="text-gradient">real backends.</span>
            </>
          }
          intro="Three projects where most of the work happened between the screen and the server. Each one has a case study with the decisions behind it."
        />

        <div className="mt-14 space-y-8">
          {caseStudies.map((project, index) => (
            <ProjectCard key={project.slug} project={project} variant="feature" index={index} />
          ))}
        </div>

        <div className="mt-20">
          <h3 className="font-display text-2xl font-bold tracking-tight">More projects</h3>
          <ul className="mt-8 grid gap-6 md:grid-cols-2">
            {otherProjects.map((project) => (
              <li
                key={project.slug}
                className={project.screenshots || project.diagram ? undefined : "md:col-span-2"}
              >
                <ProjectCard project={project} variant="compact" />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
