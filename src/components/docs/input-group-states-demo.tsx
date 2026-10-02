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

export function InputGroupStatesDemo() {
  return (
    <div className="grid w-full max-w-sm gap-5">
      <TextField defaultValue="wrong@" isInvalid>
        <TextFieldLabel>Contact email</TextFieldLabel>
        <InputGroup>
          <InputGroupInput type="email" />
          <InputGroupAddon>Required</InputGroupAddon>
        </InputGroup>
        <TextFieldError>Enter a valid email address.</TextFieldError>
      </TextField>
      <TextField defaultValue="billing@example.com" isDisabled>
        <TextFieldLabel>Billing email</TextFieldLabel>
        <InputGroup>
          <InputGroupInput type="email" />
          <InputGroupAddon>Locked</InputGroupAddon>
        </InputGroup>
      </TextField>
    </div>
  );
}
