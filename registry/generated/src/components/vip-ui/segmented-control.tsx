"use client";

import * as radio from "@zag-js/radio-group";
import { mergeProps, normalizeProps, useMachine } from "@zag-js/react";
import {
  Children,
  type ComponentProps,
  type CSSProperties,
  createContext,
  type ReactNode,
  type Ref,
  useContext,
  useId,
} from "react";
import { tv } from "tailwind-variants";
import { springSnappyEasing } from "./motion";
import { touchTarget } from "./button-styles";
import { type Size, SizeProvider, useSize } from "./size";

const segmentedControlStyles = tv({
  base: "relative isolate inline-grid max-w-full auto-cols-fr grid-flow-col gap-0.5 rounded-lg bg-secondary p-1 text-foreground inset-ring inset-ring-border [--touch-target:2.75rem] [--transition-duration:300ms] data-[invalid]:inset-ring-destructive data-[orientation=vertical]:[--touch-target:100%] data-[orientation=vertical]:auto-rows-fr data-[orientation=vertical]:grid-flow-row motion-reduce:[--transition-duration:0ms] forced-colors:border forced-colors:border-[ButtonBorder]",
  variants: {
    size: {
      xs: "rounded-md p-0.5",
      sm: "rounded-lg p-0.5",
      md: "rounded-lg p-1",
      lg: "rounded-xl p-1",
      xl: "gap-1 rounded-2xl p-1",
    },
    fullWidth: {
      true: "w-full",
    },
  },
  defaultVariants: { size: "md" },
});

const segmentedControlIndicatorStyles = tv({
  base: "absolute border border-border bg-card shadow-(--shadow-card) forced-colors:border-[Highlight] forced-colors:bg-[Highlight]",
  variants: {
    size: {
      xs: "rounded-sm",
      sm: "rounded-md",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
    },
  },
  defaultVariants: { size: "md" },
});

const segmentedControlItemStyles = tv({
  base: "relative z-10 flex min-w-0 cursor-pointer items-center justify-center gap-2 rounded-md border border-transparent px-3 text-sm font-medium whitespace-nowrap text-muted-foreground select-none transition-[color,background-color,scale] duration-150 ease-out-quint outline-transparent outline-offset-4 hover:text-foreground data-[state=checked]:text-foreground data-[focus-visible]:outline-2 data-[focus-visible]:outline-solid data-[focus-visible]:-outline-offset-2 data-[focus-visible]:outline-ring data-[disabled]:cursor-default data-[disabled]:opacity-50 data-[readonly]:cursor-default motion-safe:active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 forced-colors:data-[state=checked]:outline-2 forced-colors:data-[state=checked]:outline-[Highlight]",
  variants: {
    size: {
      xs: `h-6 gap-1.5 rounded-sm px-2 text-xs [&_svg:not([class*='size-'])]:size-3.5 ${touchTarget}`,
      sm: `h-7 rounded-md px-2.5 ${touchTarget}`,
      md: `h-8 rounded-md px-3 ${touchTarget}`,
      lg: `h-10 rounded-lg px-4 text-base [&_svg:not([class*='size-'])]:size-5 ${touchTarget}`,
      xl: "h-12 gap-2.5 rounded-xl px-5 text-base [&_svg:not([class*='size-'])]:size-5",
    },
  },
  defaultVariants: { size: "md" },
});

export type SegmentedControlOrientation = NonNullable<
  radio.Props["orientation"]
>;

export interface SegmentedControlContextValue {
  /** The connected radio-group machine. */
  api: radio.Api;
  /** The size shared by every segment. */
  size: Size;
  /** The layout direction shared by every segment. */
  orientation: SegmentedControlOrientation;
}

const SegmentedControlPartsContext =
  createContext<SegmentedControlContextValue | null>(null);

export function useSegmentedControl(): SegmentedControlContextValue {
  const context = useContext(SegmentedControlPartsContext);
  if (!context)
    throw new Error(
      "useSegmentedControl must be used inside a <SegmentedControl>.",
    );
  return context;
}

export interface SegmentedControlContextProps {
  children: (api: radio.Api) => ReactNode;
}

export function SegmentedControlContext({
  children,
}: SegmentedControlContextProps) {
  const { api } = useSegmentedControl();
  return <>{children(api)}</>;
}

function stableId(value: string) {
  return value.replace(/[^a-zA-Z0-9_-]/g, "");
}

export interface SegmentedControlProps
  extends Omit<
    ComponentProps<"div">,
    | "dir"
    | "id"
    | "onChange"
    | "defaultValue"
    | "value"
    | "name"
    | "form"
    | "orientation"
  > {
  /** The height of the segments. Every segment follows it. */
  size?: Size;
  /** Stretches the control and its segments to the width of the parent. */
  fullWidth?: boolean;
  /** The selected value, controlled. */
  value?: string | null;
  /** The selected value at first, uncontrolled. */
  defaultValue?: string | null;
  /** Called with the new value when the selection changes. */
  onValueChange?: (details: radio.ValueChangeDetails) => void;
  /** Submits the selected value with a form. */
  name?: string;
  /** Associates the hidden inputs with a form by id. */
  form?: string;
  /** Disables every segment. */
  disabled?: boolean;
  /** Marks the group and its segments as invalid. */
  invalid?: boolean;
  /** Requires a selection before the form submits. */
  required?: boolean;
  /** Keeps the value but stops changes. */
  readOnly?: boolean;
  /** Lays the segments in a row or a column. */
  orientation?: SegmentedControlOrientation;
  /** Sets the writing direction of the group. */
  dir?: "ltr" | "rtl";
  /** Sets the ids of the group, the indicator, and the segments. */
  ids?: radio.ElementIds;
  /** Resolves the document in custom environments such as iframes. */
  getRootNode?: radio.Props["getRootNode"];
}

export function SegmentedControl({
  size: sizeProp,
  fullWidth = false,
  orientation = "horizontal",
  className,
  style,
  children,
  value,
  defaultValue,
  onValueChange,
  name,
  form,
  disabled,
  invalid,
  required,
  readOnly,
  dir,
  ids,
  getRootNode,
  ref,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: SegmentedControlProps) {
  const size = useSize(sizeProp) ?? "md";
  const id = `segmented-control-${stableId(useId())}`;

  const service = useMachine(radio.machine, {
    id,
    orientation,
    value,
    defaultValue,
    onValueChange,
    name,
    form,
    disabled,
    invalid,
    required,
    readOnly,
    dir,
    ids,
    getRootNode,
  });
  const api = radio.connect(service, normalizeProps);
  const indicator = api.getIndicatorProps();

  const merged = mergeProps(api.getRootProps(), props, {
    "aria-label": ariaLabel ?? (ariaLabelledBy ? undefined : "Segments"),
    "aria-labelledby": ariaLabelledBy,
    style: {
      ...style,
      "--transition-timing-function": springSnappyEasing.easing,
    } as CSSProperties,
    className: segmentedControlStyles({ size, fullWidth, className }),
  });

  const indicatorMerged = mergeProps(indicator, {
    "aria-hidden": true,
    style: {
      width: "var(--width)",
      height: "var(--height)",
      ...(orientation === "horizontal"
        ? { top: "var(--top)" }
        : { left: "var(--left)" }),
    } as CSSProperties,
    className: segmentedControlIndicatorStyles({ size }),
  });

  return (
    <SizeProvider size={size}>
      <SegmentedControlPartsContext value={{ api, size, orientation }}>
        <div
          {...merged}
          ref={ref}
          role="radiogroup"
          aria-labelledby={ariaLabelledBy}
          data-slot="segmented-control"
          data-size={size}
        >
          <div
            {...indicatorMerged}
            data-slot="segmented-control-indicator"
            data-size={size}
          />
          {children}
        </div>
      </SegmentedControlPartsContext>
    </SizeProvider>
  );
}

export interface SegmentedControlItemProps
  extends Omit<ComponentProps<"label">, "children" | "htmlFor"> {
  /** The value that this segment sets. */
  value: string;
  /** Disables this segment only. */
  disabled?: boolean;
  children: ReactNode;
  ref?: Ref<HTMLLabelElement>;
}

function segmentLabel(children: ReactNode): ReactNode {
  const parts: ReactNode[] = [];
  let text = "";
  const flush = () => {
    if (text.trim()) {
      parts.push(
        <span key={`label-${parts.length}`} className="min-w-0 truncate">
          {text}
        </span>,
      );
    }
    text = "";
  };
  for (const child of Children.toArray(children)) {
    if (typeof child === "string" || typeof child === "number") text += child;
    else {
      flush();
      parts.push(child);
    }
  }
  flush();
  return parts;
}

export function SegmentedControlItem({
  value,
  disabled,
  className,
  children,
  ref,
  ...props
}: SegmentedControlItemProps) {
  const { api, size } = useSegmentedControl();
  const item = { value, disabled };
  const merged = mergeProps(api.getItemProps(item), props, {
    "data-slot": "segmented-control-item",
    "data-size": size,
    className: segmentedControlItemStyles({ size, className }),
  });

  return (
    <label {...merged} ref={ref}>
      <span
        {...api.getItemTextProps(item)}
        data-slot="segmented-control-text"
        className="flex min-w-0 items-center justify-center gap-2"
      >
        {segmentLabel(children)}
      </span>
      <input
        {...api.getItemHiddenInputProps(item)}
        data-slot="segmented-control-input"
      />
    </label>
  );
}
