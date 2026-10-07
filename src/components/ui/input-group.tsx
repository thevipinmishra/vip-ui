"use client";

import {
  Group as AriaGroup,
  Input as AriaInput,
  TextArea as AriaTextArea,
  composeRenderProps,
  type GroupProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";

export function InputGroup({ className, ...props }: GroupProps) {
  return (
    <AriaGroup
      {...props}
      data-slot="input-group"
      className={composeRenderProps(className, (className) =>
        cn(
          "flex min-h-12 w-full min-w-0 flex-wrap items-center gap-x-2 rounded-lg border border-input bg-card px-3.5 text-foreground shadow-[var(--shadow-card)] hover:border-primary/45 data-[focus-within]:border-ring data-[focus-within]:ring-3 data-[focus-within]:ring-ring/50 data-[invalid]:border-destructive data-[invalid]:ring-3 data-[invalid]:ring-destructive/20 data-[invalid]:hover:border-destructive data-[invalid]:data-[focus-within]:ring-destructive/30 data-[disabled]:bg-muted data-[disabled]:opacity-60 data-[disabled]:shadow-none data-[disabled]:hover:border-input",
          className,
        ),
      )}
    />
  );
}

export function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<typeof AriaInput>) {
  return (
    <AriaInput
      {...props}
      data-slot="input-group-input"
      className={composeRenderProps(className, (className) =>
        cn(
          "min-h-11 min-w-0 flex-1 cursor-text bg-transparent py-2.5 text-base leading-6 text-foreground outline-none [&::placeholder]:text-muted-foreground/80 disabled:cursor-not-allowed sm:text-sm [&::-webkit-search-cancel-button]:hidden",
          className,
        ),
      )}
    />
  );
}

export function InputGroupTextArea({
  className,
  ...props
}: React.ComponentProps<typeof AriaTextArea>) {
  return (
    <AriaTextArea
      {...props}
      data-slot="input-group-text-area"
      className={composeRenderProps(className, (className) =>
        cn(
          "min-h-28 min-w-0 basis-full resize-y bg-transparent py-3 text-base leading-6 text-foreground outline-none [&::placeholder]:text-muted-foreground/80 disabled:cursor-not-allowed sm:text-sm",
          className,
        ),
      )}
    />
  );
}

export function InputGroupAddon({
  align = "inline",
  className,
  ...props
}: React.ComponentPropsWithRef<"span"> & { align?: "inline" | "block-end" }) {
  return (
    <span
      {...props}
      data-slot="input-group-addon"
      data-align={align}
      className={cn(
        "inline-flex shrink-0 items-center gap-2 text-sm text-muted-foreground",
        align === "block-end" &&
          "w-full justify-end border-t border-border/70 py-2",
        className,
      )}
    />
  );
}
