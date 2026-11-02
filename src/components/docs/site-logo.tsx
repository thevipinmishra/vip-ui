import { cn } from "@/lib/utils";

function SiteMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
      className={cn("size-8 shrink-0", className)}
    >
      <path d="M7.71 32H7a7 7 0 0 1-7-7V7a7 7 0 0 1 7-7h13.51z" />
      <path
        d="M24.29 0H25a7 7 0 0 1 7 7v18a7 7 0 0 1-7 7H11.49z"
        fillOpacity={0.5}
      />
    </svg>
  );
}

export function SiteLogo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-semibold tracking-[-0.055em] text-foreground",
        className,
      )}
    >
      <SiteMark />
      <span className="text-[19px]">
        vip<span className="text-muted-foreground">/</span>ui
      </span>
    </span>
  );
}
