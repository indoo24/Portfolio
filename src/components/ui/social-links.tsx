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
            className="glass grid size-11 place-items-center rounded-full text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent"
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
