"use client";

import { useState } from "react";
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

  return (
    <div className="grid w-full max-w-md gap-3">
      <TextArea name="note" value={note} onChange={setNote} maxLength={280}>
        <TextAreaLabel>Meeting note</TextAreaLabel>
        <InputGroup>
          <InputGroupTextArea rows={3} placeholder="What did you decide?" />
          <InputGroupAddon align="block-end">
            <span className="me-auto text-xs">{note.length}/280</span>
          </InputGroupAddon>
        </InputGroup>
        <TextAreaDescription>
          Keep the decision in one place.
        </TextAreaDescription>
        <TextAreaError />
      </TextArea>
    </div>
  );
}
