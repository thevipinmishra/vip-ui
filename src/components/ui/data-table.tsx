"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { type ReactNode, useEffect, useMemo, useState } from "react";
import type { Key } from "react-aria-components";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Checkbox, CheckboxIndicator } from "./checkbox";
import { SearchField } from "./search-field";
import { Select, type SelectOption } from "./select";
import { Cell, Column, Row, Table, TableBody, TableHeader } from "./table";

const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
});

export interface DataTableColumn<T> {
  id: string;
  header: string;
  cell: (row: T) => ReactNode;
  sortValue?: (row: T) => string | number;
  align?: "start" | "end";
  filter?:
    | { type: "text" }
    | { type: "select"; options: readonly SelectOption[] };
}

export interface DataTableProps<T> {
  label: string;
  rows: readonly T[];
  columns: readonly DataTableColumn<T>[];
  getRowId: (row: T) => Key;
  getSearchText?: (row: T) => string;
  pageSize?: number;
  selectable?: boolean;
  selectedKeys?: Iterable<Key>;
  defaultSelectedKeys?: Iterable<Key>;
  onSelectionChange?: (keys: Set<Key>) => void;
  className?: string;
}

export function DataTable<T extends object>({
  label,
  rows,
  columns,
  getRowId,
  getSearchText,
  pageSize = 5,
  selectable = true,
  selectedKeys,
  defaultSelectedKeys,
  onSelectionChange,
  className,
}: DataTableProps<T>) {
  const [query, setQuery] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [internalSelection, setInternalSelection] = useState<Set<Key>>(
    () => new Set(defaultSelectedKeys),
  );
  const selection = new Set(selectedKeys ?? internalSelection);
  const size = Number.isFinite(pageSize)
    ? Math.max(1, Math.floor(pageSize))
    : 5;

  const tableColumns = useMemo<ColumnDef<T>[]>(
    () =>
      columns.map((column, index) => ({
        id: column.id,
        accessorFn: (row) =>
          column.sortValue?.(row) ??
          (index === 0 ? getSearchText?.(row) : undefined) ??
          "",
        enableSorting: Boolean(column.sortValue),
        enableColumnFilter: Boolean(column.sortValue && column.filter),
        enableGlobalFilter: index === 0 && Boolean(getSearchText),
        filterFn:
          column.filter?.type === "select" ? "equalsString" : "includesString",
        sortingFn: (a, b, id) => {
          const first = a.getValue<string | number>(id);
          const second = b.getValue<string | number>(id);
          return typeof first === "number" && typeof second === "number"
            ? first - second
            : collator.compare(String(first), String(second));
        },
      })),
    [columns, getSearchText],
  );

  const table = useReactTable({
    data: rows as T[],
    columns: tableColumns,
    getRowId: (row) => String(getRowId(row)),
    state: {
      columnFilters,
      globalFilter: query,
      sorting,
      pagination: { pageIndex, pageSize: size },
      rowSelection: Object.fromEntries(
        [...selection].map((key) => [String(key), true]),
      ),
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: (row, _columnId, value: string) =>
      getSearchText?.(row.original)
        .toLocaleLowerCase()
        .includes(value.trim().toLocaleLowerCase()) ?? false,
    autoResetPageIndex: false,
  });

  const pageCount = Math.max(1, table.getPageCount());
  useEffect(() => {
    if (pageIndex >= pageCount) setPageIndex(pageCount - 1);
  }, [pageIndex, pageCount]);

  const pageRows = table.getRowModel().rows;
  const pageKeys = new Set(pageRows.map((row) => getRowId(row.original)));
  const visibleSelection = new Set(
    [...selection].filter((key) => pageKeys.has(key)),
  );
  const filteredCount = table.getFilteredRowModel().rows.length;
  const selectedCount = table.getSelectedRowModel().rows.length;
  const firstRow =
    filteredCount === 0 ? 0 : Math.min(pageIndex * size + 1, filteredCount);
  const lastRow = Math.min((pageIndex + 1) * size, filteredCount);
  const hasFilters = Boolean(query.trim() || columnFilters.length);
  const sortDescriptor = sorting[0]
    ? {
        column: sorting[0].id,
        direction: sorting[0].desc
          ? ("descending" as const)
          : ("ascending" as const),
      }
    : undefined;

  function changeSelection(keys: "all" | Set<Key>) {
    const next = new Set([...selection].filter((key) => !pageKeys.has(key)));
    for (const key of keys === "all" ? pageKeys : keys) next.add(key);
    if (selectedKeys === undefined) setInternalSelection(next);
    onSelectionChange?.(next);
  }

  return (
    <div
      data-slot="data-table"
      className={cn(
        "w-full min-w-0 overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-[var(--shadow-card)]",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
        <p className="min-w-0 text-base font-semibold tracking-tight text-foreground [overflow-wrap:anywhere]">
          {label}
        </p>
        {selectable && selectedCount > 0 && (
          <Button
            variant="minimal"
            size="sm"
            onPress={() => {
              const next = new Set<Key>();
              if (selectedKeys === undefined) setInternalSelection(next);
              onSelectionChange?.(next);
            }}
          >
            Clear selection
          </Button>
        )}
      </div>
      {(getSearchText ||
        columns.some((column) => column.filter && column.sortValue)) && (
        <div className="flex flex-wrap items-end gap-3 border-b border-border px-4 py-4 sm:px-5">
          {getSearchText && (
            <SearchField
              label={`Search ${label}`}
              value={query}
              onChange={(value) => {
                setQuery(value);
                setPageIndex(0);
              }}
              className="min-w-48 flex-1 sm:max-w-xs"
            />
          )}
          {columns
            .filter((column) => column.filter && column.sortValue)
            .map((column) => {
              const filter = column.filter;
              const tableColumn = table.getColumn(column.id);
              if (!filter || !tableColumn) return null;
              const value = String(tableColumn.getFilterValue() ?? "");
              return filter.type === "text" ? (
                <SearchField
                  key={column.id}
                  label={`Filter ${column.header}`}
                  placeholder={`Filter ${column.header.toLowerCase()}`}
                  value={value}
                  onChange={(next) => {
                    tableColumn.setFilterValue(next || undefined);
                    setPageIndex(0);
                  }}
                  className="min-w-44 flex-1 sm:max-w-56"
                />
              ) : (
                <Select
                  key={column.id}
                  label={column.header}
                  value={value}
                  onValueChange={(next) => {
                    tableColumn.setFilterValue(next || undefined);
                    setPageIndex(0);
                  }}
                  options={[
                    { id: "", name: `All ${column.header.toLowerCase()}` },
                    ...filter.options,
                  ]}
                  className="min-w-40 flex-1 sm:max-w-48"
                />
              );
            })}
          {hasFilters && (
            <Button
              variant="minimal"
              size="sm"
              onPress={() => {
                setQuery("");
                setColumnFilters([]);
                setPageIndex(0);
              }}
            >
              Clear filters
            </Button>
          )}
        </div>
      )}
      <div className="overflow-x-auto">
        <Table
          aria-label={label}
          className="min-w-[640px]"
          selectionMode={selectable ? "multiple" : "none"}
          selectionBehavior="toggle"
          selectedKeys={selectable ? visibleSelection : undefined}
          onSelectionChange={selectable ? changeSelection : undefined}
          sortDescriptor={sortDescriptor}
          onSortChange={(descriptor) => {
            setSorting([
              {
                id: String(descriptor.column),
                desc: descriptor.direction === "descending",
              },
            ]);
            setPageIndex(0);
          }}
        >
          <TableHeader className="bg-muted/60">
            {selectable && (
              <Column
                id="selection"
                focusMode="child"
                allowsArrowNavigation
                className="w-14 px-3 py-1 text-center"
              >
                <Checkbox
                  slot="selection"
                  aria-label="Select all rows on this page"
                  className="min-h-11 w-full items-center justify-center"
                >
                  <CheckboxIndicator className="mt-0" />
                </Checkbox>
              </Column>
            )}
            {columns.map((column, index) => (
              <Column
                key={column.id}
                id={column.id}
                isRowHeader={index === 0}
                allowsSorting={Boolean(column.sortValue)}
                className={cn(
                  "whitespace-nowrap",
                  column.align === "end" && "text-end",
                )}
              >
                {column.header}
              </Column>
            ))}
          </TableHeader>
          <TableBody
            items={pageRows}
            renderEmptyState={() => (
              <div className="px-4 py-10 text-center">
                <p className="text-sm font-medium text-foreground">
                  {hasFilters ? "No matching rows" : "No rows yet"}
                </p>
                {hasFilters && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    Change your search or clear the filters.
                  </p>
                )}
              </div>
            )}
          >
            {(row) => (
              <Row id={getRowId(row.original)}>
                {selectable && (
                  <Cell
                    focusMode="child"
                    allowsArrowNavigation
                    className="w-14 px-3 py-1 text-center"
                  >
                    <Checkbox
                      slot="selection"
                      className="min-h-11 w-full items-center justify-center"
                    >
                      <CheckboxIndicator className="mt-0" />
                    </Checkbox>
                  </Cell>
                )}
                {columns.map((column) => (
                  <Cell
                    key={column.id}
                    className={column.align === "end" ? "text-end" : undefined}
                  >
                    {column.cell(row.original)}
                  </Cell>
                ))}
              </Row>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-muted/20 px-4 py-3 text-sm text-muted-foreground sm:px-5">
        <output aria-live="polite" aria-atomic="true" className="tabular-nums">
          {filteredCount === 0
            ? "No rows"
            : `Showing ${firstRow}–${lastRow} of ${filteredCount} ${filteredCount === 1 ? "row" : "rows"}`}
          {hasFilters && ` (${rows.length} total)`}
          {selectable && selectedCount > 0 && ` · ${selectedCount} selected`}
        </output>
        {pageCount > 1 && (
          <nav
            aria-label={`${label} pages`}
            className="flex items-center gap-2"
          >
            <Button
              variant="outline"
              size="sm"
              isDisabled={pageIndex === 0}
              onPress={() => setPageIndex(pageIndex - 1)}
            >
              Previous
            </Button>
            <span className="min-w-20 text-center tabular-nums">
              Page {Math.min(pageIndex + 1, pageCount)} of {pageCount}
            </span>
            <Button
              variant="outline"
              size="sm"
              isDisabled={!table.getCanNextPage()}
              onPress={() => setPageIndex(pageIndex + 1)}
            >
              Next
            </Button>
          </nav>
        )}
      </div>
    </div>
  );
}
