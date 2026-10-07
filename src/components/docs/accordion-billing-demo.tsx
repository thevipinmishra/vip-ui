"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionBillingDemo() {
  return (
    <Accordion
      variant="divided"
      allowsMultipleExpanded
      defaultExpandedKeys={["invoices", "plans"]}
      className="w-full max-w-md"
    >
      <AccordionItem id="invoices">
        <AccordionTrigger>Where can I find invoices?</AccordionTrigger>
        <AccordionContent>
          Open Billing in workspace settings. Invoices stay available after a
          plan change.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem id="plans">
        <AccordionTrigger>Can I change plans?</AccordionTrigger>
        <AccordionContent>
          Yes. Choose a plan in Billing. The new price starts on your next
          renewal, and you can switch again later.
        </AccordionContent>
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
