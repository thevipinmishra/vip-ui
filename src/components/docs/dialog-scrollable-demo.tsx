"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const sections = [
  {
    title: "Files",
    details:
      "Check the final layouts, icons, and source files. Confirm that each link opens before handing the project to the next team.",
  },
  {
    title: "Access",
    details:
      "Review who can edit the project and remove invitations that are no longer needed. Keep one owner available for follow-up questions.",
  },
  {
    title: "Notes",
    details:
      "Record decisions that aren't visible in the files, including which designs were rejected and what remains unfinished.",
  },
  {
    title: "Approval",
    details:
      "Ask a teammate to check the handoff and approve the final version before you archive the working draft.",
  },
  {
    title: "Next steps",
    details:
      "Share the review link with the implementation team. Track any follow-up requests in the project instead of sending separate copies of the files.",
  },
  {
    title: "Schedule",
    details:
      "Agree on a date for the first review. Leave time to check feedback against the final files before the team starts building.",
  },
  {
    title: "Contacts",
    details:
      "List the people who can answer design and access questions. Include a backup contact in case the project owner is unavailable.",
  },
  {
    title: "Archive",
    details:
      "Keep the approved files in one place. Move drafts out of the handoff folder so the implementation team does not work from an old version.",
  },
];

export function DialogScrollableDemo() {
  return (
    <Dialog>
      <DialogTrigger variant="outline">Read handoff checklist</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Project handoff</DialogTitle>
          <DialogClose aria-label="Close dialog" />
        </DialogHeader>
        <DialogDescription>
          Review each section before sharing the project with your team.
        </DialogDescription>
        <div className="mt-6 grid gap-6">
          {sections.map((section) => (
            <section key={section.title}>
              <h3 className="text-sm font-semibold">{section.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {section.details}
              </p>
            </section>
          ))}
        </div>
        <DialogFooter>
          <DialogClose variant="outline">Done</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
