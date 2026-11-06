"use client";

import {
  FileTrigger as AriaFileTrigger,
  type FileTriggerProps,
  InputContext,
} from "react-aria-components";
import { Button } from "./button";

export function FileTrigger({
  label = "Choose files",
  className,
  children,
  ...props
}: FileTriggerProps & {
  label?: string;
  className?: string;
}) {
  return (
    <InputContext value={null}>
      <AriaFileTrigger {...props}>
        {children ?? (
          <Button
            data-slot="file-trigger-button"
            variant="outline"
            className={className}
          >
            {label}
          </Button>
        )}
      </AriaFileTrigger>
    </InputContext>
  );
}
