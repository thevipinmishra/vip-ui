"use client";

import { useEffect, useState } from "react";
import { Button } from "../../vip-ui/button";
import {
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../vip-ui/dialog";
import { Form } from "../../vip-ui/form";
import { NumberField } from "../../vip-ui/number-field";
import { Select } from "../../vip-ui/select";
import { TextArea } from "../../vip-ui/text-area";
import { formatMoney, order, refundReasons } from "./data";

const reasons = refundReasons;

export function RefundDialog({
  open,
  onOpenChange,
  remaining,
  onRefund,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  remaining: number;
  onRefund: (amount: number, reason: string, note: string) => void;
}) {
  const [amount, setAmount] = useState(remaining / 100);
  const [reason, setReason] = useState("request");
  const [note, setNote] = useState("");
  const valid = Number.isFinite(amount) && amount > 0;

  useEffect(() => {
    if (!open) return;
    setAmount(remaining / 100);
    setReason("request");
    setNote("");
  }, [open, remaining]);

  return (
    <DialogContent size="md" overlayProps={{ isOpen: open, onOpenChange }}>
      <Form
        className="contents"
        onSubmit={(event) => {
          event.preventDefault();
          if (!Number.isFinite(amount)) return;
          onRefund(Math.round(amount * 100), reason, note);
        }}
      >
        <DialogHeader>
          <DialogTitle>Refund payment</DialogTitle>
          <DialogDescription>
            Refund up to {formatMoney(remaining)} to {order.card.brand} ending
            in {order.card.last4}. The money arrives in 3 to 5 business days.
          </DialogDescription>
          <DialogClose />
        </DialogHeader>
        <DialogBody className="grid content-start gap-4">
          <NumberField
            label="Refund amount"
            value={amount}
            onChange={setAmount}
            minValue={0.01}
            maxValue={remaining / 100}
            step={0.01}
            isRequired
            size="md"
            formatOptions={{
              style: "currency",
              currency: "USD",
              currencyDisplay: "narrowSymbol",
            }}
            validate={(value) => {
              if (!Number.isFinite(value) || value <= 0) {
                return "Enter an amount above $0.";
              }
              if (value > remaining / 100 + 0.001) {
                return `The most you can refund is ${formatMoney(remaining)}.`;
              }
              return null;
            }}
          />
          <Select
            label="Reason"
            options={reasons}
            value={reason}
            onValueChange={setReason}
            size="md"
          />
          <TextArea
            label="Note"
            rows={2}
            value={note}
            onChange={setNote}
            size="md"
            description="This note is only for your team."
          />
        </DialogBody>
        <DialogFooter>
          <DialogClose variant="outline">Cancel</DialogClose>
          <Button type="submit" isDisabled={!valid}>
            {valid
              ? `Refund ${formatMoney(Math.round(amount * 100))}`
              : "Refund"}
          </Button>
        </DialogFooter>
      </Form>
    </DialogContent>
  );
}
