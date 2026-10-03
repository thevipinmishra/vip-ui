"use client";

import { useState } from "react";
import { Eye, EyeOff } from "reicon-react";
import { Button } from "./button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group";
import {
  TextField,
  TextFieldDescription,
  TextFieldError,
  TextFieldLabel,
  type TextFieldProps,
} from "./text-field";

export interface PasswordFieldProps
  extends Omit<TextFieldProps, "children" | "label" | "type"> {
  label: string;
}

export function PasswordField({
  label,
  description,
  placeholder,
  isDisabled,
  autoComplete = "current-password",
  ...props
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <TextField
      {...props}
      type={visible ? "text" : "password"}
      autoComplete={autoComplete}
      isDisabled={isDisabled}
    >
      <TextFieldLabel>{label}</TextFieldLabel>
      <InputGroup>
        <InputGroupInput placeholder={placeholder} />
        <InputGroupAddon>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            isDisabled={isDisabled}
            aria-label={visible ? "Hide password" : "Show password"}
            aria-pressed={visible}
            onPress={() => setVisible((current) => !current)}
          >
            {visible ? (
              <EyeOff size={18} aria-hidden="true" />
            ) : (
              <Eye size={18} aria-hidden="true" />
            )}
          </Button>
        </InputGroupAddon>
      </InputGroup>
      {description && (
        <TextFieldDescription>{description}</TextFieldDescription>
      )}
      <TextFieldError />
    </TextField>
  );
}
