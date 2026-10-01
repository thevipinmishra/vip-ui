"use client";

import { useEffect, useState } from "react";
import { Menu } from "reicon-react";
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerHandle,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { DocsNav } from "./docs-nav";

export function MobileDocsNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <div className="lg:hidden">
      <Drawer isOpen={open} onOpenChange={setOpen}>
        <DrawerTrigger
          variant="ghost"
          size="icon"
          aria-label="Open documentation menu"
        >
          <Menu size={20} aria-hidden="true" />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHandle />
          <DrawerHeader className="flex items-center justify-between gap-4 border-b border-border/70 pb-4">
            <DrawerTitle>Browse docs</DrawerTitle>
            <DrawerClose />
          </DrawerHeader>
          <DrawerBody className="pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <DocsNav mobile onNavigate={() => setOpen(false)} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
