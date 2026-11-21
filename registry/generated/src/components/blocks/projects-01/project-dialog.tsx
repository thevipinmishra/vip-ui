"use client";

import { type CalendarDate, parseDate } from "@internationalized/date";
import { useState } from "react";
import { Button } from "../../vip-ui/button";
import { ComboBox } from "../../vip-ui/combo-box";
import {
  DatePicker,
  DatePickerContent,
  DatePickerError,
  DatePickerGroup,
  DatePickerLabel,
} from "../../vip-ui/date-picker";
import {
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../vip-ui/dialog";
import { Form } from "../../vip-ui/form";
import {
  RadioButton,
  RadioDescription,
  RadioField,
  RadioGroup,
  RadioGroupItems,
  RadioGroupLabel,
  RadioIndicator,
  RadioLabel,
} from "../../vip-ui/radio-group";
import { TextField } from "../../vip-ui/text-field";
import { today } from "./data";

export const templates = [
  {
    id: "blank",
    name: "Blank",
    description: "Start with an empty board.",
    tasks: 0,
  },
  {
    id: "website",
    name: "Website",
    description: "Discovery, design, build, and launch.",
    tasks: 28,
  },
  {
    id: "brand",
    name: "Brand identity",
    description: "Research, concepts, and guidelines.",
    tasks: 22,
  },
];

export interface NewProject {
  name: string;
  client: string;
  due: string;
  tasks: number;
}

export function CreateProjectDialog({
  isOpen,
  onOpenChange,
  clients,
  names,
  onCreate,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  clients: string[];
  names: string[];
  onCreate: (project: NewProject) => void;
}) {
  const [name, setName] = useState("");
  const [client, setClient] = useState("");
  const [due, setDue] = useState<CalendarDate | null>(null);
  const [template, setTemplate] = useState("website");

  return (
    <DialogContent size="md" overlayProps={{ isOpen, onOpenChange }}>
      <Form
        className="contents"
        onSubmit={(event) => {
          event.preventDefault();
          if (!due) return;
          onCreate({
            name: name.trim(),
            client: client.trim() || "Loomwell",
            due: due.toString(),
            tasks: templates.find((item) => item.id === template)?.tasks ?? 0,
          });
        }}
      >
        <DialogHeader>
          <DialogTitle>New project</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <DialogBody className="grid grid-cols-1 gap-4">
          <TextField
            label="Name"
            placeholder="Spring campaign"
            value={name}
            onChange={setName}
            isRequired
            autoFocus
            validate={(value) => {
              const next = value.trim().toLowerCase();
              if (!next) return "Enter a project name.";
              if (names.some((item) => item.toLowerCase() === next)) {
                return "A project with this name exists.";
              }
              return null;
            }}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <ComboBox
              label="Client"
              placeholder="Find or add a client"
              options={clients.map((item) => ({ id: item, name: item }))}
              allowsCustomValue
              inputValue={client}
              onInputChange={setClient}
            />
            <DatePicker
              value={due}
              onChange={setDue}
              minValue={parseDate(today)}
              isRequired
            >
              <DatePickerLabel>Due date</DatePickerLabel>
              <DatePickerGroup />
              <DatePickerError>
                {(validation) =>
                  validation.validationDetails.valueMissing
                    ? "Choose a due date."
                    : validation.validationErrors.join(" ")
                }
              </DatePickerError>
              <DatePickerContent />
            </DatePicker>
          </div>
          <RadioGroup value={template} onChange={setTemplate}>
            <RadioGroupLabel>Template</RadioGroupLabel>
            <RadioGroupItems className="gap-2">
              {templates.map((item) => (
                <RadioField key={item.id} value={item.id} variant="card">
                  <RadioButton>
                    <RadioIndicator />
                    <RadioLabel className="flex-1">{item.name}</RadioLabel>
                    <span className="text-sm text-muted-foreground tabular-nums">
                      {item.tasks} tasks
                    </span>
                  </RadioButton>
                  <RadioDescription>{item.description}</RadioDescription>
                </RadioField>
              ))}
            </RadioGroupItems>
          </RadioGroup>
        </DialogBody>
        <DialogFooter>
          <DialogClose variant="outline">Cancel</DialogClose>
          <Button type="submit">Create project</Button>
        </DialogFooter>
      </Form>
    </DialogContent>
  );
}

export function RenameProjectDialog({
  isOpen,
  onOpenChange,
  initialName,
  names,
  onRename,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialName: string;
  names: string[];
  onRename: (name: string) => void;
}) {
  const [name, setName] = useState(initialName);

  return (
    <DialogContent size="sm" overlayProps={{ isOpen, onOpenChange }}>
      <Form
        className="contents"
        onSubmit={(event) => {
          event.preventDefault();
          onRename(name.trim());
        }}
      >
        <DialogHeader>
          <DialogTitle>Rename project</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <DialogBody>
          <TextField
            label="Name"
            value={name}
            onChange={setName}
            isRequired
            autoFocus
            validate={(value) => {
              const next = value.trim().toLowerCase();
              if (!next) return "Enter a project name.";
              if (
                next !== initialName.toLowerCase() &&
                names.some((item) => item.toLowerCase() === next)
              ) {
                return "A project with this name exists.";
              }
              return null;
            }}
          />
        </DialogBody>
        <DialogFooter>
          <DialogClose variant="outline">Cancel</DialogClose>
          <Button type="submit">Save name</Button>
        </DialogFooter>
      </Form>
    </DialogContent>
  );
}
