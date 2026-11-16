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
        <div
          tabIndex={0}
          className="grid h-full place-content-center overflow-auto bg-muted/40 p-6 text-center"
        >
          <p className="text-sm font-medium">Canvas</p>
          <p className="mt-1 max-w-56 text-xs text-muted-foreground">
            Press Enter on the divider to collapse the outline.
          </p>
        </div>
      </ResizablePanel>
    </ResizableGroup>
  );
}
