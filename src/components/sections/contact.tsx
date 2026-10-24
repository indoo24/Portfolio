import { ArrowUpRight, FileText, Mail } from "lucide-react";
import { profile } from "@/content/profile";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CopyEmailButton } from "./copy-email-button";

export function Contact() {
  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent("Project inquiry")}`;

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          id="contact-title"
          index="04"
          label="Contact"
          title={
            <>
              Have a mobile app to build — <em className="text-accent italic">or one to fix?</em>
            </>
          }
          intro="I take on freelance Flutter work — new apps, backend integration, and stabilizing existing codebases — and I'm open to full-time Flutter and software engineering roles. Tell me what you're building and where it's stuck."
        />

        <div className="reveal mt-12 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-9 md:col-start-4">
            <p className="label">Email is the fastest way to reach me</p>
            <a
              href={mailto}
              className="mt-4 inline-flex max-w-full items-center gap-3 font-serif text-[clamp(1.6rem,1rem+3.4vw,3.5rem)] break-all underline decoration-line-strong decoration-1 underline-offset-8 transition-colors hover:text-accent hover:decoration-accent"
            >
              <Mail aria-hidden="true" className="hidden size-[0.7em] shrink-0 sm:block" />
              {profile.email}
            </a>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={mailto}>
                Email me
                <ArrowUpRight aria-hidden="true" size={16} />
              </ButtonLink>
              <CopyEmailButton email={profile.email} />
            </div>

            <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
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
          </div>
        </div>
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
  children: React.ReactNode;
}) {
  return (
    <li className="bg-bg">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-full items-center justify-between gap-4 p-5 transition-colors hover:bg-raised"
      >
        <span className="flex items-center gap-3">
          <span className="text-muted group-hover:text-fg">{children}</span>
          <span>
            <span className="block">{label}</span>
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
