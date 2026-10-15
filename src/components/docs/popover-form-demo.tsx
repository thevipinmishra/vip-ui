"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverDescription,
  PopoverDialog,
  PopoverFooter,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TextArea } from "@/components/ui/text-area";

export function PopoverFormDemo() {
  return (
    <PopoverTrigger>
      <Button variant="outline">Feedback</Button>
      <Popover placement="bottom end" className="w-80">
        <PopoverDialog>
          {({ close }) => (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                close();
              }}
            >
              <PopoverTitle>Send feedback</PopoverTitle>
              <PopoverDescription>
                Tell us what would make this page more useful.
              </PopoverDescription>
              <TextArea
                aria-label="Feedback"
                name="feedback"
                placeholder="I wish this page…"
                rows={3}
                isRequired
                autoFocus
                className="mt-4"
              />
              <PopoverFooter>
                <Button slot="close" variant="ghost" size="sm">
                  Cancel
                </Button>
                <Button type="submit" size="sm">
                  Send
                </Button>
              </PopoverFooter>
            </form>
          )}
        </PopoverDialog>
      </Popover>
    </PopoverTrigger>
  );
}
