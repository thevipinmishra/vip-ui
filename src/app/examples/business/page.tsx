import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { Card, CardContent } from "@/components/ui/card";
import { Stat, StatDetail, StatLabel, StatValue } from "@/components/ui/stat";
import {
  collectedAugust,
  customerById,
  customers,
  invoices,
  money,
  monthlyRevenue,
} from "./data";
import {
  base,
  CustomerLink,
  DateText,
  Heading,
  Money,
  Panel,
  Status,
} from "./ui";

export default function BusinessOverview() {
  const active = customers.filter(
    (customer) => customer.subscription === "active",
  ).length;
  const overdue = invoices.filter((invoice) => invoice.status === "overdue");
  return (
    <>
      <Heading
        title="Overview"
        description="Subscriptions and billing activity through Sep 1, 2026."
        action={
          <ButtonLink as={Link} href={`${base}/reports`} variant="outline">
            View reports →
          </ButtonLink>
        }
      />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat>
          <StatLabel>Monthly recurring revenue</StatLabel>
          <StatValue>{money(monthlyRevenue)}</StatValue>
          <StatDetail>Active subscriptions only</StatDetail>
        </Stat>
        <Stat>
          <StatLabel>Active subscriptions</StatLabel>
          <StatValue>{active}</StatValue>
          <StatDetail>Excludes trials and past-due accounts</StatDetail>
        </Stat>
        <Stat>
          <StatLabel>Collected in August</StatLabel>
          <StatValue>{money(collectedAugust)}</StatValue>
          <StatDetail>Paid invoices issued in August</StatDetail>
        </Stat>
        <Stat>
          <StatLabel>Overdue balance</StatLabel>
          <StatValue>
            {money(overdue.reduce((sum, invoice) => sum + invoice.amount, 0))}
          </StatValue>
          <StatDetail>{overdue.length} invoices need follow-up</StatDetail>
        </Stat>
      </div>
      <div className="mt-7 grid gap-4 xl:grid-cols-[1.2fr_1fr]">
        <Panel
          title="Needs attention"
          description="Unpaid August invoices with failed payment attempts"
          href={`${base}/invoices?status=overdue`}
          linkLabel="View invoices"
        >
          {overdue.length ? (
            <ul className="divide-y divide-border/70">
              {overdue.map((invoice) => (
                <li
                  key={invoice.id}
                  className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0 last:pb-0"
                >
                  <div>
                    <CustomerLink id={invoice.customerId}>
                      {customerById(invoice.customerId)?.name}
                    </CustomerLink>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {invoice.id} · due <DateText value={invoice.due} />
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Money value={invoice.amount} />
                    <Status value={invoice.status} />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              Nothing needs attention.
            </p>
          )}
        </Panel>
        <Panel
          title="Account mix"
          description="Current status across all customer accounts"
          href={`${base}/subscriptions`}
          linkLabel="View subscriptions"
        >
          <ul className="space-y-3">
            {(["active", "trialing", "past_due", "canceled"] as const).map(
              (status) => (
                <li
                  key={status}
                  className="flex items-center justify-between border-b border-border/70 pb-3 last:border-0 last:pb-0"
                >
                  <Status value={status} />
                  <span className="font-semibold tabular-nums">
                    {
                      customers.filter(
                        (customer) => customer.subscription === status,
                      ).length
                    }
                  </span>
                </li>
              ),
            )}
          </ul>
        </Panel>
      </div>
      <Card className="mt-4">
        <CardContent className="text-sm leading-6 text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">
              How to read these numbers.
            </span>{" "}
            Monthly recurring revenue counts active plans at their current
            monthly price. Collected revenue counts paid invoices issued in
            August. Neither includes trials, failed charges, or open invoices.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
