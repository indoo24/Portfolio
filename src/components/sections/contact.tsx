import { ArrowUpRight, FileText, Mail } from "lucide-react";
import type { ReactNode } from "react";
import { profile } from "@/content/profile";
import { FlutterSky } from "@/components/brand/flutter-sky";
import { PointerField } from "@/components/brand/pointer-field";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { FlutterLogo } from "@/components/brand/flutter-logo";
import { CopyEmailButton } from "./copy-email-button";

export function Contact() {
  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent("Project inquiry")}`;

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-24 lg:py-32">
      <Container>
        <PointerField className="reveal glass relative isolate overflow-hidden rounded-[2.5rem] px-5 py-16 text-center sm:px-10 lg:py-24">
          <div aria-hidden="true" className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgb(61_139_255/0.35),transparent_65%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(480px_circle_at_var(--px,50%)_var(--py,40%),rgb(92_200_255/0.12),transparent_60%)]" />
            <FlutterSky count={12} seed={21} intensity={0.6} />
          </div>

          <p className="glass label mx-auto inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5">
            <FlutterLogo className="h-3.5 w-auto" />
            <span className="text-accent">04</span>
            <span aria-hidden="true">/</span>
            <span className="sr-only">: </span>
            Contact
          </p>

          <h2
            id="contact-title"
            className="mx-auto mt-6 max-w-3xl font-display text-title font-bold tracking-[-0.03em] text-balance"
          >
            Have a mobile app to build — <span className="text-gradient">or one to fix?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-pretty text-muted">
            I take on freelance Flutter work — new apps, backend integration, and stabilizing
            existing codebases — and I&apos;m open to full-time Flutter and software engineering
            roles. Tell me what you&apos;re building and where it&apos;s stuck.
          </p>

          <a
            href={mailto}
            className="mt-10 inline-flex max-w-full items-center justify-center gap-3 font-display text-[clamp(1.25rem,0.8rem+2.6vw,2.6rem)] font-bold break-all transition-colors hover:text-accent"
          >
            <Mail
              aria-hidden="true"
              className="hidden size-[0.8em] shrink-0 text-accent sm:block"
            />
            {profile.email}
          </a>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href={mailto}>
              Email me
              <ArrowUpRight aria-hidden="true" size={16} />
            </ButtonLink>
            <CopyEmailButton email={profile.email} />
          </div>

          <ul className="mx-auto mt-12 grid max-w-3xl gap-3 text-left sm:grid-cols-3">
            <ContactLink href={profile.linkedin} label="LinkedIn" detail="Experience & updates">
              <LinkedInIcon size={18} />
            </ContactLink>
            <ContactLink href={profile.github} label="GitHub" detail="Source for these projects">
              <GitHubIcon size={18} />
            </ContactLink>
            {profile.resumeUrl && (
              <ContactLink href={profile.resumeUrl} label="Résumé" detail="View on Google Drive">
                <FileText aria-hidden="true" size={18} />
              </ContactLink>
            )}
          </ul>
        </PointerField>
      </Container>
    </section>
  );
}

function ContactLink({
  href,
  label,
  detail,
  children,
}: {
  href: string;
  label: string;
  detail: string;
  children: ReactNode;
}) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group glass glow-border flex h-full items-center justify-between gap-4 rounded-2xl p-4 transition-[translate] duration-300 hover:-translate-y-0.5"
      >
        <span className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-accent/10 text-accent">
            {children}
          </span>
          <span>
            <span className="block font-semibold">{label}</span>
            <span className="block text-xs text-subtle">{detail}</span>
          </span>
        </span>
        <ArrowUpRight
          aria-hidden="true"
          size={16}
          className="text-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
        />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </li>
  );
}
