"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetDescription,
  SheetHandle,
  SheetHeader,
  type SheetSize,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const sizes: { size: SheetSize; label: string; width: string }[] = [
  { size: "sm", label: "Small", width: "20rem wide." },
  { size: "md", label: "Medium", width: "26rem wide." },
  { size: "lg", label: "Large", width: "36rem wide." },
  { size: "xl", label: "Extra large", width: "48rem wide." },
  { size: "full", label: "Full screen", width: "Fills the screen." },
];

export function SheetSizesDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {sizes.map(({ size, label, width }) => (
        <SheetTrigger key={size}>
          <Button variant="outline">{label}</Button>
          <Sheet position="right" size={size}>
            <SheetHandle />
            <SheetHeader>
              <SheetTitle>{label}</SheetTitle>
              <SheetDescription>{width}</SheetDescription>
              <SheetClose />
            </SheetHeader>
            <SheetBody className="grid">
              <div className="grid min-h-28 place-items-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
                Content
              </div>
            </SheetBody>
          </Sheet>
        </SheetTrigger>
      ))}
    </div>
  );
}
