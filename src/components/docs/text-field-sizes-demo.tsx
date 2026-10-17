"use client";

import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";

export function TextFieldSizesDemo() {
  return (
    <div className="grid w-full max-w-md gap-3">
      <div className="flex items-end gap-2">
        <TextField
          size="sm"
          type="email"
          aria-label="Email"
          placeholder="name@example.com"
          className="flex-1"
        />
        <Button size="sm">Invite</Button>
      </div>
      <div className="flex items-end gap-2">
        <TextField
          size="md"
          type="email"
          aria-label="Email"
          placeholder="name@example.com"
          className="flex-1"
        />
        <Button size="md">Invite</Button>
      </div>
      <div className="flex items-end gap-2">
        <TextField
          type="email"
          aria-label="Email"
          placeholder="name@example.com"
          className="flex-1"
        />
        <Button size="lg">Invite</Button>
      </div>
      <div className="flex items-end gap-2">
        <TextField
          size="xl"
          type="email"
          aria-label="Email"
          placeholder="name@example.com"
          className="flex-1"
        />
        <Button size="xl">Invite</Button>
      </div>
    </div>
  );
}
