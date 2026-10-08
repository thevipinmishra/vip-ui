// Shared field styles keep standalone inputs and segmented date/time controls in sync.
export const fieldLabelStyles = "text-sm font-medium text-foreground";
export const fieldDescriptionStyles = "text-xs leading-5 text-muted-foreground";
export const fieldErrorStyles = "text-xs leading-5 text-destructive";

export const fieldInputStyles =
  "min-h-12 w-full cursor-text rounded-lg border border-input bg-card text-base text-foreground shadow-[var(--shadow-card)] outline-none placeholder:text-muted-foreground/80 hover:border-primary/45 focus:border-ring focus:ring-3 focus:ring-ring/50 invalid:border-destructive invalid:ring-3 invalid:ring-destructive/20 invalid:hover:border-destructive invalid:focus:border-destructive invalid:focus:ring-destructive/30 read-only:bg-muted/40 read-only:hover:border-input disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60 disabled:hover:border-input sm:text-sm";

export const segmentedFieldStyles =
  "flex min-h-12 min-w-0 items-center rounded-lg border border-input bg-card shadow-[var(--shadow-card)] hover:border-primary/45 focus-within:border-ring focus-within:hover:border-ring focus-within:ring-3 focus-within:ring-ring/50 group-invalid:border-destructive group-invalid:hover:border-destructive group-invalid:focus-within:border-destructive group-invalid:focus-within:hover:border-destructive group-invalid:focus-within:ring-destructive/30 group-data-[readonly]:bg-muted/40 group-data-[readonly]:hover:border-input group-disabled:bg-muted group-disabled:opacity-60 group-disabled:hover:border-input";

export const fieldTriggerStyles =
  "grid size-11 shrink-0 cursor-pointer place-items-center rounded-md text-muted-foreground outline-none hover:bg-muted hover:text-foreground pressed:bg-muted pressed:text-foreground focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-ring disabled:cursor-default disabled:opacity-50";
