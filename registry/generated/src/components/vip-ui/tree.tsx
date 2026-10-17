"use client";

import {
  CaretRightIcon,
  FileTextIcon,
  FolderIcon,
  FolderOpenIcon,
} from "@phosphor-icons/react";
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
import { cn } from "./utils";

export function Tree<T extends object>({ className, ...props }: TreeProps<T>) {
  return (
    <AriaTree
      {...props}
      data-slot="tree"
      className={composeRenderProps(className, (className) =>
        cn(
          "grid max-h-96 min-w-0 gap-1 overflow-y-auto overscroll-contain rounded-lg border border-border bg-card p-2 text-sm shadow-[var(--shadow-card)] outline-none empty:min-h-24 empty:place-items-center empty:text-muted-foreground focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ring",
          className,
        ),
      )}
    />
  );
}

export function TreeItem({
  title,
  content,
  icon,
  children,
  className,
  ...props
}: Omit<TreeItemProps, "children" | "textValue"> & {
  textValue?: string;
  title: string;
  content?: ReactNode;
  icon?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <AriaTreeItem
      {...props}
      data-slot="tree-item"
      textValue={props.textValue ?? title}
      className={composeRenderProps(className, (className) =>
        cn(
          "group/tree-item min-w-0 rounded-md text-foreground outline-none transition-colors duration-150 ease-out-quint hover:bg-muted hover:duration-0 focus:bg-muted focus:duration-0 pressed:bg-muted selected:bg-accent selected:text-accent-foreground selected:font-medium selected:ring-1 selected:ring-primary/15 focus-visible:outline-1 focus-visible:outline-solid focus-visible:-outline-offset-1 focus-visible:outline-ring forced-colors:focus-visible:outline-2 forced-colors:focus-visible:-outline-offset-2 disabled:opacity-50 forced-colors:border-2 forced-colors:border-[Canvas] forced-colors:selected:border-[Highlight]",
          className,
        ),
      )}
    >
      <AriaTreeItemContent data-slot="tree-item-content">
        {({ hasChildItems, isExpanded }) => (
          <div
            className="flex min-h-11 items-center gap-2 pe-3"
            style={{
              paddingInlineStart:
                "calc(0.25rem + (var(--tree-item-level) - 1) * 1rem)",
            }}
          >
            {hasChildItems ? (
              <AriaButton
                slot="chevron"
                data-slot="tree-item-chevron"
                className="grid size-9 shrink-0 place-items-center rounded-md text-muted-foreground outline-none transition-[color,background-color] duration-150 ease-out-quint hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-ring rtl:-scale-x-100"
              >
                <span
                  aria-hidden="true"
                  className="grid place-items-center transition-transform duration-250 ease-out-quint group-expanded/tree-item:rotate-90 motion-reduce:transition-none"
                >
                  <CaretRightIcon size={16} />
                </span>
              </AriaButton>
            ) : (
              <span aria-hidden="true" className="size-9 shrink-0" />
            )}
            <span
              data-slot="tree-item-icon"
              aria-hidden="true"
              className="grid shrink-0 place-items-center text-muted-foreground group-selected/tree-item:text-accent-foreground"
            >
              {icon ??
                (hasChildItems ? (
                  isExpanded ? (
                    <FolderOpenIcon size={16} />
                  ) : (
                    <FolderIcon size={16} />
                  )
                ) : (
                  <FileTextIcon size={16} />
                ))}
            </span>
            <div data-slot="tree-item-label" className="min-w-0 flex-1">
              {content ?? <span className="block truncate">{title}</span>}
            </div>
          </div>
        )}
      </AriaTreeItemContent>
      {children}
    </AriaTreeItem>
  );
}
