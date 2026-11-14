"use client";

import { CreditCardIcon, DownloadSimpleIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Meter } from "@/components/ui/meter";
import {
  RadioButton,
  RadioDescription,
  RadioField,
  RadioGroup,
  RadioIndicator,
  RadioLabel,
} from "@/components/ui/radio-group";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "@/components/ui/table";
import { showToast } from "@/components/ui/toast";
import { ConfirmPlanDialog } from "./confirm-plan-dialog";
import { type PaymentCard, PaymentMethodDialog } from "./payment-method-dialog";

export const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 0,
    seats: 3,
    description: "3 seats and 10 GB of storage",
  },
  {
    id: "pro",
    name: "Pro",
    price: 24,
    seats: 10,
    description: "10 seats and 100 GB of storage",
  },
  {
    id: "business",
    name: "Business",
    price: 59,
    seats: 50,
    description: "50 seats, 1 TB of storage, and SSO",
  },
];

export type Plan = (typeof plans)[number];

const seatsUsed = 8;

const usage = [
  { label: "Seats", value: seatsUsed, max: 10, unit: "seats" },
  { label: "Storage", value: 42, max: 100, unit: "GB" },
  { label: "API requests", value: 74, max: 100, unit: "thousand" },
];

const invoices = [
  { id: "INV-0042", date: "Oct 1, 2026", dateTime: "2026-10-01", amount: 24 },
  { id: "INV-0037", date: "Sep 1, 2026", dateTime: "2026-09-01", amount: 24 },
  { id: "INV-0031", date: "Aug 1, 2026", dateTime: "2026-08-01", amount: 24 },
  { id: "INV-0026", date: "Jul 1, 2026", dateTime: "2026-07-01", amount: 24 },
];

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
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
          <CardContent className="grid gap-4">
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
                        <Badge variant="accent" className="min-h-5 py-0">
                          Current
                        </Badge>
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
            {changed && tooSmall && (
              <Alert
                variant="warning"
                title={`${next.name} has ${next.seats} seats. You use ${seatsUsed}.`}
              >
                Remove {seatsUsed - next.seats} members before you change to
                this plan.
              </Alert>
            )}
          </CardContent>
          <CardFooter className="justify-end border-t border-border/70 pt-5">
            <Button
              variant="ghost"
              isDisabled={!changed}
              onPress={() => setSelected(current)}
            >
              Cancel
            </Button>
            <Button
              isDisabled={!changed || tooSmall}
              onPress={() => setConfirming(true)}
            >
              Change plan
            </Button>
          </CardFooter>
        </Card>
        <div className="grid content-start gap-6">
          <Card>
            <CardHeader>
              <CardTitle as="h2">Usage</CardTitle>
              <CardDescription>Oct 1 to Oct 31</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {usage.map((item) => (
                <Meter
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  maxValue={item.max}
                  valueLabel={`${item.value} of ${item.max} ${item.unit}`}
                  className="**:data-[slot=meter-value]:text-xs"
                />
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle as="h2">Payment method</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-md bg-muted ring-1 ring-border/70">
                <CreditCardIcon size={20} aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1 text-sm">
                <p className="truncate font-medium">
                  {card.brand} ending in {card.last4}
                </p>
                <p className="text-xs text-muted-foreground">
                  Expires {card.expiry}
                </p>
              </div>
              <PaymentMethodDialog
                onSave={(nextCard) => {
                  setCard(nextCard);
                  showToast({
                    title: "Card updated",
                    description: `We charge ${nextCard.brand} ending in ${nextCard.last4} from Nov 1.`,
                    variant: "success",
                  });
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle as="h2">Invoices</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <Table aria-label="Invoices" className="min-w-120">
            <TableHeader>
              <Column isRowHeader className="ps-5">
                Invoice
              </Column>
              <Column>Date</Column>
              <Column>Status</Column>
              <Column className="text-end">Amount</Column>
              <Column className="w-14 pe-3">
                <span className="sr-only">Download</span>
              </Column>
            </TableHeader>
            <TableBody items={invoices}>
              {(invoice) => (
                <Row id={invoice.id}>
                  <Cell className="ps-5 font-mono text-xs">{invoice.id}</Cell>
                  <Cell className="text-muted-foreground">
                    <time dateTime={invoice.dateTime}>{invoice.date}</time>
                  </Cell>
                  <Cell>
                    <Badge variant="success">Paid</Badge>
                  </Cell>
                  <Cell className="text-end font-medium tabular-nums">
                    {money.format(invoice.amount)}
                  </Cell>
                  <Cell className="pe-3">
                    <Button
                      variant="ghost"
                      iconOnly
                      aria-label={`Download ${invoice.id}`}
                      className="size-9"
                      onPress={() =>
                        showToast({
                          title: `${invoice.id}.pdf is downloading`,
                        })
                      }
                    >
                      <DownloadSimpleIcon size={17} aria-hidden="true" />
                    </Button>
                  </Cell>
                </Row>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
      <ConfirmPlanDialog
        isOpen={confirming}
        onOpenChange={setConfirming}
        from={plan}
        to={next}
        onConfirm={() => {
          setCurrent(next.id);
          showToast({
            title: `You now use the ${next.name} plan`,
            variant: "success",
          });
        }}
      />
    </div>
  );
}
