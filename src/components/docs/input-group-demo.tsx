"use client";

import { useState } from "react";
import { Search } from "reicon-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  TextField,
  TextFieldDescription,
  TextFieldError,
  TextFieldLabel,
} from "@/components/ui/text-field";

const projects = ["Studio North", "Client portal", "Field Notes"];

export function InputGroupDemo() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);
  const matches = projects.filter((project) =>
    project.toLowerCase().includes(submitted?.toLowerCase() ?? ""),
  );

  return (
    <Form
      className="w-full max-w-md gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(query.trim());
      }}
    >
      <TextField name="project" value={query} onChange={setQuery}>
        <TextFieldLabel>Find a project</TextFieldLabel>
        <InputGroup>
          <InputGroupAddon>
            <Search size={17} aria-hidden="true" />
          </InputGroupAddon>
          <InputGroupInput placeholder="Project name" />
          <InputGroupAddon>
            <Button type="submit" variant="ghost" isDisabled={!query.trim()}>
              Find
            </Button>
          </InputGroupAddon>
        </InputGroup>
        <TextFieldDescription>Search by project name.</TextFieldDescription>
        <TextFieldError />
      </TextField>
      {submitted !== null && (
        <output className="text-sm text-muted-foreground">
          {matches.length
            ? `Matches: ${matches.join(", ")}`
            : `No projects match "${submitted}".`}
        </output>
      )}
    </Form>
  );
}
