"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Select } from "@/components/ui/select";
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHandle,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { TextArea } from "@/components/ui/text-area";
import { TextField } from "@/components/ui/text-field";

export function SheetFormDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SheetTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button variant="outline">Edit project</Button>
      <Sheet position="right">
        <SheetHandle />
        <SheetHeader>
          <SheetTitle>Edit project</SheetTitle>
          <SheetDescription>Changes apply to all members.</SheetDescription>
          <SheetClose />
        </SheetHeader>
        <Form
          className="contents"
          onSubmit={(event) => {
            event.preventDefault();
            setIsOpen(false);
          }}
        >
          <SheetBody className="grid content-start gap-4">
            <TextField
              name="name"
              label="Name"
              defaultValue="Onboarding flow"
              isRequired
            />
            <TextArea
              name="summary"
              label="Summary"
              rows={4}
              defaultValue="New sign-up, workspace setup, and the first-run tour."
            />
            <Select
              name="status"
              label="Status"
              defaultValue="progress"
              options={[
                { id: "progress", name: "In progress" },
                { id: "review", name: "In review" },
                { id: "done", name: "Completed" },
              ]}
            />
            <TextField name="owner" label="Owner" defaultValue="Maya Patel" />
            <Switch name="public" defaultChecked>
              Show to guests
            </Switch>
          </SheetBody>
          <SheetFooter>
            <SheetClose variant="outline">Cancel</SheetClose>
            <Button type="submit">Save changes</Button>
          </SheetFooter>
        </Form>
      </Sheet>
    </SheetTrigger>
  );
}
