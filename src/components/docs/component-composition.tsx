import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import type { Composition, CompositionPart } from "./component-compositions";

const flag =
  "ms-2 inline-block rounded-sm bg-muted px-1.5 font-sans text-[11px] font-medium leading-5 text-muted-foreground";

function CompositionBranch({
  parts,
  depth,
}: {
  parts: CompositionPart[];
  depth: number;
}) {
  return (
    <ul
      className={cn(
        "relative col-span-full grid grid-cols-subgrid",
        depth > 0 &&
          "before:pointer-events-none before:absolute before:inset-y-1 before:inset-s-[calc((var(--depth)-1)*1.25rem+0.5rem)] before:w-px before:bg-border",
      )}
      style={{ "--depth": depth } as CSSProperties}
    >
      {parts.map(({ part, note, optional, repeats, children }) => (
        <li key={part} className="col-span-full grid grid-cols-subgrid">
          <div className="col-span-full grid grid-cols-subgrid items-baseline gap-y-0.5 py-1 ps-[calc(var(--depth)*1.25rem)]">
            <div className="min-w-0 ps-2">
              <code className="wrap-break-word font-mono text-[13px] font-medium leading-6 text-foreground">
                {part}
              </code>
              {optional && <span className={flag}>Optional</span>}
              {repeats && <span className={flag}>Repeats</span>}
            </div>
            {note && (
              <p className="min-w-0 ps-2 text-[13px] leading-6 text-muted-foreground sm:ps-0">
                {note}
              </p>
            )}
          </div>
          {children && <CompositionBranch parts={children} depth={depth + 1} />}
        </li>
      ))}
    </ul>
  );
}

export function ComponentComposition({ parts, helper }: Composition) {
  return (
    <div className="rounded-xl border border-border/70 bg-card/50 px-2 py-2 sm:px-3">
      <div className="grid grid-cols-1 sm:grid-cols-[max-content_minmax(0,1fr)] sm:gap-x-8">
        <CompositionBranch parts={parts} depth={0} />
      </div>
      {helper && (
        <p className="mx-2 mt-2 border-t border-border/70 pt-3 pb-1.5 text-[13px] leading-6 text-muted-foreground">
          <code className="font-mono font-medium text-foreground">
            {helper.part}
          </code>{" "}
          {helper.note}
        </p>
      )}
    </div>
  );
}
