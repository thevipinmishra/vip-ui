import type { ComponentPropsWithRef } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: ComponentPropsWithRef<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "min-w-0 rounded-xl bg-card text-card-foreground shadow-[var(--shadow-card)] ring-1 ring-border/70 forced-colors:border",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: ComponentPropsWithRef<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "flex flex-col gap-1 px-6 pt-6 last:pb-6 has-data-[slot=card-action]:grid has-data-[slot=card-action]:grid-cols-[minmax(0,1fr)_auto] has-data-[slot=card-action]:gap-x-4",
        className,
      )}
      {...props}
    />
  );
}

export function CardTitle({
  as: Heading = "h3",
  className,
  ...props
}: ComponentPropsWithRef<"h3"> & { as?: "h1" | "h2" | "h3" | "h4" }) {
  return (
    <Heading
      data-slot="card-title"
      className={cn(
        "text-base font-semibold tracking-[-0.025em] [overflow-wrap:anywhere]",
        className,
      )}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: ComponentPropsWithRef<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn(
        "text-sm leading-6 text-muted-foreground [overflow-wrap:anywhere]",
        className,
      )}
      {...props}
    />
  );
}

export function CardAction({
  className,
  ...props
}: ComponentPropsWithRef<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 flex items-center gap-2 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: ComponentPropsWithRef<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6 py-5", className)}
      {...props}
    />
  );
}

export function CardFooter({
  className,
  ...props
}: ComponentPropsWithRef<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex flex-wrap items-center gap-3 px-6 pb-6 first:pt-6 [[data-slot=card-header]+&]:pt-5",
        className,
      )}
      {...props}
    />
  );
}
