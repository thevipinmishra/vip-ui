import { Skeleton } from "../../../components/vip-ui/skeleton";

export default function Loading() {
  return (
    <output aria-label="Loading repository data" className="block space-y-6">
      <div className="space-y-3">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-10 w-60 max-w-full" />
        <Skeleton className="h-4 w-80 max-w-full" />
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {[1, 2, 3].map((n) => (
          <Skeleton key={n} className="h-36" />
        ))}
      </div>
      <Skeleton className="h-72" />
      <span className="sr-only">Loading repository data</span>
    </output>
  );
}
