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
      defaultExpandedKeys={["members", "history"]}
      className="w-full max-w-md"
    >
      <AccordionItem id="members">
        <AccordionTrigger>Who can join a project?</AccordionTrigger>
        <AccordionContent>
          Invite teammates by email from project settings. Members can see the
          project after accepting their invitation.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem id="history">
        <AccordionTrigger>Can I view earlier changes?</AccordionTrigger>
        <AccordionContent>
          Open project history to review saved versions. You can compare changes
          before restoring an earlier version.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
