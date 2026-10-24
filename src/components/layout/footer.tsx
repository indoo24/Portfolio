import Link from "next/link";
import { navigation, profile } from "@/content/profile";
import { FlutterLogo } from "@/components/brand/flutter-logo";
import { Container } from "@/components/ui/container";
import { SocialLinks } from "@/components/ui/social-links";

// Evaluated when the page is prerendered, so it updates on every deploy.
const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-surface/40 py-12">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-accent to-transparent"
      />
      <Container className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <p className="font-display text-2xl font-bold tracking-tight">{profile.name}</p>
          <p className="flex items-center gap-2 text-sm text-muted">
            <FlutterLogo className="h-4 w-auto" />
            {profile.title}
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-4 md:text-right">
          <SocialLinks className="md:justify-end" />
          <p className="text-xs text-subtle">
            © {year} {profile.name}
          </p>
        </div>
      </Container>
    </footer>
  );
}
