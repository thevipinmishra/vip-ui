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

  return (
    <Card className="w-full max-w-md">
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
            onPress={() => setStatus("draft")}
          >
            Restore draft
          </Button>
        ) : (
          <>
            <Button
              size="sm"
              isDisabled={status === "published"}
              onPress={() => setStatus("published")}
            >
              <Check size={16} aria-hidden="true" /> Publish
            </Button>
            <Button
              variant="outline"
              size="sm"
              onPress={() => setRevision((value) => value + 1)}
            >
              <Save size={16} aria-hidden="true" /> Save revision
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onPress={() => setStatus("archived")}
            >
              <Trash size={16} aria-hidden="true" /> Archive
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
