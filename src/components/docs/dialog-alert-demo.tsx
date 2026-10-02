"use client";

import { useState } from "react";
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
  const [status, setStatus] = useState("Studio North is active.");

  return (
    <div className="flex w-full max-w-sm flex-col items-start gap-4">
      <Dialog>
        <DialogTrigger>Archive project</DialogTrigger>
        <DialogContent role="alertdialog">
          <DialogHeader>
            <DialogTitle>Archive Studio North?</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            The project will move out of your active list. You can restore it
            later.
          </DialogDescription>
          <DialogFooter>
            <DialogClose variant="outline">Cancel</DialogClose>
            <DialogClose
              variant="default"
              onPress={() => setStatus("Studio North was archived.")}
            >
              Archive project
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <output className="block w-full rounded-lg bg-card px-4 py-3 text-[13px] text-muted-foreground shadow-[var(--shadow-card)] ring-1 ring-border/70">
        {status}
      </output>
    </div>
  );
}
