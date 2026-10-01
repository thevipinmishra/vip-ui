"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionDemo() {
  return (
    <Accordion className="w-full max-w-md">
      <AccordionItem id="invite">
        <AccordionTrigger>How do I invite teammates?</AccordionTrigger>
        <AccordionContent>
          Open project settings, choose Members, then send an invitation by
          email.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem id="privacy">
        <AccordionTrigger>Can I keep a project private?</AccordionTrigger>
        <AccordionContent>
          Yes. New projects are private until you change access in settings.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem id="export">
        <AccordionTrigger>Can I export my work?</AccordionTrigger>
        <AccordionContent>
          Use Export in project settings to download your project data.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
