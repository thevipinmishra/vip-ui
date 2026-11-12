"use client";

import { CodeIcon } from "@phosphor-icons/react/ssr";
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
      <Button
        variant="minimal"
        size="sm"
        iconOnly
        aria-label={`View code for ${title}`}
      >
        <CodeIcon size={16} aria-hidden="true" />
      </Button>
      <Sheet position="right" size="xl">
        <SheetHandle />
        <SheetHeader className="flex items-start justify-between gap-4">
          <div>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>
              One command installs the chart, the packages, and this example. Or
              copy the file into your app.
            </SheetDescription>
          </div>
          <SheetClose />
        </SheetHeader>
        <SheetBody className="grid min-w-0 grid-cols-[minmax(0,1fr)] content-start gap-4 px-0 py-0 [&_.code-scroll-viewport]:max-h-[calc(100dvh-10rem)]">
          {children}
        </SheetBody>
      </Sheet>
    </SheetTrigger>
  );
}
