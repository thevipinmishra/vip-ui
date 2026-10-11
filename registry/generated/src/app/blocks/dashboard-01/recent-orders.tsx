"use client";

import { useState } from "react";
import { Badge, type BadgeProps } from "../../../components/vip-ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/vip-ui/card";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "../../../components/vip-ui/table";
import { ToggleButton } from "../../../components/vip-ui/toggle-button";
import { ToggleButtonGroup } from "../../../components/vip-ui/toggle-button-group";
import { formatMoney, type OrderStatus, orders } from "./data";

const statusBadge: Record<
  OrderStatus,
  { label: string; variant: BadgeProps["variant"] }
> = {
  paid: { label: "Paid", variant: "success" },
  pending: { label: "Pending", variant: "warning" },
  refunded: { label: "Refunded", variant: "neutral" },
};

type Filter = "all" | OrderStatus;

export function RecentOrders() {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = orders.filter(
    (order) => filter === "all" || order.status === filter,
  );

  return (
    <Card className="min-w-0 overflow-hidden">
      <CardHeader className="flex-row flex-wrap items-start justify-between gap-3 pb-4">
        <div className="grid gap-1">
          <CardTitle as="h2">Recent orders</CardTitle>
          <CardDescription>
            {visible.length} of {orders.length} orders from the last 3 days
          </CardDescription>
        </div>
        <ToggleButtonGroup
          aria-label="Order status"
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
          <ToggleButton id="paid" variant="segmented">
            Paid
          </ToggleButton>
          <ToggleButton id="pending" variant="segmented">
            Pending
          </ToggleButton>
        </ToggleButtonGroup>
      </CardHeader>
      <div className="overflow-x-auto">
        <Table aria-label="Recent orders" className="min-w-[560px]">
          <TableHeader>
            <Column isRowHeader className="ps-6">
              Customer
            </Column>
            <Column>Order</Column>
            <Column>Status</Column>
            <Column>Date</Column>
            <Column className="pe-6 text-end">Amount</Column>
          </TableHeader>
          <TableBody
            items={visible}
            renderEmptyState={() => (
              <p className="px-6 py-10 text-center text-sm text-muted-foreground">
                No orders have this status.
              </p>
            )}
          >
            {(order) => (
              <Row id={order.id}>
                <Cell className="ps-6">
                  <span className="block font-medium">{order.customer}</span>
                  <span className="block text-xs text-muted-foreground">
                    {order.email}
                  </span>
                </Cell>
                <Cell className="font-mono text-xs text-muted-foreground">
                  {order.id}
                </Cell>
                <Cell>
                  <Badge variant={statusBadge[order.status].variant}>
                    {statusBadge[order.status].label}
                  </Badge>
                </Cell>
                <Cell className="text-muted-foreground">{order.date}</Cell>
                <Cell className="pe-6 text-end font-medium tabular-nums">
                  {formatMoney(order.amount)}
                </Cell>
              </Row>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
