"use client";

import { TagIcon, TrashIcon } from "@phosphor-icons/react";
import { useEffect, useRef } from "react";
import { Button } from "../../vip-ui/button";
import { ButtonLink } from "../../vip-ui/button-link";
import {
  DescriptionDetail,
  DescriptionList,
  DescriptionTerm,
} from "../../vip-ui/description-list";
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "../../vip-ui/empty-state";
import { NumberField } from "../../vip-ui/number-field";
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
  type CartLine,
  cartCount,
  cartTotals,
  colors,
  formatMoney,
} from "./data";
import { CapThumb, JacketThumb } from "./product-art";

export function CartSheet({
  open,
  onOpenChange,
  lines,
  onQuantityChange,
  onRemove,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lines: CartLine[];
  onQuantityChange: (key: string, quantity: number) => void;
  onRemove: (key: string) => void;
}) {
  const totals = cartTotals(lines);
  const count = cartCount(lines);
  const emptyRef = useRef<HTMLDivElement>(null);
  const previousCount = useRef(count);
  const listRef = useRef<HTMLUListElement>(null);
  const previousLines = useRef(lines.length);

  useEffect(() => {
    if (count === 0 && previousCount.current > 0 && open) {
      emptyRef.current?.focus();
    }
    previousCount.current = count;
  }, [count, open]);

  useEffect(() => {
    if (lines.length < previousLines.current && lines.length > 0 && open) {
      listRef.current
        ?.querySelector<HTMLButtonElement>('[aria-label^="Remove "]')
        ?.focus();
    }
    previousLines.current = lines.length;
  }, [lines.length, open]);

  return (
    <Sheet position="right" size="md" isOpen={open} onOpenChange={onOpenChange}>
      <SheetHeader>
        <SheetTitle>Your bag</SheetTitle>
        <SheetDescription>
          {count === 1 ? "1 item" : `${count} items`}
        </SheetDescription>
        <SheetClose />
      </SheetHeader>

      <SheetBody className="pb-4">
        {lines.length === 0 ? (
          <div
            ref={emptyRef}
            tabIndex={-1}
            className="grid h-full place-content-center outline-none"
          >
            <EmptyState className="border-0">
              <EmptyStateIcon>
                <TagIcon />
              </EmptyStateIcon>
              <EmptyStateTitle>Your bag is empty</EmptyStateTitle>
              <EmptyStateDescription>
                Add a jacket or a cap to start an order.
              </EmptyStateDescription>
            </EmptyState>
          </div>
        ) : (
          <div className="grid">
            <ul ref={listRef} className="divide-y divide-border/70">
              {lines.map((line) => {
                const color = colors.find((item) => item.id === line.colorId);
                return (
                  <li key={line.key} className="flex gap-3 py-4">
                    <div className="size-16 shrink-0 rounded-lg bg-muted p-1.5 ring-1 ring-border/70">
                      {line.kind === "jacket" ? (
                        <JacketThumb hex={color?.hex ?? "#4f5b45"} />
                      ) : (
                        <CapThumb hex={color?.hex ?? "#4f5b45"} />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            {line.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {line.subtitle}
                          </p>
                        </div>
                        <p className="shrink-0 text-sm font-medium tabular-nums">
                          {formatMoney(line.price * line.quantity)}
                        </p>
                      </div>
                      <div className="mt-2.5 flex items-center justify-between gap-2">
                        <NumberField
                          aria-label={`Quantity of ${line.name}, ${line.subtitle}`}
                          size="sm"
                          minValue={1}
                          maxValue={9}
                          value={line.quantity}
                          onChange={(value) =>
                            onQuantityChange(line.key, Math.max(1, value))
                          }
                          className="w-32"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          iconOnly
                          aria-label={`Remove ${line.name}, ${line.subtitle}`}
                          onPress={() => onRemove(line.key)}
                        >
                          <TrashIcon />
                        </Button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <DescriptionList className="mt-3 grid-cols-[minmax(0,1fr)_auto] gap-y-1.5 border-t border-border/70 pt-3 [&>dt]:not-first:mt-0">
              <DescriptionTerm>Subtotal</DescriptionTerm>
              <DescriptionDetail className="text-end tabular-nums">
                {formatMoney(totals.subtotal)}
              </DescriptionDetail>
              <DescriptionTerm>Shipping</DescriptionTerm>
              <DescriptionDetail className="text-end tabular-nums">
                {totals.shipping === 0 ? "Free" : formatMoney(totals.shipping)}
              </DescriptionDetail>
              <DescriptionTerm>Estimated tax</DescriptionTerm>
              <DescriptionDetail className="text-end tabular-nums">
                {formatMoney(totals.tax)}
              </DescriptionDetail>
              <DescriptionTerm className="border-t border-border/70 pt-1.5 font-semibold text-foreground">
                Total
              </DescriptionTerm>
              <DescriptionDetail className="border-t border-border/70 pt-1.5 text-end text-base font-semibold tabular-nums">
                {formatMoney(totals.total)}
              </DescriptionDetail>
            </DescriptionList>
          </div>
        )}
      </SheetBody>

      {lines.length > 0 && (
        <SheetFooter className="grid gap-2 border-t border-border/70">
          <ButtonLink
            href="/blocks/checkout-01"
            size="md"
            className="w-full justify-center"
          >
            Checkout · {formatMoney(totals.total)}
          </ButtonLink>
          <SheetClose variant="ghost" className="w-full justify-center">
            Continue shopping
          </SheetClose>
        </SheetFooter>
      )}
    </Sheet>
  );
}
