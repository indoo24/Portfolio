import type { ReactNode } from "react";
import { FlutterLogo } from "@/components/brand/flutter-logo";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: ReactNode;
  id: string;
  intro?: ReactNode;
  align?: "left" | "center";
};

export function SectionHeading({
  index,
  label,
  title,
  id,
  intro,
  align = "left",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={`reveal max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
      <p className="glass label inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5">
        <FlutterLogo className="h-3.5 w-auto" />
        <span className="text-accent">{index}</span>
        <span aria-hidden="true">/</span>
        <span className="sr-only">: </span>
        {label}
      </p>
      <h2
        id={id}
        className="mt-5 font-display text-title font-bold tracking-[-0.03em] text-balance"
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-5 text-lg text-pretty text-muted ${centered ? "mx-auto max-w-2xl" : "max-w-2xl"}`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
