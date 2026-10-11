"use client";

import { CheckIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import { cn } from "@/lib/utils";

type Cycle = "monthly" | "yearly";

const plans = [
  {
    name: "Starter",
    description: "For one person who wants to try the product.",
    monthly: 0,
    yearly: 0,
    action: "Start for free",
    features: ["1 project", "3 team members", "10 GB storage", "Email help"],
  },
  {
    name: "Pro",
    description: "For small teams that ship each week.",
    monthly: 24,
    yearly: 19,
    action: "Start a free trial",
    popular: true,
    features: [
      "Unlimited projects",
      "10 team members",
      "100 GB storage",
      "Custom domains",
      "Help in 24 hours",
    ],
  },
  {
    name: "Business",
    description: "For companies with security and audit needs.",
    monthly: 59,
    yearly: 47,
    action: "Talk to sales",
    features: [
      "Everything in Pro",
      "50 team members",
      "1 TB storage",
      "Single sign-on",
      "Audit log",
    ],
  },
];

const priceFormat: Intl.NumberFormatOptions = {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
};

export function PricingPlans() {
  const [cycle, setCycle] = useState<Cycle>("monthly");

  return (
    <section aria-labelledby="pricing-title">
      <div className="mx-auto max-w-2xl text-center">
        <Badge variant="accent">Pricing</Badge>
        <h1
          id="pricing-title"
          className="mt-4 text-balance text-4xl font-semibold tracking-[-0.055em] sm:text-5xl"
        >
          A plan for each stage of your team
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          Start for free. Change or cancel your plan at any time.
        </p>
        <ToggleButtonGroup
          aria-label="Billing cycle"
          selectionMode="single"
          disallowEmptySelection
          selectedKeys={[cycle]}
          onSelectionChange={(keys) => {
            const [next] = keys;
            if (next === "monthly" || next === "yearly") setCycle(next);
          }}
          className="mx-auto mt-8 rounded-full"
        >
          <ToggleButton
            id="monthly"
            variant="segmented"
            className="rounded-full px-4"
          >
            Monthly
          </ToggleButton>
          <ToggleButton
            id="yearly"
            variant="segmented"
            className="rounded-full px-4"
          >
            Yearly
            <span className="rounded-full bg-success-subtle px-2 py-0.5 text-[11px] font-semibold text-success-foreground">
              −20%
            </span>
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <ul className="mt-12 grid gap-5 lg:grid-cols-3">
        {plans.map((plan) => (
          <li
            key={plan.name}
            className={cn(
              "relative flex flex-col rounded-2xl bg-card p-6 shadow-[var(--shadow-card)] ring-1 ring-border/70 sm:p-8",
              plan.popular && "ring-2 ring-primary lg:-my-3 lg:py-11",
            )}
          >
            {plan.popular && (
              <Badge
                variant="accent"
                className="absolute -top-3.5 start-1/2 -translate-x-1/2 rtl:translate-x-1/2"
              >
                Most popular
              </Badge>
            )}
            <h2 className="text-lg font-semibold tracking-[-0.03em]">
              {plan.name}
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {plan.description}
            </p>
            <p className="mt-6 flex items-baseline gap-1">
              <AnimatedNumber
                value={plan[cycle]}
                formatOptions={priceFormat}
                className="text-4xl font-semibold tracking-[-0.05em]"
              />
              <span className="text-sm text-muted-foreground">
                per seat each month
              </span>
            </p>
            <p className="mt-1 h-5 text-xs text-muted-foreground">
              {cycle === "yearly" && plan.yearly > 0
                ? `$${plan.yearly * 12} billed once a year`
                : ""}
            </p>
            <Button
              variant={plan.popular ? "default" : "outline"}
              className="mt-6 w-full"
            >
              {plan.action}
            </Button>
            <ul className="mt-8 grid gap-3 border-t border-border/70 pt-6 text-sm">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <CheckIcon
                    size={16}
                    weight="bold"
                    className="shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-center text-sm text-muted-foreground">
        Prices are in US dollars. Taxes can apply.
      </p>
    </section>
  );
}
