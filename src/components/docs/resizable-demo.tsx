import {
  ResizableGroup,
  ResizableHandle,
  ResizablePanel,
} from "@/components/ui/resizable";

export function ResizableDemo() {
  return (
    <ResizableGroup className="h-80 overflow-hidden rounded-xl border border-border bg-card">
      <ResizablePanel id="resizable-brief">
        <div tabIndex={0} className="h-full overflow-auto p-4">
          <h3 className="text-sm font-semibold">Design brief</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Northwind wants a calmer checkout: three steps, no account prompt.
          </p>
          <ul className="mt-3 grid gap-1.5 text-sm">
            <li>Address and delivery</li>
            <li>Payment</li>
            <li>Review</li>
          </ul>
        </div>
      </ResizablePanel>
      <ResizableHandle aria-label="Resize the brief and the preview" />
      <ResizablePanel id="resizable-preview">
        <div tabIndex={0} className="h-full overflow-auto bg-muted/40 p-4">
          <h3 className="text-sm font-semibold">Preview</h3>
          <div className="mt-2 grid gap-1.5 rounded-lg border border-border bg-card p-3">
            <p className="text-sm font-medium">Checkout</p>
            <p className="text-xs text-muted-foreground">
              1 Address · 2 Payment · 3 Review
            </p>
            <p className="rounded-md bg-muted px-2 py-1.5 text-xs">
              Free delivery over $50
            </p>
          </div>
        </div>
      </ResizablePanel>
    </ResizableGroup>
  );
}
