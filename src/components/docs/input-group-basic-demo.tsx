"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { TextField, TextFieldLabel } from "@/components/ui/text-field";

export function InputGroupBasicDemo() {
  return (
    <TextField name="domain" className="w-full max-w-sm">
      <TextFieldLabel>Website domain</TextFieldLabel>
      <InputGroup>
        <InputGroupAddon>https://</InputGroupAddon>
        <InputGroupInput placeholder="example.com" />
      </InputGroup>
    </TextField>
  );
}
