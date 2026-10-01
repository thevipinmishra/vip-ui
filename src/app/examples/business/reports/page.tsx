import Link from "next/link";
import { customers, invoices, money, plans } from "../data";
import { base, Heading, Money, Panel } from "../ui";

export default async function ReportsPage({
  searchParams,
}: PageProps<"/examples/business/reports">) {
  const query = await searchParams;
  const period = query.period === "september" ? "september" : "august";
  const month = period === "august" ? "2026-08" : "2026-09";
  const selected = invoices.filter((invoice) =>
    invoice.issued.startsWith(month),
  );
  const total = selected.reduce((sum, invoice) => sum + invoice.amount, 0);
  const paid = selected
    .filter((invoice) => invoice.status === "paid")
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const outstanding = selected
    .filter((invoice) => ["open", "overdue"].includes(invoice.status))
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const voided = selected
    .filter((invoice) => invoice.status === "void")
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  return (
    <>
      <Heading
        title="Reports"
        description="Invoice activity by issue month and the current mix of active plans. Available periods: August and September 2026."
      />
      <fieldset className="mb-5 flex flex-wrap gap-2">
        <legend className="sr-only">Report period</legend>
        {(["august", "september"] as const).map((value) => (
          <Link
            key={value}
            href={`${base}/reports?period=${value}`}
            aria-current={period === value ? "page" : undefined}
            className={`rounded-lg px-4 py-2.5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-ring ${period === value ? "bg-primary text-primary-foreground" : "border border-border bg-card hover:bg-muted"}`}
          >
            {value === "august" ? "August 2026" : "September 2026"}
          </Link>
        ))}
      </fieldset>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel
          title="Invoice totals"
          description={`Invoices issued in ${period} 2026`}
        >
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-muted-foreground">Issued</dt>
              <dd className="font-semibold">
                <Money value={total} />
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted-foreground">Collected</dt>
              <dd className="font-semibold">
                <Money value={paid} />
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted-foreground">Outstanding</dt>
              <dd className="font-semibold">
                <Money value={outstanding} />
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted-foreground">Voided</dt>
              <dd className="font-semibold">
                <Money value={voided} />
              </dd>
            </div>
          </dl>
          <p className="mt-5 border-t border-border/70 pt-4 text-xs leading-5 text-muted-foreground">
            Issued = collected + outstanding + voided. September invoices remain
            open as of Sep 1, 2026.
          </p>
        </Panel>
        <Panel
          title="Active plan mix"
          description="Recurring revenue by plan as of Sep 1, 2026"
        >
          <ul className="space-y-5">
            {(Object.keys(plans) as (keyof typeof plans)[]).map((plan) => {
              const accounts = customers.filter(
                (customer) =>
                  customer.plan === plan && customer.subscription === "active",
              );
              const revenue = accounts.length * plans[plan];
              const max = customers
                .filter((customer) => customer.subscription === "active")
                .reduce((sum, customer) => sum + plans[customer.plan], 0);
              return (
                <li key={plan}>
                  <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                    <span className="font-medium">
                      {plan}{" "}
                      <span className="text-muted-foreground">
                        · {accounts.length}{" "}
                        {accounts.length === 1 ? "account" : "accounts"}
                      </span>
                    </span>
                    <span className="tabular-nums">{money(revenue)}</span>
                  </div>
                  <div
                    className="h-2 overflow-hidden rounded-full bg-muted"
                    aria-hidden="true"
                  >
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${max ? (revenue / max) * 100 : 0}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="mt-5 text-xs leading-5 text-muted-foreground">
            Trials, canceled plans, and past-due accounts are excluded.
          </p>
        </Panel>
      </div>
    </>
  );
}
