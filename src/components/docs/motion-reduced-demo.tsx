"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { springLayout, transitionFor } from "@/lib/motion";
import { cn } from "@/lib/utils";

const columns = [
  {
    label: "Full motion",
    reduced: false,
    panel:
      "motion-safe:data-[open=false]:translate-y-2 motion-safe:data-[open=false]:scale-96",
  },
  { label: "Reduced motion", reduced: true, panel: "" },
];

export function MotionReducedDemo() {
  const [on, setOn] = useState(true);
  const reduceMotion = useReducedMotion();
  return (
    <div className="grid w-full max-w-xl gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {columns.map((column) => (
          <div key={column.label} className="grid min-w-0 content-start gap-3">
            <p className="text-xs font-medium text-muted-foreground">
              {column.label}
            </p>
            <div
              className={cn(
                "flex h-6 rounded-full bg-muted p-1",
                on ? "justify-end" : "justify-start",
              )}
            >
              <motion.span
                layout
                transition={transitionFor(
                  column.reduced || reduceMotion,
                  springLayout,
                )}
                className="block size-4 rounded-full bg-primary"
              />
            </div>
            <div
              data-open={on}
              aria-hidden={!on || undefined}
              className={cn(
                "rounded-xl bg-card p-3 text-sm text-card-foreground shadow-(--shadow-card) ring-1 ring-border/70 transition-[opacity,translate,scale] duration-200 ease-out-quint data-[open=false]:opacity-0",
                column.panel,
              )}
            >
              3 events this week
            </div>
          </div>
        ))}
      </div>
      <Button
        variant="outline"
        className="justify-self-start"
        onPress={() => setOn((value) => !value)}
      >
        Change state
      </Button>
    </div>
  );
}
