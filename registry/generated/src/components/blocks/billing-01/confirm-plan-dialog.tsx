"use client";

import { Button } from "../../vip-ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../vip-ui/dialog";
import { daysInPeriod, daysLeft, type Plan } from "./billing-settings";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function ConfirmPlanDialog({
  isOpen,
  onOpenChange,
  from,
  to,
  onConfirm,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  from: Plan;
  to: Plan;
  onConfirm: () => void;
}) {
  const upgrade = to.price > from.price;
  const difference = ((to.price - from.price) * daysLeft) / daysInPeriod;

  return (
    <DialogContent
      role="alertdialog"
      size="sm"
      overlayProps={{ isOpen, onOpenChange }}
    >
      <DialogHeader>
        <DialogTitle>Change to {to.name}?</DialogTitle>
        <DialogDescription>
          {upgrade
            ? `We charge ${money.format(difference)} today for the ${daysLeft} days left in this period. From Dec 1, you pay ${money.format(to.price)} each month.`
            : `The change starts today. We add a credit of ${money.format(-difference)} to your next invoice.`}
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose variant="outline">Cancel</DialogClose>
        <Button
          onPress={() => {
            onConfirm();
            onOpenChange(false);
          }}
        >
          {upgrade ? `Pay ${money.format(difference)}` : "Change plan"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
