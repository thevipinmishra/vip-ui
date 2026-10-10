"use client";

import { useEffect, useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonLoadingDemo() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) return;
    const timer = window.setTimeout(() => setLoading(false), 1500);
    return () => window.clearTimeout(timer);
  }, [isLoading]);

  return (
    <div className="grid w-full max-w-xs justify-items-start gap-4">
      <div className="w-full rounded-xl bg-card p-5 shadow-[var(--shadow-card)] ring-1 ring-border/70">
        {isLoading ? (
          <output className="flex items-center gap-3">
            <span className="sr-only">Loading profile</span>
            <Skeleton className="size-10 shrink-0 rounded-full" />
            <div className="grid flex-1">
              <Skeleton className="my-1 h-3 w-24" />
              <Skeleton className="my-1 h-3 w-32" />
            </div>
          </output>
        ) : (
          <div className="flex items-center gap-3">
            <Avatar name="Amina Shah" />
            <div className="grid min-w-0 flex-1 text-sm leading-5">
              <p className="truncate font-medium">Amina Shah</p>
              <p className="truncate text-muted-foreground">Product designer</p>
            </div>
          </div>
        )}
      </div>
      <Button
        variant="secondary"
        size="sm"
        isDisabled={isLoading}
        onPress={() => setLoading(true)}
      >
        Reload
      </Button>
    </div>
  );
}
