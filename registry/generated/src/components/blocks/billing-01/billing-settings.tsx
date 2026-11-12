"use client";

import { CreditCardIcon, DownloadSimpleIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Alert } from "../../vip-ui/alert";
import { AnimatedNumber } from "../../vip-ui/animated-number";
import { Badge } from "../../vip-ui/badge";
import { Button } from "../../vip-ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../vip-ui/card";
import { Meter } from "../../vip-ui/meter";
import { Presence } from "../../vip-ui/presence";
import {
  RadioButton,
  RadioDescription,
  RadioField,
  RadioGroup,
  RadioIndicator,
  RadioLabel,
} from "../../vip-ui/radio-group";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableContainer,
  TableHeader,
} from "../../vip-ui/table";
import { showToast } from "../../vip-ui/toast";
import { ConfirmPlanDialog } from "./confirm-plan-dialog";
import { type PaymentCard, PaymentMethodDialog } from "./payment-method-dialog";
import { SettingsShell } from "./settings-shell";

export const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 0,
    seats: 5,
    description: "5 seats and 100,000 events each month",
  },
  {
    id: "pro",
    name: "Pro",
    price: 24,
    seats: 15,
    description: "15 seats and 2 million events each month",
  },
  {
    id: "business",
    name: "Business",
    price: 59,
    seats: 50,
    description: "50 seats, 10 million events each month, and SSO",
  },
];

export type Plan = (typeof plans)[number];

export const daysInPeriod = 30;
export const daysLeft = 28;

const seatsUsed = 12;

const usage = [
  { label: "Seats", value: seatsUsed, max: 15 },
  { label: "Events", value: 1_480_000, max: 2_000_000 },
  { label: "API requests", value: 74_000, max: 100_000 },
];

const invoices = [
  {
    id: "INV-0042",
    date: "2026-11-01",
    detail: "Pro plan, Nov 1 to Nov 30",
    amount: 24,
  },
  {
    id: "INV-0037",
    date: "2026-10-01",
    detail: "Pro plan, Oct 1 to Oct 31",
    amount: 24,
  },
  {
    id: "INV-0031",
    date: "2026-09-01",
    detail: "Pro plan, Sep 1 to Sep 30",
    amount: 24,
  },
  {
    id: "INV-0026",
    date: "2026-08-12",
    detail: "Pro plan, Aug 12 to Aug 31",
    amount: 15.48,
  },
];

const currency = { style: "currency", currency: "USD" } as const;
const money = new Intl.NumberFormat("en-US", currency);
const compact = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 2,
});
const day = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function BillingSettings() {
  const [current, setCurrent] = useState("pro");
  const [selected, setSelected] = useState("pro");
  const [confirming, setConfirming] = useState(false);
  const [card, setCard] = useState<PaymentCard>({
    brand: "Visa",
    last4: "4242",
    expiry: "08/28",
  });
  const plan = plans.find((item) => item.id === current) ?? plans[0];
  const next = plans.find((item) => item.id === selected) ?? plans[0];
  const changed = selected !== current;
  const tooSmall = next.seats < seatsUsed;
  const difference = ((next.price - plan.price) * daysLeft) / daysInPeriod;

  return (
    <SettingsShell
      current="billing"
      title="Billing"
      description="Manage the plan, usage, and payment details for Kestrel Insights."
    >
      <div className="grid gap-5">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
          <Card className="self-start">
            <CardHeader>
              <CardTitle as="h2">Plan</CardTitle>
              <CardDescription>
                {plan.price > 0
                  ? `Your plan renews on Dec 1, 2026 for ${money.format(plan.price)}.`
                  : "Your plan is free."}
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
                  <RadioField key={item.id} value={item.id} variant="card">
                    <RadioButton>
                      <RadioIndicator />
                      <RadioLabel className="flex flex-1 flex-wrap items-center gap-2">
                        {item.name}
                        {item.id === current && (
                          <Badge variant="accent">Current</Badge>
                        )}
                      </RadioLabel>
                      <span className="font-semibold tabular-nums">
                        ${item.price}
                        <span
                          aria-hidden="true"
                          className="font-normal text-muted-foreground"
                        >
                          /mo
                        </span>
                        <span className="sr-only"> per month</span>
                      </span>
                    </RadioButton>
                    <RadioDescription>{item.description}</RadioDescription>
                  </RadioField>
                ))}
              </RadioGroup>
            </CardContent>
            <Presence show={changed} collapse>
              <div className="grid gap-4 border-t border-border/70 p-5">
                {tooSmall ? (
                  <Alert
                    variant="warning"
                    title={`${next.name} has ${next.seats} seats`}
                  >
                    Your workspace uses {seatsUsed} seats. Remove{" "}
                    {seatsUsed - next.seats} members before you change to this
                    plan.
                  </Alert>
                ) : (
                  <dl className="grid gap-1.5 text-sm">
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-muted-foreground">
                        {difference >= 0
                          ? `Due today for the ${daysLeft} days left`
                          : "Credit on your next invoice"}
                      </dt>
                      <dd className="font-semibold">
                        <AnimatedNumber
                          value={Math.abs(difference)}
                          formatOptions={currency}
                        />
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-muted-foreground">
                        Each month from Dec 1
                      </dt>
                      <dd className="font-semibold">
                        <AnimatedNumber
                          value={next.price}
                          formatOptions={currency}
                        />
                      </dd>
                    </div>
                  </dl>
                )}
                <div className="flex flex-wrap justify-end gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onPress={() => setSelected(current)}
                  >
                    Keep {plan.name}
                  </Button>
                  <Button
                    size="sm"
                    isDisabled={tooSmall}
                    onPress={() => setConfirming(true)}
                  >
                    Change to {next.name}
                  </Button>
                </div>
              </div>
            </Presence>
          </Card>
          <div className="grid content-start gap-5">
            <Card>
              <CardHeader>
                <CardTitle as="h2">Usage</CardTitle>
                <CardDescription>Nov 1 to Nov 30, 2026</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                {usage.map((item) => (
                  <Meter
                    key={item.label}
                    label={item.label}
                    value={item.value}
                    maxValue={item.max}
                    valueLabel={`${compact.format(item.value)} of ${compact.format(item.max)}`}
                    className="[&_[data-slot=meter-value]]:font-sans"
                  />
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle as="h2">Payment method</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground ring-1 ring-border/70">
                  <CreditCardIcon size={18} aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1 text-sm">
                  <p className="truncate font-medium">
                    {card.brand} ending in {card.last4}
                  </p>
                  <p className="text-xs leading-5 text-muted-foreground">
                    Expires {card.expiry}
                  </p>
                </div>
                <PaymentMethodDialog
                  onSave={(nextCard) => {
                    setCard(nextCard);
                    showToast({
                      title: "Card updated",
                      description: `We charge ${nextCard.brand} ending in ${nextCard.last4} from Dec 1.`,
                      variant: "success",
                    });
                  }}
                />
              </CardContent>
            </Card>
          </div>
        </div>
        <Card className="overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle as="h2">Invoices</CardTitle>
            <CardDescription>
              We send each invoice to billing@kestrel.app.
            </CardDescription>
          </CardHeader>
          <TableContainer className="rounded-none border-x-0 border-b-0 shadow-none">
            <Table
              aria-label="Invoices"
              className="min-w-[46rem] [width:100%]!"
            >
              <TableHeader>
                <Column isRowHeader width={120}>
                  Invoice
                </Column>
                <Column width={130}>Date</Column>
                <Column width={240}>Details</Column>
                <Column width={90}>Status</Column>
                <Column width={100} className="text-end">
                  Amount
                </Column>
                <Column width={64}>
                  <span className="sr-only">Download</span>
                </Column>
              </TableHeader>
              <TableBody items={invoices}>
                {(invoice) => (
                  <Row id={invoice.id}>
                    <Cell className="font-mono text-xs">{invoice.id}</Cell>
                    <Cell className="text-muted-foreground">
                      <time dateTime={invoice.date}>
                        {day.format(new Date(`${invoice.date}T00:00:00Z`))}
                      </time>
                    </Cell>
                    <Cell className="text-muted-foreground">
                      {invoice.detail}
                    </Cell>
                    <Cell>
                      <Badge variant="success">Paid</Badge>
                    </Cell>
                    <Cell className="text-end font-medium tabular-nums">
                      {money.format(invoice.amount)}
                    </Cell>
                    <Cell className="text-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconOnly
                        aria-label={`Download ${invoice.id}`}
                        onPress={() =>
                          showToast({
                            title: `${invoice.id}.pdf is downloading`,
                          })
                        }
                      >
                        <DownloadSimpleIcon aria-hidden="true" />
                      </Button>
                    </Cell>
                  </Row>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </div>
      <ConfirmPlanDialog
        isOpen={confirming}
        onOpenChange={setConfirming}
        from={plan}
        to={next}
        onConfirm={() => {
          setCurrent(next.id);
          showToast({
            title: `Kestrel Insights is on the ${next.name} plan`,
            variant: "success",
          });
        }}
      />
    </SettingsShell>
  );
}
