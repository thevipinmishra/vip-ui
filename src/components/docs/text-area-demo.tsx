"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  TextArea,
  TextAreaDescription,
  TextAreaError,
  TextAreaInput,
  TextAreaLabel,
} from "@/components/ui/text-area";

const initialNotes = [
  {
    id: 1,
    author: "Maya Chen",
    text: "The pricing section needs legal review.",
  },
  {
    id: 2,
    author: "Jo Park",
    text: "Mobile copy has been updated for the next review.",
  },
];

export function TextAreaDemo() {
  const [value, setValue] = useState("");
  const [notes, setNotes] = useState(initialNotes);

  return (
    <div className="grid w-full max-w-md gap-5 rounded-xl bg-card p-5 ring-1 ring-border/70">
      <div>
        <p className="text-sm font-semibold">Homepage review</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Autumn campaign · 2 reviewers
        </p>
      </div>
      <ul className="divide-y divide-border border-y border-border">
        {notes.map((note) => (
          <li key={note.id} className="py-3 text-sm">
            <p className="font-medium">{note.author}</p>
            <p className="mt-1 text-muted-foreground">{note.text}</p>
          </li>
        ))}
      </ul>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          if (!value.trim()) return;
          setNotes((current) => [
            ...current,
            { id: Date.now(), author: "You", text: value.trim() },
          ]);
          setValue("");
        }}
      >
        <TextArea name="note" value={value} onChange={setValue}>
          <TextAreaLabel>Add a review note</TextAreaLabel>
          <TextAreaInput
            placeholder="What should the team change?"
            maxLength={280}
          />
          <TextAreaDescription>
            {value.length}/280 characters
          </TextAreaDescription>
          <TextAreaError />
        </TextArea>
        <div>
          <Button type="submit" size="sm" isDisabled={!value.trim()}>
            Post note
          </Button>
        </div>
      </Form>
    </div>
  );
}
