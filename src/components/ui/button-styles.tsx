import { Children, type ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

export function buttonLabel(children: ReactNode): ReactNode {
  const parts: ReactNode[] = [];
  let text = "";
  const flush = () => {
    if (text.trim()) {
      parts.push(
        <span
          key={`label-${parts.length}`}
          data-slot="button-label"
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

export const touchTarget =
  "relative pointer-coarse:after:absolute pointer-coarse:after:inset-x-0 pointer-coarse:after:top-1/2 pointer-coarse:after:h-[max(100%,var(--touch-target,2.75rem))] pointer-coarse:after:-translate-y-1/2";

export const buttonStyles = tv({
  base: "inline-flex min-w-0 max-w-full shrink-0 cursor-default items-center justify-center whitespace-nowrap rounded-md font-medium tracking-[-0.01em] outline-offset-4 outline-transparent transition-[color,background-color,border-color,box-shadow,scale,outline-color,outline-offset] duration-150 ease-out-quint disabled:cursor-default disabled:opacity-50 disabled:shadow-none pending:cursor-default pending:opacity-50 pending:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:outline-offset-2 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  variants: {
    variant: {
      default:
        "bg-primary text-primary-foreground shadow-[var(--shadow-card)] hover:bg-primary/90 pressed:bg-primary/90",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-border/70 pressed:bg-border/70",
      outline:
        "border border-border bg-card text-foreground shadow-[var(--shadow-card)] hover:bg-muted pressed:bg-muted",
      ghost:
        "text-foreground hover:bg-muted in-data-[item-highlight=under]:hover:bg-transparent pressed:bg-muted aria-[pressed=true]:bg-accent aria-[pressed=true]:text-accent-foreground aria-[pressed=true]:hover:bg-accent",
      minimal:
        "text-muted-foreground hover:bg-muted in-data-[item-highlight=under]:hover:bg-transparent hover:text-foreground pressed:bg-muted pressed:text-foreground",
      destructive:
        "bg-destructive text-background shadow-[var(--shadow-card)] hover:bg-destructive/90 pressed:bg-destructive/90",
    },
    size: {
      xs: `h-7 gap-1.5 rounded-sm px-2.5 text-xs [&_svg:not([class*='size-'])]:size-3.5 ${touchTarget}`,
      sm: `h-9 gap-2 px-3.5 text-sm [&_svg:not([class*='size-'])]:size-4 ${touchTarget}`,
      md: "h-11 gap-2 px-5 text-sm [&_svg:not([class*='size-'])]:size-4",
      lg: "h-12 gap-2 px-6 text-sm [&_svg:not([class*='size-'])]:size-4",
      xl: "h-14 gap-2.5 rounded-lg px-7 text-base [&_svg:not([class*='size-'])]:size-5",
    },
    iconOnly: {
      true: "cursor-pointer px-0",
    },
  },
  compoundVariants: [
    { size: "xs", iconOnly: true, class: "w-7" },
    { size: "sm", iconOnly: true, class: "w-9" },
    {
      size: "md",
      iconOnly: true,
      class: "w-11 [&_svg:not([class*='size-'])]:size-4.5",
    },
    {
      size: "lg",
      iconOnly: true,
      class: "w-12 [&_svg:not([class*='size-'])]:size-5",
    },
    {
      size: "xl",
      iconOnly: true,
      class: "w-14 [&_svg:not([class*='size-'])]:size-6",
    },
  ],
  defaultVariants: { variant: "default", size: "md" },
});

export const buttonLinkStyles = tv({
  extend: buttonStyles,
  base: "cursor-pointer",
});

export type ButtonVariant = NonNullable<
  VariantProps<typeof buttonStyles>["variant"]
>;
