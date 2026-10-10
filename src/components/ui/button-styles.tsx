import { tv, type VariantProps } from "tailwind-variants";

export const buttonStyles = tv({
  base: "inline-flex shrink-0 cursor-default items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium tracking-[-0.01em] transition-[color,background-color,border-color,box-shadow,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] disabled:cursor-default disabled:opacity-50 disabled:shadow-none focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring [&_svg]:pointer-events-none [&_svg]:shrink-0",
  variants: {
    variant: {
      default:
        "bg-primary text-primary-foreground shadow-[var(--shadow-card)] hover:bg-primary/90 pressed:bg-primary/90",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-border/70 pressed:bg-border/70",
      outline:
        "border border-border bg-card text-foreground shadow-[var(--shadow-card)] hover:bg-muted pressed:bg-muted",
      ghost:
        "text-foreground hover:bg-muted pressed:bg-muted aria-[pressed=true]:bg-accent aria-[pressed=true]:text-accent-foreground aria-[pressed=true]:hover:bg-accent",
      minimal:
        "text-muted-foreground hover:bg-muted hover:text-foreground pressed:bg-muted pressed:text-foreground",
      destructive:
        "bg-destructive text-background shadow-[var(--shadow-card)] hover:bg-destructive/90 pressed:bg-destructive/90",
    },
    size: {
      default: "h-11 px-5 text-sm",
      sm: "h-9 px-3.5 text-sm",
      lg: "h-12 px-6 text-sm",
      icon: "size-11 cursor-pointer p-0",
    },
  },
  defaultVariants: { variant: "default", size: "default" },
});

export const buttonLinkStyles = tv({
  extend: buttonStyles,
  base: "cursor-pointer",
});

export type ButtonVariant = NonNullable<
  VariantProps<typeof buttonStyles>["variant"]
>;
export type ButtonSize = NonNullable<VariantProps<typeof buttonStyles>["size"]>;
