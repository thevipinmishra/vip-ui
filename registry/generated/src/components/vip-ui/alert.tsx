import {
  CheckCircleIcon,
  InfoIcon,
  WarningIcon,
  XCircleIcon,
  XIcon,
} from "@phosphor-icons/react/ssr";
import type { HTMLAttributes, ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "./utils";
import { Button } from "./button";

const alertStyles = tv({
  base: "group/alert flex min-w-0 items-start gap-2.5 rounded-xl px-4 py-3 shadow-[var(--shadow-card)] ring-1 ring-inset forced-colors:border",
  variants: {
    variant: {
      info: "bg-accent text-accent-foreground ring-primary/12",
      success: "bg-success-subtle text-success-foreground ring-success/20",
      warning: "bg-warning-subtle text-warning-foreground ring-warning/25",
      error:
        "bg-[color-mix(in_oklab,var(--destructive)_9%,var(--card))] text-foreground ring-destructive/25",
      neutral: "bg-card text-card-foreground ring-border",
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
  action?: ReactNode;
  onDismiss?: () => void;
  dismissLabel?: string;
  children?: ReactNode;
}

export function Alert({
  title,
  variant = "info",
  action,
  onDismiss,
  dismissLabel = "Dismiss",
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
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-4 gap-y-2.5">
            <div className="min-w-0 flex-[1_1_12rem]">
              <AlertTitle>{title}</AlertTitle>
              {children != null && children !== false && (
                <AlertDescription>{children}</AlertDescription>
              )}
            </div>
            {action && <AlertAction>{action}</AlertAction>}
          </div>
        </>
      ) : (
        children
      )}
      {onDismiss && <AlertDismiss label={dismissLabel} onDismiss={onDismiss} />}
    </div>
  );
}

export function AlertAction({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      data-slot="alert-action"
      className={cn("flex shrink-0 flex-wrap gap-2", className)}
    />
  );
}

export function AlertDismiss({
  label = "Dismiss",
  onDismiss,
  className,
}: {
  label?: string;
  onDismiss: () => void;
  className?: string;
}) {
  return (
    <Button
      variant="ghost"
      iconOnly
      size="sm"
      aria-label={label}
      onPress={onDismiss}
      data-slot="alert-dismiss"
      className={cn(
        "-my-2 -me-2 shrink-0 text-current/70 hover:bg-current/8 hover:text-current pressed:bg-current/12",
        className,
      )}
    >
      <XIcon aria-hidden="true" />
    </Button>
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
      className={cn("grid size-5 shrink-0 place-items-center", className)}
    >
      {children ?? (
        <>
          <InfoIcon
            size={20}
            className="hidden group-data-[variant=info]/alert:block group-data-[variant=neutral]/alert:block group-data-[variant=neutral]/alert:text-muted-foreground"
          />
          <CheckCircleIcon
            size={20}
            className="hidden group-data-[variant=success]/alert:block group-data-[variant=success]/alert:text-success"
          />
          <WarningIcon
            size={20}
            className="hidden group-data-[variant=warning]/alert:block group-data-[variant=warning]/alert:text-warning"
          />
          <XCircleIcon
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
      className={cn(
        "text-sm font-semibold tracking-[-0.015em] [overflow-wrap:anywhere]",
        className,
      )}
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
      className={cn(
        "mt-0.5 text-sm leading-6 [overflow-wrap:anywhere]",
        className,
      )}
    />
  );
}
