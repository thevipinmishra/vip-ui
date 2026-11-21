"use client";

import { useState } from "react";
import { Button } from "../../vip-ui/button";
import {
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../vip-ui/dialog";
import { Form } from "../../vip-ui/form";
import { TextArea } from "../../vip-ui/text-area";
import { TextField } from "../../vip-ui/text-field";
import type { Customer } from "./data";

export function EmailDialog({
  customer,
  isOpen,
  onOpenChange,
  onSend,
}: {
  customer: Customer;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSend: (subject: string) => void;
}) {
  const [pending, setPending] = useState(false);
  const firstName = customer.name.split(" ")[0];
  const template = `Hi ${firstName},\n\n\n\nLeo\nNorthfield Coffee`;

  return (
    <DialogContent size="md" overlayProps={{ isOpen, onOpenChange }}>
      <Form
        className="contents"
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          const subject = String(data.get("subject")).trim();
          setPending(true);
          window.setTimeout(() => {
            setPending(false);
            onSend(subject);
          }, 700);
        }}
      >
        <DialogHeader>
          <DialogTitle level={2}>Email {firstName}</DialogTitle>
          <DialogDescription>
            We send it from support@northfield.coffee to {customer.email}.
          </DialogDescription>
          <DialogClose />
        </DialogHeader>
        <DialogBody className="grid grid-cols-1 gap-4">
          <TextField
            name="subject"
            label="Subject"
            autoFocus
            isRequired
            validate={(value) => (value.trim() ? null : "Enter a subject.")}
          />
          <TextArea
            name="message"
            label="Message"
            rows={6}
            isRequired
            defaultValue={template}
            validate={(value) =>
              value.trim() && value.trim() !== template.trim()
                ? null
                : "Write a message."
            }
          />
        </DialogBody>
        <DialogFooter>
          <DialogClose variant="outline">Cancel</DialogClose>
          <Button type="submit" isPending={pending}>
            Send email
          </Button>
        </DialogFooter>
      </Form>
    </DialogContent>
  );
}
