import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ScreenHeader({
  title,
  detail,
  actions,
}: {
  title: string;
  detail?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
      <div className="min-w-0">
        <h3 className="text-lg font-semibold tracking-[-0.03em]">{title}</h3>
        {detail && <p className="text-xs text-muted-foreground">{detail}</p>}
      </div>
      {actions && (
        <div className="flex flex-wrap items-center gap-2">{actions}</div>
      )}
    </div>
  );
}

export function Screen({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("grid min-w-0 gap-4 p-4 sm:p-5", className)}>
      {children}
    </div>
  );
}
