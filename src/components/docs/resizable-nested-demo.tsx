import {
  ResizableGroup,
  ResizableHandle,
  ResizablePanel,
} from "@/components/ui/resizable";

const files = ["checkout.tsx", "cart.ts", "totals.test.ts"];

export function ResizableNestedDemo() {
  return (
    <ResizableGroup
      defaultLayout={[40, 60]}
      className="h-96 overflow-hidden rounded-xl border border-border bg-card"
    >
      <ResizablePanel id="resizable-files" minSize={18}>
        <div tabIndex={0} className="h-full overflow-auto p-3">
          <p className="px-1 pb-2 text-xs font-medium text-muted-foreground">
            Files
          </p>
          <ul className="grid gap-0.5 text-sm">
            {files.map((file) => (
              <li key={file} className="truncate rounded-md px-1.5 py-1">
                {file}
              </li>
            ))}
          </ul>
        </div>
      </ResizablePanel>
      <ResizableHandle aria-label="Resize the files and the workbench" />
      <ResizablePanel id="resizable-workbench">
        <ResizableGroup
          orientation="vertical"
          defaultLayout={[64, 36]}
          className="h-full"
        >
          <ResizablePanel id="resizable-code">
            <div
              tabIndex={0}
              className="h-full overflow-auto bg-muted/30 p-3 font-mono text-xs leading-6"
            >
              <p className="text-muted-foreground">checkout.tsx</p>
              <pre>{`export function Checkout() {
  return <Steps value={step} />;
}`}</pre>
            </div>
          </ResizablePanel>
          <ResizableHandle aria-label="Resize the code and the terminal" />
          <ResizablePanel id="resizable-terminal">
            <div
              tabIndex={0}
              className="h-full overflow-auto bg-muted/50 p-3 font-mono text-xs leading-6"
            >
              <p className="text-muted-foreground">$ pnpm test totals</p>
              <p>3 tests passed</p>
            </div>
          </ResizablePanel>
        </ResizableGroup>
      </ResizablePanel>
    </ResizableGroup>
  );
}
