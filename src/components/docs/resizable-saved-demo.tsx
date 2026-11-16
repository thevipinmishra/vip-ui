"use client";

import { useEffect, useState } from "react";
import {
  ResizableGroup,
  ResizableHandle,
  ResizablePanel,
} from "@/components/ui/resizable";

const STORAGE_KEY = "vip-ui:resizable:notes";

export function ResizableSavedDemo() {
  const [ready, setReady] = useState(false);
  const [saved, setSaved] = useState<number[]>();

  useEffect(() => {
    try {
      const value = window.localStorage.getItem(STORAGE_KEY);
      const layout: unknown = value ? JSON.parse(value) : null;
      if (
        Array.isArray(layout) &&
        layout.length === 2 &&
        layout.every((size) => typeof size === "number")
      ) {
        setSaved(layout);
      }
    } catch {}
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div
        aria-hidden="true"
        className="h-72 rounded-xl border border-border bg-muted/30"
      />
    );
  }

  return (
    <ResizableGroup
      key={saved?.join("-") ?? "default"}
      defaultLayout={saved}
      onLayoutEnd={(layout) => {
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
        } catch {}
      }}
      className="h-72 overflow-hidden rounded-xl border border-border bg-card"
    >
      <ResizablePanel id="resizable-notes">
        <div tabIndex={0} className="h-full overflow-auto p-4">
          <h3 className="text-sm font-semibold">Notes</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Drag the divider, then reload the page. The layout stays where you
            left it.
          </p>
        </div>
      </ResizablePanel>
      <ResizableHandle aria-label="Resize the notes and the sources" />
      <ResizablePanel id="resizable-sources">
        <div tabIndex={0} className="h-full overflow-auto bg-muted/40 p-4">
          <h3 className="text-sm font-semibold">Sources</h3>
          <ul className="mt-2 grid gap-1.5 text-sm text-muted-foreground">
            <li>Kickoff call, 14 March</li>
            <li>Checkout audit, 28 March</li>
            <li>Northwind brand guide</li>
          </ul>
        </div>
      </ResizablePanel>
    </ResizableGroup>
  );
}
