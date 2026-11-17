import {
  ResizableGroup,
  ResizableHandle,
  ResizablePanel,
} from "@/components/ui/resizable";

export function ResizableCollapsibleDemo() {
  return (
    <ResizableGroup
      defaultLayout={[40, 60]}
      className="h-80 overflow-hidden rounded-xl border border-border bg-card"
    >
      <ResizablePanel
        id="resizable-outline"
        collapsible
        minSize={15}
        collapsedSize={0}
      >
        <div tabIndex={0} className="h-full overflow-auto p-3">
          <h3 className="text-sm font-semibold">Outline</h3>
          <ul className="mt-2 grid gap-1 text-sm text-muted-foreground">
            <li>Summary</li>
            <li>Requirements</li>
            <li>Open questions</li>
          </ul>
        </div>
      </ResizablePanel>
      <ResizableHandle withGrip aria-label="Resize or collapse the outline" />
      <ResizablePanel id="resizable-canvas">
        <div tabIndex={0} className="h-full overflow-auto bg-muted/40 p-4">
          <h3 className="text-sm font-semibold">Summary</h3>
          <p className="mt-1 max-w-prose text-sm text-muted-foreground">
            Northwind wants a calmer checkout: three steps, no account prompt,
            and the delivery date before payment.
          </p>
        </div>
      </ResizablePanel>
    </ResizableGroup>
  );
}
