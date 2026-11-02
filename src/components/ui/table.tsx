"use client";

import {
  ArrowsDownUpIcon,
  ArrowUpIcon,
  CaretRightIcon,
  DotsSixVerticalIcon,
} from "@phosphor-icons/react";
import {
  Button as AriaButton,
  Cell as AriaCell,
  Column as AriaColumn,
  ColumnResizer as AriaColumnResizer,
  DropIndicator as AriaDropIndicator,
  ResizableTableContainer as AriaResizableTableContainer,
  Row as AriaRow,
  Table as AriaTable,
  TableBody as AriaTableBody,
  TableFooter as AriaTableFooter,
  TableHeader as AriaTableHeader,
  TableLoadMoreItem as AriaTableLoadMoreItem,
  type CellProps,
  Collection,
  type ColumnProps,
  type ColumnResizerProps,
  composeRenderProps,
  type DropIndicatorProps,
  type ResizableTableContainerProps,
  type RowProps,
  type TableBodyProps,
  type TableFooterProps,
  type TableHeaderProps,
  type TableLoadMoreItemProps,
  type TableProps,
  useTableOptions,
} from "react-aria-components";
import { cn } from "@/lib/utils";
import { Checkbox } from "./checkbox";
import { ItemHighlight, itemHighlightRing } from "./item-highlight";
import { Spinner } from "./spinner";

const cellFocusStyles =
  "outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-[-2px] focus-visible:outline-ring";

const controlCellStyles = "w-11 min-w-11 px-2 py-1 text-center";

export function TableContainer({
  className,
  ...props
}: ResizableTableContainerProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <AriaResizableTableContainer
      {...props}
      data-slot="table-container"
      className={cn(
        "relative w-full min-w-0 overflow-auto overscroll-x-contain rounded-lg border border-border bg-card shadow-[var(--shadow-card)] [scrollbar-width:thin]",
        className,
      )}
    />
  );
}

export function Table({ className, render, ...props }: TableProps) {
  return (
    <AriaTable
      {...props}
      data-slot="table"
      render={(domProps, renderProps) => (
        <div data-slot="table-frame" className="relative isolate">
          <ItemHighlight ring items="tbody > [data-slot=table-row]" />
          {render ? (
            render(domProps, renderProps)
          ) : (
            <table {...(domProps as React.ComponentProps<"table">)} />
          )}
        </div>
      )}
      className={composeRenderProps(className, (className) =>
        cn(
          "w-full border-separate border-spacing-0 rounded-md text-start text-sm outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:-outline-offset-2 focus-visible:outline-ring drop-target:outline-2 drop-target:outline-solid drop-target:-outline-offset-2 drop-target:outline-primary",
          className,
        ),
      )}
    />
  );
}

function SelectionCheckbox() {
  return <Checkbox slot="selection" className="w-full items-center" />;
}

export function TableHeader<T extends object>({
  className,
  columns,
  children,
  dependencies,
  ...props
}: TableHeaderProps<T>) {
  const { selectionBehavior, selectionMode, allowsDragging } =
    useTableOptions();
  return (
    <AriaTableHeader
      {...props}
      data-slot="table-header"
      className={composeRenderProps(className, (className) =>
        cn("sticky top-0 z-20 bg-muted text-muted-foreground", className),
      )}
    >
      {allowsDragging && (
        <Column
          id="__drag"
          width={40}
          minWidth={40}
          className={controlCellStyles}
        >
          <span className="sr-only">Reorder</span>
        </Column>
      )}
      {selectionBehavior === "toggle" && selectionMode === "multiple" && (
        <Column
          id="__selection"
          width={44}
          minWidth={44}
          className={controlCellStyles}
        >
          <SelectionCheckbox />
        </Column>
      )}
      <Collection items={columns} dependencies={dependencies}>
        {children}
      </Collection>
    </AriaTableHeader>
  );
}

export function TableBody<T extends object>({
  className,
  ...props
}: TableBodyProps<T>) {
  return (
    <AriaTableBody
      {...props}
      data-slot="table-body"
      className={composeRenderProps(className, (className) =>
        cn(
          "[&>tr:last-child>td]:border-b-0 drop-target:bg-accent/40",
          className,
        ),
      )}
    />
  );
}

export function TableFooter<T extends object>({
  className,
  ...props
}: TableFooterProps<T>) {
  return (
    <AriaTableFooter
      {...props}
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 font-medium text-foreground [&>tr>td]:border-t [&>tr>td]:border-b-0 [&>tr>td]:border-border",
        className,
      )}
    />
  );
}

export function Column({
  className,
  children,
  allowsResizing = false,
  ...props
}: ColumnProps & { allowsResizing?: boolean }) {
  return (
    <AriaColumn
      {...props}
      data-slot="table-column"
      className={composeRenderProps(className, (className) =>
        cn(
          "group/column relative border-b border-border px-4 py-2.5 text-start text-xs font-semibold whitespace-nowrap transition-[color] duration-150 ease-out-quint allows-sorting:cursor-pointer allows-sorting:hover:text-foreground",
          cellFocusStyles,
          className,
        ),
      )}
    >
      {composeRenderProps(children, (content, { allowsSorting }) => (
        <>
          {allowsSorting ? (
            <span className="inline-flex max-w-full min-w-0 items-center gap-1.5">
              <span className="min-w-0 truncate">{content}</span>
              <SortIndicator />
            </span>
          ) : (
            content
          )}
          {allowsResizing && <ColumnResizer />}
        </>
      ))}
    </AriaColumn>
  );
}

function SortIndicator() {
  return (
    <span
      aria-hidden="true"
      data-slot="table-sort-indicator"
      className="grid shrink-0 place-items-center text-muted-foreground/70 transition-colors duration-150 ease-out-quint group-hover/column:text-foreground group-sort-ascending/column:text-foreground group-sort-descending/column:text-foreground [&>*]:col-start-1 [&>*]:row-start-1"
    >
      <ArrowsDownUpIcon
        size={14}
        className="transition-[opacity,scale] duration-150 ease-out-quint group-sort-ascending/column:scale-50 group-sort-ascending/column:opacity-0 group-sort-descending/column:scale-50 group-sort-descending/column:opacity-0"
      />
      <ArrowUpIcon
        size={14}
        weight="bold"
        className="scale-50 opacity-0 transition-[opacity,scale,rotate] duration-350 ease-spring group-sort-ascending/column:scale-100 group-sort-ascending/column:opacity-100 group-sort-descending/column:scale-100 group-sort-descending/column:rotate-180 group-sort-descending/column:opacity-100 motion-reduce:transition-none"
      />
    </span>
  );
}

export function ColumnResizer({ className, ...props }: ColumnResizerProps) {
  return (
    <AriaColumnResizer
      {...props}
      data-slot="table-column-resizer"
      className={composeRenderProps(className, (className) =>
        cn(
          "absolute inset-y-0 end-0 z-10 w-3 cursor-col-resize touch-none outline-none ltr:translate-x-1/2 rtl:-translate-x-1/2 after:absolute after:inset-y-2 after:start-1/2 after:w-px after:-translate-x-1/2 after:rounded-full after:bg-border after:transition-[background-color,width] after:duration-150 after:ease-out-quint hover:after:w-0.5 hover:after:bg-foreground/50 focus-visible:after:w-0.5 focus-visible:after:bg-ring data-[resizing]:after:inset-y-0 data-[resizing]:after:w-0.5 data-[resizing]:after:bg-primary forced-colors:after:bg-[ButtonBorder] forced-colors:data-[resizing]:after:bg-[Highlight]",
          className,
        ),
      )}
    />
  );
}

export function Row<T extends object>({
  className,
  columns,
  children,
  dependencies,
  ...props
}: RowProps<T>) {
  const { selectionBehavior, selectionMode, allowsDragging } =
    useTableOptions();
  return (
    <AriaRow
      {...props}
      data-slot="table-row"
      className={composeRenderProps(className, (className) =>
        cn(
          "outline-none transition-[background-color,opacity] duration-150 ease-out-quint selected:bg-accent disabled:cursor-default disabled:opacity-50 dragging:opacity-50 drop-target:bg-accent data-[href]:cursor-pointer forced-colors:selected:*:relative forced-colors:selected:*:before:pointer-events-none forced-colors:selected:*:before:absolute forced-colors:selected:*:before:inset-0 forced-colors:selected:*:before:border-y-2 forced-colors:selected:*:before:border-[Highlight] forced-colors:selected:*:first:before:border-s-2 forced-colors:selected:*:last:before:border-e-2",
          itemHighlightRing,
          className,
        ),
      )}
    >
      {allowsDragging && (
        <Cell className={controlCellStyles}>
          <AriaButton
            slot="drag"
            data-slot="table-drag-handle"
            className="inline-grid size-7 cursor-grab place-items-center rounded-md text-muted-foreground outline-none transition-colors duration-150 ease-out-quint hover:text-foreground focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-ring"
          >
            <DotsSixVerticalIcon size={16} weight="bold" aria-hidden="true" />
          </AriaButton>
        </Cell>
      )}
      {selectionBehavior === "toggle" && selectionMode === "multiple" && (
        <Cell className={controlCellStyles}>
          <SelectionCheckbox />
        </Cell>
      )}
      <Collection items={columns} dependencies={dependencies}>
        {children}
      </Collection>
    </AriaRow>
  );
}

export function Cell({ className, children, ...props }: CellProps) {
  return (
    <AriaCell
      {...props}
      data-slot="table-cell"
      className={composeRenderProps(className, (className) =>
        cn(
          "border-b border-border px-4 py-2.5 whitespace-nowrap text-foreground",
          cellFocusStyles,
          className,
        ),
      )}
    >
      {composeRenderProps(
        children,
        (content, { isTreeColumn, hasChildItems, level }) =>
          isTreeColumn ? (
            <span
              className="-ms-2 flex min-w-0 items-center gap-1"
              style={{ paddingInlineStart: `${(level - 1) * 1.5}rem` }}
            >
              {hasChildItems ? (
                <AriaButton
                  slot="chevron"
                  data-slot="table-row-chevron"
                  className="grid size-7 shrink-0 cursor-pointer place-items-center rounded-md text-muted-foreground outline-none transition-[color,background-color] duration-150 ease-out-quint hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-ring"
                >
                  <CaretRightIcon
                    size={14}
                    weight="bold"
                    aria-hidden="true"
                    className="transition-[rotate] duration-350 ease-spring in-data-expanded:rotate-90 motion-reduce:transition-none rtl:-scale-x-100"
                  />
                </AriaButton>
              ) : (
                <span aria-hidden="true" className="size-7 shrink-0" />
              )}
              <span className="min-w-0">{content}</span>
            </span>
          ) : (
            content
          ),
      )}
    </AriaCell>
  );
}

export function TableLoadMoreItem({
  className,
  children,
  ...props
}: TableLoadMoreItemProps) {
  return (
    <AriaTableLoadMoreItem
      {...props}
      data-slot="table-load-more"
      className={cn(
        "[&>td]:px-4 [&>td]:py-3 [&>td]:text-center [&>td]:text-sm [&>td]:text-muted-foreground",
        className,
      )}
    >
      {children ?? (
        <span className="inline-flex items-center gap-2">
          <Spinner size="sm" decorative />
          Loading more rows
        </span>
      )}
    </AriaTableLoadMoreItem>
  );
}

export function TableDropIndicator({
  className,
  ...props
}: DropIndicatorProps) {
  return (
    <AriaDropIndicator
      {...props}
      data-slot="table-drop-indicator"
      className={composeRenderProps(className, (className) =>
        cn(
          "relative z-20 [transform:translateZ(0)] outline-none drop-target:outline-2 drop-target:outline-solid drop-target:outline-primary forced-colors:drop-target:outline-[Highlight]",
          className,
        ),
      )}
    />
  );
}
