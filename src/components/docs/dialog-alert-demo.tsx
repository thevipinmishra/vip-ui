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

export function DialogAlertDemo() {
  return (
    <Dialog>
      <DialogTrigger variant="outline">Delete project</DialogTrigger>
      <DialogContent role="alertdialog" size="sm">
        <DialogHeader>
          <DialogTitle>Delete this project?</DialogTitle>
          <DialogDescription>
            This deletes the project and its files for all members. You cannot
            undo this.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose variant="outline">Cancel</DialogClose>
          <DialogClose variant="destructive">Delete project</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
