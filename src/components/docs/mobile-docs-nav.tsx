"use client";

import { ListIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetHandle,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
      <SheetTrigger isOpen={open} onOpenChange={setOpen}>
        <Button variant="outline" size="sm">
          <ListIcon size={17} aria-hidden="true" /> Browse docs
        </Button>
        <Sheet>
          <SheetHandle />
          <SheetHeader className="flex items-center justify-between gap-4 border-b border-border/70 pb-4">
            <SheetTitle>Browse docs</SheetTitle>
            <SheetClose />
          </SheetHeader>
          <SheetBody className="pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <DocsNav mobile onNavigate={() => setOpen(false)} />
          </SheetBody>
        </Sheet>
      </SheetTrigger>
    </div>
  );
}
