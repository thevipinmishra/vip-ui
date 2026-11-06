"use client";

import { useEffect, useState } from "react";
import { BorderBeam } from "@/components/ui/border-beam";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextArea,
} from "@/components/ui/prompt-input";

export function BorderBeamPromptDemo() {
  const [isPending, setPending] = useState(false);

  useEffect(() => {
    if (!isPending) return;
    const timer = window.setTimeout(() => setPending(false), 4000);
    return () => window.clearTimeout(timer);
  }, [isPending]);

  return (
    <PromptInput
      className="max-w-md"
      isPending={isPending}
      onSubmit={() => setPending(true)}
      onStop={() => setPending(false)}
      defaultValue="Summarize the launch thread"
    >
      <PromptInputTextArea aria-label="Message" />
      <PromptInputFooter>
        <PromptInputSubmit className="ms-auto" />
      </PromptInputFooter>
      <BorderBeam active={isPending} duration={3} />
    </PromptInput>
  );
}
