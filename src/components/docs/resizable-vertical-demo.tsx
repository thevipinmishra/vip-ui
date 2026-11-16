import {
  ResizableGroup,
  ResizableHandle,
  ResizablePanel,
} from "@/components/ui/resizable";

const CODE = `export async function deploy() {
  const build = await buildApp();
  await upload(build);
  return promote(build.id);
}`;

export function ResizableVerticalDemo() {
  return (
    <ResizableGroup
      orientation="vertical"
      defaultLayout={[62, 38]}
      className="h-96 overflow-hidden rounded-xl border border-border bg-card"
    >
      <ResizablePanel id="resizable-editor">
        <div tabIndex={0} className="h-full overflow-auto">
          <p className="border-b border-border/70 px-3 py-2 text-xs text-muted-foreground">
            deploy.ts
          </p>
          <pre className="p-3 font-mono text-xs leading-6">{CODE}</pre>
        </div>
      </ResizablePanel>
      <ResizableHandle aria-label="Resize the editor and the output" />
      <ResizablePanel id="resizable-output">
        <div
          tabIndex={0}
          className="h-full overflow-auto bg-muted/40 p-3 font-mono text-xs leading-6"
        >
          <p className="text-muted-foreground">$ pnpm deploy</p>
          <p>Build finished in 12.4s</p>
          <p>Uploaded 148 files</p>
          <p className="text-success-foreground">
            Live at northwind.example.com
          </p>
        </div>
      </ResizablePanel>
    </ResizableGroup>
  );
}
