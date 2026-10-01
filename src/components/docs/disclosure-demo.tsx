"use client";

import {
  Disclosure,
  DisclosureHeader,
  DisclosurePanel,
} from "@/components/ui/disclosure";

export function DisclosureDemo() {
  return (
    <div className="w-full max-w-md">
      <Disclosure>
        <DisclosureHeader>What is included?</DisclosureHeader>
        <DisclosurePanel>
          Every plan includes project history and team access. You can change
          plans at any time.
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
}
