"use client";

import { PaperclipIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Attachment, AttachmentList } from "@/components/ui/attachment";
import { Button } from "@/components/ui/button";
import { FileTrigger } from "@/components/ui/file-trigger";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextArea,
} from "@/components/ui/prompt-input";

interface Item {
  id: string;
  name: string;
  size: number;
  status: "uploading" | "complete";
}

export function PromptInputAttachmentsDemo() {
  const [items, setItems] = useState<Item[]>([
    { id: "brief", name: "Q3-brief.pdf", size: 284672, status: "complete" },
  ]);

  const addFiles = (files: File[]) => {
    const added = files.map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      status: "uploading" as const,
    }));
    setItems((current) => [...current, ...added]);
    window.setTimeout(() => {
      setItems((current) =>
        current.map((item) =>
          added.some((entry) => entry.id === item.id)
            ? { ...item, status: "complete" }
            : item,
        ),
      );
    }, 900);
  };

  return (
    <PromptInput
      label="Message"
      onFilesDropped={addFiles}
      onSubmit={() => setItems([])}
      className="max-w-md"
    >
      {items.length > 0 && (
        <AttachmentList className="px-3 pt-3">
          {items.map((item) => (
            <Attachment
              key={item.id}
              name={item.name}
              fileSize={item.size}
              status={item.status}
              onRemove={() =>
                setItems((current) =>
                  current.filter((entry) => entry.id !== item.id),
                )
              }
            />
          ))}
        </AttachmentList>
      )}
      <PromptInputTextArea placeholder="Ask about these files" />
      <PromptInputFooter>
        <FileTrigger
          allowsMultiple
          onSelect={(files) => addFiles(Array.from(files ?? []))}
        >
          <Button
            type="button"
            variant="ghost"
            size="sm"
            iconOnly
            aria-label="Attach files"
          >
            <PaperclipIcon aria-hidden="true" />
          </Button>
        </FileTrigger>
        <PromptInputSubmit className="ms-auto" />
      </PromptInputFooter>
    </PromptInput>
  );
}
