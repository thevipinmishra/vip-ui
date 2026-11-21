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
import { Select } from "../../vip-ui/select";
import { TextArea } from "../../vip-ui/text-area";
import { TextField } from "../../vip-ui/text-field";
import { showToast } from "../../vip-ui/toast";
import { type TopicId, topics } from "./data";

let ticket = 20417;

export function ContactDialog({
  isOpen,
  onOpenChange,
  topic,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  topic: TopicId | null;
}) {
  const [pending, setPending] = useState(false);

  return (
    <DialogContent size="md" overlayProps={{ isOpen, onOpenChange }}>
      <Form
        className="contents"
        onSubmit={(event) => {
          event.preventDefault();
          const email = String(
            new FormData(event.currentTarget).get("email"),
          ).trim();
          setPending(true);
          window.setTimeout(() => {
            setPending(false);
            onOpenChange(false);
            ticket += 1;
            showToast({
              title: `Request FW-${ticket} is open`,
              description: `We reply to ${email} in 1 business day.`,
              variant: "success",
            });
          }, 700);
        }}
      >
        <DialogHeader>
          <DialogTitle level={2}>Contact support</DialogTitle>
          <DialogDescription>
            Tell us what you need. We reply by email.
          </DialogDescription>
          <DialogClose />
        </DialogHeader>
        <DialogBody className="grid grid-cols-1 gap-4">
          <TextField
            name="email"
            type="email"
            label="Work email"
            autoComplete="email"
            autoFocus
            isRequired
            validate={(value) =>
              /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
                ? null
                : "Enter an email like name@company.com."
            }
          />
          <Select
            name="topic"
            label="Topic"
            defaultValue={topic ?? "other"}
            options={[
              ...topics.map((item) => ({ id: item.id, name: item.name })),
              { id: "other", name: "Something else" },
            ]}
          />
          <TextArea
            name="message"
            label="Message"
            rows={5}
            description="Do not include bank account or Social Security numbers."
            isRequired
            validate={(value) =>
              value.trim().length >= 20
                ? null
                : "Write 20 or more characters so we can help."
            }
          />
        </DialogBody>
        <DialogFooter>
          <DialogClose variant="outline">Cancel</DialogClose>
          <Button type="submit" isPending={pending}>
            Send request
          </Button>
        </DialogFooter>
      </Form>
    </DialogContent>
  );
}
