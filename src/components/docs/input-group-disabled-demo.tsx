"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { TextField, TextFieldLabel } from "@/components/ui/text-field";

export function InputGroupDisabledDemo() {
  return (
    <TextField
      defaultValue="billing@example.com"
      isDisabled
      className="w-full max-w-sm"
    >
      <TextFieldLabel>Billing email</TextFieldLabel>
      <InputGroup>
        <InputGroupInput type="email" />
        <InputGroupAddon>Locked</InputGroupAddon>
      </InputGroup>
    </TextField>
  );
}
