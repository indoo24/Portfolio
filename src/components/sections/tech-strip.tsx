import { FlutterLogo } from "@/components/brand/flutter-logo";
import { techStrip } from "@/content/skills";

/** Endless scrolling strip of technologies. The second copy only completes the loop. */
export function TechStrip() {
  return (
    <section
      aria-label="Technologies I work with"
      className="relative overflow-hidden border-y border-line bg-surface/60 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] py-5"
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex shrink-0">
            {techStrip.map((tech) => (
              <li
                key={tech}
                className="flex items-center gap-3 px-6 font-display text-lg font-semibold whitespace-nowrap text-muted"
              >
                <FlutterLogo className="h-4 w-auto opacity-80" />
                {tech}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
