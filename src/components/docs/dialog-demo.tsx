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

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger>View project details</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Project details</DialogTitle>
          <DialogClose aria-label="Close dialog" />
        </DialogHeader>
        <DialogDescription>
          A dialog keeps a short task in context. Click outside, press Escape,
          or use Close to return to the page.
        </DialogDescription>
        <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 rounded-lg bg-muted p-4 text-[13px]">
          <dt className="text-muted-foreground">Project</dt>
          <dd className="font-medium">Studio North</dd>
          <dt className="text-muted-foreground">Status</dt>
          <dd className="font-medium">In progress</dd>
        </dl>
        <DialogFooter>
          <DialogClose variant="outline">Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
