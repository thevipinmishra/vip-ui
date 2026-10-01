import { customerById, filterRows, invoiceById, payments } from "../data";
import {
  base,
  CustomerLink,
  cell,
  DataTable,
  DateText,
  Filters,
  Heading,
  Money,
  Panel,
  Results,
  Status,
} from "../ui";

export default async function PaymentsPage({
  searchParams,
}: PageProps<"/examples/business/payments">) {
  const result = filterRows(
    [...payments].reverse(),
    await searchParams,
    (payment) =>
      `${payment.id} ${payment.invoiceId} ${customerById(invoiceById(payment.invoiceId)?.customerId ?? "")?.name ?? ""}`,
    (payment) => payment.status,
  );
  const href = `${base}/payments`;
  return (
    <>
      <Heading
        title="Payments"
        description="Review payment attempts against their invoices. A failed charge is an attempt, not collected revenue."
      />
      <Panel title="Payment activity" description="Most recent attempts first">
        <Filters
          action={href}
          q={result.q}
          status={result.selected}
          options={["succeeded", "failed", "refunded"]}
          placeholder="Payment, invoice, or customer"
        />
        {result.count ? (
          <DataTable
            headers={[
              "Payment",
              "Customer",
              "Invoice",
              "Date",
              "Amount",
              "Status",
            ]}
          >
            {result.rows.map((payment) => {
              const invoice = invoiceById(payment.invoiceId);
              return (
                <tr key={payment.id}>
                  <th scope="row" className={`${cell} text-start font-medium`}>
                    {payment.id}
                  </th>
                  <td className={cell}>
                    {invoice && (
                      <CustomerLink id={invoice.customerId}>
                        {customerById(invoice.customerId)?.name}
                      </CustomerLink>
                    )}
                  </td>
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
              );
            })}
          </DataTable>
        ) : (
          <p className="py-8 text-sm text-muted-foreground">
            No payments match these filters.
          </p>
        )}
        <Results {...result} href={href} />
      </Panel>
    </>
  );
}
