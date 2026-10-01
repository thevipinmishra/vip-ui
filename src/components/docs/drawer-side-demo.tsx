"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckboxGroup } from "@/components/ui/checkbox-group";
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
import { TextArea } from "@/components/ui/text-area";

export function DrawerSideDemo() {
  const [active, setActive] = useState(["In progress"]);
  return (
    <div className="w-full max-w-sm rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium">Projects</p>
          <p className="text-xs text-muted-foreground">
            {active.length} filters applied
          </p>
        </div>
        <Drawer>
          <DrawerTrigger>Filter results</DrawerTrigger>
          <DrawerContent placement="right">
            <DrawerHandle />
            <DrawerHeader className="flex items-start justify-between gap-4">
              <div>
                <DrawerTitle>Filter projects</DrawerTitle>
                <DrawerDescription>
                  Choose which projects to show.
                </DrawerDescription>
              </div>
              <DrawerClose />
            </DrawerHeader>
            <DrawerBody>
              <CheckboxGroup label="Status" value={active} onChange={setActive}>
                {["In progress", "Completed", "On hold"].map((status) => (
                  <Checkbox key={status} value={status}>
                    {status}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </DrawerBody>
            <DrawerFooter>
              <DrawerClose variant="default">Show results</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
      <div className="space-y-2 text-sm">
        {active.length ? (
          active.map((status) => (
            <p key={status} className="rounded-md bg-muted px-3 py-2">
              {status} projects
            </p>
          ))
        ) : (
          <p className="text-muted-foreground">
            Select a status to see projects.
          </p>
        )}
      </div>
    </div>
  );
}

export function DrawerLeftDemo() {
  const [collection, setCollection] = useState("Recent files");
  return (
    <div className="flex w-full max-w-sm items-center justify-between gap-4 rounded-xl border border-border bg-card p-5">
      <p className="text-sm text-muted-foreground">{collection}</p>
      <Drawer>
        <DrawerTrigger className="shrink-0">Browse workspace</DrawerTrigger>
        <DrawerContent placement="left">
          <DrawerHandle />
          <DrawerHeader className="flex items-start justify-between gap-4">
            <div>
              <DrawerTitle>Workspace</DrawerTitle>
              <DrawerDescription>Jump to a collection.</DrawerDescription>
            </div>
            <DrawerClose />
          </DrawerHeader>
          <DrawerBody>
            <nav aria-label="Workspace collections" className="space-y-2">
              {["Recent files", "Shared with me", "Starred", "Archive"].map(
                (item) => (
                  <DrawerClose
                    key={item}
                    onPress={() => setCollection(item)}
                    className="w-full justify-start"
                  >
                    {item}
                  </DrawerClose>
                ),
              )}
            </nav>
          </DrawerBody>
          <DrawerFooter>
            <DrawerClose variant="outline">Done</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export function DrawerTopDemo() {
  const [notice, setNotice] = useState("No announcement scheduled");
  const [message, setMessage] = useState("");
  return (
    <div className="flex w-full max-w-sm items-center justify-between gap-4 rounded-xl border border-border bg-card p-5">
      <p className="text-sm text-muted-foreground">{notice}</p>
      <Drawer>
        <DrawerTrigger className="shrink-0">Compose</DrawerTrigger>
        <DrawerContent placement="top">
          <DrawerHeader className="flex items-start justify-between gap-4">
            <div>
              <DrawerTitle>Quick announcement</DrawerTitle>
              <DrawerDescription>
                Write a note for your workspace.
              </DrawerDescription>
            </div>
            <DrawerClose />
          </DrawerHeader>
          <DrawerBody>
            <TextArea
              label="Message"
              value={message}
              onChange={setMessage}
              placeholder="What's new?"
            />
          </DrawerBody>
          <DrawerFooter>
            <DrawerClose
              variant="default"
              onPress={() => {
                if (message.trim()) setNotice(message.trim());
              }}
            >
              Post announcement
            </DrawerClose>
          </DrawerFooter>
          <DrawerHandle />
        </DrawerContent>
      </Drawer>
    </div>
  );
}
