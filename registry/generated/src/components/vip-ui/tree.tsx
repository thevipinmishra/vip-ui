"use client";

import type { ReactNode } from "react";
import {
  Button as AriaButton,
  Tree as AriaTree,
  TreeItem as AriaTreeItem,
  TreeItemContent as AriaTreeItemContent,
  composeRenderProps,
  type TreeItemProps,
  type TreeProps,
} from "react-aria-components";
import { ChevronRight } from "reicon-react";
import { cn } from "./utils";

export function Tree<T extends object>({ className, ...props }: TreeProps<T>) {
  return (
    <AriaTree
      {...props}
      data-slot="tree"
      className={composeRenderProps(className, (className) =>
        cn(
          "grid max-h-96 gap-1 overflow-y-auto rounded-lg border border-border bg-card p-2 text-sm shadow-[var(--shadow-card)] outline-none data-[empty]:min-h-24 data-[empty]:place-items-center data-[focus-visible]:outline-2 data-[focus-visible]:outline-offset-2 data-[focus-visible]:outline-ring",
          className,
        ),
      )}
    />
  );
}

export function TreeItem({
  title,
  content,
  children,
  className,
  ...props
}: Omit<TreeItemProps, "children" | "textValue"> & {
  textValue?: string;
  title: string;
  /** Visible row content. `title` remains the accessible text value for typeahead. */
  content?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <AriaTreeItem
      {...props}
      data-slot="tree-item"
      textValue={props.textValue ?? title}
      className={composeRenderProps(className, (className) =>
        cn(
          "group/tree-item rounded-md text-foreground outline-none hover:bg-muted data-[focused]:bg-muted data-[selected]:bg-accent data-[selected]:text-accent-foreground data-[focus-visible]:outline-2 data-[focus-visible]:outline-offset-[-2px] data-[focus-visible]:outline-ring",
          className,
        ),
      )}
    >
      <AriaTreeItemContent data-slot="tree-item-content">
        <div
          className="flex min-h-11 items-center gap-2 px-2"
          style={{
            paddingInlineStart:
              "calc(0.5rem + (var(--tree-item-level) - 1) * 1rem)",
          }}
        >
          {children ? (
            <AriaButton
              slot="chevron"
              data-slot="tree-item-chevron"
              className="grid size-11 shrink-0 place-items-center rounded-md text-muted-foreground outline-none hover:bg-accent data-[focus-visible]:outline-2 data-[focus-visible]:outline-ring"
            >
              <ChevronRight
                size={16}
                aria-hidden="true"
                className="transition-transform group-data-[expanded]/tree-item:rotate-90 motion-reduce:transition-none"
              />
            </AriaButton>
          ) : (
            <span aria-hidden="true" className="size-11 shrink-0" />
          )}
          <div data-slot="tree-item-label" className="min-w-0 flex-1">
            {content ?? <span className="block truncate">{title}</span>}
          </div>
        </div>
      </AriaTreeItemContent>
      {children}
    </AriaTreeItem>
  );
}
