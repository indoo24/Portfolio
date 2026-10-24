import { ArrowDown, FileText } from "lucide-react";
import type { CSSProperties } from "react";
import { heroLog, profile } from "@/content/profile";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SocialLinks } from "@/components/ui/social-links";

// CSS-only entrance: content is server-rendered and visible without JavaScript.
// The heading itself is not animated so the LCP element paints immediately.
function rise(step: number): CSSProperties {
  return { animationDelay: `${120 + step * 90}ms` };
}

export function Hero() {
  const [firstName, ...rest] = profile.name.split(" ");
  const lastName = rest.pop();

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10" />
      <Container className="grid gap-14 pt-12 pb-20 sm:pt-20 lg:grid-cols-12 lg:gap-10 lg:pt-28 lg:pb-28">
        <div className="lg:col-span-7">
          {profile.availability.open && (
            <p className="inline-flex animate-rise items-center gap-2.5 rounded-full border border-line-strong px-3 py-1.5 text-xs text-muted">
              <span aria-hidden="true" className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              {profile.availability.label}
            </p>
          )}

          <h1
            id="hero-title"
            className="mt-8 font-serif text-display tracking-[-0.025em] text-balance"
          >
            {firstName} {rest.join(" ")}
            <br />
            <em className="italic">{lastName}</em>
            <span className="text-accent">.</span>
          </h1>

          <p className="mt-8 animate-rise text-xl sm:text-2xl" style={rise(1)}>
            {profile.title}
          </p>
          <p className="mt-4 max-w-xl animate-rise text-lg text-pretty text-muted" style={rise(2)}>
            {profile.intro}
          </p>

          <div className="mt-10 flex animate-rise flex-wrap gap-3" style={rise(3)}>
            <ButtonLink href="/#work">
              Explore selected work
              <ArrowDown aria-hidden="true" size={16} />
            </ButtonLink>
            <ButtonLink href="/#contact" variant="secondary">
              Hire me for a project
            </ButtonLink>
          </div>

          <div className="mt-10 flex animate-rise flex-wrap items-center gap-4" style={rise(4)}>
            <SocialLinks />
            {profile.resumeUrl && (
              <ButtonLink href={profile.resumeUrl} variant="ghost" external>
                <FileText aria-hidden="true" size={16} />
                Résumé
              </ButtonLink>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 lg:pt-6">
          <BuildLog />
        </div>
      </Container>
    </section>
  );
}

function BuildLog() {
  return (
    <figure
      className="animate-rise overflow-hidden rounded-xl border border-line bg-surface shadow-[0_40px_120px_-40px_rgb(198_240_74/0.18)]"
      style={rise(2)}
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className="font-mono text-xs text-subtle">~/yousef/builds</span>
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="size-2 rounded-full bg-accent" />
        </span>
      </div>
      <ol className="space-y-4 p-5 font-mono text-[0.8rem] leading-relaxed sm:p-6">
        {heroLog.map((line, index) => (
          <li key={line.command} className="animate-rise" style={rise(4 + index * 2)}>
            <span aria-hidden="true" className="text-accent">
              ${" "}
            </span>
            <span className="text-fg">{line.command}</span>
            <span className="mt-1 block text-muted">
              <span aria-hidden="true" className="text-subtle">
                ↳{" "}
              </span>
              {line.note}
            </span>
          </li>
        ))}
        <li aria-hidden="true" className="animate-rise" style={rise(4 + heroLog.length * 2)}>
          <span className="text-accent">$ </span>
          <span className="inline-block h-4 w-2 translate-y-0.5 animate-blink bg-fg" />
        </li>
      </ol>
      <figcaption className="border-t border-line px-4 py-3 font-mono text-[0.7rem] text-subtle">
        fig. 01 — notes from recent builds, taken from each project&apos;s repository
      </figcaption>
    </figure>
  );
}
