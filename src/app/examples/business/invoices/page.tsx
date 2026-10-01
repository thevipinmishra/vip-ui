import { customerById, filterRows, invoices } from "../data";
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

export default async function InvoicesPage({
  searchParams,
}: PageProps<"/examples/business/invoices">) {
  const result = filterRows(
    [...invoices].reverse(),
    await searchParams,
    (invoice) =>
      `${invoice.id} ${customerById(invoice.customerId)?.name ?? ""}`,
    (invoice) => invoice.status,
  );
  const href = `${base}/invoices`;
  return (
    <>
      <Heading
        title="Invoices"
        description="Follow issued invoices through payment, overdue follow-up, or cancellation. Open invoices are not counted as collected revenue."
      />
      <Panel title="Invoice ledger" description="Newest invoices first">
        <Filters
          action={href}
          q={result.q}
          status={result.selected}
          options={["paid", "open", "overdue", "void"]}
          placeholder="Invoice or customer"
        />
        {result.count ? (
          <DataTable
            headers={[
              "Invoice",
              "Customer",
              "Issued",
              "Due",
              "Amount",
              "Status",
            ]}
          >
            {result.rows.map((invoice) => (
              <tr key={invoice.id}>
                <th scope="row" className={`${cell} text-start font-medium`}>
                  {invoice.id}
                </th>
                <td className={cell}>
                  <CustomerLink id={invoice.customerId}>
                    {customerById(invoice.customerId)?.name}
                  </CustomerLink>
                </td>
                <td className={cell}>
                  <DateText value={invoice.issued} />
                </td>
                <td className={cell}>
                  <DateText value={invoice.due} />
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
          <p className="py-8 text-sm text-muted-foreground">
            No invoices match these filters.
          </p>
        )}
        <Results {...result} href={href} />
      </Panel>
    </>
  );
}
