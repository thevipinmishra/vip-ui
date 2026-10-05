"use client";

import { useState } from "react";
import {
  TextArea,
  TextAreaError,
  TextAreaInput,
  TextAreaLabel,
} from "@/components/ui/text-area";

export function TextAreaDemo() {
  const [message, setMessage] = useState("Short");

  return (
    <div className="grid w-full max-w-md gap-5">
      <TextArea
        value={message}
        onChange={setMessage}
        isInvalid={message.trim().length < 10}
      >
        <TextAreaLabel>Message</TextAreaLabel>
        <TextAreaInput rows={3} />
        <TextAreaError>Enter at least 10 characters.</TextAreaError>
      </TextArea>
      <TextArea
        label="Saved note"
        defaultValue="This note can be copied."
        isReadOnly
        rows={2}
      />
      <TextArea
        label="Closed comments"
        defaultValue="Comments are closed."
        isDisabled
        rows={2}
      />
    </div>
  );
}
