import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const pageTitleSize =
  "text-[clamp(1.75rem,1.35rem+1.35vw,2.5rem)] leading-[1.15] tracking-[-0.035em] sm:tracking-[-0.045em]";

export const pageTitleClass = `font-semibold text-balance ${pageTitleSize}`;

export const sectionTitleClass =
  "text-[1.375rem] font-semibold leading-8 tracking-[-0.035em] text-balance sm:text-[1.4375rem] sm:tracking-[-0.045em]";

const headingSizes = {
  default: pageTitleSize,
  lg: "text-[clamp(2.125rem,1.4rem+2.35vw,3.25rem)] leading-[1.08] tracking-[-0.04em] sm:tracking-[-0.05em]",
};

export function PageHeader({ className, ...props }: ComponentProps<"header">) {
  return (
    <header
      className={cn("flex flex-col items-start gap-4", className)}
      {...props}
    />
  );
}

export function PageHeaderHeading({
  size = "default",
  className,
  ...props
}: ComponentProps<"h1"> & { size?: keyof typeof headingSizes }) {
  return (
    <h1
      className={cn(
        "font-semibold text-balance",
        headingSizes[size],
        className,
      )}
      {...props}
    />
  );
}

export function PageHeaderDescription({
  className,
  ...props
}: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "max-w-2xl text-base leading-7 text-pretty text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function PageActions({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("mt-2 flex flex-wrap items-center gap-3", className)}
      {...props}
    />
  );
}
