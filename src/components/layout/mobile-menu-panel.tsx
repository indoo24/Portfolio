"use client";

import Link from "next/link";
import { AnimatePresence, LazyMotion, domAnimation, m } from "motion/react";
import type { LinkItem } from "@/content/types";

type MenuPanelProps = {
  open: boolean;
  id: string;
  items: LinkItem[];
  onClose: () => void;
};

// Loaded on demand by MobileMenu so Motion stays out of the initial bundle.
export default function MenuPanel({ open, id, items, onClose }: MenuPanelProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      <AnimatePresence>
        {open && (
          <>
            <m.div
              aria-hidden="true"
              className="fixed inset-x-0 top-16 bottom-0 bg-bg/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
            />
            <m.nav
              id={id}
              aria-label="Mobile"
              className="absolute inset-x-0 top-16 border-b border-line bg-surface shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)]"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
            >
              <ul className="px-4 pt-2 pb-4 sm:px-6">
                {items.map((item, index) => (
                  <li key={item.href} className="border-b border-line last:border-0">
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex min-h-14 items-center justify-between font-display text-2xl font-bold tracking-tight transition-colors hover:text-accent"
                    >
                      {item.label}
                      <span className="font-mono text-xs text-accent" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </m.nav>
          </>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
