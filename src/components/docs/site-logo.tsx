import { cn } from "@/lib/utils";

export function SiteLogo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-semibold tracking-[-0.055em] text-foreground",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="grid size-8 shrink-0 grid-cols-2 gap-0.5 rounded-md bg-primary p-[7px]"
      >
        <span className="rounded-[2px] bg-primary-foreground" />
        <span className="rounded-[2px] bg-primary-foreground/55" />
        <span className="rounded-[2px] bg-primary-foreground/55" />
        <span className="rounded-[2px] bg-primary-foreground" />
      </span>
      <span className="text-[19px]">
        vip<span className="text-primary">/</span>ui
      </span>
    </span>
  );
}
