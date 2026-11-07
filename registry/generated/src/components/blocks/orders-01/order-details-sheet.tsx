"use client";

import { CreditCardIcon, MapPinIcon, TruckIcon } from "@phosphor-icons/react";
import { useRef } from "react";
import { Avatar } from "../../vip-ui/avatar";
import { Button } from "../../vip-ui/button";
import { CopyButton } from "../../vip-ui/copy-button";
import {
  DescriptionDetail,
  DescriptionList,
  DescriptionTerm,
} from "../../vip-ui/description-list";
import { Link } from "../../vip-ui/link";
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../../vip-ui/sheet";
import {
  formatFullDate,
  formatMoney,
  formatTime,
  itemCount,
  type Order,
  orderTotals,
} from "./data";
import { FulfillmentBadge, PaymentBadge } from "./order-status";

export function OrderDetailsSheet({
  order,
  onOpenChange,
  onShip,
  onRefund,
}: {
  order: Order | null;
  onOpenChange: (open: boolean) => void;
  onShip: (order: Order) => void;
  onRefund: (order: Order) => void;
}) {
  const lastOrder = useRef<Order | null>(null);
  if (order) lastOrder.current = order;
  const shown = order ?? lastOrder.current;
  const totals = shown ? orderTotals(shown) : null;
  const shippable =
    shown?.fulfillment === "unfulfilled" || shown?.fulfillment === "processing";

  return (
    <Sheet
      position="right"
      size="md"
      isOpen={order !== null}
      onOpenChange={onOpenChange}
    >
      {shown && totals && (
        <>
          <SheetHeader>
            <SheetTitle>Order {shown.id}</SheetTitle>
            <SheetDescription>
              Placed {formatFullDate(shown.placedAt)} at{" "}
              {formatTime(shown.placedAt)} via {shown.channel.toLowerCase()}.
            </SheetDescription>
            <SheetClose />
          </SheetHeader>
          <SheetBody className="grid content-start gap-5 pb-5">
            <div className="flex flex-wrap items-center gap-2">
              <PaymentBadge status={shown.payment} />
              <FulfillmentBadge status={shown.fulfillment} />
              <span className="ms-auto text-sm font-semibold tabular-nums">
                {formatMoney(totals.total)}
              </span>
            </div>

            <section aria-labelledby="sheet-customer" className="grid gap-2.5">
              <h3 id="sheet-customer" className="text-sm font-semibold">
                Customer
              </h3>
              <div className="flex items-center gap-3">
                <Avatar name={shown.customer} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {shown.customer}
                  </p>
                  <Link
                    href={`mailto:${shown.email}`}
                    className="block truncate text-xs"
                  >
                    {shown.email}
                  </Link>
                </div>
              </div>
            </section>

            <section aria-labelledby="sheet-items" className="grid gap-2.5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 id="sheet-items" className="text-sm font-semibold">
                  Items
                </h3>
                <p className="text-xs text-muted-foreground">
                  {itemCount(shown)} {itemCount(shown) === 1 ? "item" : "items"}
                </p>
              </div>
              <ul className="divide-y divide-border/70 overflow-hidden rounded-lg ring-1 ring-border/70">
                {shown.lines.map((item) => (
                  <li
                    key={item.sku}
                    className="flex items-start gap-3 bg-card p-3"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-md bg-muted text-xs font-medium tabular-nums">
                      {item.quantity}×
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.sku}
                        {item.detail ? ` · ${item.detail}` : ""}
                      </p>
                    </div>
                    <p className="text-sm font-medium tabular-nums">
                      {formatMoney(item.price * item.quantity)}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <DescriptionList className="gap-x-0 gap-y-2 rounded-lg bg-muted/50 p-3.5 ring-1 ring-border/60 [&>dt]:pe-4">
              <DescriptionTerm>Subtotal</DescriptionTerm>
              <DescriptionDetail className="text-end tabular-nums">
                {formatMoney(totals.subtotal)}
              </DescriptionDetail>
              {shown.discount > 0 && (
                <>
                  <DescriptionTerm>Discount</DescriptionTerm>
                  <DescriptionDetail className="text-end tabular-nums">
                    −{formatMoney(shown.discount)}
                  </DescriptionDetail>
                </>
              )}
              <DescriptionTerm>Shipping</DescriptionTerm>
              <DescriptionDetail className="text-end tabular-nums">
                {shown.shipping === 0 ? "Free" : formatMoney(shown.shipping)}
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
            </DescriptionList>

            <div className="grid gap-4 sm:grid-cols-2">
              <section
                aria-labelledby="sheet-shipping"
                className="grid gap-1.5"
              >
                <h3
                  id="sheet-shipping"
                  className="flex items-center gap-1.5 text-sm font-semibold"
                >
                  <MapPinIcon size={15} aria-hidden="true" />
                  Shipping address
                </h3>
                <address className="text-sm leading-6 text-muted-foreground not-italic">
                  {shown.shipTo.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </section>
              <section aria-labelledby="sheet-payment" className="grid gap-1.5">
                <h3
                  id="sheet-payment"
                  className="flex items-center gap-1.5 text-sm font-semibold"
                >
                  <CreditCardIcon size={15} aria-hidden="true" />
                  Payment
                </h3>
                <p className="text-sm text-muted-foreground">
                  Visa ending in 4242
                </p>
                {shown.tracking && (
                  <div className="mt-1 grid gap-1">
                    <p className="flex items-center gap-1.5 text-sm font-semibold">
                      <TruckIcon size={15} aria-hidden="true" />
                      Tracking
                    </p>
                    <div className="flex min-w-0 items-center gap-1">
                      <span className="truncate font-mono text-xs text-muted-foreground">
                        {shown.tracking}
                      </span>
                      <CopyButton
                        value={shown.tracking}
                        iconOnly
                        variant="ghost"
                        size="xs"
                        aria-label={`Copy tracking number for ${shown.id}`}
                      />
                    </div>
                  </div>
                )}
              </section>
            </div>
          </SheetBody>
          <SheetFooter className="justify-between">
            <SheetClose variant="outline">Close</SheetClose>
            <div className="flex flex-col gap-2 sm:flex-row">
              {shown.payment === "paid" && (
                <Button variant="outline" onPress={() => onRefund(shown)}>
                  Refund
                </Button>
              )}
              {shippable && (
                <Button onPress={() => onShip(shown)}>
                  <TruckIcon size={16} aria-hidden="true" />
                  Mark as shipped
                </Button>
              )}
            </div>
          </SheetFooter>
        </>
      )}
    </Sheet>
  );
}
