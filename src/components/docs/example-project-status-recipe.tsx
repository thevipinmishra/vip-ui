"use client";

import { useState } from "react";
import {
  customerById,
  date,
  invoices,
  money,
  payments,
} from "@/app/examples/business/data";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Select } from "@/components/ui/select";

const overdue = invoices.filter((invoice) => invoice.status === "overdue");

export function ExampleProjectStatusRecipe() {
  const [invoiceId, setInvoiceId] = useState(overdue[0].id);
  const [resolvedId, setResolvedId] = useState<string | null>(null);
  const invoice = overdue.find((item) => item.id === invoiceId) ?? overdue[0];
  const customer = customerById(invoice.customerId);
  const failure = payments.find(
    (payment) =>
      payment.invoiceId === invoice.id && payment.status === "failed",
  );
  const paid = resolvedId === invoice.id;

  return (
    <div className="grid w-full max-w-md gap-4">
      <Card>
        <CardContent className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold">{customer?.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {invoice.id} · {money(invoice.amount)} · failed{" "}
              {failure ? date(failure.date) : "earlier"}
            </p>
          </div>
          <Badge variant={paid ? "success" : "warning"} dot>
            {paid ? "paid" : "overdue"}
          </Badge>
        </CardContent>
      </Card>

      <Form
        onSubmit={(event) => {
          event.preventDefault();
          setResolvedId(invoice.id);
        }}
      >
        <Select
          label="Overdue invoice"
          value={invoiceId}
          onValueChange={setInvoiceId}
          options={overdue.map((item) => ({
            id: item.id,
            name: `${customerById(item.customerId)?.name} · ${item.id}`,
            description: `${money(item.amount)} · due ${date(item.due)}`,
          }))}
        />
        <Button type="submit" isDisabled={paid}>
          {paid ? "Payment recorded" : "Retry payment"}
        </Button>
      </Form>

      <div aria-live="polite">
        {paid ? (
          <Alert variant="success" title="Payment retried">
            {invoice.id} is marked paid in this demo. No charge was made and no
            email was sent.
          </Alert>
        ) : (
          <p className="text-sm leading-6 text-muted-foreground">
            The last attempt failed. Nothing is charged until you retry.
          </p>
        )}
      </div>

      <p className="text-xs leading-5 text-muted-foreground">
        Fictional ledger from the Billing operations workspace. Retrying only
        updates this card.
      </p>
    </div>
  );
}
