"use client";

import { useEffect, useRef, type ComponentProps } from "react";

/**
 * Wraps a section and exposes the pointer position as CSS variables:
 * --mx/--my (-1…1, for parallax) and --px/--py (px, for spotlights).
 * Also sets data-paused while the section is off-screen so its CSS
 * animations stop consuming frames. Does nothing for touch-only devices or
 * when the visitor prefers reduced motion.
 */
export function PointerField({ children, ...props }: ComponentProps<"div">) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const visibility = new IntersectionObserver(([entry]) => {
      element.toggleAttribute("data-paused", !entry.isIntersecting);
    });
    visibility.observe(element);

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return () => visibility.disconnect();

    let frame = 0;
    function onMove(event: PointerEvent) {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = element!.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        element!.style.setProperty("--px", `${x}px`);
        element!.style.setProperty("--py", `${y}px`);
        element!.style.setProperty("--mx", ((x / rect.width) * 2 - 1).toFixed(3));
        element!.style.setProperty("--my", ((y / rect.height) * 2 - 1).toFixed(3));
      });
    }
    function onLeave() {
      element!.style.setProperty("--mx", "0");
      element!.style.setProperty("--my", "0");
    }

    element.addEventListener("pointermove", onMove);
    element.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      visibility.disconnect();
      element.removeEventListener("pointermove", onMove);
      element.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
}
