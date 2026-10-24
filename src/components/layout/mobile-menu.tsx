"use client";

import { Menu, X } from "lucide-react";
import { Suspense, lazy, useEffect, useId, useRef, useState } from "react";
import type { LinkItem } from "@/content/types";

// The animated panel (and Motion with it) is only fetched when the menu is
// about to be used, keeping it out of every page's initial JavaScript.
const loadPanel = () => import("./mobile-menu-panel");
const MenuPanel = lazy(loadPanel);

export function MobileMenu({ items }: { items: LinkItem[] }) {
  const [open, setOpen] = useState(false);
  const [used, setUsed] = useState(false);
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
        onPointerEnter={loadPanel}
        onFocus={loadPanel}
        onClick={() => {
          setUsed(true);
          setOpen((value) => !value);
        }}
        className="grid size-11 place-items-center rounded-full border border-line-strong text-fg transition-colors hover:bg-raised"
      >
        {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>

      {used && (
        <Suspense fallback={null}>
          <MenuPanel open={open} id={panelId} items={items} onClose={() => setOpen(false)} />
        </Suspense>
      )}
    </div>
  );
}
