import type { ReactNode } from "react";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: ReactNode;
  id: string;
  intro?: ReactNode;
};

export function SectionHeading({ index, label, title, id, intro }: SectionHeadingProps) {
  return (
    <div className="grid gap-6 border-t border-line pt-6 md:grid-cols-12 md:gap-10">
      <p className="label md:col-span-3">
        <span className="text-accent">{index}</span>
        <span aria-hidden="true"> / </span>
        <span className="sr-only">: </span>
        {label}
      </p>
      <div className="md:col-span-9">
        <h2 id={id} className="font-serif text-title tracking-[-0.01em] text-balance">
          {title}
        </h2>
        {intro && <p className="mt-5 max-w-2xl text-lg text-pretty text-muted">{intro}</p>}
      </div>
    </div>
  );
}
