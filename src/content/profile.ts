import type { LinkItem, Profile } from "./types";

export const profile: Profile = {
  name: "Yousef Mohamed Kandeel",
  alternateName: "Yousef Mohamed Qandeel",
  shortName: "Yousef Kandeel",
  title: "Flutter Developer & Software Engineer",
  roles: ["Flutter Developer", "Software Engineer"],
  intro:
    "I build Flutter apps that hold up in real use — wired to real backends, structured so they stay maintainable, and tested against the contracts they depend on.",
  email: "yousef.qandeel24@gmail.com",
  github: "https://github.com/indoo24",
  linkedin: "https://www.linkedin.com/in/yousef-mohamed-qandeel-ab59b4223",
  resumeUrl:
    "https://drive.google.com/file/d/1hn7A0hGwewC01jwB5xApcpLyn8ZPahR9/view?usp=drive_link",
  availability: {
    open: true,
    label: "Open to roles & freelance work",
  },
  currentRole: {
    title: "Mobile Developer",
    company: "Scenario Marketing Agency",
  },
};

export const navigation: LinkItem[] = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];
