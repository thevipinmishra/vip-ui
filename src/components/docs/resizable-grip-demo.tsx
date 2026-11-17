import {
  ResizableGroup,
  ResizableHandle,
  ResizablePanel,
} from "@/components/ui/resizable";

export function ResizableGripDemo() {
  return (
    <ResizableGroup
      defaultLayout={[45, 55]}
      className="h-72 overflow-hidden rounded-xl border border-border bg-card"
    >
      <ResizablePanel id="resizable-document" minSize={20} maxSize={70}>
        <div tabIndex={0} className="h-full overflow-auto p-4">
          <h3 className="text-sm font-semibold">Shipping policy</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Orders leave the warehouse within one business day. Express orders
            placed before 2 PM ship the same day.
          </p>
        </div>
      </ResizablePanel>
      <ResizableHandle
        withGrip
        aria-label="Resize the document and the inspector"
      />
      <ResizablePanel id="resizable-inspector">
        <div
          tabIndex={0}
          className="h-full overflow-auto bg-muted/40 p-4 text-sm"
        >
          <h3 className="font-semibold">Inspector</h3>
          <dl className="mt-2 grid gap-1.5 text-muted-foreground">
            <div className="flex justify-between gap-3">
              <dt>Owner</dt>
              <dd className="text-foreground">Maya Chen</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>Updated</dt>
              <dd className="text-foreground">2 hours ago</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>Words</dt>
              <dd className="tabular-nums text-foreground">1,240</dd>
            </div>
          </dl>
        </div>
      </ResizablePanel>
    </ResizableGroup>
  );
}
