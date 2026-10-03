"use client";

import { useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHandle,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function DrawerLeftDemo() {
  const [collection, setCollection] = useState("Recent files");

  return (
    <div className="grid justify-items-center gap-3">
      <Drawer>
        <DrawerTrigger>Browse workspace</DrawerTrigger>
        <DrawerContent placement="left">
          <DrawerHandle />
          <DrawerHeader>
            <DrawerTitle>Workspace</DrawerTitle>
            <DrawerDescription>Choose a collection to view.</DrawerDescription>
          </DrawerHeader>
          <DrawerBody>
            <div className="grid gap-2">
              {["Recent files", "Shared with me", "Starred", "Archive"].map(
                (item) => (
                  <DrawerClose
                    key={item}
                    variant="secondary"
                    onPress={() => setCollection(item)}
                  >
                    {item}
                  </DrawerClose>
                ),
              )}
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <output className="text-sm text-muted-foreground">
        Collection: {collection}
      </output>
    </div>
  );
}
