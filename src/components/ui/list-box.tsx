"use client";

import {
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  composeRenderProps,
  type ListBoxItemProps,
  type ListBoxProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";

export function ListBox<T extends object>({
  className,
  ...props
}: ListBoxProps<T>) {
  return (
    <AriaListBox
      {...props}
      data-slot="list-box"
      className={composeRenderProps(className, (className) =>
        cn(
          "grid max-h-72 w-full min-w-0 gap-1 overflow-y-auto overscroll-contain rounded-lg border border-border bg-card p-1.5 shadow-[var(--shadow-card)] outline-none empty:min-h-24 empty:place-items-center empty:text-sm empty:text-muted-foreground focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ring",
          className,
        ),
      )}
    />
  );
}

export function ListBoxItem({
  className,
  children,
  ...props
}: ListBoxItemProps) {
  return (
    <AriaListBoxItem
      {...props}
      data-slot="list-box-item"
      textValue={
        props.textValue ?? (typeof children === "string" ? children : undefined)
      }
      className={composeRenderProps(className, (className) =>
        cn(
          "group/item flex min-h-11 min-w-0 cursor-pointer items-center justify-between gap-3 rounded-md px-3 py-2 text-sm text-foreground outline-none [overflow-wrap:anywhere] transition-colors duration-150 ease-out-quint hover:bg-muted hover:duration-0 focus:bg-muted focus:duration-0 selected:bg-accent selected:text-accent-foreground disabled:cursor-default disabled:opacity-50 focus-visible:outline-1 focus-visible:outline-solid focus-visible:-outline-offset-1 focus-visible:outline-ring forced-colors:focus-visible:outline-2 forced-colors:focus-visible:-outline-offset-2",
          className,
        ),
      )}
    >
      {composeRenderProps(children, (content) => (
        <>
          {content}
          <SelectionMark />
        </>
      ))}
    </AriaListBoxItem>
  );
}

export function SelectionMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      data-slot="selection-mark"
      className={cn("ms-auto size-4 shrink-0", className)}
    >
      <path
        d="M2.75 8 6.25 11.5 13.25 4.5"
        pathLength={1}
        className="[stroke-dasharray:1_2] [stroke-dashoffset:1.01] transition-[stroke-dashoffset] duration-200 ease-out-quint group-selected/item:[stroke-dashoffset:0] motion-reduce:transition-none"
      />
    </svg>
  );
}
