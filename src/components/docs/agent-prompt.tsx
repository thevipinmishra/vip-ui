import { Fragment } from "react";
import { CollapsiblePanel } from "@/components/ui/collapsible-panel";
import { Disclosure, DisclosureHeader } from "@/components/ui/disclosure";
import { CopyCodeButton } from "./copy-code-button";

export function AgentPrompt({
  prompt,
  collapsible = false,
}: {
  prompt: string;
  collapsible?: boolean;
}) {
  const text = prompt.split(/(https?:\/\/\S+)/).map((part, index) =>
    index % 2 ? (
      // biome-ignore lint/suspicious/noArrayIndexKey: each URL is identified by its position in the static prompt, so repeated URLs stay distinct.
      <PromptUrl key={index} url={part} />
    ) : (
      part
    ),
  );
  const copy = (
    <CopyCodeButton
      code={prompt}
      label="Copy prompt"
      text="Copy prompt"
      variant={collapsible ? "outline" : "default"}
      className={
        collapsible ? "h-8 w-28 shrink-0 gap-1.5 px-2 text-xs" : "h-8 shrink-0"
      }
    />
  );

  if (collapsible) {
    return (
      <Disclosure data-slot="agent-prompt" className="rounded-xl">
        <div className="flex min-h-12 items-center gap-2 px-2 py-0.5">
          <DisclosureHeader
            headingLevel={3}
            className="w-fit gap-2 rounded-md px-2 font-medium aria-expanded:rounded-md"
          >
            Agent prompt
          </DisclosureHeader>
          {copy}
        </div>
        <CollapsiblePanel>
          <p className="mx-2 mb-2 rounded-lg bg-code p-3 font-mono text-[13px] leading-6 text-code-foreground wrap-anywhere ring-1 ring-border/60">
            {text}
          </p>
        </CollapsiblePanel>
      </Disclosure>
    );
  }

  return (
    <div
      data-slot="agent-prompt"
      className="min-w-0 overflow-hidden rounded-2xl bg-code text-code-foreground shadow-(--shadow-card) ring-1 ring-border/60"
    >
      <div className="flex min-h-12 items-center justify-between gap-3 border-b border-border/70 py-2 ps-4 pe-2">
        <p className="min-w-0 font-medium text-xs">Prompt for your agent</p>
        {copy}
      </div>
      <p className="p-4 font-mono text-[13px] leading-6 wrap-anywhere">
        {text}
      </p>
    </div>
  );
}

function PromptUrl({ url }: { url: string }) {
  return (
    <span className="inline-block max-w-full">
      {url.split(/(?<=\w\/)/).map((segment, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: repeated path segments, such as a/a/, are distinct by position.
        <Fragment key={index}>
          {segment}
          <wbr />
        </Fragment>
      ))}
    </span>
  );
}
