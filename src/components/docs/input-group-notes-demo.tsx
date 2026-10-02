"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupTextArea,
} from "@/components/ui/input-group";
import {
  TextArea,
  TextAreaDescription,
  TextAreaError,
  TextAreaLabel,
} from "@/components/ui/text-area";

export function InputGroupNotesDemo() {
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState("");

  return (
    <div className="grid w-full max-w-md gap-3">
      <TextArea name="note" value={note} onChange={setNote} maxLength={280}>
        <TextAreaLabel>Meeting note</TextAreaLabel>
        <InputGroup>
          <InputGroupTextArea rows={3} placeholder="What did you decide?" />
          <InputGroupAddon align="block-end">
            <span className="me-auto text-xs">{note.length}/280</span>
            <Button
              variant="secondary"
              isDisabled={!note.trim()}
              onPress={() => setSaved(note.trim())}
            >
              Save note
            </Button>
          </InputGroupAddon>
        </InputGroup>
        <TextAreaDescription>
          Keep the decision in one place.
        </TextAreaDescription>
        <TextAreaError />
      </TextArea>
      {saved && (
        <output className="text-sm text-muted-foreground">
          Saved: {saved}
        </output>
      )}
    </div>
  );
}
