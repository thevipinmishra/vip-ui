"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/ui/text-field";

const takenUsernames = ["admin", "maya"];

export function FormServerErrorsDemo() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  return (
    <Form
      className="w-full max-w-sm"
      validationErrors={errors}
      onSubmit={(event) => {
        event.preventDefault();
        const username = String(
          new FormData(event.currentTarget).get("username") ?? "",
        );
        setErrors(
          takenUsernames.includes(username.trim().toLowerCase())
            ? { username: "This username is taken." }
            : {},
        );
      }}
    >
      <TextField
        label="Username"
        name="username"
        defaultValue="maya"
        isRequired
      />
      <Button type="submit">Save</Button>
    </Form>
  );
}
