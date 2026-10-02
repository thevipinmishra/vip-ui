"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionDividedDemo() {
  return (
    <Accordion variant="divided" className="w-full max-w-md">
      <AccordionItem id="access">
        <AccordionTrigger>Who can view this project?</AccordionTrigger>
        <AccordionContent>
          Only invited members can view a private project. Open project settings
          to see everyone with access, change their roles, or remove someone who
          no longer needs to be here.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem id="history">
        <AccordionTrigger>Can I restore an earlier version?</AccordionTrigger>
        <AccordionContent>
          Yes. Open the project history, select a saved version, and review its
          changes before restoring it. Your current version stays in the history
          so you can return to it later.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
