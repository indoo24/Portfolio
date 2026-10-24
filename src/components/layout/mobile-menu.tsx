"use client";

import Link from "next/link";
import { AnimatePresence, LazyMotion, domAnimation, m } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { LinkItem } from "@/content/types";

export function MobileMenu({ items }: { items: LinkItem[] }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    // Close when the viewport grows past the mobile breakpoint.
    const desktop = window.matchMedia("(min-width: 768px)");
    function onBreakpoint(event: MediaQueryListEvent) {
      if (event.matches) setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  function onBlur(event: React.FocusEvent<HTMLDivElement>) {
    // Disclosure pattern: close once keyboard focus leaves the menu.
    if (open && !rootRef.current?.contains(event.relatedTarget as Node | null)) {
      setOpen(false);
    }
  }

  return (
    <div ref={rootRef} onBlur={onBlur} className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="grid size-11 place-items-center rounded-full border border-line-strong text-fg transition-colors hover:bg-raised"
      >
        {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>

      <LazyMotion features={domAnimation} strict>
        <AnimatePresence>
          {open && (
            <>
              <m.div
                aria-hidden="true"
                className="fixed inset-x-0 top-16 bottom-0 bg-bg/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setOpen(false)}
              />
              <m.nav
                id={panelId}
                aria-label="Mobile"
                className="absolute inset-x-0 top-16 border-b border-line bg-surface"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
              >
                <ul className="px-4 py-3 sm:px-6">
                  {items.map((item, index) => (
                    <li key={item.href} className="border-b border-line last:border-0">
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex min-h-14 items-center justify-between font-serif text-3xl"
                      >
                        {item.label}
                        <span className="font-mono text-xs text-subtle" aria-hidden="true">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </Link>
                    </li>
                  ))}
                  <li className="pt-4 pb-2 sm:hidden">
                    <Link
                      href="/#contact"
                      onClick={() => setOpen(false)}
                      className="flex min-h-12 items-center justify-center rounded-full bg-accent text-sm font-medium text-accent-ink"
                    >
                      Hire me
                    </Link>
                  </li>
                </ul>
              </m.nav>
            </>
          )}
        </AnimatePresence>
      </LazyMotion>
    </div>
  );
}
