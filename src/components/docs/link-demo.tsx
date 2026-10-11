"use client";

import { Link } from "@/components/ui/link";

export function LinkDemo() {
  return (
    <p className="text-sm leading-7">
      Read the <Link href="/components">component catalog</Link> for more
      examples.
    </p>
  );
}
