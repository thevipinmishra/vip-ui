"use client";

import {
  Disclosure,
  DisclosureHeader,
  DisclosurePanel,
} from "@/components/ui/disclosure";

export function DisclosureDisabledDemo() {
  return (
    <div className="w-full max-w-md">
      <Disclosure isDisabled>
        <DisclosureHeader>Audit log</DisclosureHeader>
        <DisclosurePanel>
          The audit log is available on the Enterprise plan.
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
}
