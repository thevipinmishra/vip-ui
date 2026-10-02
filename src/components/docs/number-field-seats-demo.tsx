"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NumberField } from "@/components/ui/number-field";

const pricePerSeat = 24;

export function NumberFieldSeatsDemo() {
  const [seats, setSeats] = useState(4);
  const [savedSeats, setSavedSeats] = useState(4);
  const total = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  return (
    <div className="grid w-full max-w-sm gap-5 rounded-xl bg-card p-5 ring-1 ring-border/70">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold">Studio North · Team plan</p>
        <Badge variant={seats === savedSeats ? "success" : "warning"} dot>
          {seats === savedSeats ? "Up to date" : "Unsaved"}
        </Badge>
      </div>
      <NumberField
        label="Team seats"
        description="Between 1 and 20 seats · $24 per seat/month"
        minValue={1}
        maxValue={20}
        value={seats}
        onChange={setSeats}
      />
      <div className="flex items-center justify-between gap-4 border-t border-border pt-4">
        <div>
          <p className="text-xs text-muted-foreground">
            Estimated monthly total
          </p>
          <p className="mt-1 text-xl font-semibold tabular-nums">
            {Number.isFinite(seats) ? total.format(seats * pricePerSeat) : "—"}
          </p>
        </div>
        <Button
          size="sm"
          isDisabled={
            seats === savedSeats ||
            !Number.isFinite(seats) ||
            seats < 1 ||
            seats > 20
          }
          onPress={() => setSavedSeats(seats)}
        >
          Save seats
        </Button>
      </div>
    </div>
  );
}
