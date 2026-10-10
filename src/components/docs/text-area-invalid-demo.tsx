"use client";

import { useState } from "react";
import {
  TextArea,
  TextAreaError,
  TextAreaInput,
  TextAreaLabel,
} from "@/components/ui/text-area";

export function TextAreaInvalidDemo() {
  const [message, setMessage] = useState("Short");

  return (
    <TextArea
      value={message}
      onChange={setMessage}
      isInvalid={message.trim().length < 10}
      className="w-full max-w-md"
    >
      <TextAreaLabel>Message</TextAreaLabel>
      <TextAreaInput rows={3} />
      <TextAreaError>Enter at least 10 characters.</TextAreaError>
    </TextArea>
  );
}
