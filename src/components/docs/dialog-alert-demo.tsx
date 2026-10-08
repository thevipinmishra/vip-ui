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
      <DialogTrigger>Archive item</DialogTrigger>
      <DialogContent role="alertdialog">
        <DialogHeader>
          <DialogTitle>Archive this item?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          The item moves out of the active list. You can restore it later.
        </DialogDescription>
        <DialogFooter>
          <DialogClose variant="outline">Cancel</DialogClose>
          <DialogClose variant="default">Archive item</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
