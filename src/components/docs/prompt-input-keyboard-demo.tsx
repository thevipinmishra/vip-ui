"use client";

import { useEffect, useState } from "react";
import { Kbd, KbdGroup } from "@/components/ui/kbd-code";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextArea,
} from "@/components/ui/prompt-input";

export function PromptInputKeyboardDemo() {
  const [modifier, setModifier] = useState("Ctrl");

  useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.userAgent)) setModifier("⌘");
  }, []);

  return (
    <PromptInput label="Message" submitKey="mod+enter" className="max-w-md">
      <PromptInputTextArea
        minRows={3}
        placeholder="Describe the change, one step per line"
      />
      <PromptInputFooter>
        <p className="flex items-center gap-1.5 ps-1.5 text-xs text-muted-foreground">
          <KbdGroup>
            <Kbd>{modifier}</Kbd>
            <Kbd>Enter</Kbd>
          </KbdGroup>
          to send
        </p>
        <PromptInputSubmit className="ms-auto" />
      </PromptInputFooter>
    </PromptInput>
  );
}
