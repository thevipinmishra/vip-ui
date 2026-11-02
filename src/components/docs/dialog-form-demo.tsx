"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { TextArea } from "@/components/ui/text-area";
import { TextField } from "@/components/ui/text-field";

export function DialogFormDemo() {
  return (
    <Dialog>
      <DialogTrigger variant="outline">Edit profile</DialogTrigger>
      <DialogContent>
        {({ close }) => (
          <>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Other members see this on your profile.
              </DialogDescription>
              <DialogClose />
            </DialogHeader>
            <Form
              className="contents"
              onSubmit={(event) => {
                event.preventDefault();
                close();
              }}
            >
              <DialogBody className="grid content-start gap-4">
                <TextField
                  name="name"
                  label="Name"
                  defaultValue="Maya Patel"
                  isRequired
                  autoFocus
                />
                <TextField
                  name="username"
                  label="Username"
                  defaultValue="maya"
                  isRequired
                />
                <TextArea
                  name="bio"
                  label="Bio"
                  rows={3}
                  defaultValue="Product designer. I work on the editor."
                />
              </DialogBody>
              <DialogFooter>
                <DialogClose variant="outline">Cancel</DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
