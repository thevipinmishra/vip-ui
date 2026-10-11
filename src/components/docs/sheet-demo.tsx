"use client";

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

export function SheetDemo() {
  return (
    <SheetTrigger>
      <Button>Resize order</Button>
      <Sheet className="h-[60dvh]" snapPoints={["100%", "40dvh"]}>
        <SheetHandle />
        <SheetHeader className="flex items-start justify-between gap-4">
          <div>
            <SheetTitle>Order summary</SheetTitle>
            <SheetDescription>
              Drag the handle or use the arrow keys to change the sheet height.
            </SheetDescription>
          </div>
          <SheetClose />
        </SheetHeader>
        <SheetBody>
          <dl className="grid grid-cols-[1fr_auto] gap-y-4 rounded-lg bg-muted p-4 text-sm">
            <dt>Canvas notebook</dt>
            <dd>$18.00</dd>
            <dt>Shipping</dt>
            <dd>$4.00</dd>
            <dt className="border-t border-border pt-3 font-semibold">Total</dt>
            <dd className="border-t border-border pt-3 font-semibold">
              $22.00
            </dd>
          </dl>
        </SheetBody>
        <SheetFooter>
          <SheetClose variant="outline">Close</SheetClose>
        </SheetFooter>
      </Sheet>
    </SheetTrigger>
  );
}
