"use client";

import { type CalendarDate, parseDate } from "@internationalized/date";
import { PaperPlaneTiltIcon, PlusIcon, TrashIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ComboBox } from "@/components/ui/combo-box";
import { DatePicker } from "@/components/ui/date-picker";
import {
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import {
  NumberField,
  NumberFieldGroup,
  NumberFieldInput,
} from "@/components/ui/number-field";
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/components/ui/segmented-control";
import { Select } from "@/components/ui/select";
import { TextArea } from "@/components/ui/text-area";
import { TextField } from "@/components/ui/text-field";
import { showToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import {
  cents,
  clients,
  initialItems,
  type LineItem,
  money,
  studio,
  terms,
  totals,
} from "./data";
import { InvoicePreview } from "./invoice-preview";

type Status = "draft" | "sent";

const number = "INV-2026-041";

const shortDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function CompactNumber({
  label,
  value,
  onChange,
  format,
  isInvalid,
  maxValue,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  format?: Intl.NumberFormatOptions;
  isInvalid?: boolean;
  maxValue?: number;
}) {
  return (
    <NumberField
      aria-label={label}
      value={value}
      minValue={0}
      maxValue={maxValue}
      formatOptions={format}
      isInvalid={isInvalid}
      onChange={(next) => onChange(Number.isNaN(next) ? 0 : next)}
    >
      <NumberFieldGroup>
        <NumberFieldInput className="text-end" />
      </NumberFieldGroup>
    </NumberField>
  );
}

export function InvoiceEditor() {
  const [status, setStatus] = useState<Status>("draft");
  const [clientId, setClientId] = useState<string | null>("cobalt");
  const [issued, setIssued] = useState<CalendarDate>(parseDate("2026-10-28"));
  const [term, setTerm] = useState("net30");
  const [items, setItems] = useState(initialItems);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [notes, setNotes] = useState(
    "Pay by bank transfer to account 4471 0098 2213, routing 021000021. Thank you for your business.",
  );
  const [checked, setChecked] = useState(false);
  const [sendOpen, setSendOpen] = useState(false);
  const [sendKey, setSendKey] = useState(0);
  const [pane, setPane] = useState<"edit" | "preview">("edit");

  const client = clients.find((item) => item.id === clientId);
  const days = terms.find((item) => item.id === term)?.days ?? 0;
  const due = issued.add({ days }).toString();
  const sum = totals(items, discount, tax);
  const blankLines = items.filter((item) => !item.description.trim());
  const problems = [
    !client && "Choose a client.",
    items.length === 0 && "Add at least one line.",
    blankLines.length > 0 &&
      (blankLines.length === 1
        ? "Add a description to the empty line."
        : `Add a description to ${blankLines.length} empty lines.`),
  ].filter((problem): problem is string => Boolean(problem));
  const showProblems = checked && problems.length > 0;

  function edit<T>(setter: (value: T) => void) {
    return (value: T) => {
      setter(value);
      setStatus("draft");
    };
  }

  function updateItem(id: string, patch: Partial<LineItem>) {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
    setStatus("draft");
  }

  function addItem() {
    setItems((current) => [
      ...current,
      { id: crypto.randomUUID(), description: "", quantity: 1, rate: 0 },
    ]);
    setStatus("draft");
  }

  function removeItem(item: LineItem) {
    const snapshot = items;
    setItems((current) => current.filter((line) => line.id !== item.id));
    setStatus("draft");
    showToast({
      title: "Line removed",
      action: { label: "Undo", onAction: () => setItems(snapshot) },
    });
  }

  function openSend() {
    setChecked(true);
    if (problems.length > 0) {
      setPane("edit");
      return;
    }
    setSendKey((key) => key + 1);
    setSendOpen(true);
  }

  const preview = (
    <InvoicePreview
      number={number}
      client={client}
      issued={issued.toString()}
      due={due}
      items={items}
      discount={discount}
      tax={tax}
      notes={notes}
    />
  );

  return (
    <div className="min-h-svh bg-muted/40 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-[1240px] gap-6">
        <header className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <div className="grid gap-1">
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-semibold tracking-[-0.04em]">
                {number}
              </h1>
              <Badge variant={status === "sent" ? "success" : "neutral"} dot>
                {status === "sent" ? "Sent" : "Draft"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground tabular-nums">
              {money.format(sum.total / 100)}
              {client ? ` · ${client.name}` : ""}
            </p>
          </div>
          <div className="ms-auto flex gap-2">
            <Button
              variant="outline"
              onPress={() =>
                showToast({
                  title: "Draft saved",
                  description: "Only your team can see drafts.",
                })
              }
            >
              Save draft
            </Button>
            <Button onPress={openSend}>
              <PaperPlaneTiltIcon
                data-icon="inline-start"
                size={16}
                aria-hidden="true"
              />
              {status === "sent" ? "Send again" : "Send invoice"}
            </Button>
          </div>
        </header>

        <SegmentedControl
          aria-label="Pane"
          value={pane}
          onValueChange={(details) => {
            if (details.value === "edit" || details.value === "preview") {
              setPane(details.value);
            }
          }}
          fullWidth
          className="lg:hidden"
        >
          <SegmentedControlItem value="edit">Edit</SegmentedControlItem>
          <SegmentedControlItem value="preview">Preview</SegmentedControlItem>
        </SegmentedControl>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,6fr)]">
          <div
            className={cn(
              "grid gap-6 rounded-xl bg-card p-5 shadow-(--shadow-card) ring-1 ring-border/70 sm:p-6",
              pane === "preview" && "max-lg:hidden",
            )}
          >
            {showProblems && (
              <Alert
                variant="error"
                role="alert"
                title="Fix these items before you send"
              >
                <ul className="list-disc ps-4">
                  {problems.map((problem) => (
                    <li key={problem}>{problem}</li>
                  ))}
                </ul>
              </Alert>
            )}

            <div className="grid gap-4 sm:grid-cols-3">
              <ComboBox
                label="Client"
                placeholder="Find a client"
                options={clients.map((item) => ({
                  id: item.id,
                  name: item.name,
                  description: item.contact,
                }))}
                selectedKey={clientId}
                onSelectionChange={(key) =>
                  edit(setClientId)(key === null ? null : String(key))
                }
                isInvalid={checked && !client}
                className="sm:col-span-3"
              />
              <DatePicker
                label="Issue date"
                value={issued}
                onChange={(value) => {
                  if (value) edit(setIssued)(value);
                }}
              />
              <Select
                label="Payment terms"
                options={terms.map((item) => ({
                  id: item.id,
                  name: item.name,
                }))}
                value={term}
                onChange={(key) => edit(setTerm)(String(key))}
              />
              <div className="grid content-start gap-2">
                <p className="text-sm font-medium">Due date</p>
                <p className="flex h-10 items-center text-sm text-muted-foreground">
                  {shortDate.format(parseDate(due).toDate("UTC"))}
                </p>
              </div>
            </div>

            <section aria-labelledby="invoice-lines" className="grid gap-3">
              <h2 id="invoice-lines" className="text-sm font-medium">
                Lines
              </h2>
              <div
                aria-hidden="true"
                className="hidden grid-cols-[minmax(0,1fr)_4.5rem_7rem_6.5rem_2rem] gap-2 text-xs text-muted-foreground sm:grid"
              >
                <span>Description</span>
                <span className="text-end">Qty</span>
                <span className="text-end">Rate</span>
                <span className="text-end">Amount</span>
              </div>
              <ul className="grid gap-3 sm:gap-2">
                {items.map((item, index) => (
                  <li
                    key={item.id}
                    className="grid grid-cols-[4.5rem_minmax(0,1fr)_auto_2rem] items-center gap-2 border-b border-border/70 pb-3 sm:grid-cols-[minmax(0,1fr)_4.5rem_7rem_6.5rem_2rem] sm:border-0 sm:pb-0"
                  >
                    <TextField
                      aria-label={`Description, line ${index + 1}`}
                      placeholder="Describe the work"
                      value={item.description}
                      onChange={(description) =>
                        updateItem(item.id, { description })
                      }
                      isInvalid={checked && !item.description.trim()}
                      className="col-span-4 sm:col-span-1"
                    />
                    <CompactNumber
                      label={`Quantity, line ${index + 1}`}
                      value={item.quantity}
                      onChange={(quantity) => updateItem(item.id, { quantity })}
                    />
                    <CompactNumber
                      label={`Rate, line ${index + 1}`}
                      value={item.rate}
                      format={{ style: "currency", currency: "USD" }}
                      onChange={(rate) => updateItem(item.id, { rate })}
                    />
                    <p className="text-end text-sm font-medium tabular-nums">
                      {money.format(cents(item.quantity * item.rate) / 100)}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconOnly
                      aria-label={`Remove line ${index + 1}`}
                      onPress={() => removeItem(item)}
                    >
                      <TrashIcon aria-hidden="true" />
                    </Button>
                  </li>
                ))}
              </ul>
              <div>
                <Button variant="outline" size="sm" onPress={addItem}>
                  <PlusIcon
                    data-icon="inline-start"
                    size={16}
                    aria-hidden="true"
                  />
                  Add line
                </Button>
              </div>
            </section>

            <div className="grid gap-4 border-t border-border/70 pt-5 sm:grid-cols-[minmax(0,1fr)_16rem]">
              <TextArea
                label="Notes"
                value={notes}
                onChange={edit(setNotes)}
                rows={4}
              />
              <dl className="grid content-start grid-cols-[minmax(0,1fr)_7rem] items-center gap-x-3 gap-y-2.5 text-sm tabular-nums">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="text-end">{money.format(sum.subtotal / 100)}</dd>
                <dt className="text-muted-foreground">Discount</dt>
                <dd>
                  <CompactNumber
                    label="Discount"
                    value={discount}
                    maxValue={100}
                    format={{
                      style: "unit",
                      unit: "percent",
                      maximumFractionDigits: 2,
                    }}
                    onChange={edit(setDiscount)}
                  />
                </dd>
                <dt className="text-muted-foreground">Tax</dt>
                <dd>
                  <CompactNumber
                    label="Tax"
                    value={tax}
                    maxValue={100}
                    format={{
                      style: "unit",
                      unit: "percent",
                      maximumFractionDigits: 3,
                    }}
                    onChange={edit(setTax)}
                  />
                </dd>
                <div className="col-span-2 grid grid-cols-subgrid border-t border-border pt-2.5 font-semibold">
                  <dt>Total</dt>
                  <dd className="text-end">{money.format(sum.total / 100)}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div
            className={cn(
              "lg:sticky lg:top-8",
              pane === "edit" && "max-lg:hidden",
            )}
          >
            {preview}
          </div>
        </div>
      </div>

      {client && (
        <SendDialog
          key={sendKey}
          isOpen={sendOpen}
          onOpenChange={setSendOpen}
          email={client.email}
          total={money.format(sum.total / 100)}
          onSend={(to) => {
            setSendOpen(false);
            setStatus("sent");
            showToast({
              title: "Invoice sent",
              description: `${number} went to ${to}.`,
              variant: "success",
            });
          }}
        />
      )}
    </div>
  );
}

function SendDialog({
  isOpen,
  onOpenChange,
  email,
  total,
  onSend,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
  total: string;
  onSend: (to: string) => void;
}) {
  const [to, setTo] = useState(email);
  const [message, setMessage] = useState(
    `Hi, here is invoice ${number} for ${total}. The PDF is attached.`,
  );
  const [copy, setCopy] = useState(true);
  const [pending, setPending] = useState(false);

  return (
    <DialogContent size="md" overlayProps={{ isOpen, onOpenChange }}>
      <Form
        className="contents"
        onSubmit={(event) => {
          event.preventDefault();
          setPending(true);
          window.setTimeout(() => {
            setPending(false);
            onSend(to.trim());
          }, 700);
        }}
      >
        <DialogHeader>
          <DialogTitle>Send {number}</DialogTitle>
          <DialogDescription>
            The client gets a link to pay online and a PDF copy.
          </DialogDescription>
          <DialogClose />
        </DialogHeader>
        <DialogBody className="grid grid-cols-1 gap-4">
          <TextField
            label="To"
            type="email"
            value={to}
            onChange={setTo}
            isRequired
            validate={(value) =>
              /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
                ? null
                : "Enter a valid email address."
            }
          />
          <TextArea
            label="Message"
            value={message}
            onChange={setMessage}
            rows={4}
          />
          <Checkbox isSelected={copy} onChange={setCopy}>
            Send a copy to {studio.email}
          </Checkbox>
        </DialogBody>
        <DialogFooter>
          <DialogClose variant="outline">Cancel</DialogClose>
          <Button type="submit" isPending={pending}>
            Send invoice
          </Button>
        </DialogFooter>
      </Form>
    </DialogContent>
  );
}
