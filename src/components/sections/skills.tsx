import { Database, Layers, Plug, Smartphone, Wrench } from "lucide-react";
import { skillGroups } from "@/content/skills";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

// One icon per group, in the order they appear in content/skills.ts.
const groupIcons = [Smartphone, Layers, Plug, Database, Wrench];

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="relative isolate overflow-x-clip py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/3 -z-10 mx-auto h-[30rem] max-w-4xl rounded-full bg-[radial-gradient(closest-side,rgb(1_87_155/0.3),transparent)]"
      />
      <Container>
        <SectionHeading
          id="skills-title"
          index="03"
          label="Skills"
          align="center"
          title={
            <>
              Tools I use, <span className="text-gradient">and where I&apos;ve used them.</span>
            </>
          }
          intro="No percentage bars — each skill points to the projects in which it appears."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => {
            const Icon = groupIcons[index] ?? Wrench;
            return (
              <section
                key={group.title}
                aria-labelledby={`skills-${index}`}
                className={`reveal glass glow-border rounded-3xl p-6 transition-[translate] duration-500 hover:-translate-y-1 sm:p-7 ${
                  index === skillGroups.length - 1 && skillGroups.length % 3 === 2
                    ? "lg:col-span-2"
                    : ""
                }`}
              >
                <h3 id={`skills-${index}`} className="flex items-center gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-accent/25 to-accent-2/10 text-accent">
                    <Icon aria-hidden="true" size={20} />
                  </span>
                  <span className="font-display text-xl font-bold tracking-tight">
                    {group.title}
                  </span>
                </h3>
                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="rounded-xl border border-line bg-bg/50 px-3 py-2 transition-colors hover:border-accent/50"
                    >
                      <span className="text-sm font-medium">{item.name}</span>
                      {item.usedIn && (
                        <span className="mt-0.5 block font-mono text-[0.65rem] text-subtle">
                          <span className="sr-only">Used in: </span>
                          {item.usedIn.join(" · ")}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
