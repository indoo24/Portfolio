import Image from "next/image";
import { Briefcase, FileCheck2, Languages, Server, WifiOff } from "lucide-react";
import { aboutParagraphs, experience, principles } from "@/content/about";
import { profile } from "@/content/profile";
import { FlutterLogo } from "@/components/brand/flutter-logo";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

// One icon per principle, in the order they appear in content/about.ts.
const principleIcons = [Server, WifiOff, FileCheck2, Languages];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative isolate overflow-x-clip py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute top-20 -right-60 -z-10 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(closest-side,rgb(61_139_255/0.22),transparent)]"
      />
      <Container>
        <SectionHeading
          id="about-title"
          index="02"
          label="About"
          title={
            <>
              I build the app —{" "}
              <span className="text-gradient">and learn the system behind it.</span>
            </>
          }
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <figure className="reveal lg:col-span-4">
            <div className="glass glow-border relative overflow-hidden rounded-[2rem] p-3">
              <div className="relative overflow-hidden rounded-[1.5rem] bg-[radial-gradient(circle_at_50%_30%,#1d3a7a,#0a1430_70%)]">
                <Image
                  src="/profile/yousef-kandeel.webp"
                  alt=""
                  width={720}
                  height={720}
                  sizes="(min-width: 1024px) 340px, (min-width: 640px) 50vw, 90vw"
                  className="mx-auto w-[86%] translate-y-[8%]"
                />
                <FlutterLogo className="absolute top-5 right-5 h-8 w-auto opacity-90" />
              </div>
              <figcaption className="px-3 pt-4 pb-2">
                <span className="block font-display text-lg font-bold">{profile.name}</span>
                <span className="block text-sm text-muted">
                  {profile.currentRole.title} · {profile.currentRole.company}
                </span>
              </figcaption>
            </div>
          </figure>

          <div className="lg:col-span-8">
            <div className="space-y-5 text-lg text-pretty">
              {aboutParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="reveal first:text-xl first:text-fg [&:not(:first-child)]:text-muted"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <h3 className="label mt-12">How I work</h3>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {principles.map((principle, index) => {
                const Icon = principleIcons[index] ?? Server;
                return (
                  <li
                    key={principle.title}
                    className="reveal glass glow-border rounded-2xl p-5 transition-[translate] duration-500 hover:-translate-y-1"
                  >
                    <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-accent/25 to-accent-2/10 text-accent">
                      <Icon aria-hidden="true" size={19} />
                    </span>
                    <p className="mt-4 font-display font-semibold">{principle.title}</p>
                    <p className="mt-1.5 text-sm text-muted">{principle.body}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div
          id="experience"
          className="reveal glass glow-border mt-16 grid gap-8 rounded-[2rem] p-6 sm:p-10 md:grid-cols-12 md:gap-10"
        >
          <div className="md:col-span-4">
            <h3 className="label">Experience</h3>
            <div className="mt-5 flex items-center gap-4">
              <span className="btn-gradient grid size-12 shrink-0 place-items-center rounded-2xl">
                <Briefcase aria-hidden="true" size={20} />
              </span>
              <div>
                <p className="font-display text-xl font-bold">{experience.role}</p>
                <p className="text-sm text-muted">{experience.company}</p>
              </div>
            </div>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
              <span aria-hidden="true" className="size-1.5 animate-pulse rounded-full bg-accent" />
              {experience.period}
            </p>
          </div>
          <ul className="relative space-y-5 border-l border-line-strong pl-6 md:col-span-8">
            {experience.contributions.map((item) => (
              <li key={item} className="relative text-pretty">
                <span
                  aria-hidden="true"
                  className="absolute top-2 -left-[1.86rem] size-2.5 rounded-full bg-accent shadow-[0_0_12px_rgb(92_200_255/0.8)]"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
