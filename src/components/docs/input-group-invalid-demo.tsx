"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  TextField,
  TextFieldError,
  TextFieldLabel,
} from "@/components/ui/text-field";

export function InputGroupInvalidDemo() {
  return (
    <TextField defaultValue="studio" isInvalid className="w-full max-w-sm">
      <TextFieldLabel>Website domain</TextFieldLabel>
      <InputGroup>
        <InputGroupAddon>https://</InputGroupAddon>
        <InputGroupInput />
        <InputGroupAddon>.com</InputGroupAddon>
      </InputGroup>
      <TextFieldError>This domain is already taken.</TextFieldError>
    </TextField>
  );
}
