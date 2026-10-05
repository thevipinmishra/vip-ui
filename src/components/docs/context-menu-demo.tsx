"use client";

import { useState } from "react";
import { FilePdf } from "reicon-react";
import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

export function ContextMenuDemo() {
  const [name, setName] = useState("brief.pdf");
  const [message, setMessage] = useState(
    "Right-click, long-press, or press Shift+F10 on the file.",
  );

  return (
    <div className="flex w-full max-w-sm flex-col items-start gap-3">
      <ContextMenuTrigger>
        <Button
          variant="outline"
          onPress={() => setMessage(`${name} selected.`)}
        >
          <FilePdf size={18} aria-hidden="true" /> {name}
        </Button>
        <ContextMenu aria-label={`Actions for ${name}`}>
          <ContextMenuItem
            onAction={() => {
              setName("brief-final.pdf");
              setMessage("File renamed.");
            }}
          >
            Rename to brief-final.pdf
          </ContextMenuItem>
          <ContextMenuItem
            onAction={async () => {
              try {
                await navigator.clipboard.writeText(name);
                setMessage(`${name} copied.`);
              } catch {
                setMessage("Could not copy the filename.");
              }
            }}
          >
            Copy filename
          </ContextMenuItem>
        </ContextMenu>
      </ContextMenuTrigger>
      <output className="text-sm text-muted-foreground">{message}</output>
    </div>
  );
}
