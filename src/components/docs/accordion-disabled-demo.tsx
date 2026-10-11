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
      <AccordionItem id="invoices">
        <AccordionTrigger>Where can I find invoices?</AccordionTrigger>
        <AccordionContent>Open Billing in workspace settings.</AccordionContent>
      </AccordionItem>
      <AccordionItem id="receipts" isDisabled>
        <AccordionTrigger>Can I download a tax receipt?</AccordionTrigger>
        <AccordionContent>
          Tax receipts are not available for this workspace.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
