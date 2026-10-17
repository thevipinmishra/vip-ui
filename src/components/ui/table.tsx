"use client";

import { ArrowsDownUpIcon, ArrowUpIcon } from "@phosphor-icons/react";
import {
  Cell as AriaCell,
  Column as AriaColumn,
  Row as AriaRow,
  Table as AriaTable,
  TableBody as AriaTableBody,
  TableHeader as AriaTableHeader,
  type CellProps,
  type ColumnProps,
  composeRenderProps,
  type RowProps,
  type TableBodyProps,
  type TableHeaderProps,
  type TableProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";

export function Table({ className, ...props }: TableProps) {
  return (
    <AriaTable
      {...props}
      data-slot="table"
      className={composeRenderProps(className, (className) =>
        cn(
          "w-full border-separate border-spacing-0 rounded-md text-start text-sm outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:-outline-offset-2 focus-visible:outline-ring",
          className,
        ),
      )}
    />
  );
}
export function TableHeader<T extends object>({
  className,
  ...props
}: TableHeaderProps<T>) {
  return (
    <AriaTableHeader
      {...props}
      data-slot="table-header"
      className={composeRenderProps(className, (className) =>
        cn("bg-muted text-muted-foreground", className),
      )}
    />
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
        cn("[&>tr:last-child>td]:border-b-0", className),
      )}
    />
  );
}
export function Column({ className, children, ...props }: ColumnProps) {
  return (
    <AriaColumn
      {...props}
      data-slot="table-column"
      className={composeRenderProps(className, (className) =>
        cn(
          "group/column border-b border-border px-4 py-2.5 text-start text-xs font-semibold whitespace-nowrap outline-none transition-[color] duration-150 ease-out-quint allows-sorting:cursor-pointer allows-sorting:hover:text-foreground focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-[-2px] focus-visible:outline-ring",
          className,
        ),
      )}
    >
      {composeRenderProps(
        children,
        (content, { allowsSorting, sortDirection }) =>
          allowsSorting ? (
            <span className="inline-flex items-center gap-1.5">
              {content}
              <span
                aria-hidden="true"
                data-slot="table-sort-indicator"
                className={cn(
                  "grid shrink-0 place-items-center",
                  sortDirection ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {sortDirection ? (
                  <ArrowUpIcon
                    size={14}
                    weight="bold"
                    className="transition-transform duration-250 ease-out-quint group-sort-descending/column:rotate-180 motion-reduce:transition-none"
                  />
                ) : (
                  <ArrowsDownUpIcon size={14} />
                )}
              </span>
            </span>
          ) : (
            content
          ),
      )}
    </AriaColumn>
  );
}
export function Row<T extends object>({ className, ...props }: RowProps<T>) {
  return (
    <AriaRow
      {...props}
      data-slot="table-row"
      className={composeRenderProps(className, (className) =>
        cn(
          "outline-none transition-colors duration-150 ease-out-quint hover:bg-muted hover:duration-0 focus:bg-muted focus:duration-0 selected:bg-accent disabled:cursor-default disabled:opacity-50 focus-visible:outline-1 focus-visible:outline-solid focus-visible:-outline-offset-1 focus-visible:outline-ring forced-colors:focus-visible:outline-2 forced-colors:focus-visible:-outline-offset-2 forced-colors:selected:*:relative forced-colors:selected:*:before:pointer-events-none forced-colors:selected:*:before:absolute forced-colors:selected:*:before:inset-0 forced-colors:selected:*:before:border-y-2 forced-colors:selected:*:before:border-[Highlight] forced-colors:selected:*:first:before:border-s-2 forced-colors:selected:*:last:before:border-e-2",
          className,
        ),
      )}
    />
  );
}
export function Cell({ className, ...props }: CellProps) {
  return (
    <AriaCell
      {...props}
      data-slot="table-cell"
      className={composeRenderProps(className, (className) =>
        cn(
          "border-b border-border px-4 py-2.5 whitespace-nowrap text-foreground outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-[-2px] focus-visible:outline-ring",
          className,
        ),
      )}
    />
  );
}
