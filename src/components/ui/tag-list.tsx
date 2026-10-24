export function TagList({ items, label }: { items: string[]; label: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.7rem] text-muted"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export function StatusBadge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.08em] text-muted uppercase">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
      {children}
    </span>
  );
}
