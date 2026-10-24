import Link from "next/link";
import { navigation, profile } from "@/content/profile";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/95">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="flex items-center gap-3 text-sm font-medium tracking-tight"
          aria-label={`${profile.name} — home`}
        >
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-sm border border-line-strong font-mono text-[0.7rem] text-accent"
          >
            YK
          </span>
          <span className="hidden min-[360px]:inline">{profile.shortName}</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm text-muted">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href="/#contact" className="hidden h-10 min-h-10 sm:inline-flex">
            Hire me
          </ButtonLink>
          <MobileMenu items={navigation} />
        </div>
      </Container>
    </header>
  );
}
