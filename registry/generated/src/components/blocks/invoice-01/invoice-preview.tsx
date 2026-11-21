import {
  type Client,
  cents,
  formatDate,
  type LineItem,
  money,
  studio,
  totals,
} from "./data";

export function InvoicePreview({
  number,
  client,
  issued,
  due,
  items,
  discount,
  tax,
  notes,
}: {
  number: string;
  client: Client | undefined;
  issued: string;
  due: string;
  items: LineItem[];
  discount: number;
  tax: number;
  notes: string;
}) {
  const sum = totals(items, discount, tax);
  return (
    <article
      aria-label="Invoice preview"
      className="grid content-start gap-8 rounded-xl bg-card p-6 text-sm shadow-(--shadow-card) ring-1 ring-border/70 sm:p-8"
    >
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground"
          >
            B
          </span>
          <span className="font-semibold tracking-[-0.02em]">
            {studio.name}
          </span>
        </div>
        <div className="text-end">
          <p className="text-lg font-semibold tracking-[-0.03em]">Invoice</p>
          <p className="text-muted-foreground tabular-nums">{number}</p>
        </div>
      </header>

      <div className="grid gap-6 sm:grid-cols-3">
        <div className="grid content-start gap-1">
          <p className="text-xs font-medium text-muted-foreground">From</p>
          <p className="font-medium">{studio.name}</p>
          {studio.address.map((line) => (
            <p key={line} className="text-muted-foreground">
              {line}
            </p>
          ))}
        </div>
        <div className="grid content-start gap-1">
          <p className="text-xs font-medium text-muted-foreground">Bill to</p>
          {client ? (
            <>
              <p className="font-medium">{client.name}</p>
              {client.address.map((line) => (
                <p key={line} className="text-muted-foreground">
                  {line}
                </p>
              ))}
            </>
          ) : (
            <p className="text-muted-foreground">No client</p>
          )}
        </div>
        <div className="grid content-start gap-1 sm:text-end">
          <p className="text-xs font-medium text-muted-foreground">Issued</p>
          <p>{formatDate(issued)}</p>
          <p className="mt-2 text-xs font-medium text-muted-foreground">Due</p>
          <p>{formatDate(due)}</p>
        </div>
      </div>

      <table className="w-full">
        <thead className="border-b border-border text-xs text-muted-foreground">
          <tr>
            <th scope="col" className="pb-2 text-start font-medium">
              Description
            </th>
            <th scope="col" className="pb-2 text-end font-medium">
              Qty
            </th>
            <th
              scope="col"
              className="hidden pb-2 text-end font-medium sm:table-cell"
            >
              Rate
            </th>
            <th scope="col" className="pb-2 text-end font-medium">
              Amount
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/70">
          {items.map((item) => (
            <tr key={item.id}>
              <td className="py-2.5 pe-4 wrap-anywhere">
                {item.description || (
                  <span className="text-muted-foreground">No description</span>
                )}
              </td>
              <td className="py-2.5 text-end tabular-nums">{item.quantity}</td>
              <td className="hidden py-2.5 ps-4 text-end tabular-nums sm:table-cell">
                {money.format(item.rate)}
              </td>
              <td className="py-2.5 ps-4 text-end tabular-nums">
                {money.format(cents(item.quantity * item.rate) / 100)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <dl className="ms-auto grid w-full max-w-64 grid-cols-[1fr_auto] gap-x-6 gap-y-2 tabular-nums">
        <dt className="text-muted-foreground">Subtotal</dt>
        <dd className="text-end">{money.format(sum.subtotal / 100)}</dd>
        {discount > 0 && (
          <>
            <dt className="text-muted-foreground">Discount ({discount}%)</dt>
            <dd className="text-end">−{money.format(sum.discount / 100)}</dd>
          </>
        )}
        {tax > 0 && (
          <>
            <dt className="text-muted-foreground">Tax ({tax}%)</dt>
            <dd className="text-end">{money.format(sum.tax / 100)}</dd>
          </>
        )}
        <div className="col-span-2 grid grid-cols-subgrid border-t border-border pt-2 font-semibold">
          <dt>Amount due</dt>
          <dd className="text-end">{money.format(sum.total / 100)}</dd>
        </div>
      </dl>

      {notes.trim() && (
        <footer className="border-t border-border/70 pt-4 whitespace-pre-line text-muted-foreground">
          {notes}
        </footer>
      )}
    </article>
  );
}
