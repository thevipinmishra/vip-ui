"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const patterns = [
  { variant: "ring", use: "Quick actions" },
  { variant: "segments", use: "Dense interfaces" },
  { variant: "dots", use: "Inline messages" },
  { variant: "bars", use: "Voice and streaming" },
  { variant: "orbit", use: "Waiting screens" },
  { variant: "pulse", use: "Background work" },
] as const;

export function SpinnerDemo() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-full max-w-2xl space-y-3">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {patterns.map(({ variant, use }) => (
          <div
            key={variant}
            className="flex min-h-44 flex-col rounded-2xl bg-card p-5 ring-1 ring-border/70"
          >
            <div
              data-slot="spinner-stage"
              className="grid h-20 shrink-0 place-items-center"
            >
              <Spinner
                variant={variant}
                size="lg"
                decorative
                className="text-primary"
              />
            </div>
            <div className="mt-auto pt-3 text-center">
              <p className="text-sm font-medium capitalize">{variant}</p>
              <p className="mt-1 text-xs text-muted-foreground">{use}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-5 rounded-2xl bg-card p-5 text-card-foreground shadow-[var(--shadow-card)] ring-1 ring-border sm:p-6">
        <div className="flex items-center gap-4">
          {loading ? (
            <Spinner
              variant="spark"
              size="lg"
              decorative
              className="text-primary"
            />
          ) : (
            <span
              aria-hidden="true"
              className="flex size-10 items-center justify-center text-2xl"
            >
              ✦
            </span>
          )}
          <div>
            <p className="text-sm font-medium">Assistant</p>
            <output className="mt-1 block text-xs text-muted-foreground">
              {loading ? "Putting your response together…" : "Response ready"}
            </output>
          </div>
        </div>
        <Button
          variant="secondary"
          onPress={() => setLoading((value) => !value)}
        >
          {loading ? "Finish response" : "Try again"}
        </Button>
      </div>
    </div>
  );
}
