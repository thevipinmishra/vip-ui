"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TypingIndicator } from "@/components/ui/typing-indicator";

export function TypingIndicatorDemo() {
  const [typing, setTyping] = useState(true);
  return (
    <div className="grid justify-items-start gap-4">
      {typing ? (
        <TypingIndicator label="Maya is typing" />
      ) : (
        <p className="text-sm text-muted-foreground">Maya stopped typing.</p>
      )}
      <Button
        variant="secondary"
        size="sm"
        onPress={() => setTyping((value) => !value)}
      >
        {typing ? "Stop typing" : "Start typing"}
      </Button>
    </div>
  );
}
