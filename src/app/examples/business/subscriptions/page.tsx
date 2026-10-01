import { customers, filterRows, money, plans } from "../data";
import {
  base,
  CustomerLink,
  cell,
  DataTable,
  DateText,
  Filters,
  Heading,
  Panel,
  Results,
  Status,
} from "../ui";

export default async function SubscriptionsPage({
  searchParams,
}: PageProps<"/examples/business/subscriptions">) {
  const result = filterRows(
    customers,
    await searchParams,
    (customer) => `${customer.name} ${customer.plan} ${customer.id}`,
    (customer) => customer.subscription,
  );
  const href = `${base}/subscriptions`;
  return (
    <>
      <Heading
        title="Subscriptions"
        description="Track plan commitments, trials, and accounts that need a billing follow-up. Prices are per month in USD."
      />
      <Panel
        title="Plan roster"
        description="Canceled accounts are kept for historical context"
      >
        <Filters
          action={href}
          q={result.q}
          status={result.selected}
          options={["active", "trialing", "past_due", "canceled"]}
          placeholder="Customer or plan"
        />
        {result.count ? (
          <DataTable
            headers={["Customer", "Plan", "Monthly price", "Started", "Status"]}
          >
            {result.rows.map((customer) => (
              <tr key={customer.id}>
                <td className={cell}>
                  <CustomerLink id={customer.id}>{customer.name}</CustomerLink>
                </td>
                <td className={cell}>{customer.plan}</td>
                <td className={`${cell} tabular-nums`}>
                  {money(plans[customer.plan])}
                </td>
                <td className={cell}>
                  <DateText value={customer.joined} />
                </td>
                <td className={cell}>
                  <Status value={customer.subscription} />
                </td>
              </tr>
            ))}
          </DataTable>
        ) : (
          <p className="py-8 text-sm text-muted-foreground">
            No subscriptions match these filters.
          </p>
        )}
        <Results {...result} href={href} />
      </Panel>
    </>
  );
}
