import { aboutParagraphs, experience, principles } from "@/content/about";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          id="about-title"
          index="02"
          label="About"
          title="I build the app — and learn the system behind it."
        />

        <div className="mt-12 grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="space-y-5 text-lg text-pretty md:col-span-7 md:col-start-4 lg:col-span-6 lg:col-start-4">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph} className="reveal first:text-fg [&:not(:first-child)]:text-muted">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="md:col-span-9 md:col-start-4 lg:col-span-3 lg:col-start-10">
            <h3 className="label">How I work</h3>
            <ol className="mt-5 divide-y divide-line border-y border-line">
              {principles.map((principle, index) => (
                <li key={principle.title} className="reveal py-4">
                  <p className="flex gap-3">
                    <span aria-hidden="true" className="font-mono text-xs text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-medium">{principle.title}</span>
                  </p>
                  <p className="mt-1.5 pl-7 text-sm text-muted">{principle.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div
          id="experience"
          className="reveal mt-20 grid gap-6 rounded-lg border border-line bg-surface p-6 sm:p-8 md:grid-cols-12 md:gap-10"
        >
          <div className="md:col-span-4">
            <h3 className="label">Experience</h3>
            <p className="mt-4 font-serif text-3xl">{experience.role}</p>
            <p className="mt-1 text-muted">{experience.company}</p>
            <p className="mt-3 inline-flex items-center gap-2 font-mono text-xs text-accent">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
              {experience.period}
            </p>
          </div>
          <ul className="space-y-4 md:col-span-8">
            {experience.contributions.map((item) => (
              <li key={item} className="flex gap-3 text-pretty">
                <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-line-strong" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
