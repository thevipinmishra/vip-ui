"use client";

import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { Link } from "@/components/ui/link";

export function LinkExternalDemo() {
  return (
    <Link
      href="https://react-aria.adobe.com/Link"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-sm"
    >
      React Aria Link
      <ArrowUpRightIcon size={14} aria-hidden="true" />
      <span className="sr-only">(opens in a new tab)</span>
    </Link>
  );
}
