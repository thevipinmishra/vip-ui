"use client";

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

export function DrawerBasicDemo() {
  return (
    <Drawer>
      <DrawerTrigger>View order</DrawerTrigger>
      <DrawerContent snapPoints={[0.5]}>
        <DrawerHandle />
        <DrawerHeader>
          <DrawerTitle>Order summary</DrawerTitle>
          <DrawerDescription>
            Review your order before checkout.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <p>Canvas notebook · $18.00</p>
          <p className="mt-2 text-sm text-muted-foreground">Shipping · $4.00</p>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose variant="outline">Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
