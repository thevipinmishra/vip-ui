import type { HTMLAttributes, ReactNode } from "react";
import { CheckCircle, CloseCircle, InfoCircle, Warning } from "reicon-react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "./utils";

const alertStyles = tv({
  base: "group/alert flex gap-3 rounded-xl p-4 shadow-[var(--shadow-card)] ring-1 sm:p-5",
  variants: {
    variant: {
      info: "bg-accent text-accent-foreground ring-primary/15",
      success: "bg-success-subtle text-success-foreground ring-success/15",
      warning: "bg-warning-subtle text-warning-foreground ring-warning/20",
      error: "bg-destructive/10 text-foreground ring-destructive/20",
      neutral: "bg-card text-card-foreground ring-border/70",
    },
  },
  defaultVariants: { variant: "info" },
});

export type AlertVariant = NonNullable<
  VariantProps<typeof alertStyles>["variant"]
>;

export interface AlertProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: string;
  variant?: AlertVariant;
  children?: ReactNode;
}

export function Alert({
  title,
  variant = "info",
  className,
  children,
  ...props
}: AlertProps) {
  return (
    <div
      data-slot="alert"
      data-variant={variant}
      className={alertStyles({ variant, className })}
      {...props}
    >
      {title ? (
        <>
          <AlertIcon />
          <div className="min-w-0">
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{children}</AlertDescription>
          </div>
        </>
      ) : (
        children
      )}
    </div>
  );
}

export function AlertIcon({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...props}
      aria-hidden="true"
      data-slot="alert-icon"
      className={cn(
        "mt-0.5 grid size-6 shrink-0 place-items-center",
        className,
      )}
    >
      {children ?? (
        <>
          <InfoCircle
            size={20}
            className="hidden group-data-[variant=info]/alert:block group-data-[variant=neutral]/alert:block group-data-[variant=neutral]/alert:text-muted-foreground"
          />
          <CheckCircle
            size={20}
            className="hidden group-data-[variant=success]/alert:block"
          />
          <Warning
            size={20}
            className="hidden group-data-[variant=warning]/alert:block"
          />
          <CloseCircle
            size={20}
            className="hidden group-data-[variant=error]/alert:block group-data-[variant=error]/alert:text-destructive"
          />
        </>
      )}
    </span>
  );
}

export function AlertTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      {...props}
      data-slot="alert-title"
      className={cn("text-sm font-semibold tracking-[-0.015em]", className)}
    />
  );
}

export function AlertDescription({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      data-slot="alert-description"
      className={cn("mt-1 text-sm leading-6", className)}
    />
  );
}
