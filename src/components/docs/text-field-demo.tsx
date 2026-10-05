"use client";

import { useState } from "react";
import {
  TextField,
  TextFieldError,
  TextFieldInput,
  TextFieldLabel,
} from "@/components/ui/text-field";

export function TextFieldDemo() {
  const [email, setEmail] = useState("maya@");
  const isInvalid = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="grid w-full max-w-sm gap-5">
      <TextField
        value={email}
        onChange={setEmail}
        isInvalid={isInvalid}
        type="email"
      >
        <TextFieldLabel>Email address</TextFieldLabel>
        <TextFieldInput />
        <TextFieldError>Enter a valid email address.</TextFieldError>
      </TextField>
      <TextField label="Reference ID" defaultValue="VIP-204" isReadOnly />
      <TextField
        label="Unavailable field"
        defaultValue="Not editable"
        isDisabled
      />
    </div>
  );
}
