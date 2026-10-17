"use client";

import {
  Group as AriaGroup,
  Input as AriaInput,
  TextArea as AriaTextArea,
  composeRenderProps,
  type GroupProps,
} from "react-aria-components";
import { cn } from "./utils";
import {
  fieldHeight,
  fieldInnerHeight,
  fieldRadius,
  fieldSizeStyles,
  fieldText,
} from "./field-styles";
import type { Size } from "./size";

export interface InputGroupProps extends GroupProps {
  size?: Size;
}

export function InputGroup({ size, className, ...props }: InputGroupProps) {
  return (
    <AriaGroup
      {...props}
      data-slot="input-group"
      data-size={size}
      className={composeRenderProps(className, (className) =>
        cn(
          fieldHeight,
          fieldRadius,
          "flex w-full min-w-0 items-center gap-x-2 border border-input bg-card ps-[var(--field-px,0.875rem)] pe-[var(--field-px,0.875rem)] text-foreground shadow-[var(--shadow-card)] hover:border-primary/45 data-[focus-within]:border-ring data-[focus-within]:ring-1 data-[focus-within]:ring-ring data-[invalid]:border-destructive data-[invalid]:hover:border-destructive data-[invalid]:data-[focus-within]:border-destructive data-[invalid]:data-[focus-within]:ring-destructive data-[disabled]:bg-muted data-[disabled]:opacity-60 data-[disabled]:shadow-none data-[disabled]:hover:border-input has-[>[data-align=block-end]]:flex-wrap",
          size && fieldSizeStyles[size],
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
          fieldInnerHeight,
          fieldText,
          "min-w-[min(8rem,50%)] flex-1 cursor-text bg-transparent leading-6 text-foreground outline-none [&::placeholder]:text-muted-foreground/80 disabled:cursor-not-allowed [&::-webkit-search-cancel-button]:hidden",
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
          fieldText,
          "min-h-28 min-w-0 basis-full resize-y bg-transparent py-3 leading-6 text-foreground outline-none [&::placeholder]:text-muted-foreground/80 disabled:cursor-not-allowed",
          className,
        ),
      )}
    />
  );
}

export function InputGroupAddon({
  align = "inline",
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<"span"> & { align?: "inline" | "block-end" }) {
  return (
    <span
      {...props}
      data-slot="input-group-addon"
      data-align={align}
      className={cn(
        "inline-flex min-w-0 items-center gap-2 text-sm text-muted-foreground [&_svg]:shrink-0 [&>svg:not([class*='size-'])]:size-[var(--field-icon,1rem)]",
        align === "block-end" &&
          "w-full justify-end border-t border-border/70 py-2",
        className,
      )}
    >
      {typeof children === "string" ? (
        <span className="min-w-0 truncate">{children}</span>
      ) : (
        children
      )}
    </span>
  );
}
