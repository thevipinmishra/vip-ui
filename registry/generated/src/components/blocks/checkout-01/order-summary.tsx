"use client";

import { TagIcon } from "@phosphor-icons/react";
import { useEffect, useRef } from "react";
import { Button } from "../../vip-ui/button";
import {
  DescriptionDetail,
  DescriptionList,
  DescriptionTerm,
} from "../../vip-ui/description-list";
import { Form } from "../../vip-ui/form";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "../../vip-ui/input-group";
import { formatMoney, promoCode, type SummaryLine } from "./data";
import { CapMark, JacketMark } from "./line-mark";

export function OrderSummary({
  lines,
  totals,
  shippingPrice,
  shippingName,
  arrival,
  taxNote,
  discount,
  applied,
  draft,
  error,
  onDraftChange,
  onApply,
  onRemove,
}: {
  lines: SummaryLine[];
  totals: { subtotal: number; tax: number; total: number };
  shippingPrice: number;
  shippingName: string;
  arrival: string;
  taxNote: string;
  discount: number;
  applied: boolean;
  draft: string;
  error: string;
  onDraftChange: (value: string) => void;
  onApply: () => void;
  onRemove: () => void;
}) {
  const subtotal = totals.subtotal;
  const tax = totals.tax;
  const total = totals.total;
  const removeRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const wasApplied = useRef(applied);

  useEffect(() => {
    if (applied && !wasApplied.current) removeRef.current?.focus();
    if (!applied && wasApplied.current) inputRef.current?.focus();
    wasApplied.current = applied;
  }, [applied]);

  return (
    <div className="grid gap-4 rounded-xl bg-card p-4 shadow-(--shadow-card) ring-1 ring-border/70 sm:p-5">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-base font-semibold tracking-[-0.02em]">
          Order summary
        </h2>
        <a
          href="/blocks/product-01"
          className="rounded-sm text-xs text-muted-foreground underline-offset-4 outline-offset-4 outline-transparent transition-colors hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-ring"
        >
          Edit bag
        </a>
      </div>

      <ul className="grid divide-y divide-border/70 border-y border-border/70">
        {lines.map((line) => (
          <li key={line.key} className="flex items-center gap-3 py-3">
            <div className="size-12 shrink-0 rounded-lg bg-muted/70 p-1 ring-1 ring-border/60">
              {line.kind === "jacket" ? (
                <JacketMark hex={line.colorHex} />
              ) : (
                <CapMark hex={line.colorHex} />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{line.name}</p>
              <p className="text-xs text-muted-foreground">{line.variant}</p>
            </div>
            <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
              ×{line.quantity}
            </span>
            <p className="w-16 shrink-0 text-end text-sm font-medium tabular-nums">
              {formatMoney(line.price * line.quantity)}
            </p>
          </li>
        ))}
      </ul>

      <div className="grid gap-2">
        <span className="text-xs font-medium text-foreground">Promo code</span>
        {applied ? (
          <div className="flex flex-wrap items-center gap-2 rounded-lg bg-success-subtle px-3 py-2 ring-1 ring-success/20">
            <TagIcon
              size={15}
              className="shrink-0 text-success"
              aria-hidden="true"
            />
            <p className="min-w-0 flex-1 text-xs text-success-foreground">
              <span className="font-mono font-medium">{promoCode}</span> applied
            </p>
            <Button
              ref={removeRef}
              variant="minimal"
              size="xs"
              onPress={onRemove}
            >
              Remove
            </Button>
          </div>
        ) : (
          <Form
            className="gap-1.5"
            onSubmit={(event) => {
              event.preventDefault();
              onApply();
            }}
          >
            <InputGroup size="sm">
              <InputGroupInput
                ref={inputRef}
                aria-label="Promo code"
                placeholder="Enter code"
                value={draft}
                onChange={(event) => onDraftChange(event.target.value)}
                autoComplete="off"
                autoCapitalize="characters"
              />
              <InputGroupButton type="submit" variant="secondary">
                Apply
              </InputGroupButton>
            </InputGroup>
            {error && (
              <p role="alert" className="text-xs leading-5 text-destructive">
                {error}
              </p>
            )}
          </Form>
        )}
      </div>

      <DescriptionList className="grid-cols-[minmax(0,1fr)_auto] gap-y-2 border-t border-border/70 pt-4 [&>dt]:not-first:mt-0">
        <DescriptionTerm>Subtotal</DescriptionTerm>
        <DescriptionDetail className="text-end tabular-nums">
          {formatMoney(subtotal)}
        </DescriptionDetail>
        {discount > 0 && (
          <>
            <DescriptionTerm>Discount</DescriptionTerm>
            <DescriptionDetail className="text-end tabular-nums text-success-foreground">
              −{formatMoney(discount)}
            </DescriptionDetail>
          </>
        )}
        <DescriptionTerm>Shipping</DescriptionTerm>
        <DescriptionDetail className="text-end tabular-nums">
          {shippingPrice === 0 ? "Free" : formatMoney(shippingPrice)}
          <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
            {shippingName}
          </span>
        </DescriptionDetail>
        <DescriptionTerm>Tax</DescriptionTerm>
        <DescriptionDetail className="text-end tabular-nums">
          {formatMoney(tax)}
        </DescriptionDetail>
        <DescriptionTerm className="border-t border-border/70 pt-2 text-base font-semibold text-foreground">
          Total
        </DescriptionTerm>
        <DescriptionDetail className="border-t border-border/70 pt-2 text-end text-xl font-semibold tracking-[-0.03em] tabular-nums">
          {formatMoney(total)}
        </DescriptionDetail>
      </DescriptionList>

      <div className="grid gap-1 border-t border-border/70 pt-3 text-xs leading-5 text-muted-foreground">
        <p>{arrival}.</p>
        <p>{taxNote}</p>
      </div>
    </div>
  );
}
