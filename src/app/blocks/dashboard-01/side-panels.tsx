"use client";

import { Alert } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Meter } from "@/components/ui/meter";
import { Separator } from "@/components/ui/separator";
import {
  channels,
  formatCount,
  formatMoney,
  formatPercent,
  fulfillment,
} from "./data";

export function SalesByChannel() {
  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle as="h2">Sales by channel</CardTitle>
        <CardDescription>Share of net sales, September</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {channels.map((channel) => {
          const points =
            Math.round((channel.share - channel.previous) * 1_000) / 10;
          return (
            <div key={channel.name} className="grid gap-1.5">
              <Meter
                label={channel.name}
                value={channel.share * 100}
                valueLabel={`${formatMoney(channel.sales)} · ${formatPercent(channel.share)}`}
                className="[&_[data-slot=meter-track]]:h-1.5"
              />
              <p className="text-xs tabular-nums text-muted-foreground">
                {points === 0
                  ? "Same share as August"
                  : `${points > 0 ? "+" : "−"}${Math.abs(points).toFixed(1)} pts share vs. August`}
              </p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

export function FulfillmentCard() {
  const rows = [
    { label: "To fulfill", value: formatCount(fulfillment.toFulfill) },
    { label: "Older than 48 h", value: formatCount(fulfillment.overdue) },
    { label: "In transit", value: formatCount(fulfillment.inTransit) },
    {
      label: "Median time to ship",
      value: `${fulfillment.hoursToShip} h`,
    },
  ];

  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle as="h2">Fulfillment</CardTitle>
        <CardDescription>Open orders and shipping, September</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-1.5">
          <Meter
            label="Shipped on time"
            value={fulfillment.onTime * 100}
            valueLabel={formatPercent(fulfillment.onTime)}
            className="[&_[data-slot=meter-fill]]:bg-warning [&_[data-slot=meter-track]]:h-1.5"
          />
          <p className="text-xs text-muted-foreground">
            Target {formatPercent(fulfillment.target)}
          </p>
        </div>
        <Separator />
        <dl className="grid gap-2.5 text-sm">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-3"
            >
              <dt className="text-muted-foreground">{row.label}</dt>
              <dd className="font-medium tabular-nums">{row.value}</dd>
            </div>
          ))}
        </dl>
        <Alert variant="warning" title="Order #3204 is late">
          The carrier has no scan for 3 days.
        </Alert>
      </CardContent>
    </Card>
  );
}
