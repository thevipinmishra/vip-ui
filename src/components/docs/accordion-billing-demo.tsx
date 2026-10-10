"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionBillingDemo() {
  return (
    <Accordion variant="divided" className="w-full max-w-md">
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
          renewal.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem id="cancel">
        <AccordionTrigger>How do I cancel?</AccordionTrigger>
        <AccordionContent>
          Choose Cancel plan in Billing. Your workspace stays active until the
          end of the period.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
