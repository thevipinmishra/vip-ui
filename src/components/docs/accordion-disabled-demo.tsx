"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionDisabledDemo() {
  return (
    <Accordion className="w-full max-w-md">
      <AccordionItem id="available">
        <AccordionTrigger>Where can I find invoices?</AccordionTrigger>
        <AccordionContent>
          Open Billing in workspace settings to see your invoices.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem id="unavailable" isDisabled>
        <AccordionTrigger>Can I download a tax receipt?</AccordionTrigger>
        <AccordionContent>
          Tax receipts are not available for this workspace.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
