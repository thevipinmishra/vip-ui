"use client";

import type { ComponentPropsWithRef } from "react";
import {
  Link as AriaLink,
  composeRenderProps,
  type LinkProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: ComponentPropsWithRef<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "relative min-w-0 rounded-xl bg-card text-card-foreground wrap-break-word shadow-(--shadow-card) ring-1 ring-border/70 outline-offset-4 outline-transparent transition-[box-shadow,translate,outline-color,outline-offset] duration-200 ease-out-quint forced-colors:border has-[[data-slot=card-link][data-hovered]]:shadow-[0_1px_2px_rgb(0_0_0/0.04),0_8px_24px_-8px_rgb(0_0_0/0.16)] has-[[data-slot=card-link][data-hovered]]:ring-border motion-safe:has-[[data-slot=card-link][data-hovered]]:-translate-y-0.5 motion-safe:has-[[data-slot=card-link][data-pressed]]:translate-y-0 has-[[data-slot=card-link][data-focus-visible]]:outline-2 has-[[data-slot=card-link][data-focus-visible]]:outline-offset-2 has-[[data-slot=card-link][data-focus-visible]]:outline-ring motion-reduce:outline-offset-2",
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
        "flex flex-col gap-1 px-5 pt-5 last:pb-5 has-data-[slot=card-action]:grid has-data-[slot=card-action]:grid-cols-[minmax(0,1fr)_fit-content(50%)] has-data-[slot=card-action]:gap-x-4",
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
        "text-base font-semibold tracking-tight wrap-anywhere",
        className,
      )}
      {...props}
    />
  );
}

export function CardMedia({
  className,
  ...props
}: ComponentPropsWithRef<"div">) {
  return (
    <div
      data-slot="card-media"
      className={cn(
        "relative overflow-hidden first:rounded-t-[inherit] last:rounded-b-[inherit] [&>img]:block [&>img]:size-full [&>img]:object-cover",
        className,
      )}
      {...props}
    />
  );
}

export function CardLink({ className, ...props }: LinkProps) {
  return (
    <AriaLink
      {...props}
      data-slot="card-link"
      className={composeRenderProps(className, (className) =>
        cn(
          "cursor-pointer rounded-sm text-inherit outline-none after:absolute after:inset-0 after:z-0 after:rounded-xl after:content-['']",
          className,
        ),
      )}
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
        "text-sm leading-6 text-muted-foreground wrap-anywhere",
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
        "col-start-2 row-span-2 row-start-1 flex min-w-0 max-w-full items-center gap-2 self-start justify-self-end",
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
      className={cn("px-5 py-4", className)}
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
        "flex flex-wrap items-center gap-3 px-5 pb-5 first:pt-5 [[data-slot=card-header]+&]:pt-4",
        className,
      )}
      {...props}
    />
  );
}
