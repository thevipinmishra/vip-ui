export interface Exception {
  line: number;
  sku: string;
  item: string;
  invoice: number;
  po: number;
}

export const exceptions: Exception[] = [
  {
    line: 12,
    sku: "NW-220",
    item: "Cotton twill roll",
    invoice: 124000,
    po: 118000,
  },
  {
    line: 18,
    sku: "NW-418",
    item: "Kraft mailer, 500 pack",
    invoice: 86000,
    po: 77800,
  },
];

export const invoiceTotal = 1842000;
export const purchaseOrderTotal = 1827800;

export const run = {
  id: "run_9f2c",
  agent: "Invoice matching",
  invoice: "INV-8841",
  purchaseOrder: "PO-4471",
  vendor: "Northwind Supply",
  startedAt: "2026-10-30T10:38:02Z",
  model: "beacon-2",
  cost: 14,
  progress: 62,
  elapsed: 18,
  lines: 24,
  matched: 22,
};

export const toolCalls = {
  extract: {
    name: "extract_lines",
    summary: "24 lines from INV-8841.pdf",
    input: `{ "file": "INV-8841.pdf", "pages": 6 }`,
    output: `{ "lines": 24, "confidence": 0.98 }`,
  },
  match: {
    name: "match_purchase_order",
    summary: "22 matches and 2 exceptions",
    input: `{ "invoice": "INV-8841", "purchase_order": "PO-4471" }`,
    output: `{ "matched": 22, "exceptions": 2 }`,
  },
  totals: {
    name: "compare_totals",
    summary: "Checking 24 line totals",
    input: `{ "purchase_order": "PO-4471", "tolerance": 0.01 }`,
    output: `{ "difference": 142.0 }`,
  },
};

export const logLines = [
  { time: "10:38:02", event: "run.started", detail: "model=beacon-2" },
  {
    time: "10:38:03",
    event: "file.received",
    detail: "INV-8841.pdf · 6 pages",
  },
  {
    time: "10:38:09",
    event: "tool.complete",
    detail: "extract_lines · 24 rows",
  },
  {
    time: "10:38:16",
    event: "tool.complete",
    detail: "match_purchase_order · 22 matched",
  },
  {
    time: "10:38:17",
    event: "warn",
    detail: "PO-4471 line 12: invoice $1,240.00 · PO $1,180.00",
  },
  {
    time: "10:38:18",
    event: "warn",
    detail: "PO-4471 line 18: invoice $860.00 · PO $778.00",
  },
  { time: "10:38:19", event: "step.start", detail: "compare_totals" },
];

export const logText = logLines
  .map((line) => `${line.time} ${line.event} ${line.detail}`)
  .join("\n");

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatMoney(cents: number) {
  return money.format(cents / 100);
}

export function formatStamp(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(new Date(value));
}

export function formatElapsed(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(seconds % 60).padStart(2, "0")}`;
}

export function exceptionCsv() {
  const rows = [
    ["line", "sku", "item", "invoice", "purchase_order", "difference"],
    ...exceptions.map((exception) => [
      String(exception.line),
      exception.sku,
      exception.item,
      (exception.invoice / 100).toFixed(2),
      (exception.po / 100).toFixed(2),
      ((exception.invoice - exception.po) / 100).toFixed(2),
    ]),
  ];
  return rows
    .map((row) =>
      row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(","),
    )
    .join("\n");
}
