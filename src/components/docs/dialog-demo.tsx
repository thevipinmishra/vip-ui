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
      <DialogTrigger>Open dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog title</DialogTitle>
          <DialogDescription>
            Review the details before you continue.
          </DialogDescription>
          <DialogClose />
        </DialogHeader>
        <DialogFooter>
          <DialogClose variant="outline">Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
