"use client";

import {
  CalendarDate,
  endOfMonth,
  startOfMonth,
} from "@internationalized/date";
import {
  ArchiveIcon,
  ArrowCounterClockwiseIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CopyIcon,
  DotsThreeIcon,
  DownloadSimpleIcon,
  MagnifyingGlassIcon,
  TruckIcon,
  XIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import type { Key, RangeValue } from "react-aria-components";
import { Avatar } from "../../vip-ui/avatar";
import { Button } from "../../vip-ui/button";
import { Card } from "../../vip-ui/card";
import { DataTable, type DataTableColumn } from "../../vip-ui/data-table";
import { DateRangePicker } from "../../vip-ui/date-range-picker";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../vip-ui/dialog";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "../../vip-ui/empty-state";
import {
  MenuContent,
  MenuItem,
  MenuPopover,
  MenuSeparator,
  MenuTrigger,
} from "../../vip-ui/menu";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationList,
} from "../../vip-ui/pagination";
import { Presence } from "../../vip-ui/presence";
import { SearchField } from "../../vip-ui/search-field";
import { Select } from "../../vip-ui/select";
import { Tag, TagGroup, TagListView } from "../../vip-ui/tag-group";
import { showToast } from "../../vip-ui/toast";
import { Toolbar } from "../../vip-ui/toolbar";
import {
  formatDay,
  formatMoney,
  formatTime,
  fulfillmentOptions,
  orders as initialOrders,
  itemCount,
  type Order,
  orderTotals,
  paymentOptions,
} from "./data";
import { OrderDetailsSheet } from "./order-details-sheet";
import {
  FulfillmentBadge,
  fulfillmentLabel,
  PaymentBadge,
  paymentLabel,
} from "./order-status";

const initialRange: RangeValue<CalendarDate> = {
  start: new CalendarDate(2026, 10, 1),
  end: new CalendarDate(2026, 10, 30),
};

const referenceDate = new CalendarDate(2026, 10, 30);

const presets = [
  {
    label: "Last 7 days",
    value: { start: referenceDate.subtract({ days: 6 }), end: referenceDate },
  },
  {
    label: "Last 30 days",
    value: { start: referenceDate.subtract({ days: 29 }), end: referenceDate },
  },
  {
    label: "This month",
    value: {
      start: startOfMonth(referenceDate),
      end: endOfMonth(referenceDate),
    },
  },
  {
    label: "September",
    value: {
      start: new CalendarDate(2026, 9, 1),
      end: new CalendarDate(2026, 9, 30),
    },
  },
];

const shortDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

const fullDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function toDate(value: CalendarDate) {
  return new Date(`${value.toString()}T00:00:00Z`);
}

function formatRange(start: CalendarDate, end: CalendarDate) {
  if (start.toString() === end.toString()) {
    return fullDate.format(toDate(end));
  }
  if (start.year === end.year) {
    return `${shortDate.format(toDate(start))} – ${fullDate.format(toDate(end))}`;
  }
  return `${fullDate.format(toDate(start))} – ${fullDate.format(toDate(end))}`;
}

function isShippable(order: Order) {
  return (
    order.fulfillment === "unfulfilled" || order.fulfillment === "processing"
  );
}

function trackingFor(id: string) {
  return `1Z88X40W03918${id.slice(-4)}`;
}

function downloadOrders(list: Order[], name: string) {
  const header = [
    "Order",
    "Customer",
    "Email",
    "Placed",
    "Payment",
    "Fulfillment",
    "Items",
    "Total",
  ];
  const rows = list.map((order) => [
    order.id,
    order.customer,
    order.email,
    order.placedAt,
    paymentLabel(order.payment),
    fulfillmentLabel(order.fulfillment),
    String(itemCount(order)),
    (orderTotals(order).total / 100).toFixed(2),
  ]);
  const csv = [header, ...rows]
    .map((row) =>
      row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(","),
    )
    .join("\n");
  const url = URL.createObjectURL(
    new Blob([csv], { type: "text/csv;charset=utf-8" }),
  );
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  URL.revokeObjectURL(url);
  showToast({
    title: `${list.length} ${list.length === 1 ? "order" : "orders"} exported`,
    description: "The CSV file is in your downloads folder.",
    variant: "success",
  });
}

export function OrdersPage() {
  const [rows, setRows] = useState(initialOrders);
  const [query, setQuery] = useState("");
  const [payment, setPayment] = useState("all");
  const [fulfillment, setFulfillment] = useState("all");
  const [range, setRange] = useState<RangeValue<CalendarDate>>({
    start: initialRange.start,
    end: initialRange.end,
  });
  const [selected, setSelected] = useState<Set<Key>>(new Set());
  const [sheetId, setSheetId] = useState<string | null>(null);
  const [refundId, setRefundId] = useState<string | null>(null);

  const dayStart = range.start.toString();
  const dayEnd = range.end.toString();
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const filtered = rows.filter((order) => {
    const day = order.placedAt.slice(0, 10);
    if (day < dayStart || day > dayEnd) return false;
    if (payment !== "all" && order.payment !== payment) return false;
    if (fulfillment !== "all" && order.fulfillment !== fulfillment) {
      return false;
    }
    if (terms.length > 0) {
      const text = [
        order.id,
        order.customer,
        order.email,
        order.channel,
        order.tracking ?? "",
        ...order.lines.map(
          (item) => `${item.sku} ${item.name} ${item.detail ?? ""}`,
        ),
      ]
        .join(" ")
        .toLowerCase();
      if (!terms.every((term) => text.includes(term))) return false;
    }
    return true;
  });

  const selectedOrders = filtered.filter((order) => selected.has(order.id));
  const sheetOrder = sheetId
    ? (rows.find((order) => order.id === sheetId) ?? null)
    : null;
  const refundOrder = refundId
    ? (rows.find((order) => order.id === refundId) ?? null)
    : null;
  const paidRevenue = rows
    .filter((order) => order.payment === "paid")
    .reduce((sum, order) => sum + orderTotals(order).total, 0);
  const toFulfill = rows.filter(
    (order) =>
      order.fulfillment === "unfulfilled" || order.fulfillment === "processing",
  ).length;
  const rangeChanged =
    range.start.toString() !== initialRange.start.toString() ||
    range.end.toString() !== initialRange.end.toString();
  const hasFilters =
    query.trim().length > 0 ||
    payment !== "all" ||
    fulfillment !== "all" ||
    rangeChanged;

  const activeFilters: { id: string; label: string }[] = [];
  if (query.trim())
    activeFilters.push({ id: "query", label: `“${query.trim()}”` });
  if (payment !== "all") {
    activeFilters.push({
      id: "payment",
      label: paymentLabel(payment as Order["payment"]),
    });
  }
  if (fulfillment !== "all") {
    activeFilters.push({
      id: "fulfillment",
      label: fulfillmentLabel(fulfillment as Order["fulfillment"]),
    });
  }
  if (rangeChanged) {
    activeFilters.push({
      id: "range",
      label: formatRange(range.start, range.end),
    });
  }

  function clearSelection() {
    setSelected(new Set());
  }

  function clearFilters() {
    setQuery("");
    setPayment("all");
    setFulfillment("all");
    setRange({ start: initialRange.start, end: initialRange.end });
    clearSelection();
  }

  function removeFilters(keys: Set<Key>) {
    if (keys.has("query")) setQuery("");
    if (keys.has("payment")) setPayment("all");
    if (keys.has("fulfillment")) setFulfillment("all");
    if (keys.has("range")) {
      setRange({ start: initialRange.start, end: initialRange.end });
    }
    clearSelection();
  }

  function ship(order: Order) {
    const tracking = order.tracking ?? trackingFor(order.id);
    setRows((current) =>
      current.map((item) =>
        item.id === order.id
          ? { ...item, fulfillment: "shipped", tracking }
          : item,
      ),
    );
    showToast({
      title: `${order.id} is marked as shipped`,
      description: `Tracking ${tracking} was added.`,
      variant: "success",
    });
  }

  function shipSelected() {
    const targets = selectedOrders.filter(isShippable);
    if (targets.length === 0) return;
    const snapshot = rows;
    const ids = new Set(targets.map((order) => order.id));
    setRows((current) =>
      current.map((order) =>
        ids.has(order.id) && isShippable(order)
          ? {
              ...order,
              fulfillment: "shipped",
              tracking: order.tracking ?? trackingFor(order.id),
            }
          : order,
      ),
    );
    clearSelection();
    showToast({
      title: `${targets.length} ${targets.length === 1 ? "order" : "orders"} marked as shipped`,
      action: {
        label: "Undo",
        onAction: () => {
          setRows(snapshot);
          setSelected(new Set(ids));
        },
      },
    });
  }

  function archive(order: Order) {
    const snapshot = rows;
    setRows((current) => current.filter((item) => item.id !== order.id));
    setSelected((current) => {
      const next = new Set(current);
      next.delete(order.id);
      return next;
    });
    if (sheetId === order.id) setSheetId(null);
    showToast({
      title: `${order.id} archived`,
      description: "You can restore it from the archive.",
      action: { label: "Undo", onAction: () => setRows(snapshot) },
    });
  }

  function archiveSelected() {
    const ids = new Set(selectedOrders.map((order) => order.id));
    if (ids.size === 0) return;
    const snapshot = rows;
    setRows((current) => current.filter((order) => !ids.has(order.id)));
    clearSelection();
    if (sheetId && ids.has(sheetId)) setSheetId(null);
    showToast({
      title: `${ids.size} ${ids.size === 1 ? "order" : "orders"} archived`,
      action: {
        label: "Undo",
        onAction: () => {
          setRows(snapshot);
          setSelected(new Set(ids));
        },
      },
    });
  }

  function refund(order: Order) {
    const totals = orderTotals(order);
    setRows((current) =>
      current.map((item) =>
        item.id === order.id ? { ...item, payment: "refunded" } : item,
      ),
    );
    setRefundId(null);
    showToast({
      title: `Refund sent for ${order.id}`,
      description: `${formatMoney(totals.total)} goes back to the card.`,
      variant: "success",
    });
  }

  async function copyOrder(order: Order) {
    try {
      await navigator.clipboard.writeText(order.id);
      showToast({ title: `${order.id} copied` });
    } catch {
      showToast({
        title: "Copy failed",
        description: "Select the order number in the details panel.",
        variant: "error",
      });
    }
  }

  const columns: DataTableColumn<Order>[] = [
    {
      id: "id",
      header: "Order",
      minWidth: 116,
      cell: (order) => <p className="font-medium">{order.id}</p>,
      sortValue: (order) => order.id,
    },
    {
      id: "customer",
      header: "Customer",
      minWidth: 240,
      cell: (order) => (
        <div className="flex items-center gap-2.5">
          <Avatar name={order.customer} size="sm" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{order.customer}</p>
            <p className="truncate text-xs text-muted-foreground">
              {order.email}
            </p>
          </div>
        </div>
      ),
      sortValue: (order) => order.customer,
    },
    {
      id: "date",
      header: "Date",
      minWidth: 108,
      cell: (order) => (
        <div>
          <p>{formatDay(order.placedAt)}</p>
          <p className="text-xs text-muted-foreground">
            {formatTime(order.placedAt)}
          </p>
        </div>
      ),
      sortValue: (order) => order.placedAt,
    },
    {
      id: "items",
      header: "Items",
      align: "end",
      minWidth: 72,
      cell: (order) => <span className="tabular-nums">{itemCount(order)}</span>,
      sortValue: (order) => itemCount(order),
    },
    {
      id: "payment",
      header: "Payment",
      minWidth: 124,
      cell: (order) => <PaymentBadge status={order.payment} />,
      sortValue: (order) => order.payment,
    },
    {
      id: "fulfillment",
      header: "Fulfillment",
      minWidth: 132,
      cell: (order) => <FulfillmentBadge status={order.fulfillment} />,
      sortValue: (order) => order.fulfillment,
    },
    {
      id: "total",
      header: "Total",
      align: "end",
      minWidth: 96,
      cell: (order) => (
        <span className="font-medium tabular-nums">
          {formatMoney(orderTotals(order).total)}
        </span>
      ),
      sortValue: (order) => orderTotals(order).total,
    },
    {
      id: "actions",
      header: "Actions",
      minWidth: 84,
      cell: (order) => (
        <MenuTrigger>
          <Button
            variant="ghost"
            iconOnly
            size="sm"
            aria-label={`Actions for ${order.id}`}
          >
            <DotsThreeIcon size={20} weight="bold" aria-hidden="true" />
          </Button>
          <MenuPopover placement="bottom end">
            <MenuContent aria-label={`Actions for ${order.id}`}>
              <MenuItem onAction={() => setSheetId(order.id)}>
                View details
              </MenuItem>
              <MenuItem
                isDisabled={!isShippable(order)}
                onAction={() => ship(order)}
              >
                <TruckIcon size={16} aria-hidden="true" />
                Mark as shipped
              </MenuItem>
              <MenuItem
                isDisabled={order.payment !== "paid"}
                onAction={() => setRefundId(order.id)}
              >
                <ArrowCounterClockwiseIcon size={16} aria-hidden="true" />
                Refund payment
              </MenuItem>
              <MenuItem onAction={() => void copyOrder(order)}>
                <CopyIcon size={16} aria-hidden="true" />
                Copy order number
              </MenuItem>
              <MenuSeparator />
              <MenuItem variant="destructive" onAction={() => archive(order)}>
                <ArchiveIcon size={16} aria-hidden="true" />
                Archive order
              </MenuItem>
            </MenuContent>
          </MenuPopover>
        </MenuTrigger>
      ),
    },
  ];

  return (
    <div className="min-h-svh bg-muted/40 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-[1180px] gap-6">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div className="grid gap-1">
            <h1 className="text-2xl font-semibold tracking-[-0.04em]">
              Orders
            </h1>
            <p className="text-sm text-muted-foreground">
              {rows.length} orders · {formatMoney(paidRevenue)} paid ·{" "}
              {toFulfill} to fulfill
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onPress={() => downloadOrders(filtered, "marlow-finch-orders.csv")}
          >
            <DownloadSimpleIcon size={16} aria-hidden="true" />
            Export
          </Button>
        </header>

        <Card className="grid gap-3 p-4 sm:p-5">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_18rem_10rem_11rem] lg:items-end">
            <SearchField
              label="Search"
              placeholder="Order or customer"
              size="sm"
              value={query}
              onChange={(value) => {
                setQuery(value);
                clearSelection();
              }}
            />
            <DateRangePicker
              label="Date range"
              value={range}
              presets={presets}
              size="sm"
              onChange={(next) => {
                if (!next) return;
                setRange(next as RangeValue<CalendarDate>);
                clearSelection();
              }}
            />
            <Select
              label="Payment"
              options={[{ id: "all", name: "All payments" }, ...paymentOptions]}
              value={payment}
              size="sm"
              onValueChange={(value) => {
                setPayment(value);
                clearSelection();
              }}
            />
            <Select
              label="Fulfillment"
              options={[
                { id: "all", name: "All statuses" },
                ...fulfillmentOptions,
              ]}
              value={fulfillment}
              size="sm"
              onValueChange={(value) => {
                setFulfillment(value);
                clearSelection();
              }}
            />
          </div>
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-2 gap-y-2 border-t border-border/70 pt-3">
              <TagGroup
                aria-label="Active filters"
                size="xs"
                onRemove={removeFilters}
              >
                <TagListView items={activeFilters}>
                  {(filter) => (
                    <Tag id={filter.id} textValue={filter.label}>
                      {filter.label}
                    </Tag>
                  )}
                </TagListView>
              </TagGroup>
              <Button variant="minimal" size="xs" onPress={clearFilters}>
                Clear all
              </Button>
            </div>
          )}
        </Card>

        <Presence show={selectedOrders.length > 0}>
          <div className="flex flex-wrap items-center gap-2 rounded-xl bg-card px-3 py-2 shadow-[var(--shadow-card)] ring-1 ring-border/70">
            <p className="px-1 text-sm font-medium">
              {selectedOrders.length} selected
            </p>
            <Toolbar
              size="sm"
              aria-label="Bulk order actions"
              className="ms-auto border-0 bg-transparent p-0 shadow-none"
            >
              <Button
                size="sm"
                isDisabled={!selectedOrders.some(isShippable)}
                onPress={shipSelected}
              >
                <TruckIcon size={16} aria-hidden="true" />
                Mark as shipped
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onPress={() =>
                  downloadOrders(selectedOrders, "marlow-finch-selection.csv")
                }
              >
                <DownloadSimpleIcon size={16} aria-hidden="true" />
                Export
              </Button>
              <Button size="sm" variant="ghost" onPress={archiveSelected}>
                <ArchiveIcon size={16} aria-hidden="true" />
                Archive
              </Button>
            </Toolbar>
            <Button
              variant="ghost"
              iconOnly
              size="sm"
              aria-label="Clear selection"
              onPress={clearSelection}
            >
              <XIcon size={16} aria-hidden="true" />
            </Button>
          </div>
        </Presence>

        {filtered.length === 0 ? (
          <Card className="p-4 sm:p-6">
            <EmptyState className="border-0">
              <EmptyStateIcon>
                <MagnifyingGlassIcon />
              </EmptyStateIcon>
              <EmptyStateTitle>
                {hasFilters ? "No orders match these filters" : "No orders yet"}
              </EmptyStateTitle>
              <EmptyStateDescription>
                {hasFilters
                  ? "Change the date range or clear the filters to see more orders."
                  : "New orders show here after a customer pays."}
              </EmptyStateDescription>
              {hasFilters && (
                <EmptyStateActions>
                  <Button variant="outline" onPress={clearFilters}>
                    Clear filters
                  </Button>
                </EmptyStateActions>
              )}
            </EmptyState>
          </Card>
        ) : (
          <DataTable
            key={`${query}|${payment}|${fulfillment}|${dayStart}|${dayEnd}`}
            className="[&_td]:py-2"
            label="Order list"
            rows={filtered}
            columns={columns}
            getRowId={(order) => order.id}
            selectedKeys={selected}
            onSelectionChange={setSelected}
            onRowAction={(key) => setSheetId(String(key))}
            pageSize={8}
            showClearSelection={false}
            renderFooter={({
              firstRow,
              lastRow,
              filteredCount,
              pageIndex,
              pageCount,
              setPageIndex,
            }) => (
              <>
                <output
                  aria-live="polite"
                  aria-atomic="true"
                  className="flex flex-wrap items-center gap-2 tabular-nums"
                >
                  Showing {firstRow}–{lastRow} of {filteredCount}{" "}
                  {filteredCount === 1 ? "order" : "orders"}
                </output>
                {pageCount > 1 && (
                  <Pagination size="sm">
                    <PaginationList className="flex-nowrap gap-1">
                      <PaginationItem>
                        <PaginationLink
                          isDisabled={pageIndex === 0}
                          aria-label="Previous page"
                          onPress={() => setPageIndex(pageIndex - 1)}
                        >
                          <CaretLeftIcon aria-hidden="true" />
                        </PaginationLink>
                      </PaginationItem>
                      {Array.from(
                        { length: pageCount },
                        (_, index) => index + 1,
                      ).map((number) => (
                        <PaginationItem key={number}>
                          <PaginationLink
                            isCurrent={number - 1 === pageIndex}
                            aria-label={`Page ${number}`}
                            onPress={() => setPageIndex(number - 1)}
                          >
                            {number}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationLink
                          isDisabled={pageIndex === pageCount - 1}
                          aria-label="Next page"
                          onPress={() => setPageIndex(pageIndex + 1)}
                        >
                          <CaretRightIcon aria-hidden="true" />
                        </PaginationLink>
                      </PaginationItem>
                    </PaginationList>
                  </Pagination>
                )}
              </>
            )}
          />
        )}
      </div>

      <OrderDetailsSheet
        order={sheetOrder}
        onOpenChange={(open) => {
          if (!open) setSheetId(null);
        }}
        onShip={ship}
        onRefund={(order) => setRefundId(order.id)}
      />

      <DialogContent
        role="alertdialog"
        size="sm"
        overlayProps={{
          isOpen: refundOrder !== null,
          onOpenChange: (open) => {
            if (!open) setRefundId(null);
          },
        }}
      >
        <DialogHeader>
          <DialogTitle>Refund {refundOrder?.id}?</DialogTitle>
          <DialogDescription>
            {refundOrder
              ? `We return ${formatMoney(orderTotals(refundOrder).total)} to Visa ending in 4242.`
              : ""}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose variant="outline">Cancel</DialogClose>
          <Button
            variant="destructive"
            onPress={() => {
              if (refundOrder) refund(refundOrder);
            }}
          >
            Refund payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
}
