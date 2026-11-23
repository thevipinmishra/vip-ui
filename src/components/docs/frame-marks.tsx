import { cn } from "@/lib/utils";

/** A small "+" registration mark, centered on the point it is placed at. */
export function Crosshair({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 11 11"
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute size-2.75 -translate-1/2 text-foreground/30 rtl:translate-x-1/2",
        className,
      )}
    >
      <path d="M5.5 0v11M0 5.5h11" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

const corners = [
  "top-0 inset-s-0 border-t border-s rounded-ss-[3px]",
  "top-0 inset-e-0 border-t border-e rounded-se-[3px]",
  "bottom-0 inset-s-0 border-b border-s rounded-es-[3px]",
  "bottom-0 inset-e-0 border-b border-e rounded-ee-[3px]",
];

/** Four viewfinder brackets that sit inside the corners of a relative box. */
export function CornerBrackets({
  className,
  inset = "inset-3",
}: {
  className?: string;
  inset?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn("pointer-events-none absolute", inset, className)}
    >
      {corners.map((corner) => (
        <span
          key={corner}
          className={cn("absolute size-2.5 border-foreground/25", corner)}
        />
      ))}
    </span>
  );
}
