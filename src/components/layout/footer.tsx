import Link from "next/link";
import { navigation, profile } from "@/content/profile";
import { Container } from "@/components/ui/container";
import { SocialLinks } from "@/components/ui/social-links";

// Evaluated when the page is prerendered, so it updates on every deploy.
const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-line py-12">
      <Container className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <p className="font-serif text-3xl">{profile.name}</p>
          <p className="text-sm text-muted">{profile.title}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-fg">
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
