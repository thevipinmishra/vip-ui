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
import { TextArea } from "@/components/ui/text-area";

export function DrawerTopDemo() {
  const [notice, setNotice] = useState("No announcement yet");
  const [message, setMessage] = useState("");

  return (
    <div className="grid justify-items-center gap-3">
      <Drawer>
        <DrawerTrigger>Write announcement</DrawerTrigger>
        <DrawerContent placement="top">
          <DrawerHeader>
            <DrawerTitle>Quick announcement</DrawerTitle>
            <DrawerDescription>
              Write a note for your workspace.
            </DrawerDescription>
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
              onPress={() => setNotice(message.trim())}
            >
              Post announcement
            </DrawerClose>
          </DrawerFooter>
          <DrawerHandle />
        </DrawerContent>
      </Drawer>
      <output className="max-w-xs text-center text-sm text-muted-foreground">
        {notice}
      </output>
    </div>
  );
}
