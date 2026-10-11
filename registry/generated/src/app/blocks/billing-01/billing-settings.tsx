"use client";

import { CreditCardIcon, DownloadSimpleIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Badge } from "../../../components/vip-ui/badge";
import { Button } from "../../../components/vip-ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/vip-ui/card";
import { Meter } from "../../../components/vip-ui/meter";
import {
  Radio,
  RadioDescription,
  RadioGroup,
  RadioIndicator,
  RadioLabel,
} from "../../../components/vip-ui/radio-group";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 0,
    description: "3 seats and 10 GB of storage",
  },
  {
    id: "pro",
    name: "Pro",
    price: 24,
    description: "10 seats and 100 GB of storage",
  },
  {
    id: "business",
    name: "Business",
    price: 59,
    description: "50 seats, 1 TB of storage, and SSO",
  },
];

const usage = [
  { label: "Seats", value: 8, max: 10, unit: "seats" },
  { label: "Storage", value: 42, max: 100, unit: "GB" },
  { label: "API requests", value: 74, max: 100, unit: "thousand" },
];

const invoices = [
  { id: "INV-0042", date: "Oct 1, 2026", amount: "$24.00" },
  { id: "INV-0037", date: "Sep 1, 2026", amount: "$24.00" },
  { id: "INV-0031", date: "Aug 1, 2026", amount: "$24.00" },
];

export function BillingSettings() {
  const [current, setCurrent] = useState("pro");
  const [selected, setSelected] = useState("pro");
  const plan = plans.find((item) => item.id === current) ?? plans[0];
  const changed = selected !== current;

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-[-0.04em]">Billing</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your plan, usage, and payment details.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
        <Card>
          <CardHeader>
            <CardTitle as="h2">Plan</CardTitle>
            <CardDescription>
              You use the {plan.name} plan. It renews on November 1.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              aria-label="Plan"
              value={selected}
              onChange={setSelected}
              className="gap-2"
            >
              {plans.map((item) => (
                <Radio key={item.id} value={item.id} variant="card">
                  <RadioIndicator />
                  <span className="min-w-0 flex-1">
                    <RadioLabel className="flex items-center gap-2">
                      {item.name}
                      {item.id === current && (
                        <Badge variant="accent" className="min-h-5 py-0">
                          Current
                        </Badge>
                      )}
                    </RadioLabel>
                    <RadioDescription>{item.description}</RadioDescription>
                  </span>
                  <span className="text-sm font-semibold tabular-nums">
                    ${item.price}
                    <span className="font-normal text-muted-foreground">
                      /mo
                    </span>
                  </span>
                </Radio>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="justify-end border-t border-border/70 pt-5">
            <Button
              variant="ghost"
              isDisabled={!changed}
              onPress={() => setSelected(current)}
            >
              Cancel
            </Button>
            <Button isDisabled={!changed} onPress={() => setCurrent(selected)}>
              Change plan
            </Button>
          </CardFooter>
        </Card>
        <div className="grid content-start gap-6">
          <Card>
            <CardHeader>
              <CardTitle as="h2">Usage</CardTitle>
              <CardDescription>This billing period</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5">
              {usage.map((item) => (
                <Meter
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  maxValue={item.max}
                  valueLabel={`${item.value} of ${item.max} ${item.unit}`}
                  className="[&_[data-slot=meter-value]]:text-xs"
                />
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle as="h2">Payment method</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-md bg-muted ring-1 ring-border/70">
                <CreditCardIcon size={20} aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1 text-sm">
                <p className="font-medium">Visa ending in 4242</p>
                <p className="text-xs text-muted-foreground">Expires 08/2028</p>
              </div>
              <Button variant="outline" size="sm">
                Update
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle as="h2">Invoices</CardTitle>
        </CardHeader>
        <CardContent className="pt-3">
          <ul className="divide-y divide-border/70">
            {invoices.map((invoice) => (
              <li
                key={invoice.id}
                className="flex flex-wrap items-center gap-x-4 gap-y-1 py-3 text-sm"
              >
                <span className="font-mono text-xs text-muted-foreground">
                  {invoice.id}
                </span>
                <span className="flex-1">{invoice.date}</span>
                <Badge variant="success">Paid</Badge>
                <span className="w-16 text-end font-medium tabular-nums">
                  {invoice.amount}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={`Download ${invoice.id}`}
                  className="size-9"
                >
                  <DownloadSimpleIcon size={17} aria-hidden="true" />
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
