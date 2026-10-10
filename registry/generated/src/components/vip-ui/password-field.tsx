"use client";

import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { duration, easeOut } from "./motion";
import { Button } from "./button";
import { fieldTriggerStyles } from "./field-styles";
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
  const [pointerReveal, setPointerReveal] = useState(false);
  const reduceMotion = useReducedMotion();
  const iconTransition = {
    duration: reduceMotion || !pointerReveal ? 0 : duration.fast,
    ease: easeOut,
  };

  return (
    <TextField
      {...props}
      type={visible ? "text" : "password"}
      autoComplete={autoComplete}
      isDisabled={isDisabled}
    >
      <TextFieldLabel>{label}</TextFieldLabel>
      <InputGroup className="pe-1">
        <InputGroupInput placeholder={placeholder} />
        <InputGroupAddon>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={fieldTriggerStyles}
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
              <motion.span
                className="col-start-1 row-start-1"
                initial={false}
                animate={{ opacity: visible ? 0 : 1, scale: visible ? 0.9 : 1 }}
                transition={iconTransition}
              >
                <EyeIcon size={18} />
              </motion.span>
              <motion.span
                className="col-start-1 row-start-1"
                initial={false}
                animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.9 }}
                transition={iconTransition}
              >
                <EyeSlashIcon size={18} />
              </motion.span>
            </span>
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
