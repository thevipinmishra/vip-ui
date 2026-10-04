"use client";

import { useState } from "react";
import { Check, Save, Trash } from "reicon-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ButtonDemo() {
  const [revision, setRevision] = useState(3);
  const [status, setStatus] = useState<"draft" | "published" | "archived">(
    "draft",
  );
  const [result, setResult] = useState("");

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Card className="w-full">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle>Autumn campaign</CardTitle>
            <Badge
              variant={
                status === "published"
                  ? "success"
                  : status === "archived"
                    ? "neutral"
                    : "warning"
              }
              dot
            >
              {status === "published"
                ? "Published"
                : status === "archived"
                  ? "Archived"
                  : "Draft"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-muted-foreground">Owner</dt>
              <dd className="mt-1 font-medium">Maya Chen</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Saved revision</dt>
              <dd className="mt-1 font-medium tabular-nums">v{revision}</dd>
            </div>
          </dl>
        </CardContent>
        <CardFooter className="flex-wrap gap-2">
          {status === "archived" ? (
            <Button
              variant="secondary"
              size="sm"
              onPress={() => {
                setStatus("draft");
                setResult("Draft restored.");
              }}
            >
              Restore draft
            </Button>
          ) : (
            <>
              <Button
                size="sm"
                isDisabled={status === "published"}
                onPress={() => {
                  setStatus("published");
                  setResult("Published. Publish is now disabled.");
                }}
              >
                <Check size={16} aria-hidden="true" /> Publish
              </Button>
              <Button
                variant="outline"
                size="sm"
                onPress={() => {
                  const next = revision + 1;
                  setRevision(next);
                  setResult(`Saved revision ${next}.`);
                }}
              >
                <Save size={16} aria-hidden="true" /> Save revision
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onPress={() => {
                  setStatus("archived");
                  setResult("Archived. Restore the draft to keep editing.");
                }}
              >
                <Trash size={16} aria-hidden="true" /> Archive
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
      <output className="sr-only">{result}</output>
    </div>
  );
}
