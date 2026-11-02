import type { Size } from "./size";

export const fieldSizeStyles = {
  xs: "[--field-h:1.75rem] [--field-px:0.5rem] [--field-inset:0.125rem] [--field-radius:var(--radius-sm)] [--field-text:0.75rem] [--field-icon:0.875rem]",
  sm: "[--field-h:2.25rem] [--field-px:0.75rem] [--field-inset:0.1875rem] [--field-radius:var(--radius-md)] [--field-text:0.875rem] [--field-icon:1rem]",
  md: "[--field-h:2.75rem] [--field-px:0.875rem] [--field-inset:0.25rem] [--field-radius:var(--radius-lg)] [--field-text:0.875rem] [--field-icon:1rem]",
  lg: "[--field-h:3rem] [--field-px:0.875rem] [--field-inset:0.25rem] [--field-radius:var(--radius-lg)] [--field-text:0.875rem] [--field-icon:1rem]",
  xl: "[--field-h:3.5rem] [--field-px:1rem] [--field-inset:0.3125rem] [--field-radius:var(--radius-xl)] [--field-text:1rem] [--field-icon:1.25rem]",
} satisfies Record<Size, string>;

export const fieldHeight = "min-h-[var(--field-h,3rem)]";
export const fieldInnerHeight = "min-h-[calc(var(--field-h,3rem)-0.25rem)]";
export const fieldPaddingX = "px-[var(--field-px,0.875rem)]";
export const fieldRadius = "rounded-[var(--field-radius,var(--radius-lg))]";
export const fieldText =
  "text-base sm:text-[length:var(--field-text,0.875rem)] sm:[line-height:var(--tw-leading,1.25rem)]";
export const fieldIcon =
  "[&_svg:not([class*='size-'])]:size-[var(--field-icon,1rem)]";

export const fieldLabelStyles =
  "text-sm font-medium text-foreground [overflow-wrap:anywhere]";
export const fieldDescriptionStyles =
  "text-xs leading-5 text-muted-foreground [overflow-wrap:anywhere]";
export const fieldErrorStyles =
  "text-xs leading-5 text-destructive [overflow-wrap:anywhere] transition-[opacity,translate] duration-200 ease-out-quint starting:opacity-0 motion-safe:starting:-translate-y-1";

export const choiceCardStyles =
  "min-h-12 rounded-lg bg-card px-3.5 py-2.5 shadow-[var(--shadow-card)] inset-ring-1 inset-ring-border outline-offset-4 outline-transparent transition-[background-color,box-shadow,outline-color,outline-offset] duration-150 ease-out-quint has-[[data-hovered]]:bg-[color-mix(in_oklab,var(--muted)_60%,var(--card))] has-[[data-focus-visible]]:outline-2 has-[[data-focus-visible]]:outline-offset-2 has-[[data-focus-visible]]:outline-ring motion-reduce:outline-offset-2 selected:inset-ring-2 selected:inset-ring-[color-mix(in_oklab,var(--primary)_60%,var(--card))] invalid:inset-ring-destructive/60 invalid:selected:inset-ring-destructive disabled:has-[[data-hovered]]:bg-card forced-colors:border forced-colors:selected:border-2 forced-colors:selected:border-[Highlight] forced-colors:selected:px-[calc(--spacing(3.5)-1px)] forced-colors:selected:py-[calc(--spacing(2.5)-1px)]";

export const fieldInputStyles = `${fieldHeight} ${fieldRadius} ${fieldText} w-full cursor-text border border-input bg-card text-foreground shadow-[var(--shadow-card)] outline-none transition-[color,background-color,border-color,box-shadow] duration-150 ease-out-quint placeholder:text-muted-foreground/80 hover:border-primary/45 focus:border-ring focus:ring-1 focus:ring-ring invalid:border-destructive invalid:hover:border-destructive invalid:focus:border-destructive invalid:focus:ring-destructive [&[readonly]]:bg-muted/40 [&[readonly]]:hover:border-input disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60 disabled:hover:border-input`;

export const segmentedFieldStyles = `${fieldHeight} ${fieldRadius} flex min-w-0 items-center border border-input bg-card shadow-[var(--shadow-card)] transition-[color,background-color,border-color,box-shadow] duration-150 ease-out-quint hover:border-primary/45 focus-within:border-ring focus-within:hover:border-ring focus-within:ring-1 focus-within:ring-ring group-invalid:border-destructive group-invalid:hover:border-destructive group-invalid:focus-within:border-destructive group-invalid:focus-within:hover:border-destructive group-invalid:focus-within:ring-destructive group-data-[readonly]:bg-muted/40 group-data-[readonly]:hover:border-input group-disabled:bg-muted group-disabled:opacity-60 group-disabled:hover:border-input`;

export const fieldTriggerStyles = `${fieldIcon} group/trigger grid size-[calc(var(--field-h,3rem)-2px-2*var(--field-inset,0.25rem))] shrink-0 cursor-pointer place-items-center rounded-[max(0.1875rem,calc(var(--field-radius,var(--radius-lg))-1px-var(--field-inset,0.25rem)))] text-muted-foreground outline-none transition-[color,background-color,scale,opacity] duration-150 ease-out-quint hover:bg-muted hover:text-foreground pressed:bg-muted pressed:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground motion-safe:pressed:scale-[0.92] focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-muted-foreground`;

export const fieldActionStyles =
  "h-[calc(var(--field-h,3rem)-2px-2*var(--field-inset,0.25rem))] rounded-[max(0.1875rem,calc(var(--field-radius,var(--radius-lg))-1px-var(--field-inset,0.25rem)))] px-3 text-[length:var(--field-text,0.875rem)] motion-safe:pressed:scale-[0.96] [&_svg:not([class*='size-'])]:size-[var(--field-icon,1rem)]";

export const fieldTriggerEndStyles =
  "absolute inset-y-0 end-[calc(1px+var(--field-inset,0.25rem))] my-auto";

export const fieldTriggerInputPadding =
  "pe-[calc(var(--field-h,3rem)+0.25rem)]";

export const fieldChevronStyles =
  "grid place-items-center transition-[rotate] duration-350 ease-spring group-aria-expanded/trigger:rotate-180 motion-reduce:transition-none";
