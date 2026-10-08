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

const collections = ["Recent files", "Shared with me", "Starred"];
const statuses = ["In progress", "Completed", "On hold"];

export function DrawerPlacementDemo() {
  const [collection, setCollection] = useState("Recent files");
  const [statusesShown, setStatusesShown] = useState(["In progress"]);

  return (
    <div className="grid justify-items-center gap-4">
      <div className="flex flex-wrap justify-center gap-2">
        <Drawer>
          <DrawerTrigger variant="outline">Shortcuts</DrawerTrigger>
          <DrawerContent placement="top">
            <DrawerHeader className="flex items-start justify-between gap-4">
              <div>
                <DrawerTitle>Keyboard shortcuts</DrawerTitle>
                <DrawerDescription>
                  Quick reference for the workspace.
                </DrawerDescription>
              </div>
              <DrawerClose />
            </DrawerHeader>
            <DrawerBody>
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
            </DrawerBody>
            <DrawerHandle />
          </DrawerContent>
        </Drawer>

        <Drawer>
          <DrawerTrigger variant="outline">Collections</DrawerTrigger>
          <DrawerContent placement="left">
            <DrawerHandle />
            <DrawerHeader className="flex items-start justify-between gap-4">
              <div>
                <DrawerTitle>Collections</DrawerTitle>
                <DrawerDescription>Open a file collection.</DrawerDescription>
              </div>
              <DrawerClose />
            </DrawerHeader>
            <DrawerBody className="grid content-start gap-2">
              {collections.map((item) => (
                <DrawerClose
                  key={item}
                  variant={item === collection ? "secondary" : "ghost"}
                  onPress={() => setCollection(item)}
                >
                  {item}
                </DrawerClose>
              ))}
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        <Drawer>
          <DrawerTrigger variant="outline">Filter projects</DrawerTrigger>
          <DrawerContent placement="right">
            <DrawerHandle />
            <DrawerHeader className="flex items-start justify-between gap-4">
              <div>
                <DrawerTitle>Filter projects</DrawerTitle>
                <DrawerDescription>
                  Choose which statuses to show.
                </DrawerDescription>
              </div>
              <DrawerClose />
            </DrawerHeader>
            <DrawerBody>
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
            </DrawerBody>
            <DrawerFooter>
              <DrawerClose variant="default">Show results</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
      <output className="text-center text-sm text-muted-foreground">
        Collection: {collection} · Statuses:{" "}
        {statusesShown.join(", ") || "None"}
      </output>
    </div>
  );
}
