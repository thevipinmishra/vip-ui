import { Children, type HTMLAttributes, type ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

const badgeStyles = tv({
  base: "inline-flex min-h-6 w-fit min-w-0 max-w-full shrink-0 items-center gap-1.5 overflow-hidden whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium leading-4 tracking-normal shadow-(--shadow-card) ring-1 forced-colors:border [&_svg]:pointer-events-none [&_svg]:shrink-0",
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

function badgeLabel(children: ReactNode): ReactNode {
  const parts: ReactNode[] = [];
  let text = "";
  const flush = () => {
    if (text.trim()) {
      parts.push(
        <span
          key={`label-${parts.length}`}
          data-slot="badge-label"
          className="min-w-0 truncate"
        >
          {text}
        </span>,
      );
    }
    text = "";
  };
  for (const child of Children.toArray(children)) {
    if (typeof child === "string" || typeof child === "number") {
      text += child;
    } else {
      flush();
      parts.push(child);
    }
  }
  flush();
  return parts;
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
      {badgeLabel(children)}
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
      className={cn(
        "size-1.5 shrink-0 rounded-full bg-current forced-colors:bg-[CanvasText]",
        className,
      )}
    />
  );
}
