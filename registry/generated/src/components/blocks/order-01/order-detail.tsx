"use client";

import {
  ArrowCounterClockwiseIcon,
  CaretDownIcon,
  CheckIcon,
  CopyIcon,
  CreditCardIcon,
  EnvelopeSimpleIcon,
  FilesIcon,
  PackageIcon,
  PaperPlaneTiltIcon,
  PrinterIcon,
  ShoppingBagIcon,
  TruckIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import { Alert } from "../../vip-ui/alert";
import { Avatar } from "../../vip-ui/avatar";
import { Badge } from "../../vip-ui/badge";
import { Breadcrumb, Breadcrumbs } from "../../vip-ui/breadcrumbs";
import { Button } from "../../vip-ui/button";
import { ButtonGroup } from "../../vip-ui/button-group";
import { ButtonLink } from "../../vip-ui/button-link";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../vip-ui/card";
import { CopyButton } from "../../vip-ui/copy-button";
import {
  DescriptionDetail,
  DescriptionList,
  DescriptionTerm,
} from "../../vip-ui/description-list";
import { Link } from "../../vip-ui/link";
import {
  MenuContent,
  MenuItem,
  MenuPopover,
  MenuSeparator,
  MenuTrigger,
} from "../../vip-ui/menu";
import { Separator } from "../../vip-ui/separator";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "../../vip-ui/table";
import {
  Timeline,
  TimelineDescription,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "../../vip-ui/timeline";
import { showToast } from "../../vip-ui/toast";
import {
  formatEventTime,
  formatMoney,
  formatStamp,
  itemCount,
  order,
  refundReasonLabel,
  timeline,
  totals,
} from "./data";
import { RefundDialog } from "./refund-dialog";

interface RefundEntry {
  id: string;
  amount: number;
  reason: string;
  note: string;
  dateTime: string;
}

const eventIcons = {
  placed: ShoppingBagIcon,
  paid: CreditCardIcon,
  packed: PackageIcon,
  shipped: TruckIcon,
  delivered: CheckIcon,
  refund: ArrowCounterClockwiseIcon,
};

export function OrderDetail() {
  const [refundOpen, setRefundOpen] = useState(false);
  const [refunds, setRefunds] = useState<RefundEntry[]>([]);
  const refunded = refunds.reduce((sum, refund) => sum + refund.amount, 0);
  const remaining = totals.total - refunded;
  const fullRefund = remaining <= 0;

  const events = [
    ...timeline.map((event) => ({ ...event, kind: event.id })),
    ...refunds.map((refund) => ({
      id: refund.id,
      title: "Refund issued",
      dateTime: refund.dateTime,
      description: `${formatMoney(refund.amount)} returned to ${order.card.brand} ending in ${order.card.last4}. ${refundReasonLabel(refund.reason)}.${refund.note ? ` ${refund.note}` : ""}`,
      kind: "refund",
    })),
  ];

  function addRefund(amount: number, reason: string, note: string) {
    const index = refunds.length;
    const dateTime = `2026-10-30T${String(11 + index).padStart(2, "0")}:24:00Z`;
    setRefunds((current) => [
      ...current,
      { id: `refund-${index}`, amount, reason, note, dateTime },
    ]);
    setRefundOpen(false);
    showToast({
      title: `${formatMoney(amount)} refunded`,
      description: `The money returns to ${order.card.brand} ending in ${order.card.last4} in 3 to 5 business days.`,
      variant: "success",
    });
  }

  async function copyOrderLink() {
    try {
      await navigator.clipboard.writeText(
        `https://marlowfinch.com/admin/orders/${order.id}`,
      );
      showToast({ title: "Order link copied" });
    } catch {
      showToast({
        title: "Copy failed",
        description: "Copy the order number from the page title.",
        variant: "error",
      });
    }
  }

  return (
    <div className="min-h-svh bg-muted/40 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-[1120px] gap-6">
        <nav aria-label="Breadcrumbs">
          <Breadcrumbs>
            <Breadcrumb href="/blocks/orders-01">Orders</Breadcrumb>
            <Breadcrumb>{order.id}</Breadcrumb>
          </Breadcrumbs>
        </nav>

        <header className="flex flex-wrap items-start justify-between gap-4">
          <div className="grid gap-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl font-semibold tracking-[-0.04em]">
                Order {order.id}
              </h1>
              <CopyButton
                value={order.id}
                iconOnly
                variant="ghost"
                size="sm"
                aria-label="Copy order number"
              />
              {fullRefund ? (
                <Badge variant="neutral" dot>
                  Refunded
                </Badge>
              ) : refunded > 0 ? (
                <Badge variant="warning" dot>
                  Partially refunded
                </Badge>
              ) : (
                <Badge variant="success" dot>
                  Paid
                </Badge>
              )}
              <Badge variant="success">Delivered</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Placed {formatStamp(order.placedAt)} · {order.channel} ·{" "}
              {itemCount(order)} items
            </p>
          </div>
          <ButtonGroup aria-label="Order actions">
            <Button
              variant="outline"
              isDisabled={fullRefund}
              onPress={() => setRefundOpen(true)}
            >
              <ArrowCounterClockwiseIcon size={16} aria-hidden="true" />
              Refund
            </Button>
            <MenuTrigger>
              <Button
                variant="outline"
                iconOnly
                aria-label="More order actions"
              >
                <CaretDownIcon size={16} aria-hidden="true" />
              </Button>
              <MenuPopover placement="bottom end">
                <MenuContent aria-label="Order actions">
                  <MenuItem onAction={() => window.print()}>
                    <PrinterIcon size={16} aria-hidden="true" />
                    Print order
                  </MenuItem>
                  <MenuItem onAction={() => void copyOrderLink()}>
                    <CopyIcon size={16} aria-hidden="true" />
                    Copy order link
                  </MenuItem>
                  <MenuItem
                    onAction={() =>
                      showToast({
                        title: `Receipt sent to ${order.email}`,
                        description: "It can take a minute to arrive.",
                      })
                    }
                  >
                    <PaperPlaneTiltIcon size={16} aria-hidden="true" />
                    Resend receipt
                  </MenuItem>
                  <MenuSeparator />
                  <MenuItem
                    onAction={() =>
                      showToast({
                        title: "Draft order created",
                        description: `The draft has the same items as ${order.id}.`,
                      })
                    }
                  >
                    <FilesIcon size={16} aria-hidden="true" />
                    Duplicate order
                  </MenuItem>
                </MenuContent>
              </MenuPopover>
            </MenuTrigger>
          </ButtonGroup>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="grid content-start gap-6">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle as="h2">Items</CardTitle>
              </CardHeader>
              <div className="mt-4 overflow-x-auto border-y border-border/70">
                <Table
                  aria-label={`Items in order ${order.id}`}
                  className="min-w-[580px]"
                >
                  <TableHeader>
                    <Column isRowHeader className="ps-5">
                      Item
                    </Column>
                    <Column className="text-end">Qty</Column>
                    <Column className="text-end">Unit price</Column>
                    <Column className="pe-5 text-end">Total</Column>
                  </TableHeader>
                  <TableBody items={order.lines}>
                    {(item) => (
                      <Row id={item.sku}>
                        <Cell className="ps-5">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.sku}
                            {item.detail ? ` · ${item.detail}` : ""}
                          </p>
                        </Cell>
                        <Cell className="text-end tabular-nums">
                          {item.quantity}
                        </Cell>
                        <Cell className="text-end tabular-nums">
                          {formatMoney(item.price)}
                        </Cell>
                        <Cell className="pe-5 text-end font-medium tabular-nums">
                          {formatMoney(item.price * item.quantity)}
                        </Cell>
                      </Row>
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="flex justify-end p-5">
                <DescriptionList className="w-full max-w-xs grid-cols-[minmax(0,1fr)_auto] gap-x-0 gap-y-2 [&>dt]:pe-4 [&_[data-slot=description-term]]:mt-0">
                  <DescriptionTerm>Subtotal</DescriptionTerm>
                  <DescriptionDetail className="text-end tabular-nums">
                    {formatMoney(totals.subtotal)}
                  </DescriptionDetail>
                  <DescriptionTerm>Discount</DescriptionTerm>
                  <DescriptionDetail className="text-end tabular-nums">
                    −{formatMoney(order.discount)}
                  </DescriptionDetail>
                  <DescriptionTerm>Shipping</DescriptionTerm>
                  <DescriptionDetail className="text-end tabular-nums">
                    {formatMoney(order.shipping)}
                  </DescriptionDetail>
                  <DescriptionTerm>Tax</DescriptionTerm>
                  <DescriptionDetail className="text-end tabular-nums">
                    {formatMoney(totals.tax)}
                  </DescriptionDetail>
                  <DescriptionTerm className="border-t border-border/70 pt-2 font-semibold text-foreground">
                    Total
                  </DescriptionTerm>
                  <DescriptionDetail className="border-t border-border/70 pt-2 text-end text-base font-semibold tabular-nums">
                    {formatMoney(totals.total)}
                  </DescriptionDetail>
                  {refunded > 0 && (
                    <>
                      <DescriptionTerm className="text-success">
                        Refunded
                      </DescriptionTerm>
                      <DescriptionDetail className="text-end font-medium text-success tabular-nums">
                        −{formatMoney(refunded)}
                      </DescriptionDetail>
                    </>
                  )}
                </DescriptionList>
              </div>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle as="h2">Fulfillment</CardTitle>
                <CardDescription>UPS Ground · {order.tracking}</CardDescription>
                <CardAction>
                  <CopyButton
                    value={order.tracking}
                    iconOnly
                    variant="ghost"
                    size="sm"
                    aria-label="Copy tracking number"
                  />
                </CardAction>
              </CardHeader>
              <CardContent>
                <Timeline
                  aria-label="Fulfillment history"
                  className="[&_[data-slot=timeline-item]]:pb-4"
                >
                  {events.map((event, index) => {
                    const Icon =
                      eventIcons[event.kind as keyof typeof eventIcons];
                    return (
                      <TimelineItem
                        key={event.id}
                        status={
                          index === events.length - 1 ? "latest" : "complete"
                        }
                        icon={<Icon weight="bold" />}
                      >
                        <TimelineTitle>{event.title}</TimelineTitle>
                        <TimelineTime dateTime={event.dateTime}>
                          {formatEventTime(event.dateTime)}
                        </TimelineTime>
                        {event.kind !== "shipped" && event.description && (
                          <TimelineDescription>
                            {event.description}
                          </TimelineDescription>
                        )}
                      </TimelineItem>
                    );
                  })}
                </Timeline>
              </CardContent>
            </Card>
          </div>

          <aside className="grid content-start gap-6">
            <Card>
              <CardHeader>
                <CardTitle as="h2">Customer</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center gap-3">
                  <Avatar name={order.customer} size="lg" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {order.customer}
                    </p>
                    <Link
                      href={`mailto:${order.email}`}
                      className="block truncate text-xs"
                    >
                      {order.email}
                    </Link>
                  </div>
                </div>
                <Separator />
                <DescriptionList className="gap-y-2">
                  <DescriptionTerm>Orders</DescriptionTerm>
                  <DescriptionDetail>
                    {order.previousOrders + 1}
                  </DescriptionDetail>
                  <DescriptionTerm>Total spent</DescriptionTerm>
                  <DescriptionDetail className="tabular-nums">
                    {formatMoney(order.previousSpend + totals.total - refunded)}
                  </DescriptionDetail>
                  <DescriptionTerm>Customer since</DescriptionTerm>
                  <DescriptionDetail>{order.customerSince}</DescriptionDetail>
                </DescriptionList>
                <ButtonLink
                  href={`mailto:${order.email}`}
                  variant="outline"
                  className="w-full"
                >
                  <EnvelopeSimpleIcon size={16} aria-hidden="true" />
                  Send email
                </ButtonLink>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle as="h2">Shipping</CardTitle>
                <CardAction>
                  <CopyButton
                    value={order.shipTo.join("\n")}
                    iconOnly
                    variant="ghost"
                    size="sm"
                    aria-label="Copy shipping address"
                  />
                </CardAction>
              </CardHeader>
              <CardContent className="grid gap-4">
                <address className="text-sm leading-6 text-foreground not-italic">
                  {order.shipTo.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <Separator />
                <p className="text-xs leading-5 text-muted-foreground">
                  Signature not required
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle as="h2">Payment</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-md bg-muted ring-1 ring-border/70">
                    <CreditCardIcon size={20} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium">
                      {order.card.brand} ending in {order.card.last4}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Expires {order.card.expiry}
                    </p>
                  </div>
                </div>
                <div className="grid gap-1">
                  <p className="text-xs text-muted-foreground">Transaction</p>
                  <div className="flex min-w-0 items-center gap-1">
                    <code className="truncate font-mono text-xs">
                      {order.transaction}
                    </code>
                    <CopyButton
                      value={order.transaction}
                      iconOnly
                      variant="ghost"
                      size="xs"
                      aria-label="Copy transaction ID"
                    />
                  </div>
                </div>
                {refunded > 0 && (
                  <Alert
                    variant="success"
                    title={`${formatMoney(refunded)} refunded`}
                  >
                    The money returns to the card in 3 to 5 business days.
                  </Alert>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle as="h2">Customer note</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-foreground">
                  “{order.note}”
                </p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>

      <RefundDialog
        open={refundOpen}
        onOpenChange={setRefundOpen}
        remaining={remaining}
        onRefund={addRefund}
      />
    </div>
  );
}
