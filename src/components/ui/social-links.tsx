import { Mail } from "lucide-react";
import { profile } from "@/content/profile";
import { GitHubIcon, LinkedInIcon } from "./brand-icons";

const links = [
  { label: "GitHub", href: profile.github, icon: GitHubIcon, external: true },
  {
    label: "LinkedIn",
    href: profile.linkedin,
    icon: LinkedInIcon,
    external: true,
  },
  {
    label: "Email",
    href: `mailto:${profile.email}`,
    icon: (props: { size?: number }) => <Mail aria-hidden="true" {...props} />,
    external: false,
  },
];

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {links.map(({ label, href, icon: Icon, external }) => (
        <li key={label}>
          <a
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="grid size-11 place-items-center rounded-full border border-line-strong text-muted transition-colors hover:border-fg hover:text-fg"
          >
            <Icon size={17} />
            <span className="sr-only">
              {label}
              {external ? " (opens in a new tab)" : ""}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
