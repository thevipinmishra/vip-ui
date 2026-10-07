"use client";

import { useState } from "react";
import { Dialog, DialogTrigger, Heading } from "react-aria-components";
import { Envelope, Send, UserAdd } from "reicon-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Popover } from "@/components/ui/popover";
import { Select } from "@/components/ui/select";
import { TextField } from "@/components/ui/text-field";

const people = [
  { name: "Maya Chen", role: "Can edit" },
  { name: "Sam Rivera", role: "Can view" },
  { name: "Jo Park", role: "Can edit" },
];

export function PopoverDemo() {
  const [notice, setNotice] = useState("");

  return (
    <DialogTrigger>
      <Button variant="outline">
        <UserAdd size={16} aria-hidden="true" />
        Share project
      </Button>
      <Popover placement="bottom start" className="w-80">
        <Dialog className="outline-none">
          <div className="flex items-center gap-2">
            <Envelope
              size={16}
              aria-hidden="true"
              className="text-muted-foreground"
            />
            <Heading slot="title" className="text-sm font-semibold">
              Share Studio North
            </Heading>
          </div>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Invite a teammate and choose what they can change.
          </p>
          <Form
            className="mt-4 gap-3"
            onSubmit={(event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              const email = String(data.get("email") ?? "").trim();
              setNotice(
                email
                  ? `Invite sent to ${email}.`
                  : "Add an email to send an invite.",
              );
            }}
          >
            <TextField
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              isRequired
              placeholder="teammate@example.com"
            />
            <Select
              label="Access"
              name="access"
              defaultValue="edit"
              options={[
                {
                  id: "edit",
                  name: "Can edit",
                  description: "Change files and comments",
                },
                {
                  id: "comment",
                  name: "Can comment",
                  description: "Leave feedback only",
                },
                {
                  id: "view",
                  name: "Can view",
                  description: "Read the project",
                },
              ]}
            />
            <Button type="submit" size="sm">
              <Send size={16} aria-hidden="true" />
              Send invite
            </Button>
          </Form>
          <ul className="mt-4 divide-y divide-border/70 border-t border-border/70">
            {people.map((person) => (
              <li
                key={person.name}
                className="flex items-center gap-3 py-2.5 text-sm"
              >
                <Avatar name={person.name} className="size-8 text-[10px]" />
                <span className="min-w-0 flex-1 truncate font-medium">
                  {person.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {person.role}
                </span>
              </li>
            ))}
          </ul>
          {notice ? (
            <output className="mt-3 block text-sm text-muted-foreground">
              {notice}
            </output>
          ) : null}
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}
