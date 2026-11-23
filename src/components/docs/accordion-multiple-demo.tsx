"use client";

import { type FormEvent, useRef, useState } from "react";
import type { Key } from "react-aria-components";
import { flushSync } from "react-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  TextField,
  TextFieldError,
  TextFieldInput,
  TextFieldLabel,
} from "@/components/ui/text-field";

type SettingsSection = "workspace" | "notifications";

export function AccordionMultipleDemo() {
  const [expandedKeys, setExpandedKeys] = useState<Set<Key>>(
    () => new Set(["workspace"]),
  );
  const [result, setResult] = useState<SettingsSection | "saved" | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  function clearResult(section: SettingsSection) {
    setResult((current) =>
      current === section || current === "saved" ? null : current,
    );
  }

  function saveSettings(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = [
      { section: "workspace", input: nameRef.current },
      { section: "notifications", input: emailRef.current },
    ] satisfies { section: SettingsSection; input: HTMLInputElement | null }[];
    const invalid = fields.find(
      ({ input }) =>
        input && (!input.value.trim() || input.validity.typeMismatch),
    );
    if (invalid?.input) {
      flushSync(() => {
        setExpandedKeys((keys) => new Set([...keys, invalid.section]));
        setResult(invalid.section);
      });
      invalid.input.focus();
      return;
    }
    setResult("saved");
  }

  return (
    <Form
      className="w-full max-w-md"
      validationBehavior="aria"
      onSubmit={saveSettings}
    >
      <Accordion
        allowsMultipleExpanded
        expandedKeys={expandedKeys}
        onExpandedChange={setExpandedKeys}
      >
        <AccordionItem id="workspace">
          <AccordionTrigger>Workspace</AccordionTrigger>
          <AccordionContent>
            <TextField
              defaultValue="Studio North"
              isRequired
              isInvalid={result === "workspace"}
              onChange={() => clearResult("workspace")}
            >
              <TextFieldLabel>Workspace name</TextFieldLabel>
              <TextFieldInput ref={nameRef} />
              <TextFieldError>Enter a workspace name.</TextFieldError>
            </TextField>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="notifications">
          <AccordionTrigger>Notifications</AccordionTrigger>
          <AccordionContent>
            <TextField
              type="email"
              isRequired
              isInvalid={result === "notifications"}
              onChange={() => clearResult("notifications")}
            >
              <TextFieldLabel>Release notification email</TextFieldLabel>
              <TextFieldInput ref={emailRef} />
              <TextFieldError>Enter a valid email address.</TextFieldError>
            </TextField>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit">Save settings</Button>
        <span role="status" className="text-sm text-muted-foreground">
          {result === "saved" ? "Settings saved." : ""}
        </span>
      </div>
    </Form>
  );
}
