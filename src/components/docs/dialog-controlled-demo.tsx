"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DialogControlledDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button onPress={() => setIsOpen(true)}>Open from app state</Button>
      <Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>Open from trigger</DialogTrigger>
        <DialogContent>
          <DialogTitle>Controlled dialog</DialogTitle>
          <DialogDescription>
            Either button can open this dialog. The application controls when it
            closes.
          </DialogDescription>
          <div className="mt-6 flex justify-end">
            <Button onPress={() => setIsOpen(false)}>
              Close from app state
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
