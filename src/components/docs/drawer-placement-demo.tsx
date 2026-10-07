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

const collections = ["Recent files", "Shared with me", "Starred", "Archive"];
const statuses = ["In progress", "Completed", "On hold"];

export function DrawerPlacementDemo() {
  const [collection, setCollection] = useState("Recent files");
  const [active, setActive] = useState(["In progress"]);
  const [message, setMessage] = useState("");
  const [posted, setPosted] = useState("No announcement yet");

  return (
    <div className="grid w-full max-w-lg justify-items-center gap-4">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Drawer>
          <DrawerTrigger variant="outline">Review order</DrawerTrigger>
          <DrawerContent placement="bottom">
            <DrawerHandle />
            <DrawerHeader className="flex items-start justify-between gap-4">
              <div>
                <DrawerTitle>Order summary</DrawerTitle>
                <DrawerDescription>
                  Review the total before checkout.
                </DrawerDescription>
              </div>
              <DrawerClose />
            </DrawerHeader>
            <DrawerBody>
              <dl className="grid grid-cols-[1fr_auto] gap-y-3 text-sm">
                <dt>Canvas notebook</dt>
                <dd>$18.00</dd>
                <dt>Shipping</dt>
                <dd>$4.00</dd>
                <dt className="border-t border-border pt-3 font-semibold">
                  Total
                </dt>
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

        <Drawer>
          <DrawerTrigger variant="outline">Compose</DrawerTrigger>
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
                isDisabled={!message.trim()}
                onPress={() => setPosted(message.trim())}
              >
                Post announcement
              </DrawerClose>
            </DrawerFooter>
            <DrawerHandle />
          </DrawerContent>
        </Drawer>

        <Drawer>
          <DrawerTrigger variant="outline">Browse workspace</DrawerTrigger>
          <DrawerContent placement="left">
            <DrawerHandle />
            <DrawerHeader className="flex items-start justify-between gap-4">
              <div>
                <DrawerTitle>Workspace</DrawerTitle>
                <DrawerDescription>
                  Choose a collection to view.
                </DrawerDescription>
              </div>
              <DrawerClose />
            </DrawerHeader>
            <DrawerBody>
              <div className="grid gap-2">
                {collections.map((item) => (
                  <DrawerClose
                    key={item}
                    variant={item === collection ? "default" : "secondary"}
                    onPress={() => setCollection(item)}
                  >
                    {item}
                  </DrawerClose>
                ))}
              </div>
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        <Drawer>
          <DrawerTrigger variant="outline">Filter results</DrawerTrigger>
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
                {statuses.map((status) => (
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
      <output className="max-w-sm text-center text-sm leading-6 text-muted-foreground">
        <p>Collection: {collection}.</p>
        <p>
          {active.includes("Completed")
            ? "Completed projects"
            : "Open projects"}
          {active.length ? ` · ${active.join(", ")}` : ""}
        </p>
        <p>{posted}</p>
      </output>
    </div>
  );
}
