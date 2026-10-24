import { ArrowDown, RefreshCw } from "lucide-react";
import type { Diagram } from "@/content/types";

/**
 * Renders a layered architecture diagram from project data as semantic HTML,
 * so it scales to any width and reads correctly with a screen reader.
 */
export function ArchitectureDiagram({ diagram, title }: { diagram: Diagram; title: string }) {
  return (
    <figure className="flex h-full flex-col">
      <div className="relative flex flex-1 items-center overflow-hidden rounded-2xl border border-line bg-bg/60 p-4 transition-colors duration-300 group-hover:border-line-strong sm:p-6">
        <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60" />
        <div className="relative grid w-full gap-5 sm:grid-cols-[1fr_auto]">
          <ol aria-label={`${title} layers, from interface to backend`} className="grid">
            {diagram.layers.map((layer, index) => (
              <li key={layer.label} className="grid">
                {index > 0 && (
                  <ArrowDown aria-hidden="true" size={14} className="mx-auto my-1 text-subtle" />
                )}
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 rounded-md border border-line-strong bg-raised px-3.5 py-2.5">
                  <span className="flex items-baseline gap-3">
                    <span aria-hidden="true" className="font-mono text-[0.65rem] text-subtle">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[0.8rem] text-fg">{layer.label}</span>
                  </span>
                  <span className="text-xs text-muted">{layer.detail}</span>
                </div>
              </li>
            ))}
          </ol>

          {diagram.channels && (
            <ul
              aria-label="Feedback channels"
              className="grid content-center gap-3 sm:w-44 sm:border-l sm:border-dashed sm:border-line-strong sm:pl-5"
            >
              {diagram.channels.map((channel) => (
                <li
                  key={channel.label}
                  className="rounded-md border border-dashed border-accent/40 px-3 py-2.5"
                >
                  <span className="flex items-center gap-2 font-mono text-[0.75rem] text-accent">
                    <RefreshCw aria-hidden="true" size={12} />
                    {channel.label}
                  </span>
                  <span className="mt-1 block text-xs text-muted">{channel.detail}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <figcaption className="mt-3 text-xs text-subtle">{diagram.caption}</figcaption>
    </figure>
  );
}
