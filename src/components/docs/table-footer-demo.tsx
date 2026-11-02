"use client";

import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableHeader,
} from "@/components/ui/table";

const lines = [
  { id: "design", item: "Design system audit", hours: 12, rate: 140 },
  { id: "build", item: "Component build", hours: 32, rate: 120 },
  { id: "docs", item: "Documentation", hours: 8, rate: 95 },
];

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function TableFooterDemo() {
  const hours = lines.reduce((sum, line) => sum + line.hours, 0);
  const total = lines.reduce((sum, line) => sum + line.hours * line.rate, 0);

  return (
    <TableContainer className="max-w-2xl">
      <Table aria-label="Invoice lines" className="min-w-[28rem]">
        <TableHeader>
          <Column id="item" isRowHeader>
            Item
          </Column>
          <Column id="hours" className="text-end">
            Hours
          </Column>
          <Column id="amount" className="text-end">
            Amount
          </Column>
        </TableHeader>
        <TableBody items={lines}>
          {(line) => (
            <Row id={line.id}>
              <Cell>{line.item}</Cell>
              <Cell className="text-end tabular-nums">{line.hours}</Cell>
              <Cell className="text-end tabular-nums">
                {currency.format(line.hours * line.rate)}
              </Cell>
            </Row>
          )}
        </TableBody>
        <TableFooter>
          <Row id="total">
            <Cell>Total</Cell>
            <Cell className="text-end tabular-nums">{hours}</Cell>
            <Cell className="text-end tabular-nums">
              {currency.format(total)}
            </Cell>
          </Row>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
