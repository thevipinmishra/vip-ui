"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionMultipleDemo() {
  return (
    <Accordion
      allowsMultipleExpanded
      defaultExpandedKeys={["brief", "files"]}
      className="w-full max-w-md"
    >
      <AccordionItem id="brief">
        <AccordionTrigger>Project brief</AccordionTrigger>
        <AccordionContent>
          Refresh the homepage and pricing pages before the October launch.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem id="files">
        <AccordionTrigger>Shared files</AccordionTrigger>
        <AccordionContent>
          Final layouts, icons, and the approved copy deck.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem id="contacts">
        <AccordionTrigger>Contacts</AccordionTrigger>
        <AccordionContent>
          Maya Chen owns design. Leo Park owns engineering.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
