"use client";

import { ArrowClockwiseIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const metrics = [
  { label: "Visitors", value: "12,480" },
  { label: "Sign-ups", value: "342" },
  { label: "Conversion", value: "2.7%" },
];

export function SpinnerOverlayDemo() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="grid w-full max-w-md gap-3">
      <section
        aria-label="Weekly traffic"
        aria-busy={isLoading}
        className="relative overflow-hidden rounded-xl bg-card shadow-[var(--shadow-card)] ring-1 ring-border/70"
      >
        <dl
          className={`grid grid-cols-3 divide-x divide-border/70 transition-[opacity,filter] duration-300 ease-out-quint ${isLoading ? "opacity-40 blur-[1px]" : ""}`}
        >
          {metrics.map((metric) => (
            <div key={metric.label} className="px-4 py-5">
              <dt className="text-xs text-muted-foreground">{metric.label}</dt>
              <dd className="mt-1 text-xl font-semibold tracking-tight tabular-nums">
                {metric.value}
              </dd>
            </div>
          ))}
        </dl>
        {isLoading && (
          <div className="absolute inset-0 grid place-items-center transition-opacity duration-200 ease-out-quint starting:opacity-0">
            <span className="flex items-center gap-2 rounded-full bg-card px-3 py-1.5 text-sm font-medium shadow-[var(--shadow-card)] ring-1 ring-border/70">
              <Spinner size="sm" decorative />
              Refreshing
            </span>
          </div>
        )}
      </section>
      <Button
        variant="outline"
        size="sm"
        className="justify-self-end"
        isPending={isLoading}
        onPress={() => {
          setIsLoading(true);
          setTimeout(() => setIsLoading(false), 1800);
        }}
      >
        <ArrowClockwiseIcon aria-hidden="true" />
        Refresh
      </Button>
    </div>
  );
}
