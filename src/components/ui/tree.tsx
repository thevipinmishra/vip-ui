"use client";

import {
  CaretRightIcon,
  DotsSixVerticalIcon,
  FileTextIcon,
  FolderIcon,
  FolderOpenIcon,
} from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Button as AriaButton,
  DropIndicator as AriaDropIndicator,
  Tree as AriaTree,
  TreeHeader as AriaTreeHeader,
  TreeItem as AriaTreeItem,
  TreeItemContent as AriaTreeItemContent,
  TreeLoadMoreItem as AriaTreeLoadMoreItem,
  TreeSection as AriaTreeSection,
  composeRenderProps,
  type DropIndicatorProps,
  type TreeItemProps,
  type TreeLoadMoreItemProps,
  type TreeProps,
} from "react-aria-components";
import { duration, easeOut, springLayout, transitionFor } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Checkbox } from "./checkbox";
import { itemHighlightRing, withItemHighlight } from "./item-highlight";
import { Spinner } from "./spinner";

const indent = "calc(0.25rem + (var(--tree-item-level, 1) - 1) * 1.25rem)";

// Only rows that mount after the first commit animate in. Rows that are
// already present on page load render without an entrance.
const TreeSettledContext = createContext(false);

export function Tree<T extends object>({
  className,
  render,
  ...props
}: TreeProps<T>) {
  const [settled, setSettled] = useState(false);
  useEffect(() => setSettled(true), []);

  return (
    <TreeSettledContext.Provider value={settled}>
      <AriaTree
        {...props}
        data-slot="tree"
        render={withItemHighlight(render, { ring: true })}
        className={composeRenderProps(className, (className) =>
          cn(
            "grid max-h-96 min-w-0 content-start gap-1 overflow-y-auto overscroll-contain rounded-lg border border-border bg-card p-2 text-sm shadow-(--shadow-card) outline-none transition-[background-color,box-shadow] duration-150 ease-out-quint empty:min-h-24 empty:place-items-center empty:content-center empty:text-muted-foreground focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ring drop-target:bg-accent/40 drop-target:inset-ring-2 drop-target:inset-ring-primary",
            className,
          ),
        )}
      />
    </TreeSettledContext.Provider>
  );
}

export function TreeItem({
  title,
  content,
  icon,
  children,
  className,
  render,
  ...props
}: Omit<TreeItemProps, "children" | "textValue" | "render"> & {
  textValue?: string;
  title: string;
  content?: ReactNode;
  icon?: ReactNode;
  children?: ReactNode;
  render?: TreeItemProps["render"];
}) {
  const reducedMotion = useReducedMotion();
  const settled = useContext(TreeSettledContext);
  // Motion and React share handler names. Drag and drop needs React's handlers,
  // so use a plain row while React Aria supplies them.
  const motionRow: TreeItemProps["render"] = (rowProps) => {
    const {
      onAnimationStart: _onAnimationStart,
      onAnimationEnd: _onAnimationEnd,
      onAnimationIteration: _onAnimationIteration,
      onDrag,
      onDragStart,
      onDragEnd,
      ...rest
    } = rowProps;

    if (onDrag || onDragStart || onDragEnd) {
      return <div {...(rowProps as React.HTMLAttributes<HTMLDivElement>)} />;
    }

    return (
      <motion.div
        {...rest}
        layout={reducedMotion ? false : "position"}
        initial={settled && !reducedMotion ? { opacity: 0, y: -4 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={transitionFor(reducedMotion, {
          duration: duration.base,
          ease: easeOut,
          layout: springLayout,
        })}
      />
    );
  };

  return (
    <AriaTreeItem
      {...props}
      render={render ?? motionRow}
      data-slot="tree-item"
      textValue={props.textValue ?? title}
      className={composeRenderProps(className, (className) =>
        cn(
          "group/tree-item min-w-0 rounded-md text-foreground outline-none transition-[color,background-color,opacity] duration-150 ease-out-quint selected:bg-accent selected:text-accent-foreground selected:font-medium selected:ring-1 selected:ring-primary/15 disabled:opacity-50 dragging:opacity-50 drop-target:bg-accent drop-target:ring-2 drop-target:ring-primary data-href:cursor-pointer forced-colors:border-2 forced-colors:border-[Canvas] forced-colors:selected:border-[Highlight]",
          itemHighlightRing,
          className,
        ),
      )}
    >
      <AriaTreeItemContent>
        {({
          hasChildItems,
          isExpanded,
          selectionMode,
          selectionBehavior,
          allowsDragging,
        }) => (
          <div
            data-slot="tree-item-content"
            className="flex min-h-11 items-center gap-2 ps-1 pe-3"
          >
            {allowsDragging && (
              <AriaButton
                slot="drag"
                data-slot="tree-item-drag-handle"
                className="-me-1 grid size-6 shrink-0 cursor-grab place-items-center rounded-sm text-muted-foreground outline-none transition-colors duration-150 ease-out-quint hover:text-foreground focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-ring"
              >
                <DotsSixVerticalIcon
                  size={16}
                  weight="bold"
                  aria-hidden="true"
                />
              </AriaButton>
            )}
            <span
              aria-hidden="true"
              className="-ms-2 shrink-0"
              style={{
                width: "calc((var(--tree-item-level, 1) - 1) * 1.25rem)",
              }}
            />
            {hasChildItems ? (
              <AriaButton
                slot="chevron"
                data-slot="tree-item-chevron"
                className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-md text-muted-foreground outline-none transition-[color,background-color] duration-150 ease-out-quint hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-ring"
              >
                <span
                  aria-hidden="true"
                  className="grid place-items-center transition-[rotate] duration-350 ease-spring group-expanded/tree-item:rotate-90 motion-reduce:transition-none rtl:-scale-x-100"
                >
                  <CaretRightIcon size={16} />
                </span>
              </AriaButton>
            ) : (
              <span aria-hidden="true" className="size-9 shrink-0" />
            )}
            {selectionMode === "multiple" && selectionBehavior === "toggle" && (
              <Checkbox slot="selection" className="shrink-0" />
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

export function TreeSection({
  className,
  ...props
}: React.ComponentProps<typeof AriaTreeSection>) {
  return (
    <AriaTreeSection
      {...props}
      data-slot="tree-section"
      className={cn(
        "grid gap-1 [[data-slot=tree-section]~&]:mt-1 [[data-slot=tree-section]~&]:border-t [[data-slot=tree-section]~&]:border-border/70 [[data-slot=tree-section]~&]:pt-2",
        className,
      )}
    />
  );
}

export function TreeHeader({
  className,
  ...props
}: React.ComponentProps<typeof AriaTreeHeader>) {
  return (
    <AriaTreeHeader
      {...props}
      data-slot="tree-header"
      className={cn(
        "px-3 pt-1 pb-0.5 text-xs font-medium text-muted-foreground",
        className,
      )}
    />
  );
}

export function TreeLoadMoreItem({
  className,
  children,
  ...props
}: TreeLoadMoreItemProps) {
  return (
    <AriaTreeLoadMoreItem
      {...props}
      data-slot="tree-load-more"
      className={composeRenderProps(className, (className) =>
        cn(
          "flex min-h-11 items-center gap-2 pe-3 text-muted-foreground",
          className,
        ),
      )}
      style={{ paddingInlineStart: indent }}
    >
      {composeRenderProps(
        children,
        (content) =>
          content ?? (
            <>
              <span className="grid size-9 place-items-center">
                <Spinner size="sm" decorative />
              </span>
              Loading
            </>
          ),
      )}
    </AriaTreeLoadMoreItem>
  );
}

export function TreeDropIndicator({ className, ...props }: DropIndicatorProps) {
  return (
    <AriaDropIndicator
      {...props}
      data-slot="tree-drop-indicator"
      className={composeRenderProps(className, (className) =>
        cn(
          "relative -my-0.5 h-0.5 rounded-full outline-none drop-target:bg-primary forced-colors:drop-target:bg-[Highlight]",
          className,
        ),
      )}
      style={{ marginInlineStart: indent }}
    />
  );
}
