import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonBasicDemo() {
  return (
    <output className="flex w-full max-w-xs items-center gap-3">
      <span className="sr-only">Loading profile</span>
      <Skeleton className="size-10 shrink-0 rounded-full" />
      <div className="grid flex-1 gap-2">
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </output>
  );
}
