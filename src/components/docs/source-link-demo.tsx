"use client";

import { SourceLink } from "@/components/ui/source-link";

export function SourceLinkDemo() {
  return (
    <SourceLink
      className="w-full max-w-sm"
      href="https://react-aria.adobe.com/Disclosure"
      index={1}
      label="Disclosure"
      source="React Aria documentation"
      description="Expansion state and keyboard behavior"
    />
  );
}
