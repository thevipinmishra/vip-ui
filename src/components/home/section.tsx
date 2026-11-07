import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function HomeSection({
  id,
  className,
  label,
  children,
}: {
  id: string;
  className?: string;
  label?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-label={label}
      aria-labelledby={label ? undefined : `${id}-title`}
      className={cn("site-container py-20 sm:py-28", className)}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  id,
  title,
  children,
  action,
  className,
}: {
  id: string;
  title: ReactNode;
  children?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-2xl justify-items-center gap-4 text-center",
        className,
      )}
    >
      <h2
        id={`${id}-title`}
        className="text-[clamp(1.875rem,1.4rem+2vw,2.75rem)] leading-[1.1] font-semibold tracking-[-0.04em] text-balance sm:tracking-[-0.05em]"
      >
        {title}
      </h2>
      {children && (
        <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
          {children}
        </p>
      )}
      {action}
    </div>
  );
}

export function FactList({
  facts,
  className,
}: {
  facts: readonly { term: string; detail: ReactNode }[];
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "grid content-start gap-x-8 gap-y-6 sm:grid-cols-2",
        className,
      )}
    >
      {facts.map((fact) => (
        <div
          key={fact.term}
          className="grid min-w-0 content-start gap-1.5 border-t border-border/70 pt-4"
        >
          <dt className="text-sm font-semibold">{fact.term}</dt>
          <dd className="text-sm leading-6 text-pretty text-muted-foreground">
            {fact.detail}
          </dd>
        </div>
      ))}
    </dl>
  );
}
