"use client";

import { useState } from "react";
import {
  TextField,
  TextFieldError,
  TextFieldInput,
  TextFieldLabel,
} from "@/components/ui/text-field";

export function TextFieldInvalidDemo() {
  const [email, setEmail] = useState("maya@");
  const isInvalid = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <TextField
      value={email}
      onChange={setEmail}
      isInvalid={isInvalid}
      type="email"
      className="w-full max-w-sm"
    >
      <TextFieldLabel>Email address</TextFieldLabel>
      <TextFieldInput />
      <TextFieldError>Enter a valid email address.</TextFieldError>
    </TextField>
  );
}
