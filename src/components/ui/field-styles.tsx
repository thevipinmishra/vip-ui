// Shared field styles keep standalone inputs and segmented date/time controls in sync.
export const fieldLabelStyles = "text-sm font-medium text-foreground";
export const fieldDescriptionStyles = "text-xs leading-5 text-muted-foreground";
export const fieldErrorStyles = "text-xs leading-5 text-destructive";

export const fieldInputStyles =
  "min-h-12 w-full cursor-text rounded-lg border border-input bg-card text-base text-foreground shadow-[var(--shadow-card)] outline-none placeholder:text-muted-foreground/80 hover:border-primary/45 motion-safe:transition-[border-color,box-shadow] motion-safe:duration-150 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 invalid:border-destructive invalid:ring-3 invalid:ring-destructive/20 invalid:hover:border-destructive invalid:focus-visible:border-destructive invalid:focus-visible:ring-destructive/30 read-only:bg-muted/40 read-only:hover:border-input disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60 disabled:hover:border-input sm:text-sm";

export const segmentedFieldStyles =
  "flex min-h-12 min-w-0 items-center rounded-lg border border-input bg-card shadow-[var(--shadow-card)] hover:border-primary/45 has-[[data-focus-visible]]:border-ring has-[[data-focus-visible]]:ring-3 has-[[data-focus-visible]]:ring-ring/50 group-invalid:border-destructive group-invalid:hover:border-destructive group-invalid:has-[[data-focus-visible]]:border-destructive group-invalid:has-[[data-focus-visible]]:ring-destructive/30 group-data-[readonly]:bg-muted/40 group-data-[readonly]:hover:border-input group-disabled:bg-muted group-disabled:opacity-60 group-disabled:hover:border-input motion-safe:transition-[border-color,box-shadow] motion-safe:duration-150";
