"use client";

import { Form as AriaForm, type FormProps } from "react-aria-components";
import { cn } from "@/lib/utils";

export function Form({
  className,
  ...props
}: FormProps & React.RefAttributes<HTMLFormElement>) {
  return (
    <AriaForm
      {...props}
      data-slot="form"
      className={cn("grid gap-5", className)}
    />
  );
}
