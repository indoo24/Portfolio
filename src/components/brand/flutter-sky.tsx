import type { CSSProperties } from "react";
import { FlutterLogo } from "./flutter-logo";

type Flyer = {
  x: number; // horizontal start, % of the container
  y: number; // resting position when motion is reduced, %
  size: number; // px
  duration: number; // s
  delay: number; // s (negative: already mid-flight on load)
  drift: number; // px of sideways travel
  spin: number; // deg of rotation over the flight
  opacity: number;
  depth: number; // pointer-parallax strength
};

// Small deterministic PRNG so server output is identical on every build.
function random(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function createFlyers(count: number, seed: number, intensity: number): Flyer[] {
  const next = random(seed);
  return Array.from({ length: count }, (_, index) => {
    // Spread start positions evenly, then jitter, so logos never clump.
    const lane = (index + next() * 0.8) / count;
    const near = next();
    const duration = 26 - near * 12;
    return {
      x: Math.round(lane * 96),
      y: Math.round(8 + next() * 80),
      size: Math.round(14 + near * near * 46),
      duration: Math.round(duration),
      delay: -Math.round(next() * duration),
      drift: Math.round((next() - 0.5) * 220),
      spin: Math.round((next() - 0.5) * 140),
      opacity: Number(((0.12 + near * 0.42) * intensity).toFixed(2)),
      depth: Math.round(6 + near * 26),
    };
  });
}

/**
 * Decorative field of Flutter logos drifting upward. Pure CSS animation;
 * logos rest in place when the visitor prefers reduced motion. Pointer
 * parallax reads --mx/--my set by an ancestor PointerField.
 */
export function FlutterSky({
  count = 14,
  seed = 7,
  intensity = 1,
}: {
  count?: number;
  seed?: number;
  /** Opacity multiplier; lower it where logos pass behind body text. */
  intensity?: number;
}) {
  const flyers = createFlyers(count, seed, intensity);

  return (
    <div
      aria-hidden="true"
      className="flutter-sky pointer-events-none absolute inset-0 overflow-hidden"
    >
      {flyers.map((flyer, index) => (
        <span
          key={index}
          className="fly"
          style={
            {
              "--x": `${flyer.x}%`,
              "--y": `${flyer.y}%`,
              "--size": `${flyer.size}px`,
              "--dur": `${flyer.duration}s`,
              "--delay": `${flyer.delay}s`,
              "--drift": `${flyer.drift}px`,
              "--spin": `${flyer.spin}deg`,
              "--o": flyer.opacity,
            } as CSSProperties
          }
        >
          <span
            className="block transition-transform duration-700 ease-out"
            style={{
              transform: `translate3d(calc(var(--mx, 0) * ${flyer.depth}px), calc(var(--my, 0) * ${flyer.depth}px), 0)`,
            }}
          >
            <FlutterLogo className="h-auto w-full drop-shadow-[0_6px_18px_rgb(84_197_248/0.35)]" />
          </span>
        </span>
      ))}
    </div>
  );
}
