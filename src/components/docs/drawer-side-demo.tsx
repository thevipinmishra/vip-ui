"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckboxGroup } from "@/components/ui/checkbox-group";
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHandle,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function DrawerSideDemo() {
  const [active, setActive] = useState(["In progress"]);

  return (
    <div className="grid justify-items-center gap-3">
      <Drawer>
        <DrawerTrigger>Filter projects</DrawerTrigger>
        <DrawerContent placement="right">
          <DrawerHandle />
          <DrawerHeader>
            <DrawerTitle>Filter projects</DrawerTitle>
            <DrawerDescription>
              Choose which projects to show.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerBody>
            <CheckboxGroup label="Status" value={active} onChange={setActive}>
              {["In progress", "Completed", "On hold"].map((status) => (
                <Checkbox key={status} value={status}>
                  {status}
                </Checkbox>
              ))}
            </CheckboxGroup>
          </DrawerBody>
          <DrawerFooter>
            <DrawerClose variant="default">Show results</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <output className="text-sm text-muted-foreground">
        {active.length ? active.join(", ") : "No status selected"}
      </output>
    </div>
  );
}
