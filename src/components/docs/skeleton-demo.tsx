import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonDemo() {
  return (
    <output className="block w-full max-w-sm rounded-xl bg-card p-6 ring-1 ring-border/70">
      <span className="sr-only">Loading project details</span>
      <div className="flex items-center gap-3">
        <Skeleton className="size-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-2/3" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
      <Skeleton className="mt-6 h-3 w-full" />
      <Skeleton className="mt-2 h-3 w-4/5" />
    </output>
  );
}
