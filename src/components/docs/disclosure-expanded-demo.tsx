"use client";

import {
  Disclosure,
  DisclosureHeader,
  DisclosurePanel,
} from "@/components/ui/disclosure";

export function DisclosureExpandedDemo() {
  return (
    <div className="w-full max-w-md">
      <Disclosure defaultExpanded>
        <DisclosureHeader>Release notes</DisclosureHeader>
        <DisclosurePanel>
          Version 2.6 adds shared templates and faster exports.
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
}
