"use client";

import { useState } from "react";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "@/components/ui/table";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import {
  type Fulfillment,
  formatCents,
  formatCount,
  month,
  orders,
  type Payment,
} from "./data";

const paymentBadge: Record<
  Payment,
  { label: string; variant: BadgeProps["variant"] }
> = {
  paid: { label: "Paid", variant: "success" },
  pending: { label: "Pending", variant: "warning" },
  refunded: { label: "Refunded", variant: "neutral" },
};

const fulfillmentBadge: Record<
  Fulfillment,
  { label: string; variant: BadgeProps["variant"] }
> = {
  unfulfilled: { label: "Unfulfilled", variant: "warning" },
  shipped: { label: "Shipped", variant: "accent" },
  delivered: { label: "Delivered", variant: "neutral" },
  late: { label: "Late", variant: "error" },
};

type Filter = "all" | "open" | "sent";

const filters: Record<Filter, (fulfillment: Fulfillment) => boolean> = {
  all: () => true,
  open: (fulfillment) => fulfillment === "unfulfilled",
  sent: (fulfillment) => fulfillment !== "unfulfilled",
};

export function RecentOrders() {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = orders.filter((order) => filters[filter](order.fulfillment));

  return (
    <Card className="min-w-0 overflow-hidden">
      <CardHeader className="flex-row flex-wrap items-start justify-between gap-3 pb-4">
        <div className="grid gap-1">
          <CardTitle as="h2">Latest orders</CardTitle>
          <CardDescription>
            {visible.length} of {formatCount(month.orders)} orders in September
          </CardDescription>
        </div>
        <ToggleButtonGroup
          aria-label="Fulfillment"
          size="sm"
          selectionMode="single"
          disallowEmptySelection
          selectedKeys={[filter]}
          onSelectionChange={(keys) => {
            const [next] = keys;
            if (next) setFilter(next as Filter);
          }}
        >
          <ToggleButton id="all" variant="segmented">
            All
          </ToggleButton>
          <ToggleButton id="open" variant="segmented">
            Unfulfilled
          </ToggleButton>
          <ToggleButton id="sent" variant="segmented">
            Sent
          </ToggleButton>
        </ToggleButtonGroup>
      </CardHeader>
      <div className="overflow-x-auto">
        <Table aria-label="Latest orders" className="min-w-180">
          <TableHeader>
            <Column isRowHeader className="ps-5">
              Order
            </Column>
            <Column>Customer</Column>
            <Column>Channel</Column>
            <Column>Payment</Column>
            <Column>Fulfillment</Column>
            <Column className="text-end">Items</Column>
            <Column className="pe-5 text-end">Total</Column>
          </TableHeader>
          <TableBody
            items={visible}
            renderEmptyState={() => (
              <p className="px-5 py-8 text-center text-sm text-muted-foreground">
                No orders have this status.
              </p>
            )}
          >
            {(order) => (
              <Row id={order.id}>
                <Cell className="ps-5">
                  <span className="block font-mono text-xs font-medium">
                    {order.id}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {order.placed}
                  </span>
                </Cell>
                <Cell>
                  <span className="block font-medium">{order.customer}</span>
                  <span className="block text-xs text-muted-foreground">
                    {order.email}
                  </span>
                </Cell>
                <Cell className="text-muted-foreground">{order.channel}</Cell>
                <Cell>
                  <Badge variant={paymentBadge[order.payment].variant}>
                    {paymentBadge[order.payment].label}
                  </Badge>
                </Cell>
                <Cell>
                  <Badge
                    variant={fulfillmentBadge[order.fulfillment].variant}
                    dot
                  >
                    {fulfillmentBadge[order.fulfillment].label}
                  </Badge>
                </Cell>
                <Cell className="text-end tabular-nums text-muted-foreground">
                  {order.items}
                </Cell>
                <Cell className="pe-5 text-end font-medium tabular-nums">
                  {formatCents(order.total)}
                </Cell>
              </Row>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
