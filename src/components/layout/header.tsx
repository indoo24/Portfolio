import Link from "next/link";
import { navigation, profile } from "@/content/profile";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/95">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3 text-sm font-medium tracking-tight">
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-sm border border-line-strong font-mono text-[0.7rem] text-accent"
          >
            YK
          </span>
          <span className="sr-only min-[360px]:not-sr-only">{profile.shortName}</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm text-muted">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center transition-colors hover:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href="/#contact" size="sm">
            Hire me
          </ButtonLink>
          <MobileMenu items={navigation} />
        </div>
      </Container>
    </header>
  );
}
