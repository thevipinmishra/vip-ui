"use client";

import { ArrowCounterClockwiseIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  ResizableContext,
  ResizableGroup,
  ResizableHandle,
  ResizableHandleIndicator,
  ResizablePanel,
} from "@/components/ui/resizable";

const steps = ["Address and delivery", "Payment", "Review"];

export function ResizableContextDemo() {
  return (
    <ResizableGroup
      defaultLayout={[58, 42]}
      className="h-80 overflow-hidden rounded-xl border border-border bg-card"
    >
      <ResizablePanel id="resizable-context-draft" minSize={30}>
        <div className="flex h-full flex-col p-4">
          <p className="text-xs font-medium text-muted-foreground">Draft</p>
          <h3 className="mt-1 text-sm font-semibold">Calmer checkout</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Keep three steps and remove the account prompt. Confirm the address
            before payment.
          </p>
          <ol className="mt-3 grid gap-1.5 text-sm">
            {steps.map((step, index) => (
              <li key={step} className="flex items-baseline gap-2">
                <span className="text-xs text-muted-foreground tabular-nums">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <p className="mt-auto text-xs text-muted-foreground">
            Drag the divider, or use the inspector controls.
          </p>
        </div>
      </ResizablePanel>
      <ResizableHandle aria-label="Resize the draft and the layout inspector">
        <ResizableHandleIndicator />
      </ResizableHandle>
      <ResizablePanel id="resizable-context-inspector" minSize={25}>
        <ResizableContext>
          {(api) => {
            const sizes = api.getSizes();
            const first = sizes[0] ?? 50;
            const second = sizes[1] ?? 50;
            return (
              <div className="flex h-full flex-col gap-4 bg-muted/30 p-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Layout
                  </p>
                  <p className="mt-1 text-sm font-medium tabular-nums">
                    {Math.round(first)}% / {Math.round(second)}%
                  </p>
                </div>
                <div
                  aria-hidden="true"
                  className="flex h-2 overflow-hidden rounded-full bg-border"
                >
                  <span
                    className="h-full bg-primary"
                    style={{ width: `${first}%` }}
                  />
                  <span
                    className="h-full bg-primary/40"
                    style={{ width: `${second}%` }}
                  />
                </div>
                <dl className="grid gap-1.5 text-xs text-muted-foreground">
                  <div className="flex items-center justify-between gap-3">
                    <dt>Panels</dt>
                    <dd className="text-foreground tabular-nums">
                      {api.getPanels().length}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt>State</dt>
                    <dd className="text-foreground">
                      {api.dragging ? "Dragging" : "Idle"}
                    </dd>
                  </div>
                </dl>
                <div className="mt-auto flex flex-wrap gap-2">
                  <Button
                    size="xs"
                    variant="outline"
                    onPress={() => api.setSizes([50, 50])}
                  >
                    Split evenly
                  </Button>
                  <Button
                    size="xs"
                    variant="outline"
                    onPress={() => api.resetSizes()}
                  >
                    <ArrowCounterClockwiseIcon aria-hidden="true" />
                    Reset
                  </Button>
                </div>
              </div>
            );
          }}
        </ResizableContext>
      </ResizablePanel>
    </ResizableGroup>
  );
}
