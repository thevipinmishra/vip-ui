"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  columnFilteringFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_equalsString,
  filterFn_includesString,
  globalFilteringFeature,
  type RowData,
  rowPaginationFeature,
  rowSortingFeature,
  type SortingState,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { type ColumnProps, type Key, useLocale } from "react-aria-components";
import { cn } from "./utils";
import { AnimatedNumber } from "./animated-number";
import { Button } from "./button";
import { Presence } from "./presence";
import { SearchField } from "./search-field";
import { Select, type SelectOption } from "./select";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableContainer,
  TableHeader,
} from "./table";
import { Toolbar } from "./toolbar";

const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
});

const features = tableFeatures({
  columnFilteringFeature,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
});

export type DataTableFilter =
  | { type: "text" }
  | { type: "select"; options: readonly SelectOption[] };

export interface DataTableColumn<T> {
  id: string;
  header: string;
  cell: (row: T) => ReactNode;
  sortValue?: (row: T) => string | number;
  align?: "start" | "end";
  width?: ColumnProps["defaultWidth"];
  minWidth?: ColumnProps["minWidth"];
  filter?: DataTableFilter;
}

export interface DataTableFooterState {
  firstRow: number;
  lastRow: number;
  filteredCount: number;
  totalCount: number;
  pageIndex: number;
  pageCount: number;
  setPageIndex: (index: number) => void;
}

export interface DataTableSelectionState {
  selectedKeys: Set<Key>;
  selectedCount: number;
  clearSelection: () => void;
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
  disabledKeys?: Iterable<Key>;
  onRowAction?: (key: Key) => void;
  resizable?: boolean;
  showClearSelection?: boolean;
  renderSelectionActions?: (state: DataTableSelectionState) => ReactNode;
  renderFooter?: (state: DataTableFooterState) => ReactNode;
  className?: string;
}

const numberFormats = new Map<string, Intl.NumberFormat>();

function numberFormatFor(locale: string) {
  let format = numberFormats.get(locale);
  if (!format) {
    format = new Intl.NumberFormat(locale);
    numberFormats.set(locale, format);
  }
  return format;
}

function buildColumns<T extends RowData>(
  columns: readonly DataTableColumn<T>[],
  getSearchText: ((row: T) => string) | undefined,
): ColumnDef<typeof features, T>[] {
  return columns.map((column, index) => ({
    id: column.id,
    accessorFn: (row) =>
      column.sortValue?.(row) ??
      (index === 0 ? getSearchText?.(row) : undefined) ??
      "",
    enableSorting: Boolean(column.sortValue),
    enableColumnFilter: Boolean(column.sortValue && column.filter),
    enableGlobalFilter: index === 0 && Boolean(getSearchText),
    filterFn:
      column.filter?.type === "select"
        ? filterFn_equalsString
        : filterFn_includesString,
    sortFn: (a, b, id) => {
      const first = a.getValue<string | number>(id);
      const second = b.getValue<string | number>(id);
      return typeof first === "number" && typeof second === "number"
        ? first - second
        : collator.compare(String(first), String(second));
    },
  }));
}

function readUpdater<T>(updater: T | ((previous: T) => T), previous: T): T {
  return typeof updater === "function"
    ? (updater as (previous: T) => T)(previous)
    : updater;
}

function normalizePageSize(pageSize: number) {
  if (!Number.isFinite(pageSize)) return 5;
  return Math.max(1, Math.floor(pageSize));
}

function toSortDescriptor(sorting: SortingState) {
  const [first] = sorting;
  if (!first) return undefined;
  return {
    column: first.id,
    direction: first.desc ? ("descending" as const) : ("ascending" as const),
  };
}

function nextSelection(
  keys: "all" | Set<Key>,
  selection: Set<Key>,
  pageKeys: Set<Key>,
) {
  const next = new Set([...selection].filter((key) => !pageKeys.has(key)));
  for (const key of keys === "all" ? pageKeys : keys) next.add(key);
  return next;
}

interface TableFilterItem {
  id: string;
  header: string;
  filter: DataTableFilter;
  value: string;
  onChange: (value: string) => void;
}

function DataTableFilters({
  label,
  query,
  hasFilters,
  filters,
  onQueryChange,
  onClear,
}: {
  label: string;
  query: string;
  hasFilters: boolean;
  filters: TableFilterItem[];
  onQueryChange: (value: string) => void;
  onClear: () => void;
}) {
  return (
    <div className="flex flex-wrap items-end gap-3 border-b border-border px-4 py-3 sm:px-5">
      <SearchField
        label={`Search ${label}`}
        value={query}
        onChange={onQueryChange}
        className="min-w-0 grow basis-48 sm:max-w-xs"
      />
      {filters.map(({ id, header, filter, value, onChange }) =>
        filter.type === "text" ? (
          <SearchField
            key={id}
            label={header}
            value={value}
            onChange={onChange}
            className="min-w-0 grow basis-44 sm:max-w-56"
          />
        ) : (
          <Select
            key={id}
            label={header}
            value={value}
            onValueChange={onChange}
            options={[{ id: "", name: "All" }, ...filter.options]}
            className="min-w-0 grow basis-40 sm:max-w-48"
          />
        ),
      )}
      {hasFilters && (
        <Button variant="minimal" size="sm" onPress={onClear}>
          Clear filters
        </Button>
      )}
    </div>
  );
}

function DataTableFooter({
  label,
  locale,
  firstRow,
  lastRow,
  filteredCount,
  totalCount,
  selectedCount,
  selectable,
  hasFilters,
  pageIndex,
  pageCount,
  canNextPage,
  onPage,
}: {
  label: string;
  locale: string;
  firstRow: number;
  lastRow: number;
  filteredCount: number;
  totalCount: number;
  selectedCount: number;
  selectable: boolean;
  hasFilters: boolean;
  pageIndex: number;
  pageCount: number;
  canNextPage: boolean;
  onPage: (index: number) => void;
}) {
  const numberFormat = numberFormatFor(locale);
  const summary =
    filteredCount === 0
      ? "No rows"
      : `Showing ${numberFormat.format(firstRow)}–${numberFormat.format(lastRow)} of ${numberFormat.format(filteredCount)} ${filteredCount === 1 ? "row" : "rows"}`;
  return (
    <>
      <output aria-live="polite" aria-atomic="true" className="tabular-nums">
        {summary}
        {hasFilters && ` (${numberFormat.format(totalCount)} total)`}
        {selectable &&
          selectedCount > 0 &&
          ` · ${numberFormat.format(selectedCount)} selected`}
      </output>
      {pageCount > 1 && (
        <nav
          aria-label={`${label} pages`}
          className="flex flex-wrap items-center gap-x-3 gap-y-2"
        >
          <span className="whitespace-nowrap tabular-nums">
            Page {numberFormat.format(Math.min(pageIndex + 1, pageCount))} of{" "}
            {numberFormat.format(pageCount)}
          </span>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              isDisabled={pageIndex === 0}
              onPress={() => onPage(pageIndex - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              isDisabled={!canNextPage}
              onPress={() => onPage(pageIndex + 1)}
            >
              Next
            </Button>
          </div>
        </nav>
      )}
    </>
  );
}

function DataTableSelectionActions({
  locale,
  selectedCount,
  selection,
  clearSelection,
  clearSelectionFromActions,
  renderSelectionActions,
}: {
  locale: string;
  selectedCount: number;
  selection: Set<Key>;
  clearSelection: () => void;
  clearSelectionFromActions: () => void;
  renderSelectionActions:
    | ((state: DataTableSelectionState) => ReactNode)
    | undefined;
}) {
  if (!renderSelectionActions) return null;
  return (
    <Presence show={selectedCount > 0} collapse>
      <div
        data-slot="data-table-selection-actions"
        className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-border bg-muted/40 px-4 py-2.5 sm:px-5"
      >
        <p
          aria-hidden="true"
          dir="auto"
          className="min-w-0 text-sm font-medium text-foreground"
        >
          <AnimatedNumber value={selectedCount} locale={locale} /> selected
        </p>
        <div className="flex w-full min-w-0 flex-wrap items-center justify-between gap-2 sm:ms-auto sm:w-auto sm:justify-start">
          <Toolbar aria-label="Selection actions" size="sm">
            {renderSelectionActions({
              selectedKeys: selection,
              selectedCount,
              clearSelection,
            })}
          </Toolbar>
          <Button
            variant="minimal"
            size="sm"
            onPress={clearSelectionFromActions}
          >
            Clear
          </Button>
        </div>
      </div>
    </Presence>
  );
}

export function DataTable<T extends RowData>({
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
  disabledKeys,
  onRowAction,
  resizable = false,
  showClearSelection = true,
  renderSelectionActions,
  renderFooter,
  className,
}: DataTableProps<T>) {
  const { locale } = useLocale();
  const rootRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [internalSelection, setInternalSelection] = useState<Set<Key>>(
    () => new Set(defaultSelectedKeys),
  );
  const selection = new Set(selectedKeys ?? internalSelection);
  const size = normalizePageSize(pageSize);

  const tableColumns = useMemo<ColumnDef<typeof features, T>[]>(
    () => buildColumns(columns, getSearchText),
    [columns, getSearchText],
  );

  const table = useTable({
    features,
    data: rows,
    columns: tableColumns,
    getRowId: (row) => String(getRowId(row)),
    state: {
      columnFilters,
      globalFilter: query,
      sorting,
      pagination: { pageIndex, pageSize: size },
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: (updater) => {
      setQuery((current) => {
        const next = readUpdater(updater, current);
        return next == null ? "" : String(next);
      });
      setPageIndex(0);
    },
    onPaginationChange: (updater) => {
      setPageIndex((current) => {
        const previous = { pageIndex: current, pageSize: size };
        return readUpdater(updater, previous).pageIndex;
      });
    },
    onSortingChange: setSorting,
    globalFilterFn: (row, _columnId, value: string) =>
      getSearchText?.(row.original)
        .toLocaleLowerCase()
        .includes(value.trim().toLocaleLowerCase()) ?? false,
    autoResetPageIndex: false,
  });

  const pageCount = Math.max(1, table.getPageCount());
  useEffect(() => {
    // Filtering can shrink the page count below the current page.
    // react-doctor-disable-next-line react-hooks-js/set-state-in-effect
    if (pageIndex >= pageCount) setPageIndex(pageCount - 1);
  }, [pageIndex, pageCount]);

  const pageRows = table.getRowModel().rows;
  const pageKeys = new Set(pageRows.map((row) => getRowId(row.original)));
  const visibleSelection = new Set(
    [...selection].filter((key) => pageKeys.has(key)),
  );
  const filteredCount = table.getFilteredRowModel().rows.length;
  const selectedCount = rows.reduce(
    (count, row) => count + (selection.has(getRowId(row)) ? 1 : 0),
    0,
  );
  const firstRow =
    filteredCount === 0 ? 0 : Math.min(pageIndex * size + 1, filteredCount);
  const lastRow = Math.min((pageIndex + 1) * size, filteredCount);
  const hasFilters = Boolean(query.trim() || columnFilters.length);
  const sortDescriptor = toSortDescriptor(sorting);
  const filterableColumns = columns.filter(
    (column) => column.filter && column.sortValue,
  );
  const filters: TableFilterItem[] = filterableColumns.map((column) => ({
    id: column.id,
    header: column.header,
    filter: column.filter as DataTableFilter,
    value: String(table.getColumn(column.id)?.getFilterValue() ?? ""),
    onChange: (value) => {
      const next =
        (column.filter?.type === "text" ? value.trim() : value) || undefined;
      table.getColumn(column.id)?.setFilterValue(next);
      setPageIndex(0);
    },
  }));
  const showFilters = Boolean(getSearchText) || filters.length > 0;

  function changeSelection(keys: "all" | Set<Key>) {
    const next = nextSelection(keys, selection, pageKeys);
    if (selectedKeys === undefined) setInternalSelection(next);
    onSelectionChange?.(next);
  }

  function clearSelection() {
    const next = new Set<Key>();
    if (selectedKeys === undefined) setInternalSelection(next);
    onSelectionChange?.(next);
  }

  function clearSelectionFromActions() {
    rootRef.current?.querySelector<HTMLElement>('[data-slot="table"]')?.focus();
    clearSelection();
  }

  return (
    <div
      ref={rootRef}
      data-slot="data-table"
      className={cn(
        "w-full min-w-0 overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-(--shadow-card)",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
        <p className="min-w-0 text-base font-semibold tracking-tight text-foreground wrap-anywhere">
          {label}
        </p>
        {selectable &&
          showClearSelection &&
          !renderSelectionActions &&
          selectedCount > 0 && (
            <Button variant="minimal" size="sm" onPress={clearSelection}>
              Clear selection
            </Button>
          )}
      </div>
      {showFilters && (
        <DataTableFilters
          label={label}
          query={query}
          hasFilters={hasFilters}
          filters={filters}
          onQueryChange={(value) => {
            setQuery(value);
            setPageIndex(0);
          }}
          onClear={() => {
            setQuery("");
            setColumnFilters([]);
            setPageIndex(0);
          }}
        />
      )}
      <TableContainer className="@container rounded-none border-0 bg-transparent shadow-none">
        <Table
          aria-label={label}
          className="min-w-160"
          disabledKeys={disabledKeys}
          onRowAction={onRowAction}
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
            {columns.map((column, index) => (
              <Column
                key={column.id}
                id={column.id}
                isRowHeader={index === 0}
                allowsSorting={Boolean(column.sortValue)}
                allowsResizing={resizable}
                defaultWidth={column.width}
                minWidth={column.minWidth ?? (resizable ? 96 : undefined)}
                className={column.align === "end" ? "text-end" : undefined}
              >
                {column.header}
              </Column>
            ))}
          </TableHeader>
          <TableBody
            items={pageRows}
            renderEmptyState={() => (
              <div className="sticky inset-s-0 w-[100cqw] px-4 py-8 text-center">
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
      </TableContainer>
      <DataTableSelectionActions
        locale={locale}
        selectedCount={selectedCount}
        selection={selection}
        clearSelection={clearSelection}
        clearSelectionFromActions={clearSelectionFromActions}
        renderSelectionActions={renderSelectionActions}
      />
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-muted/20 px-4 py-3 text-sm text-muted-foreground sm:px-5">
        {renderFooter ? (
          renderFooter({
            firstRow,
            lastRow,
            filteredCount,
            totalCount: rows.length,
            pageIndex,
            pageCount,
            setPageIndex: (index) =>
              setPageIndex(Math.min(Math.max(index, 0), pageCount - 1)),
          })
        ) : (
          <DataTableFooter
            label={label}
            locale={locale}
            firstRow={firstRow}
            lastRow={lastRow}
            filteredCount={filteredCount}
            totalCount={rows.length}
            selectedCount={selectedCount}
            selectable={selectable}
            hasFilters={hasFilters}
            pageIndex={pageIndex}
            pageCount={pageCount}
            canNextPage={table.getCanNextPage()}
            onPage={setPageIndex}
          />
        )}
      </div>
    </div>
  );
}
