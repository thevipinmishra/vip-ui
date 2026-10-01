"use client";

import { useState } from "react";
import { FileText } from "reicon-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const items = [
  { name: "Product design", detail: "12 hours × $120", amount: "$1,440" },
  { name: "Design system", detail: "8 hours × $120", amount: "$960" },
  { name: "Prototype review", detail: "2 hours × $120", amount: "$240" },
];

export function CardInvoiceDemo() {
  const [approved, setApproved] = useState(false);

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
      </CardContent>
      <CardFooter>
        <Button
          variant={approved ? "secondary" : "default"}
          size="sm"
          onPress={() => setApproved((current) => !current)}
        >
          {approved ? "Undo approval" : "Approve invoice"}
        </Button>
        <output className="text-xs text-muted-foreground">
          {approved ? "Ready for payment" : "Awaiting approval"}
        </output>
      </CardFooter>
    </Card>
  );
}
