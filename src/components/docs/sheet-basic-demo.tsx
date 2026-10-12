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

export function SheetBasicDemo() {
  return (
    <SheetTrigger>
      <Button>View order</Button>
      <Sheet className="h-[50dvh]">
        <SheetHandle />
        <SheetHeader>
          <SheetTitle>Order summary</SheetTitle>
          <SheetDescription>
            Review your order before checkout.
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          <p className="text-sm">Canvas notebook · $18.00</p>
          <p className="mbs-2 text-sm text-muted-foreground">
            Shipping · $4.00
          </p>
        </SheetBody>
        <SheetFooter>
          <SheetClose variant="outline">Close</SheetClose>
        </SheetFooter>
      </Sheet>
    </SheetTrigger>
  );
}
