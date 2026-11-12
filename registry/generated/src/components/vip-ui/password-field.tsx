"use client";

import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { cn } from "./utils";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./input-group";
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
  const [pointerReveal, setPointerReveal] = useState(false);
  const iconTransition =
    pointerReveal &&
    "transition-[opacity,scale] duration-150 ease-out-quint motion-reduce:duration-0";

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
          <InputGroupButton
            type="button"
            iconOnly
            isDisabled={isDisabled}
            aria-label={visible ? "Hide password" : "Show password"}
            aria-pressed={visible}
            onPress={(event) => {
              setPointerReveal(
                event.pointerType === "mouse" ||
                  event.pointerType === "touch" ||
                  event.pointerType === "pen",
              );
              setVisible((current) => !current);
            }}
          >
            <span
              className="relative grid size-5 place-items-center"
              aria-hidden="true"
            >
              <span
                className={cn(
                  "col-start-1 row-start-1",
                  visible ? "opacity-0 scale-90" : "opacity-100 scale-100",
                  iconTransition,
                )}
              >
                <EyeIcon />
              </span>
              <span
                className={cn(
                  "col-start-1 row-start-1",
                  visible ? "opacity-100 scale-100" : "opacity-0 scale-90",
                  iconTransition,
                )}
              >
                <EyeSlashIcon />
              </span>
            </span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      {description && (
        <TextFieldDescription>{description}</TextFieldDescription>
      )}
      <TextFieldError />
    </TextField>
  );
}
