import Link from "next/link";
import { navigation, profile } from "@/content/profile";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  return (
    <header className="sticky top-0 z-40">
      {/*
        The blur sits on its own layer: backdrop-filter on the header itself
        would become the containing block for the mobile menu's fixed backdrop.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 border-b border-line/80 bg-bg/70 backdrop-blur-xl"
      />
      <div
        aria-hidden="true"
        className="scroll-progress absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-accent via-accent-2 to-accent"
      />

      <Container className="flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="group flex items-center gap-3 text-sm font-semibold tracking-tight"
        >
          <span
            aria-hidden="true"
            className="btn-gradient grid size-9 place-items-center rounded-xl font-display text-xs font-bold transition-transform duration-300 group-hover:rotate-6"
          >
            YK
          </span>
          <span className="sr-only min-[360px]:not-sr-only">{profile.shortName}</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm font-medium text-muted">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="relative inline-flex min-h-11 items-center transition-colors after:absolute after:inset-x-0 after:bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-accent after:to-accent-2 after:transition-transform after:duration-300 hover:text-fg hover:after:scale-x-100"
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
