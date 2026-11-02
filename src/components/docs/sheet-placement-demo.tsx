"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckboxGroup } from "@/components/ui/checkbox-group";
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

const collections = ["Recent files", "Shared with me", "Starred"];
const statuses = ["In progress", "Completed", "On hold"];

export function SheetPlacementDemo() {
  const [statusesShown, setStatusesShown] = useState(["In progress"]);

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <SheetTrigger>
        <Button variant="outline">Shortcuts</Button>
        <Sheet position="top">
          <SheetHeader>
            <SheetTitle>Keyboard shortcuts</SheetTitle>
            <SheetDescription>
              Quick reference for the workspace.
            </SheetDescription>
            <SheetClose />
          </SheetHeader>
          <SheetBody>
            <dl className="grid grid-cols-[1fr_auto] gap-x-8 gap-y-3 text-sm">
              <dt>Search files</dt>
              <dd>
                <kbd className="rounded border border-border px-2 py-1">
                  Ctrl K
                </kbd>
              </dd>
              <dt>New file</dt>
              <dd>
                <kbd className="rounded border border-border px-2 py-1">
                  Ctrl N
                </kbd>
              </dd>
            </dl>
          </SheetBody>
          <SheetHandle />
        </Sheet>
      </SheetTrigger>

      <SheetTrigger>
        <Button variant="outline">Collections</Button>
        <Sheet position="left">
          <SheetHandle />
          <SheetHeader>
            <SheetTitle>Collections</SheetTitle>
            <SheetDescription>Open a file collection.</SheetDescription>
            <SheetClose />
          </SheetHeader>
          <SheetBody className="grid content-start gap-1 px-3">
            {collections.map((item) => (
              <SheetClose
                key={item}
                variant="ghost"
                className="justify-start px-3"
              >
                {item}
              </SheetClose>
            ))}
          </SheetBody>
        </Sheet>
      </SheetTrigger>

      <SheetTrigger>
        <Button variant="outline">Filter projects</Button>
        <Sheet position="right">
          <SheetHandle />
          <SheetHeader>
            <SheetTitle>Filter projects</SheetTitle>
            <SheetDescription>Choose which statuses to show.</SheetDescription>
            <SheetClose />
          </SheetHeader>
          <SheetBody>
            <CheckboxGroup
              label="Status"
              value={statusesShown}
              onChange={setStatusesShown}
            >
              {statuses.map((status) => (
                <Checkbox key={status} value={status}>
                  {status}
                </Checkbox>
              ))}
            </CheckboxGroup>
          </SheetBody>
          <SheetFooter>
            <SheetClose variant="default">Show results</SheetClose>
          </SheetFooter>
        </Sheet>
      </SheetTrigger>
    </div>
  );
}
