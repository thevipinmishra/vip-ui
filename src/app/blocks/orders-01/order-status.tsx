import type { BadgeProps } from "@/components/ui/badge";
import { Badge } from "@/components/ui/badge";
import type { FulfillmentStatus, PaymentStatus } from "./data";

const paymentLabels: Record<
  PaymentStatus,
  { label: string; variant: BadgeProps["variant"] }
> = {
  paid: { label: "Paid", variant: "success" },
  pending: { label: "Pending", variant: "warning" },
  refunded: { label: "Refunded", variant: "neutral" },
  failed: { label: "Failed", variant: "error" },
};

const fulfillmentLabels: Record<
  FulfillmentStatus,
  { label: string; variant: BadgeProps["variant"] }
> = {
  unfulfilled: { label: "Unfulfilled", variant: "outline" },
  processing: { label: "Processing", variant: "accent" },
  shipped: { label: "Shipped", variant: "accent" },
  delivered: { label: "Delivered", variant: "success" },
};

export function PaymentBadge({
  status,
  className,
}: {
  status: PaymentStatus;
  className?: string;
}) {
  const meta = paymentLabels[status];
  return (
    <Badge variant={meta.variant} dot className={className}>
      {meta.label}
    </Badge>
  );
}

export function FulfillmentBadge({
  status,
  className,
}: {
  status: FulfillmentStatus;
  className?: string;
}) {
  const meta = fulfillmentLabels[status];
  return (
    <Badge variant={meta.variant} className={className}>
      {meta.label}
    </Badge>
  );
}

export function paymentLabel(status: PaymentStatus) {
  return paymentLabels[status].label;
}

export function fulfillmentLabel(status: FulfillmentStatus) {
  return fulfillmentLabels[status].label;
}
