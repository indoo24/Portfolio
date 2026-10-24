export type LinkItem = {
  label: string;
  href: string;
};

export type Profile = {
  name: string;
  /** Alternate spelling used on GitHub and LinkedIn; exposed to search engines only. */
  alternateName: string;
  shortName: string;
  title: string;
  roles: string[];
  intro: string;
  email: string;
  github: string;
  linkedin: string;
  /** Set to null to hide every résumé link on the site. */
  resumeUrl: string | null;
  availability: {
    open: boolean;
    label: string;
  };
  currentRole: {
    title: string;
    company: string;
  };
};

export type ProjectStatus = "client" | "personal" | "in-development" | "concept";

export type ScreenshotMedia = {
  kind: "screenshots";
  images: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }[];
  caption: string;
};

export type DiagramMedia = {
  kind: "diagram";
  /** Ordered layers, top (UI) to bottom (backend). */
  layers: { label: string; detail: string }[];
  /** Side channels feeding back into the stack, e.g. realtime events. */
  channels?: { label: string; detail: string }[];
  caption: string;
};

export type ProjectMedia = ScreenshotMedia | DiagramMedia;

export type CaseStudyDecision = {
  title: string;
  problem: string;
  decision: string;
};

export type Project = {
  slug: string;
  title: string;
  /** One line used on cards and in metadata. */
  tagline: string;
  summary: string;
  /** Omitted when the project context is not confirmed. */
  status?: ProjectStatus;
  context: string;
  role: string;
  period: string;
  platforms: string[];
  stack: string[];
  highlights: string[];
  links: {
    source?: string;
    live?: string;
  };
  media?: ProjectMedia;
  /** Projects with a case study get a dedicated page under /projects/[slug]. */
  caseStudy?: {
    overview: string[];
    decisions: CaseStudyDecision[];
    practices: string[];
  };
  /**
   * Notes for the site owner about missing assets or facts. Never rendered;
   * listed in the README so they can be supplied later.
   */
  todo?: string[];
};

export type SkillGroup = {
  title: string;
  items: { name: string; usedIn?: string[] }[];
};
