import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function PageHeader({ className, ...props }: ComponentProps<"header">) {
  return (
    <header
      className={cn("flex flex-col items-start gap-4", className)}
      {...props}
    />
  );
}

export function PageHeaderHeading({
  className,
  ...props
}: ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "text-[clamp(2.5rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.06em] [text-wrap:balance]",
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
        "max-w-2xl text-base leading-7 text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function PageActions({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("mbs-2 flex flex-wrap items-center gap-3", className)}
      {...props}
    />
  );
}
