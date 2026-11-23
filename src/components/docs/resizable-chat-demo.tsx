import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockBody,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/components/ui/code-block";
import { PromptInput } from "@/components/ui/prompt-input";
import {
  ResizableGroup,
  ResizableHandle,
  ResizablePanel,
} from "@/components/ui/resizable";

const CODE = `export function EmptyState() {
  return (
    <section className="grid place-items-center p-8">
      <h2>No projects yet</h2>
      <p>Create a project to start a review.</p>
    </section>
  );
}`;

export function ResizableChatDemo() {
  return (
    <ResizableGroup
      defaultLayout={[46, 54]}
      className="h-[26rem] overflow-hidden rounded-xl border border-border bg-card"
    >
      <ResizablePanel minSize={30}>
        <div className="flex h-full min-h-0 flex-col">
          <div tabIndex={0} className="flex-1 overflow-auto p-4">
            <p className="text-xs font-medium text-muted-foreground">You</p>
            <p className="mt-1 text-sm">
              Make the empty state calmer and remove the second button.
            </p>
            <p className="mt-4 text-xs font-medium text-muted-foreground">
              Assistant
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              I moved the empty state into its own component and kept one
              action. The diff is on the right.
            </p>
          </div>
          <div className="px-3 pb-3">
            <PromptInput label="Message" placeholder="Ask about this file" />
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle aria-label="Resize the chat and the code" />
      <ResizablePanel minSize={25}>
        <div tabIndex={0} className="h-full overflow-auto bg-muted/30 p-3">
          <CodeBlock code={CODE} language="tsx">
            <CodeBlockHeader>
              <CodeBlockTitle>EmptyState.tsx</CodeBlockTitle>
              <CodeBlockActions />
            </CodeBlockHeader>
            <CodeBlockBody />
          </CodeBlock>
        </div>
      </ResizablePanel>
    </ResizableGroup>
  );
}
