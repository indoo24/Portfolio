import { skillGroups } from "@/content/skills";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          id="skills-title"
          index="03"
          label="Skills"
          title="Tools I use, and where I've used them."
          intro="No percentage bars — each skill points to the projects in which it appears."
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <section
              key={group.title}
              aria-labelledby={`skills-${index}`}
              className="reveal bg-bg p-6 sm:p-7"
            >
              <h3 id={`skills-${index}`} className="flex items-baseline gap-3">
                <span aria-hidden="true" className="font-mono text-xs text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-serif text-2xl">{group.title}</span>
              </h3>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <span>{item.name}</span>
                    {item.usedIn && (
                      <span className="mt-0.5 block font-mono text-[0.7rem] text-subtle">
                        <span className="sr-only">Used in: </span>
                        {item.usedIn.join(" · ")}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
          {/* Fills the last grid cell so the hairline grid stays even (5 groups → 6 cells). */}
          <div aria-hidden="true" className="hidden bg-bg md:block" />
        </div>
      </Container>
    </section>
  );
}
