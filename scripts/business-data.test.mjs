import assert from "node:assert/strict";
import test from "node:test";
import {
  collectedAugust,
  customerById,
  customers,
  filterRows,
  invoiceById,
  invoices,
  monthlyRevenue,
  payments,
  plans,
} from "../src/app/examples/business/data.ts";

test("billing records and dashboard totals agree", () => {
  for (const invoice of invoices) {
    const customer = customerById(invoice.customerId);
    assert.ok(customer, `Missing customer for ${invoice.id}`);
    assert.equal(invoice.amount, plans[customer.plan]);
    assert.ok(invoice.issued <= invoice.due);
    const attempts = payments.filter(
      (payment) => payment.invoiceId === invoice.id,
    );
    if (invoice.status === "paid")
      assert.equal(
        attempts.filter((payment) => payment.status === "succeeded").length,
        1,
      );
    if (invoice.status === "overdue") {
      assert.equal(customer.subscription, "past_due");
      assert.ok(attempts.some((payment) => payment.status === "failed"));
    }
    if (invoice.status === "void")
      assert.equal(customer.subscription, "canceled");
  }
  for (const payment of payments) {
    const invoice = invoiceById(payment.invoiceId);
    assert.ok(invoice);
    assert.equal(payment.amount, invoice.amount);
    assert.ok(payment.date >= invoice.issued);
  }
  assert.equal(
    monthlyRevenue,
    customers
      .filter((customer) => customer.subscription === "active")
      .reduce((sum, customer) => sum + plans[customer.plan], 0),
  );
  assert.equal(
    collectedAugust,
    invoices
      .filter(
        (invoice) =>
          invoice.status === "paid" && invoice.issued.startsWith("2026-08"),
      )
      .reduce((sum, invoice) => sum + invoice.amount, 0),
  );
});

test("search and status filters paginate the full matching set", () => {
  const first = filterRows(
    customers,
    { status: "active" },
    (row) => row.name,
    (row) => row.subscription,
  );
  assert.equal(first.count, 7);
  const last = filterRows(
    customers,
    { page: "999" },
    (row) => row.name,
    (row) => row.subscription,
  );
  assert.equal(last.page, last.pages);
  assert.equal(last.rows.length, 4);
  const none = filterRows(
    customers,
    { q: "not a customer" },
    (row) => row.name,
    (row) => row.subscription,
  );
  assert.equal(none.count, 0);
  assert.equal(none.pages, 1);
});
