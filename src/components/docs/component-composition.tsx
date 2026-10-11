import type { Composition, CompositionPart } from "./component-compositions";

function CompositionBranch({
  parts,
  nested = false,
}: {
  parts: CompositionPart[];
  nested?: boolean;
}) {
  return (
    <ul
      className={
        nested
          ? "ms-3 grid gap-1 border-s border-border/80 ps-4 sm:ms-5"
          : "grid gap-1"
      }
    >
      {parts.map(({ part, purpose, children }) => (
        <li
          key={part}
          className={
            nested
              ? "relative before:absolute before:-start-5 before:top-[19px] before:size-2 before:rounded-full before:bg-border before:ring-2 before:ring-card"
              : undefined
          }
        >
          <div
            className={
              nested
                ? "grid min-w-0 gap-0.5 rounded-lg px-2 py-2 sm:grid-cols-[minmax(0,180px)_minmax(0,1fr)] sm:gap-4"
                : "grid min-w-0 gap-0.5 rounded-lg bg-muted/60 px-3 py-3 sm:grid-cols-[minmax(0,180px)_minmax(0,1fr)] sm:gap-4"
            }
          >
            <code
              className={`min-w-0 break-words font-mono text-xs font-semibold leading-5 ${nested ? "text-foreground" : "text-primary"}`}
            >
              {part}
            </code>
            <span className="min-w-0 text-[13px] leading-5 text-muted-foreground">
              {purpose}
            </span>
          </div>
          {children && <CompositionBranch parts={children} nested />}
        </li>
      ))}
    </ul>
  );
}

export function ComponentComposition({ parts, helper }: Composition) {
  return (
    <div className="max-w-[700px] rounded-xl bg-card p-4 shadow-[var(--shadow-card)] ring-1 ring-border/70 sm:p-5">
      <p className="mb-4 text-[13px] leading-6 text-muted-foreground">
        Indentation shows JSX nesting. Parts on the same level are siblings.
      </p>
      <CompositionBranch parts={parts} />
      {helper && (
        <p className="mt-5 border-t border-border/70 pt-4 text-[13px] leading-6 text-muted-foreground">
          <code className="font-mono font-semibold text-foreground">
            {helper.part}
          </code>{" "}
          {helper.purpose}
        </p>
      )}
    </div>
  );
}
