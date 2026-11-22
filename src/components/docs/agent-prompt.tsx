import { CopyCodeButton } from "./copy-code-button";

export function AgentPrompt({ prompt }: { prompt: string }) {
  return (
    <div
      data-slot="agent-prompt"
      className="min-w-0 overflow-hidden rounded-2xl bg-code text-code-foreground shadow-(--shadow-card) ring-1 ring-border/60"
    >
      <div className="flex min-h-12 items-center justify-between gap-3 border-b border-border/70 py-2 ps-4 pe-2">
        <p className="min-w-0 font-medium text-xs">Prompt for your agent</p>
        <CopyCodeButton
          code={prompt}
          label="Copy prompt"
          text="Copy prompt"
          variant="default"
          className="h-8 shrink-0"
        />
      </div>
      <p className="p-4 font-mono text-[13px] leading-6 wrap-anywhere">
        {prompt}
      </p>
    </div>
  );
}
