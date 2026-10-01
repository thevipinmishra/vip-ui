"use client";

import { useState } from "react";
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

const snapPoints = [0.4, 0.85];

export function DrawerDemo() {
  const [snap, setSnap] = useState(0.4);

  return (
    <Drawer>
      <DrawerTrigger>Review order</DrawerTrigger>
      <DrawerContent snapPoints={snapPoints} onSnapPointChange={setSnap}>
        <DrawerHandle />
        <DrawerHeader className="flex items-start justify-between gap-4">
          <div>
            <DrawerTitle>Order summary</DrawerTitle>
            <DrawerDescription>
              Drag the handle or use the arrow keys to change the drawer height.
            </DrawerDescription>
          </div>
          <DrawerClose />
        </DrawerHeader>
        <DrawerBody>
          <p className="mb-4 text-xs text-muted-foreground">
            {Math.round(snap * 100)}% of the screen visible
          </p>
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
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose variant="outline">Keep shopping</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
