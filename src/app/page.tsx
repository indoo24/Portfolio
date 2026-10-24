import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";
import { Work } from "@/components/sections/work";
import { profile } from "@/content/profile";
import { jsonLd } from "@/lib/json-ld";
import { absoluteUrl } from "@/lib/site";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": absoluteUrl("/#person"),
      name: profile.name,
      alternateName: profile.alternateName,
      jobTitle: profile.roles,
      worksFor: { "@type": "Organization", name: profile.currentRole.company },
      email: `mailto:${profile.email}`,
      url: absoluteUrl("/"),
      sameAs: [profile.github, profile.linkedin],
      knowsAbout: ["Flutter", "Dart", "Mobile application development", "REST APIs", "Firebase"],
    },
    {
      "@type": "WebSite",
      name: profile.name,
      url: absoluteUrl("/"),
      author: { "@id": absoluteUrl("/#person") },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />
      <Hero />
      <Work />
      <About />
      <Skills />
      <Contact />
    </>
  );
}
