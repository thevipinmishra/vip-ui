"use client";

import { useEffect, useState } from "react";
import { Button } from "../../../components/vip-ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/vip-ui/dialog";
import { Form } from "../../../components/vip-ui/form";
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from "../../../components/vip-ui/text-field";

export function NameDialog({
  open,
  mode,
  initialName = "",
  onOpenChange,
  validate,
  onSubmit,
}: {
  open: boolean;
  mode: "rename" | "folder";
  initialName?: string;
  onOpenChange: (open: boolean) => void;
  validate: (name: string) => string | null;
  onSubmit: (name: string) => void;
}) {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    setName(initialName);
    setError("");
  }, [open, initialName]);

  function submit() {
    const next = name.trim();
    const message = validate(next);
    if (message) {
      setError(message);
      return;
    }
    onSubmit(next);
  }

  return (
    <DialogContent
      size="sm"
      overlayProps={{ isOpen: open, onOpenChange }}
      className="max-sm:rounded-t-2xl"
    >
      <Form
        className="contents"
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <DialogHeader>
          <DialogTitle level={2}>
            {mode === "rename" ? "Rename file" : "New folder"}
          </DialogTitle>
          <DialogDescription>
            {mode === "rename"
              ? "The new name applies to everyone in this folder."
              : "The folder is added to the current location."}
          </DialogDescription>
          <DialogClose />
        </DialogHeader>
        <div className="mt-5 pb-1">
          <TextField
            value={name}
            onChange={(value) => {
              setName(value);
              setError("");
            }}
            isInvalid={Boolean(error)}
          >
            <TextFieldLabel>
              {mode === "rename" ? "Name" : "Folder name"}
            </TextFieldLabel>
            <TextFieldInput autoFocus placeholder="Enter a name" />
            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}
          </TextField>
        </div>
        <DialogFooter>
          <DialogClose variant="outline">Cancel</DialogClose>
          <Button type="submit">
            {mode === "rename" ? "Save name" : "Create folder"}
          </Button>
        </DialogFooter>
      </Form>
    </DialogContent>
  );
}
