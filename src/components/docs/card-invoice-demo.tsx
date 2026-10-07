"use client";

import { useState } from "react";
import { FileText } from "reicon-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/ui/text-field";

const items = [
  { name: "Product design", detail: "12 hours × $120", amount: "$1,440" },
  { name: "Design system", detail: "8 hours × $120", amount: "$960" },
  { name: "Prototype review", detail: "2 hours × $120", amount: "$240" },
];

export function CardInvoiceDemo() {
  const [approved, setApproved] = useState(false);
  const [note, setNote] = useState("Net 15. Send to accounts payable.");

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <FileText
              size={18}
              aria-hidden="true"
              className="text-muted-foreground"
            />
            <CardTitle>Invoice INV-1056</CardTitle>
          </div>
          <Badge variant={approved ? "success" : "warning"} dot>
            {approved ? "Approved" : "Needs review"}
          </Badge>
        </div>
        <CardDescription>Acme Studio · Due October 18</CardDescription>
      </CardHeader>
      <CardContent>
        <dl className="divide-y divide-border border-y border-border">
          {items.map((item) => (
            <div
              key={item.name}
              className="flex justify-between gap-4 py-3 text-sm"
            >
              <div>
                <dt className="font-medium">{item.name}</dt>
                <dd className="mt-0.5 text-xs text-muted-foreground">
                  {item.detail}
                </dd>
              </div>
              <dd className="font-medium tabular-nums">{item.amount}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-4 flex items-baseline justify-between text-sm">
          <span className="font-medium">Total due</span>
          <span className="text-lg font-semibold tabular-nums">$2,640</span>
        </div>
        <Form
          className="mt-5 gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            setApproved(true);
          }}
        >
          <TextField
            label="Payment note"
            name="note"
            value={note}
            onChange={setNote}
            description="Included with the approval sent to finance."
          />
          <div className="flex flex-wrap items-center gap-3">
            {approved ? (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onPress={() => setApproved(false)}
              >
                Undo approval
              </Button>
            ) : (
              <Button type="submit" size="sm">
                Approve invoice
              </Button>
            )}
            <output className="text-xs text-muted-foreground">
              {approved ? `Ready for payment. ${note}` : "Awaiting approval"}
            </output>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
