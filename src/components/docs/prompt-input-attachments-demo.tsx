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
  id: number;
  name: string;
  size: number;
  status: "uploading" | "complete";
}

export function PromptInputAttachmentsDemo() {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "Release-checklist.pdf", size: 284672, status: "complete" },
  ]);

  const addFiles = (files: File[]) => {
    const added = files.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      size: file.size,
      status: "uploading" as const,
    }));
    setItems((current) => [...current, ...added]);
    for (const item of added) {
      window.setTimeout(() => {
        setItems((current) =>
          current.map((row) =>
            row.id === item.id ? { ...row, status: "complete" as const } : row,
          ),
        );
      }, 900);
    }
  };

  return (
    <div className="w-full max-w-md">
      <PromptInput
        label="Message"
        onFilesDropped={addFiles}
        onSubmit={() => setItems([])}
      >
        <PromptInputTextArea placeholder="Add a message with your files" />
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
                    current.filter((row) => row.id !== item.id),
                  )
                }
              />
            ))}
          </AttachmentList>
        )}
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
      <p className="mt-3 text-xs leading-5 text-muted-foreground">
        Drop files anywhere on the composer, or use the attach button. Sending
        clears the list.
      </p>
    </div>
  );
}
