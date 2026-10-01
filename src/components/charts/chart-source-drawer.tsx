"use client";

import type { ReactNode } from "react";
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

export function ChartSourceDrawer({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Drawer>
      <DrawerTrigger
        variant="ghost"
        size="sm"
        aria-label={`View code for ${title}`}
      >
        View code
      </DrawerTrigger>
      <DrawerContent placement="right">
        <DrawerHandle />
        <DrawerHeader className="flex items-start justify-between gap-4">
          <div>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>
              Copy the chart frame and category source to use this example.
            </DrawerDescription>
          </div>
          <DrawerClose />
        </DrawerHeader>
        <DrawerBody className="grid min-w-0 grid-cols-[minmax(0,1fr)] content-start divide-y divide-border/70 px-0 py-0">
          {children}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
