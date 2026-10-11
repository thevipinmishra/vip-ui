"use client";

import { useState } from "react";
import { LayoutMorph } from "@/components/ui/layout-morph";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";

const plans = {
  monthly: {
    price: "$12 per month",
    features: ["Unlimited projects", "Shared libraries"],
  },
  yearly: {
    price: "$120 per year",
    features: [
      "Unlimited projects",
      "Shared libraries",
      "Version history",
      "Priority support",
    ],
  },
} as const;

export function LayoutMorphViewsDemo() {
  const [plan, setPlan] = useState<keyof typeof plans>("monthly");
  const { price, features } = plans[plan];

  return (
    <div className="grid w-full max-w-xs gap-4">
      <ToggleButtonGroup
        aria-label="Billing period"
        selectionMode="single"
        disallowEmptySelection
        selectedKeys={[plan]}
        onSelectionChange={(keys) => {
          const [key] = keys;
          if (key === "monthly" || key === "yearly") setPlan(key);
        }}
      >
        <ToggleButton id="monthly" variant="segmented">
          Monthly
        </ToggleButton>
        <ToggleButton id="yearly" variant="segmented">
          Yearly
        </ToggleButton>
      </ToggleButtonGroup>
      <LayoutMorph
        contentKey={plan}
        className="rounded-xl border border-border bg-card px-5 py-4 shadow-[var(--shadow-card)]"
      >
        <p className="text-lg font-semibold tracking-tight">{price}</p>
        <ul className="mt-3 grid gap-1.5 text-sm text-muted-foreground">
          {features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </LayoutMorph>
    </div>
  );
}
