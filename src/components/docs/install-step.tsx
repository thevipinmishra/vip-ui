import type { ReactNode } from "react";

export function InstallStep({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <li className="grid gap-3">
      <h3 className="flex items-center gap-3 text-[15px] font-semibold text-foreground">
        <span
          aria-hidden="true"
          className="grid size-7 shrink-0 place-items-center rounded-full bg-muted font-mono text-xs"
        >
          {number}
        </span>
        {title}
      </h3>
      {children}
    </li>
  );
}
