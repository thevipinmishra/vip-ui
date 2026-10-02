import type { HTMLAttributes } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

const badgeStyles = tv({
  base: "inline-flex min-h-7 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium leading-4 tracking-normal shadow-[var(--shadow-card)] ring-1",
  variants: {
    variant: {
      neutral: "bg-secondary text-secondary-foreground ring-border",
      accent: "bg-accent text-accent-foreground ring-primary/15",
      success: "bg-success-subtle text-success-foreground ring-success/15",
      warning: "bg-warning-subtle text-warning-foreground ring-warning/20",
      error: "bg-card text-destructive ring-destructive/25",
      outline: "bg-transparent text-foreground ring-border",
    },
  },
  defaultVariants: { variant: "neutral" },
});

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: NonNullable<VariantProps<typeof badgeStyles>["variant"]>;
  dot?: boolean;
}

export function Badge({
  variant = "neutral",
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      data-slot="badge"
      data-variant={variant}
      className={badgeStyles({ variant, className })}
      {...props}
    >
      {dot && <BadgeDot />}
      {children}
    </span>
  );
}

export function BadgeDot({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      aria-hidden="true"
      {...props}
      data-slot="badge-dot"
      className={cn("size-1.5 rounded-full bg-current", className)}
    />
  );
}
