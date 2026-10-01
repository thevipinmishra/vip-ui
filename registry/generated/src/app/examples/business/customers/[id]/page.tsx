import Link from "next/link";
import { notFound } from "next/navigation";
import {
  customerById,
  customers,
  invoices,
  money,
  payments,
  plans,
} from "../../data";
import {
  base,
  cell,
  DataTable,
  DateText,
  Heading,
  Money,
  Panel,
  Status,
} from "../../ui";

export function generateStaticParams() {
  return customers.map((customer) => ({ id: customer.id }));
}

export default async function CustomerDetail({
  params,
}: PageProps<"/examples/business/customers/[id]">) {
  const { id } = await params;
  const customer = customerById(id);
  if (!customer) notFound();
  const history = invoices
    .filter((invoice) => invoice.customerId === id)
    .reverse();
  const attempts = payments
    .filter((payment) =>
      history.some((invoice) => invoice.id === payment.invoiceId),
    )
    .reverse();
  return (
    <>
      <Link
        href={`${base}/customers`}
        className="mb-6 inline-flex min-h-10 items-center text-sm font-medium text-primary hover:underline focus-visible:outline-2 focus-visible:outline-ring"
      >
        ← Back to customers
      </Link>
      <Heading
        title={customer.name}
        description={`${customer.id} · ${customer.email}`}
        action={<Status value={customer.subscription} />}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Account details">
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-muted-foreground">Plan</dt>
              <dd className="mt-1 font-medium">
                {customer.plan} · {money(plans[customer.plan])}/month
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Seats</dt>
              <dd className="mt-1 font-medium tabular-nums">
                {customer.seats}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Customer since</dt>
              <dd className="mt-1 font-medium">
                <DateText value={customer.joined} />
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Subscription</dt>
              <dd className="mt-1">
                <Status value={customer.subscription} />
              </dd>
            </div>
          </dl>
        </Panel>
        <Panel
          title="Billing history"
          description="Invoices issued to this account"
        >
          {history.length ? (
            <DataTable headers={["Invoice", "Issued", "Amount", "Status"]}>
              {history.map((invoice) => (
                <tr key={invoice.id}>
                  <th scope="row" className={`${cell} text-start font-medium`}>
                    {invoice.id}
                  </th>
                  <td className={cell}>
                    <DateText value={invoice.issued} />
                  </td>
                  <td className={cell}>
                    <Money value={invoice.amount} />
                  </td>
                  <td className={cell}>
                    <Status value={invoice.status} />
                  </td>
                </tr>
              ))}
            </DataTable>
          ) : (
            <p className="text-sm text-muted-foreground">
              No invoices yet. Trial accounts are not billed.
            </p>
          )}
        </Panel>
      </div>
      <div className="mt-4">
        <Panel
          title="Payment attempts"
          description="Attempts linked to this account's invoices"
        >
          {attempts.length ? (
            <DataTable
              headers={["Payment", "Invoice", "Date", "Amount", "Status"]}
            >
              {attempts.map((payment) => (
                <tr key={payment.id}>
                  <th scope="row" className={`${cell} text-start font-medium`}>
                    {payment.id}
                  </th>
                  <td className={cell}>{payment.invoiceId}</td>
                  <td className={cell}>
                    <DateText value={payment.date} />
                  </td>
                  <td className={cell}>
                    <Money value={payment.amount} />
                  </td>
                  <td className={cell}>
                    <Status value={payment.status} />
                  </td>
                </tr>
              ))}
            </DataTable>
          ) : (
            <p className="text-sm text-muted-foreground">
              No payment attempts on record.
            </p>
          )}
        </Panel>
      </div>
    </>
  );
}
