"use client";

import { motion, useReducedMotion } from "motion/react";
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
import { ChevronRight, FileText, Folder, FolderOpen } from "reicon-react";
import { cn } from "@/lib/utils";

export function Tree<T extends object>({ className, ...props }: TreeProps<T>) {
  return (
    <AriaTree
      {...props}
      data-slot="tree"
      className={composeRenderProps(className, (className) =>
        cn(
          "grid max-h-96 gap-1 overflow-y-auto rounded-lg border border-border bg-card p-2 text-sm shadow-[var(--shadow-card)] outline-none empty:min-h-24 empty:place-items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
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
  /** Visible row content. `title` remains the accessible text value for typeahead. */
  content?: ReactNode;
  /** Overrides the default folder or file icon. */
  icon?: ReactNode;
  children?: ReactNode;
}) {
  const reducedMotion = useReducedMotion();
  return (
    <AriaTreeItem
      {...props}
      data-slot="tree-item"
      textValue={props.textValue ?? title}
      className={composeRenderProps(className, (className) =>
        cn(
          "group/tree-item rounded-md text-foreground outline-none hover:bg-muted focus:bg-muted pressed:bg-muted selected:bg-accent selected:text-accent-foreground selected:font-medium selected:ring-1 selected:ring-primary/15 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring disabled:opacity-50",
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
                className="grid size-9 shrink-0 place-items-center rounded-md text-muted-foreground outline-none hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
              >
                <motion.span
                  aria-hidden="true"
                  className="grid place-items-center"
                  initial={false}
                  animate={{ rotate: isExpanded ? 90 : 0 }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.2,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
                  <ChevronRight size={16} />
                </motion.span>
              </AriaButton>
            ) : (
              <span aria-hidden="true" className="size-9 shrink-0" />
            )}
            <span
              data-slot="tree-item-icon"
              aria-hidden="true"
              className="shrink-0 text-muted-foreground group-selected/tree-item:text-accent-foreground"
            >
              {icon ??
                (hasChildItems ? (
                  isExpanded ? (
                    <FolderOpen size={16} />
                  ) : (
                    <Folder size={16} />
                  )
                ) : (
                  <FileText size={16} />
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
