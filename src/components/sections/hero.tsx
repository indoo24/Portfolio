import Image from "next/image";
import { ArrowDown, FileText } from "lucide-react";
import type { CSSProperties } from "react";
import { FlutterLogo } from "@/components/brand/flutter-logo";
import { FlutterSky } from "@/components/brand/flutter-sky";
import { PointerField } from "@/components/brand/pointer-field";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SocialLinks } from "@/components/ui/social-links";
import { heroFacts, heroPhrases, orbitTech, profile } from "@/content/profile";

// CSS-only entrance: content is server-rendered and visible without JavaScript.
// The heading is not animated so the LCP element paints immediately.
function rise(step: number): CSSProperties {
  return { animationDelay: `${100 + step * 90}ms` };
}

export function Hero() {
  const [firstName, ...rest] = profile.name.split(" ");
  const lastName = rest.pop();

  return (
    <PointerField className="relative isolate overflow-hidden">
      <section aria-labelledby="hero-title">
        {/* Background: grid, glows, pointer spotlight and flying Flutter logos. */}
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="bg-grid absolute inset-0" />
          <div className="absolute -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(61_139_255/0.28),transparent)]" />
          <div className="absolute top-1/3 -right-40 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(closest-side,rgb(1_87_155/0.45),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(560px_circle_at_var(--px,70%)_var(--py,35%),rgb(92_200_255/0.10),transparent_60%)]" />
          <FlutterSky count={16} />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
        </div>

        <Container className="grid items-center gap-16 pt-14 pb-16 sm:pt-20 lg:grid-cols-12 lg:gap-10 lg:pt-24 lg:pb-20">
          <div className="lg:col-span-7">
            {profile.availability.open && (
              <p className="glass inline-flex animate-rise items-center gap-2.5 rounded-full px-3.5 py-1.5 text-xs text-muted">
                <span aria-hidden="true" className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70 motion-reduce:hidden" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent" />
                </span>
                {profile.availability.label}
              </p>
            )}

            <p className="mt-8 animate-rise font-mono text-sm text-accent" style={rise(0)}>
              Hi, I&apos;m
            </p>
            <h1
              id="hero-title"
              className="mt-3 font-display text-display font-bold tracking-[-0.035em] text-balance"
            >
              {firstName} {rest.join(" ")} <span className="text-gradient">{lastName}</span>
            </h1>

            <p
              className="mt-6 flex animate-rise items-center gap-3 text-lg font-medium sm:text-xl"
              style={rise(1)}
            >
              <FlutterLogo className="h-6 w-auto shrink-0" />
              {profile.title}
            </p>

            <p className="mt-5 animate-rise text-lg text-muted sm:text-xl" style={rise(2)}>
              <span className="sr-only">I build {heroPhrases.join(", ")}.</span>
              <span aria-hidden="true" className="flex flex-wrap gap-x-2">
                <span>I build</span>
                <span className="inline-block h-[1.5em] overflow-hidden align-bottom">
                  <span className="phrases block">
                    {heroPhrases.map((phrase) => (
                      <span key={phrase} className="block h-[1.5em] font-semibold text-fg">
                        {phrase}
                        <span className="text-accent">.</span>
                      </span>
                    ))}
                  </span>
                </span>
              </span>
            </p>

            <p className="mt-5 max-w-xl animate-rise text-pretty text-muted" style={rise(3)}>
              {profile.intro}
            </p>

            <div className="mt-9 flex animate-rise flex-wrap gap-3" style={rise(4)}>
              <ButtonLink href="/#work">
                Explore my work
                <ArrowDown aria-hidden="true" size={16} />
              </ButtonLink>
              <ButtonLink href="/#contact" variant="secondary">
                Hire me for a project
              </ButtonLink>
            </div>

            <div className="mt-8 flex animate-rise flex-wrap items-center gap-4" style={rise(5)}>
              <SocialLinks />
              {profile.resumeUrl && (
                <ButtonLink href={profile.resumeUrl} variant="ghost" external>
                  <FileText aria-hidden="true" size={16} />
                  Résumé
                </ButtonLink>
              )}
            </div>
          </div>

          <div className="lg:col-span-5">
            <Portrait />
          </div>
        </Container>

        <Container className="pb-16 lg:pb-24">
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {heroFacts.map((fact, index) => (
              <li
                key={fact.label}
                className="glass glow-border animate-rise rounded-2xl p-5 sm:p-6"
                style={rise(6 + index)}
              >
                <p className="font-display text-3xl font-bold sm:text-4xl">
                  <span className="text-gradient">{fact.value}</span>
                </p>
                <p className="mt-2 text-sm text-muted">{fact.label}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </PointerField>
  );
}

function Portrait() {
  return (
    // Not part of the staggered entrance: the photo can be the LCP element.
    <div className="[container-type:inline-size] relative mx-auto w-[min(62vw,380px)]">
      {/* Soft glow and orbit track. */}
      <div
        aria-hidden="true"
        className="absolute -inset-[18%] rounded-full bg-[radial-gradient(closest-side,rgb(61_139_255/0.42),transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute -inset-[13%] rounded-full border border-dashed border-line-strong"
      />

      {/* Rotating gradient ring: its own layer, spun with a compositor-only transform. */}
      <div className="relative aspect-square rounded-full shadow-[0_30px_90px_-20px_rgb(61_139_255/0.6)]">
        <div aria-hidden="true" className="ring-spin absolute inset-0 rounded-full" />
        <div className="absolute inset-[5px] overflow-hidden rounded-full bg-surface">
          <Image
            src="/profile/yousef-kandeel.webp"
            alt={`Portrait of ${profile.name}`}
            width={720}
            height={720}
            sizes="(min-width: 1024px) 380px, 62vw"
            loading="eager"
            fetchPriority="high"
            className="size-full object-cover"
          />
        </div>
      </div>

      {/* Technologies orbiting the portrait. */}
      <div aria-hidden="true" className="orbit absolute inset-0">
        {orbitTech.map((tech, index) => (
          <span
            key={tech}
            className="orbit-item"
            style={
              {
                "--a": `${index * (360 / orbitTech.length) + 20}deg`,
                "--r": "calc(50cqw + 13cqw)",
              } as CSSProperties
            }
          >
            <span className="glass flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[0.7rem] whitespace-nowrap text-fg shadow-lg">
              {tech === "Flutter" && <FlutterLogo className="h-3.5 w-auto" />}
              {tech}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
