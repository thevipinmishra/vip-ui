"use client";

import {
  Button,
  type ButtonProps,
  composeRenderProps,
} from "react-aria-components";
import { cn } from "./utils";

export function PressButton({ className, ...props }: ButtonProps) {
  return (
    <Button
      data-slot="press-button"
      {...props}
      className={composeRenderProps(className, (className) =>
        cn(
          "transition-[scale] duration-150 ease-out-quint motion-safe:pressed:scale-[0.96]",
          className,
        ),
      )}
    />
  );
}
