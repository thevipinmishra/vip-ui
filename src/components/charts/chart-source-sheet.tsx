"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetDescription,
  SheetHandle,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function ChartSourceSheet({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <SheetTrigger>
      <Button variant="ghost" size="sm" aria-label={`View code for ${title}`}>
        View code
      </Button>
      <Sheet position="right">
        <SheetHandle />
        <SheetHeader className="flex items-start justify-between gap-4">
          <div>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>
              Install the vip/ui chart frame from the documentation, then copy
              both files into the same folder. Install any other vip/ui imports
              in the category file, then import the example you need.
            </SheetDescription>
          </div>
          <SheetClose />
        </SheetHeader>
        <SheetBody className="grid min-w-0 grid-cols-[minmax(0,1fr)] content-start divide-y divide-border/70 px-0 py-0">
          {children}
        </SheetBody>
      </Sheet>
    </SheetTrigger>
  );
}
