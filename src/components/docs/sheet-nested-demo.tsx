"use client";

import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
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
import { TextField } from "@/components/ui/text-field";

export function SheetNestedDemo() {
  const [people, setPeople] = useState(["maya@studio.dev", "leo@studio.dev"]);
  const [inviting, setInviting] = useState(false);

  const invite = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get("email");
    if (typeof email === "string" && !people.includes(email))
      setPeople([...people, email]);
    setInviting(false);
  };

  return (
    <SheetTrigger>
      <Button>Share project</Button>
      <Sheet className="h-[min(32rem,85dvh)]">
        <SheetHandle />
        <SheetHeader>
          <SheetTitle>Share project</SheetTitle>
          <SheetDescription>People with access can edit.</SheetDescription>
          <SheetClose />
        </SheetHeader>
        <SheetBody>
          <ul aria-label="People with access" className="grid gap-2 text-sm">
            {people.map((person) => (
              <li key={person} className="rounded-lg bg-muted px-3 py-2">
                {person}
              </li>
            ))}
          </ul>
        </SheetBody>
        <SheetFooter>
          <SheetTrigger isOpen={inviting} onOpenChange={setInviting}>
            <Button>Invite people</Button>
            <Sheet className="h-auto">
              <SheetHandle />
              <form onSubmit={invite} className="flex min-h-0 flex-1 flex-col">
                <SheetHeader>
                  <SheetTitle>Invite people</SheetTitle>
                  <SheetDescription>
                    They get an email with a link to the project.
                  </SheetDescription>
                </SheetHeader>
                <SheetBody>
                  <TextField
                    name="email"
                    type="email"
                    label="Email"
                    isRequired
                  />
                </SheetBody>
                <SheetFooter>
                  <SheetClose variant="outline">Cancel</SheetClose>
                  <Button type="submit">Send invite</Button>
                </SheetFooter>
              </form>
            </Sheet>
          </SheetTrigger>
        </SheetFooter>
      </Sheet>
    </SheetTrigger>
  );
}
