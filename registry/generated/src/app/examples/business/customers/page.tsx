import { customers, filterRows } from "../data";
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

export default async function CustomersPage({
  searchParams,
}: PageProps<"/examples/business/customers">) {
  const result = filterRows(
    customers,
    await searchParams,
    (customer) => `${customer.name} ${customer.email} ${customer.id}`,
    (customer) => customer.subscription,
  );
  const href = `${base}/customers`;
  return (
    <>
      <Heading
        title="Customers"
        description="Find accounts, check their subscription status, and open a customer record for billing history."
      />
      <Panel
        title="Customer directory"
        description="Accounts ordered by account ID"
      >
        <Filters
          action={href}
          q={result.q}
          status={result.selected}
          options={["active", "trialing", "past_due", "canceled"]}
          placeholder="Name, email, or account ID"
        />
        {result.count ? (
          <DataTable
            headers={["Customer", "Plan", "Seats", "Joined", "Status"]}
          >
            {result.rows.map((customer) => (
              <tr key={customer.id}>
                <td className={cell}>
                  <CustomerLink id={customer.id}>{customer.name}</CustomerLink>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {customer.email}
                  </p>
                </td>
                <td className={cell}>{customer.plan}</td>
                <td className={`${cell} tabular-nums`}>{customer.seats}</td>
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
            No customers match these filters. Try another search or status.
          </p>
        )}
        <Results {...result} href={href} />
      </Panel>
    </>
  );
}
