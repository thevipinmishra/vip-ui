"use client";

import { EnvelopeSimpleIcon } from "@phosphor-icons/react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { TextField, TextFieldLabel } from "@/components/ui/text-field";

export function InputGroupIconDemo() {
  return (
    <TextField name="email" type="email" className="w-full max-w-sm">
      <TextFieldLabel>Email address</TextFieldLabel>
      <InputGroup>
        <InputGroupAddon>
          <EnvelopeSimpleIcon size={17} aria-hidden="true" />
        </InputGroupAddon>
        <InputGroupInput placeholder="maya@example.com" />
      </InputGroup>
    </TextField>
  );
}
