"use client";

import { CaretDownIcon } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { Button } from "react-aria-components";
import {
  Popover,
  PopoverDialog,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { OnUnmount } from "./navigate-after-close";
import { usePageSections } from "./use-page-sections";

export function TocBar() {
  const { sections, currentId, setCurrentId } = usePageSections();
  const [open, setOpen] = useState(false);
  const pendingId = useRef<string | null>(null);

  if (sections.length < 2) return null;

  const current =
    sections.find((section) => section.id === currentId) ?? sections[0];

  const revealPending = () => {
    const id = pendingId.current;
    pendingId.current = null;
    if (!id) return;
    document.getElementById(id)?.scrollIntoView();
    window.history.pushState(null, "", `#${id}`);
  };

  return (
    <div
      data-slot="toc-bar"
      className="sticky top-(--header-height) z-30 -mx-5 border-b border-border/70 bg-background/85 px-3 backdrop-blur-xl sm:-mx-8 sm:px-6 lg:-ms-12 lg:-me-8 lg:ps-10 xl:hidden"
    >
      <PopoverTrigger isOpen={open} onOpenChange={setOpen}>
        <Button className="group/toc flex h-11 w-full min-w-0 cursor-pointer items-center gap-2 rounded-md px-2 text-start text-[13px] outline-transparent transition-[background-color,outline-color] duration-150 ease-out-quint focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring">
          <span className="shrink-0 text-muted-foreground">On this page</span>
          <span aria-hidden="true" className="shrink-0 text-border">
            /
          </span>
          <span className="min-w-0 truncate font-medium text-foreground">
            {current.label}
          </span>
          <CaretDownIcon
            size={14}
            aria-hidden="true"
            className="ms-auto shrink-0 text-muted-foreground transition-transform duration-200 ease-out-quint group-aria-expanded/toc:rotate-180 motion-reduce:transition-none"
          />
        </Button>
        <Popover
          placement="bottom start"
          offset={4}
          className="max-h-[min(26rem,calc(var(--visual-viewport-height)-8rem))] w-(--trigger-width) p-1.5"
        >
          <PopoverDialog aria-label="On this page">
            <ul className="grid gap-px">
              {sections.map((section) => {
                const isCurrent = section.id === current.id;
                return (
                  <li key={section.id} className="grid">
                    <a
                      href={`#${section.id}`}
                      aria-current={isCurrent ? "location" : undefined}
                      onClick={(event) => {
                        event.preventDefault();
                        pendingId.current = section.id;
                        setCurrentId(section.id);
                        setOpen(false);
                      }}
                      className={cn(
                        "flex min-h-10 min-w-0 items-center rounded-lg px-3 text-[13px] transition-[color,background-color] duration-150 ease-out-quint hover:bg-muted hover:text-foreground focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-transparent",
                        isCurrent
                          ? "bg-accent font-medium text-accent-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      <span className="truncate">{section.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
            <OnUnmount onUnmount={revealPending} />
          </PopoverDialog>
        </Popover>
      </PopoverTrigger>
    </div>
  );
}
