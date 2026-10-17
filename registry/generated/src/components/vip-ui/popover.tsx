"use client";

import {
  Dialog as AriaDialog,
  type DialogProps as AriaDialogProps,
  Popover as AriaPopover,
  type PopoverProps as AriaPopoverProps,
  composeRenderProps,
  DialogTrigger,
  type DialogTriggerProps,
  Heading,
  type HeadingProps,
  OverlayArrow,
  type OverlayArrowProps,
  Text,
  type TextProps,
} from "react-aria-components";
import { cn } from "./utils";
import { SizeProvider } from "./size";

export interface PopoverProps extends AriaPopoverProps {
  "data-slot"?: string;
}

export function PopoverTrigger(props: DialogTriggerProps) {
  return <DialogTrigger {...props} />;
}

export function Popover({
  className,
  children,
  "data-slot": dataSlot = "popover",
  ...props
}: PopoverProps) {
  return (
    <AriaPopover
      {...props}
      data-slot={dataSlot}
      className={composeRenderProps(className, (className) =>
        cn(
          "max-w-[calc(100vw-2rem)] overflow-auto overscroll-contain rounded-xl border border-border bg-popover p-4 text-popover-foreground [overflow-wrap:anywhere] shadow-[var(--shadow-float)] outline-none",
          // An arrow sits outside the panel, so the panel stops clipping.
          "has-[[data-slot=popover-arrow]]:overflow-visible",
          // React Aria sets data-entering and data-exiting once the placement is
          // known, then waits for these transitions before it unmounts the panel.
          "origin-(--trigger-anchor-point) transition-[opacity,scale,translate] duration-200 ease-out-quint",
          "placement-top:[--popover-shift:0_0.25rem] placement-bottom:[--popover-shift:0_-0.25rem] placement-left:[--popover-shift:0.25rem_0] placement-right:[--popover-shift:-0.25rem_0]",
          "entering:opacity-0 motion-safe:entering:scale-96 motion-safe:entering:[translate:var(--popover-shift)]",
          "exiting:opacity-0 exiting:duration-150 motion-safe:exiting:scale-98 motion-safe:exiting:[translate:var(--popover-shift)]",
          className,
        ),
      )}
    >
      {composeRenderProps(children, (children) => (
        <SizeProvider size={undefined}>{children}</SizeProvider>
      ))}
    </AriaPopover>
  );
}

export function PopoverArrow({
  className,
  ...props
}: Omit<OverlayArrowProps, "children">) {
  return (
    <OverlayArrow
      {...props}
      data-slot="popover-arrow"
      className={composeRenderProps(className, (className) =>
        cn("group/arrow", className),
      )}
    >
      <svg
        width={12}
        height={12}
        viewBox="0 0 12 12"
        aria-hidden="true"
        className="block fill-popover stroke-border group-placement-bottom/arrow:rotate-180 group-placement-left/arrow:-rotate-90 group-placement-right/arrow:rotate-90 forced-colors:fill-[Canvas] forced-colors:stroke-[CanvasText]"
      >
        <path d="M0 0 6 6 12 0" />
      </svg>
    </OverlayArrow>
  );
}

export function PopoverDialog({ className, ...props }: AriaDialogProps) {
  return (
    <AriaDialog
      {...props}
      data-slot="popover-dialog"
      className={cn("outline-none", className)}
    />
  );
}

export function PopoverTitle({ className, ...props }: HeadingProps) {
  return (
    <Heading
      {...props}
      slot="title"
      data-slot="popover-title"
      className={cn(
        "text-sm font-semibold leading-5 tracking-[-0.01em] [overflow-wrap:anywhere]",
        className,
      )}
    />
  );
}

export function PopoverDescription({ className, ...props }: TextProps) {
  return (
    <Text
      {...props}
      slot="description"
      data-slot="popover-description"
      className={cn(
        "mt-1 block text-sm leading-5 text-muted-foreground [overflow-wrap:anywhere]",
        className,
      )}
    />
  );
}

export function PopoverFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      data-slot="popover-footer"
      className={cn("mt-4 flex flex-wrap justify-end gap-2", className)}
    />
  );
}
