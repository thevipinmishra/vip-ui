// Shared field styles keep standalone inputs and segmented date/time controls in sync.
export const fieldLabelStyles = "text-sm font-medium text-foreground";
export const fieldDescriptionStyles = "text-xs leading-5 text-muted-foreground";
export const fieldErrorStyles = "text-xs leading-5 text-destructive";

export const fieldInputStyles =
  "min-h-12 w-full cursor-text rounded-lg border border-input bg-card text-base text-foreground shadow-[var(--shadow-card)] outline-none placeholder:text-muted-foreground/80 hover:border-primary/45 motion-safe:transition-[border-color,box-shadow] motion-safe:duration-150 data-[focus-visible]:border-ring data-[focus-visible]:ring-3 data-[focus-visible]:ring-ring/50 data-[invalid]:border-destructive data-[invalid]:ring-3 data-[invalid]:ring-destructive/20 data-[invalid]:hover:border-destructive data-[invalid]:data-[focus-visible]:border-destructive data-[invalid]:data-[focus-visible]:ring-destructive/30 read-only:bg-muted/40 read-only:hover:border-input data-[disabled]:cursor-not-allowed data-[disabled]:bg-muted data-[disabled]:opacity-60 data-[disabled]:hover:border-input sm:text-sm";

export const segmentedFieldStyles =
  "flex min-h-12 min-w-0 items-center rounded-lg border border-input bg-card shadow-[var(--shadow-card)] hover:border-primary/45 has-[[data-focus-visible]]:border-ring has-[[data-focus-visible]]:ring-3 has-[[data-focus-visible]]:ring-ring/50 group-data-[invalid]:border-destructive group-data-[invalid]:hover:border-destructive group-data-[invalid]:has-[[data-focus-visible]]:border-destructive group-data-[invalid]:has-[[data-focus-visible]]:ring-destructive/30 group-data-[readonly]:bg-muted/40 group-data-[readonly]:hover:border-input group-data-[disabled]:bg-muted group-data-[disabled]:opacity-60 group-data-[disabled]:hover:border-input motion-safe:transition-[border-color,box-shadow] motion-safe:duration-150";
