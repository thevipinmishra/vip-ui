"use client";

import { Collection, useAsyncList } from "react-aria-components";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableContainer,
  TableHeader,
  TableLoadMoreItem,
} from "@/components/ui/table";

interface Order {
  id: string;
  customer: string;
  total: number;
}

const customers = [
  "Maya Chen",
  "Sam Rivera",
  "Jo Park",
  "Alex Kim",
  "Priya Nair",
  "Leo Novak",
];

function fetchOrders(cursor: number, signal: AbortSignal) {
  return new Promise<{ items: Order[]; cursor?: string }>((resolve, reject) => {
    const timer = setTimeout(() => {
      const items = Array.from({ length: 10 }, (_, index) => {
        const n = cursor + index;
        return {
          id: `ORD-${1001 + n}`,
          customer: customers[n % customers.length],
          total: 40 + ((n * 37) % 460),
        };
      });
      const next = cursor + items.length;
      resolve({ items, cursor: next < 40 ? String(next) : undefined });
    }, 700);
    signal.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(signal.reason);
    });
  });
}

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function TableLoadMoreDemo() {
  const list = useAsyncList<Order, string>({
    load: ({ signal, cursor }) => fetchOrders(Number(cursor ?? 0), signal),
  });

  return (
    <TableContainer className="max-h-80 max-w-2xl">
      <Table aria-label="Orders" className="min-w-104">
        <TableHeader>
          <Column id="id" isRowHeader>
            Order
          </Column>
          <Column id="customer">Customer</Column>
          <Column id="total" className="text-end">
            Total
          </Column>
        </TableHeader>
        <TableBody>
          <Collection items={list.items}>
            {(order) => (
              <Row id={order.id}>
                <Cell className="font-medium tabular-nums">{order.id}</Cell>
                <Cell>{order.customer}</Cell>
                <Cell className="text-end tabular-nums">
                  {currency.format(order.total)}
                </Cell>
              </Row>
            )}
          </Collection>
          <TableLoadMoreItem
            onLoadMore={list.loadMore}
            isLoading={list.loadingState === "loadingMore"}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
